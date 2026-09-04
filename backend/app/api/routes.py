from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.core.database import get_db
from backend.app.core.config import settings
from backend.app.models.db_models import (
    Product,
    Inventory,
    Supplier,
    SupplierProduct,
    Order,
    FinancialLedger,
    Campaign,
    DecisionLog,
)
from backend.app.models.schemas import (
    SalesEvidence,
    InventoryEvidence,
    FinanceEvidence,
    SupplierOption,
    DecisionEngineOutput,
    KnowledgeQueryRequest,
    KnowledgeQueryResponse,
    ActionReviewRequest,
)
from backend.app.services.knowledge_hub import knowledge_hub
from backend.app.services.decision_engine import decision_engine
from backend.app.services.llm_provider import (
    llm_provider,
    active_model_config,
    AgentModelConfig,
    AVAILABLE_MODELS,
)
from backend.app.agents.orchestrator import orchestrator, OrchestratorResponse

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "online", "system": settings.PROJECT_NAME, "version": "1.0.0"}

@router.get("/overview")
def get_executive_overview(db: Session = Depends(get_db)):
    """Executive Dashboard summary of revenue, stock risks, and available cash."""
    # 1. Total Cash
    ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()
    cash_balance = ledger.cash_balance if ledger else 0.0
    safe_procurement = ledger.safe_procurement_reserve if ledger else 0.0

    # 2. Total Inventory & Critical Stockout Risks
    inventories = db.query(Inventory).join(Product).all()
    risk_count = 0
    inventory_items = []
    for inv in inventories:
        is_critical = inv.current_stock <= inv.product.min_safety_stock
        if is_critical:
            risk_count += 1
        inventory_items.append({
            "product_id": inv.product_id,
            "product_name": inv.product.name,
            "current_stock": inv.current_stock,
            "min_safety_stock": inv.product.min_safety_stock,
            "reorder_point": inv.product.reorder_point,
            "is_critical": is_critical,
        })

    # 3. 7-Day Revenue
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_revenue = db.query(func.sum(Order.quantity * Order.unit_price)).filter(
        Order.order_date >= seven_days_ago
    ).scalar() or 0.0

    # 4. Active Campaigns
    active_campaigns = db.query(Campaign).filter(Campaign.status == "ACTIVE").all()

    return {
        "cash_balance": cash_balance,
        "safe_procurement_budget": safe_procurement,
        "revenue_7d": round(recent_revenue, 2),
        "critical_stock_risks": risk_count,
        "active_campaigns_count": len(active_campaigns),
        "inventory_summary": inventory_items,
    }

@router.get("/inventory")
def get_inventory_details(db: Session = Depends(get_db)):
    """Detailed view of stock levels, safety stocks, and reorder points."""
    results = db.query(Inventory).join(Product).all()
    output = []
    for inv in results:
        output.append({
            "product_id": inv.product_id,
            "product_name": inv.product.name,
            "category": inv.product.category,
            "current_stock": inv.current_stock,
            "allocated_stock": inv.allocated_stock,
            "incoming_stock": inv.incoming_stock,
            "min_safety_stock": inv.product.min_safety_stock,
            "reorder_point": inv.product.reorder_point,
            "unit_cost": inv.product.unit_cost,
            "selling_price": inv.product.selling_price,
            "warehouse_location": inv.warehouse_location,
        })
    return output

@router.get("/sales/metrics")
def get_sales_metrics(db: Session = Depends(get_db)):
    """Detailed sales metrics by SKU over the past 30 days."""
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    sales_by_product = db.query(
        Order.product_id,
        Product.name,
        func.sum(Order.quantity).label("total_units"),
        func.sum(Order.quantity * Order.unit_price).label("total_revenue"),
        func.count(Order.id).label("total_orders"),
    ).join(Product).filter(Order.order_date >= thirty_days_ago).group_by(Order.product_id, Product.name).all()

    return [
        {
            "product_id": row.product_id,
            "product_name": row.name,
            "total_units_30d": row.total_units,
            "total_revenue_30d": round(row.total_revenue, 2),
            "total_orders_30d": row.total_orders,
            "daily_avg_units": round(row.total_units / 30.0, 1),
        }
        for row in sales_by_product
    ]

