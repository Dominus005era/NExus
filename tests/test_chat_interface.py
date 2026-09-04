import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_chat_trigger_viral_surge():
    """Test Chat Scenario 1: Viral Demand Surge on P100."""
    res = client.post("/api/v1/orchestrator/trigger?product_id=P100&trigger_event=VIRAL_DEMAND_SPIKE_P100&simulated_surge_pct=70.6")
    assert res.status_code == 200
    data = res.json()

    assert data["product_id"] == "P100"
    assert "sales_evidence" in data
    assert "inventory_evidence" in data
    assert "finance_evidence" in data
    assert "decision_output" in data
    assert "orchestrator_summary" in data

    sales = data["sales_evidence"]
    assert sales["growth_rate_pct"] > 0
    assert sales["forecast_7d_total"] > 500

    inv = data["inventory_evidence"]
    assert inv["urgency_level"] in ["CRITICAL", "HIGH"]
    assert inv["stockout_horizon_days"] < 3.0

    fin = data["finance_evidence"]
    assert fin["max_procurement_budget"] == 180000.0
    assert fin["statutory_buffer"] == 500000.0

    decision = data["decision_output"]
    assert decision["mathematical_feasibility"] is True
    assert decision["total_upfront_cash_impact"] <= 180000.0
    assert len(decision["allocation_plan"]) >= 1

    # Human-in-the-loop signoff
    decision_id = decision["decision_id"]
    approval_res = client.post(
        "/api/v1/decisions/action",
        json={"decision_id": decision_id, "action": "APPROVED", "reviewer_notes": "Approved by CEO Rahul"},
    )
    assert approval_res.status_code == 200
    approval_data = approval_res.json()
    assert approval_data["status"] == "success"
    assert approval_data["action_taken"] == "APPROVED"

def test_chat_trigger_custom_demand_levels():
    """Test Chat Scenario 2: Multiple demand surges."""
    for surge in [20, 50, 100]:
        res = client.post(f"/api/v1/orchestrator/trigger?product_id=P100&trigger_event=DEMAND_SURGE&simulated_surge_pct={surge}")
        assert res.status_code == 200
        data = res.json()
        assert data["decision_output"]["total_upfront_cash_impact"] <= 180000.0
        assert data["decision_output"]["mathematical_feasibility"] is True

def test_chat_query_knowledge_hub():
    """Test Chat Knowledge Hub queries."""
    res = client.post(
        "/api/v1/knowledge/query",
        json={
            "requesting_agent": "finance",
            "department": "finance",
            "query_text": "Supplier B QuickLogix Net-30 payment terms and SLA",
            "cross_domain_reason": "Audit payment terms for purchase order dispatch",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["access_granted"] is True
    assert len(data["snippets"]) > 0
