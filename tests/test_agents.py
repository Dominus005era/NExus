import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_agent_model_config_endpoint():
    # 1. Get current config
    res = client.get("/api/v1/agents/config")
    assert res.status_code == 200
    data = res.json()
    assert "active_config" in data
    assert "available_models" in data
    assert len(data["available_models"]) >= 5

    # 2. Update model assignments
    update_payload = {
        "sales_agent_model": "gemini-2.0-flash",
        "inventory_agent_model": "gpt-4o-mini",
        "finance_agent_model": "gemini-1.5-pro",
        "orchestrator_model": "claude-3-5-sonnet",
        "temperature": 0.3
    }
    res_update = client.post("/api/v1/agents/config", json=update_payload)
    assert res_update.status_code == 200
    assert res_update.json()["active_config"]["orchestrator_model"] == "claude-3-5-sonnet"

def test_full_orchestrator_workflow():
    # Trigger full multi-agent orchestration for P100 demand surge
    res = client.post("/api/v1/orchestrator/trigger?product_id=P100&trigger_event=VIRAL_DEMAND_SPIKE_P100")
    assert res.status_code == 200
    data = res.json()

    # Verify structured multi-agent evidence
    assert data["product_id"] == "P100"
    assert data["trigger_event"] == "VIRAL_DEMAND_SPIKE_P100"
    assert "active_models_used" in data
    
    # Check Sales Agent evidence
    sales = data["sales_evidence"]
    assert sales["agent"] == "sales"
    assert sales["forecast_7d_total"] >= 1000
    assert len(sales["rationale"]) > 0

    # Check Inventory Agent evidence
    inv = data["inventory_evidence"]
    assert inv["agent"] == "inventory"
    assert inv["stockout_horizon_days"] < 2.5
    assert inv["urgency_level"] == "CRITICAL"

    # Check Finance Agent evidence
    fin = data["finance_evidence"]
    assert fin["agent"] == "finance"
    assert fin["max_procurement_budget"] == 180000.0

    # Check Constrained Decision Output
    decision = data["decision_output"]
    assert decision["mathematical_feasibility"] is True
    assert decision["total_upfront_cash_impact"] <= 180000.0
    assert len(decision["allocation_plan"]) >= 2

    # Check Orchestrator Executive Summary
    assert len(data["orchestrator_summary"]) > 20

def test_decision_history_retrieval():
    res = client.get("/api/v1/decisions/history")
    assert res.status_code == 200
    history = res.json()
    assert len(history) > 0
    assert history[0]["human_action"] == "PENDING"