@router.get("/finance/summary")
def get_financial_summary(db: Session = Depends(get_db)):
    """Financial ledger overview and liquidity status."""
    ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()
    if not ledger:
        raise HTTPException(status_code=404, detail="No ledger records found")
    return {
        "cash_balance": ledger.cash_balance,
        "accounts_payable": ledger.accounts_payable,
        "accounts_receivable": ledger.accounts_receivable,
        "daily_opex": ledger.daily_opex,
        "statutory_buffer": settings.STATUTORY_CASH_BUFFER,
        "safe_procurement_reserve": ledger.safe_procurement_reserve,
        "unallocated_free_cash": max(0.0, ledger.cash_balance - settings.STATUTORY_CASH_BUFFER),
    }

@router.get("/suppliers")
def get_suppliers_data(db: Session = Depends(get_db)):
    """List all registered suppliers and product pricing terms."""
    suppliers = db.query(Supplier).all()
    output = []
    for sup in suppliers:
        products = []
        for sp in sup.products:
            products.append({
                "product_id": sp.product_id,
                "unit_price": sp.unit_price,
                "max_capacity_per_order": sp.max_capacity_per_order,
                "min_order_quantity": sp.min_order_quantity,
            })
        output.append({
            "id": sup.id,
            "name": sup.name,
            "rating": sup.rating,
            "payment_terms_type": sup.payment_terms_type,
            "lead_time_days": sup.lead_time_days,
            "products": products,
        })
    return output

@router.post("/knowledge/query", response_model=KnowledgeQueryResponse)
def query_knowledge_hub(req: KnowledgeQueryRequest):
    """Query departmental document racks with RBAC verification."""
    return knowledge_hub.query(req)

