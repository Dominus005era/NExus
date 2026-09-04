import pytest
from backend.app.core.database import SessionLocal
from backend.app.models.db_models import Product, Inventory, Supplier, FinancialLedger
from backend.app.services.knowledge_hub import knowledge_hub
from backend.app.models.schemas import KnowledgeQueryRequest
from backend.app.services.decision_engine import decision_engine
from backend.app.models.schemas import (
    SalesEvidence,
    InventoryEvidence,
    FinanceEvidence,
    SupplierOption,
)

def test_database_ground_truth():
    db = SessionLocal()
    try:
        products = db.query(Product).all()
        assert len(products) == 5
        
        p100 = db.query(Product).filter(Product.id == "P100").first()
        assert p100 is not None
        assert p100.selling_price == 1299.0
        assert p100.inventory.current_stock == 320
        
        suppliers = db.query(Supplier).all()
        assert len(suppliers) == 3
        
        ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()
        assert ledger.cash_balance == 850000.0
        assert ledger.safe_procurement_reserve == 180000.0
    finally:
        db.close()

def test_rbac_knowledge_hub():
    # 1. Sales agent accessing sales promotional calendar -> GRANTED
    res_sales = knowledge_hub.query(
        KnowledgeQueryRequest(
            requesting_agent="sales",
            department="sales",
            query_text="Streamer Setup creator partnership discount"
        )
    )
    assert res_sales.access_granted is True
    assert len(res_sales.snippets) > 0

    # 2. Sales agent accessing finance master contracts without justification -> DENIED
    res_denied = knowledge_hub.query(
        KnowledgeQueryRequest(
            requesting_agent="sales",
            department="finance",
            query_text="Supplier contracts payment terms"
        )
    )
    assert res_denied.access_granted is False
    assert "ACCESS DENIED" in res_denied.status_message

    # 3. Inventory agent requesting finance documents with cross-domain justification -> GRANTED
    res_cross = knowledge_hub.query(
        KnowledgeQueryRequest(
            requesting_agent="inventory",
            department="finance",
            query_text="Supplier B QuickLogix payment terms and credit limit",
            cross_domain_reason="Emergency stockout replenishment supplier trade-off evaluation"
        )
    )
    assert res_cross.access_granted is True
    assert len(res_cross.snippets) > 0

def test_constrained_decision_engine_scenario1():
    # Sales evidence: P100 demand surge to 145 units/day (forecast 7d = 1015 units)
    sales = SalesEvidence(
        agent="sales",
        product_id="P100",
        historical_daily_avg=85.0,
        current_daily_velocity=145.0,
        forecast_7d_total=1015.0,
        forecast_confidence=0.91,
        growth_rate_pct=70.6,
        active_campaign="Streamer Setup 2026",
    )

    # Inventory evidence: 320 on hand, 150 safety stock, horizon 1.17 days
    inventory = InventoryEvidence(
        agent="inventory",
        product_id="P100",
        current_stock=320,
        safety_stock=150,
        reorder_point=350,
        daily_burn_rate=145.0,
        stockout_horizon_days=1.17,
        stockout_risk_score=0.94,
        recommended_reorder_qty=845,
        urgency_level="CRITICAL",
    )

    # Finance evidence: safe budget 180,000, 3 suppliers
    finance = FinanceEvidence(
        agent="finance",
        total_cash_balance=850000.0,
        statutory_buffer=500000.0,
        unallocated_free_cash=350000.0,
        max_procurement_budget=180000.0,
        accounts_payable=120000.0,
        accounts_receivable=340000.0,
        preferred_payment_terms="NET30",
        available_suppliers=[
            SupplierOption(
                supplier_id="SUP-A",
                supplier_name="Apex Global Logistics",
                unit_cost=450.0,
                lead_time_days=14,
                max_capacity=1500,
                payment_terms="IMMEDIATE",
                upfront_cash_pct=1.0,
            ),
            SupplierOption(
                supplier_id="SUP-B",
                supplier_name="QuickLogix Domestic Express",
                unit_cost=477.0,
                lead_time_days=3,
                max_capacity=400,
                payment_terms="NET30",
                upfront_cash_pct=0.0,
            ),
            SupplierOption(
                supplier_id="SUP-C",
                supplier_name="Zenith Direct Components",
                unit_cost=436.5,
                lead_time_days=7,
                max_capacity=600,
                payment_terms="SPLIT50_50",
                upfront_cash_pct=0.5,
            ),
        ],
    )

    output = decision_engine.evaluate_procurement(
        sales=sales,
        inventory=inventory,
        finance=finance,
        selling_price=1299.0,
        trigger_event="VIRAL_DEMAND_SPIKE_P100",
    )

    # Assertions
    assert output.mathematical_feasibility is True
    assert output.total_upfront_cash_impact <= finance.max_procurement_budget
    assert output.stockout_risk_post_action <= 0.15
    assert len(output.allocation_plan) >= 2
    
    # Check that QuickLogix (Supplier B) is allocated 400 units to bridge urgent 3-day gap
    sup_b = next((a for a in output.allocation_plan if a.supplier_id == "SUP-B"), None)
    assert sup_b is not None
    assert sup_b.allocated_units == 400
    assert sup_b.upfront_cash_required == 0.0  # Net-30 term

    # Check that Zenith Direct (Supplier C) fulfills secondary deficit
    sup_c = next((a for a in output.allocation_plan if a.supplier_id == "SUP-C"), None)
    assert sup_c is not None
    assert sup_c.allocated_units > 0
    assert sup_c.upfront_cash_required == sup_c.allocated_units * (436.5 * 0.5)

    print(f"\n[DECISION PASS] Total Ordered: {output.total_recommended_units} units")
    print(f"[DECISION PASS] Upfront Cash: Rs. {output.total_upfront_cash_impact:,.2f} <= Budget Rs. {finance.max_procurement_budget:,.2f}")
    print(f"[DECISION PASS] Net Margin Generated: Rs. {output.expected_net_margin:,.2f}")