@router.post("/decisions/evaluate-surge", response_model=DecisionEngineOutput)
def evaluate_surge_scenario(product_id: str = "P100", db: Session = Depends(get_db)):
    """
    Simulates Scenario 1 (Demand Spike on P100):
    1. Sales Agent computes demand trajectory and campaign lift.
    2. Inventory Agent computes stockout horizon and deficit.
    3. Finance Agent provides cash bounds and supplier terms.
    4. Constrained Decision Engine calculates the mathematically optimal multi-supplier split.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

    inventory = db.query(Inventory).filter(Inventory.product_id == product_id).first()
    ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()

    # Step 1: Sales Agent evidence (Influencer surge on P100: daily velocity = 145 units/day)
    base_velocity = 85.0
    surge_velocity = 145.0 if product_id == "P100" else base_velocity
    forecast_7d = surge_velocity * 7.0 # 1,015 units

    sales_evidence = SalesEvidence(
        agent="sales",
        product_id=product_id,
        historical_daily_avg=base_velocity,
        current_daily_velocity=surge_velocity,
        forecast_7d_total=forecast_7d,
        forecast_confidence=0.91,
        growth_rate_pct=round(((surge_velocity - base_velocity) / base_velocity) * 100, 1),
        active_campaign="Streamer Setup 2026 Creator Partnership" if product_id == "P100" else None,
        rationale=[
            "Active creator partnership campaign on Shopify store.",
            f"Daily order velocity increased by +{((surge_velocity - base_velocity) / base_velocity) * 100:.1f}% to {surge_velocity} units/day.",
            f"Expected 7-day demand: {forecast_7d:.0f} units (91% confidence)."
        ],
    )

    # Step 2: Inventory Agent evidence
    current_stock = inventory.current_stock if inventory else 320
    safety_stock = product.min_safety_stock
    usable_buffer = max(0, current_stock - safety_stock)
    horizon_days = round(usable_buffer / surge_velocity, 2)
    stockout_risk = 0.94 if horizon_days < 2.0 else 0.20
    recommended_qty = max(0, int(forecast_7d + safety_stock - current_stock))

    inventory_evidence = InventoryEvidence(
        agent="inventory",
        product_id=product_id,
        current_stock=current_stock,
        safety_stock=safety_stock,
        reorder_point=product.reorder_point,
        daily_burn_rate=surge_velocity,
        stockout_horizon_days=horizon_days,
        stockout_risk_score=stockout_risk,
        recommended_reorder_qty=recommended_qty,
        urgency_level="CRITICAL" if horizon_days < 2.0 else "MEDIUM",
        rationale=[
            f"Current stock: {current_stock} units. Usable buffer above safety stock ({safety_stock}) is only {usable_buffer} units.",
            f"Stockout horizon: Depletion in {horizon_days} days at {surge_velocity} units/day burn rate.",
            f"Stockout risk is {stockout_risk*100:.0f}% without immediate replenishment."
        ],
    )

    # Step 3: Finance Agent evidence
    supplier_links = db.query(SupplierProduct).filter(SupplierProduct.product_id == product_id).all()
    available_suppliers = []
    for sl in supplier_links:
        sup = sl.supplier
        upfront_pct = 1.0 if sup.payment_terms_type == "IMMEDIATE" else (0.5 if sup.payment_terms_type == "SPLIT50_50" else 0.0)
        available_suppliers.append(
            SupplierOption(
                supplier_id=sup.id,
                supplier_name=sup.name,
                unit_cost=sl.unit_price,
                lead_time_days=sup.lead_time_days,
                max_capacity=sl.max_capacity_per_order,
                payment_terms=sup.payment_terms_type,
                upfront_cash_pct=upfront_pct,
            )
        )

    finance_evidence = FinanceEvidence(
        agent="finance",
        total_cash_balance=ledger.cash_balance if ledger else 850000.0,
        statutory_buffer=settings.STATUTORY_CASH_BUFFER,
        unallocated_free_cash=max(0.0, (ledger.cash_balance if ledger else 850000.0) - settings.STATUTORY_CASH_BUFFER),
        max_procurement_budget=ledger.safe_procurement_reserve if ledger else 180000.0,
        accounts_payable=ledger.accounts_payable if ledger else 120000.0,
        accounts_receivable=ledger.accounts_receivable if ledger else 340000.0,
        preferred_payment_terms="NET30",
        available_suppliers=available_suppliers,
        rationale=[
            f"Statutory treasury buffer ₹{settings.STATUTORY_CASH_BUFFER:,.0f} strictly preserved.",
            f"Safe immediate upfront cash ceiling capped at ₹{ledger.safe_procurement_reserve if ledger else 180000.0:,.0f}.",
            "Net-30 supplier credit preferred to avoid short-term cash flow strain."
        ],
    )

    # Step 4: Decision Engine Constrained Optimization
    output = decision_engine.evaluate_procurement(
        sales=sales_evidence,
        inventory=inventory_evidence,
        finance=finance_evidence,
        selling_price=product.selling_price,
        trigger_event="VIRAL_DEMAND_SPIKE_P100",
    )

    # Step 5: Log to Decision Memory
    log_entry = DecisionLog(
        id=output.decision_id,
        timestamp=datetime.utcnow(),
        trigger_event=output.trigger_event,
        product_id=product_id,
        agent_evidence={
            "sales": sales_evidence.model_dump(),
            "inventory": inventory_evidence.model_dump(),
            "finance": finance_evidence.model_dump(),
        },
        optimization_output=output.model_dump(mode="json"),
        human_action="PENDING",
        expected_roi=round(output.expected_net_margin, 2),
    )
    db.add(log_entry)
    db.commit()

    return output

@router.post("/decisions/action")
def review_decision(action_req: ActionReviewRequest, db: Session = Depends(get_db)):
    """Human-in-the-Loop review endpoint (Approve, Reject, Modify)."""
    log_entry = db.query(DecisionLog).filter(DecisionLog.id == action_req.decision_id).first()
    if not log_entry:
        raise HTTPException(status_code=404, detail=f"Decision {action_req.decision_id} not found")

    log_entry.human_action = action_req.action
    log_entry.lessons_learned = action_req.reviewer_notes or f"Action {action_req.action} recorded."
    
    # If approved, update incoming inventory stock and adjust cash/AP
    if action_req.action == "APPROVED":
        allocations = log_entry.optimization_output.get("allocation_plan", [])
        total_units = sum(a.get("allocated_units", 0) for a in allocations)
        total_upfront = sum(a.get("upfront_cash_required", 0) for a in allocations)
        
        inv = db.query(Inventory).filter(Inventory.product_id == log_entry.product_id).first()
        if inv:
            inv.incoming_stock += total_units

        ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()
        if ledger:
            ledger.cash_balance -= total_upfront
            ledger.accounts_payable += (sum(a.get("total_cost", 0) for a in allocations) - total_upfront)

    db.commit()
    return {
        "status": "success",
        "decision_id": action_req.decision_id,
        "action_taken": action_req.action,
        "timestamp": datetime.now(timezone.utc),
    }

# ==================== Phase 2 Swappable Models & Orchestrator Routes ====================

@router.get("/agents/config")
def get_agent_model_config():
    """Retrieve active LLM model assignments and all available provider models."""
    return {
        "active_config": active_model_config.model_dump(),
        "available_models": AVAILABLE_MODELS,
    }

@router.post("/agents/config")
def update_agent_model_config(new_config: AgentModelConfig):
    """Dynamically swap models assigned to Sales, Inventory, Finance, or Orchestrator."""
    active_model_config.sales_agent_model = new_config.sales_agent_model
    active_model_config.inventory_agent_model = new_config.inventory_agent_model
    active_model_config.finance_agent_model = new_config.finance_agent_model
    active_model_config.orchestrator_model = new_config.orchestrator_model
    active_model_config.temperature = new_config.temperature
    return {
        "status": "updated",
        "active_config": active_model_config.model_dump(),
    }

@router.post("/orchestrator/trigger", response_model=OrchestratorResponse)
async def trigger_orchestrator_workflow(
    product_id: str = "P100",
    trigger_event: str = "VIRAL_DEMAND_SPIKE_P100",
    simulated_surge_pct: float = 0.0,
    db: Session = Depends(get_db),
):
    """
    Executes full multi-agent orchestration:
    1. Sales Agent analyzes demand momentum with assigned model.
    2. Inventory Agent checks warehouse stock & depletion days.
    3. Finance Agent enforces cash buffers & evaluates credit terms.
    4. Constrained Decision Engine computes mathematically optimal purchase order.
    5. Orchestrator LLM synthesizes findings into an executive proposal.
    """
    return await orchestrator.execute_workflow(
        product_id=product_id,
        trigger_event=trigger_event,
        db=db,
        simulated_surge_pct=simulated_surge_pct,
    )

@router.get("/decisions/history")
def get_decision_history(db: Session = Depends(get_db)):
    """Retrieve historical organizational decisions and their human action status."""
    logs = db.query(DecisionLog).order_by(DecisionLog.timestamp.desc()).limit(20).all()
    output = []
    for log in logs:
        output.append({
            "id": log.id,
            "timestamp": log.timestamp,
            "trigger_event": log.trigger_event,
            "product_id": log.product_id,
            "human_action": log.human_action,
            "expected_roi": log.expected_roi,
            "actual_outcome_roi": log.actual_outcome_roi,
            "lessons_learned": log.lessons_learned,
            "optimization_output": log.optimization_output,
        })
    return output

