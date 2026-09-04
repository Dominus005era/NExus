from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_api_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_api_overview():
    response = client.get("/api/v1/overview")
    assert response.status_code == 200
    data = response.json()
    assert "cash_balance" in data
    assert "critical_stock_risks" in data
    assert data["cash_balance"] >= 500000.0

def test_api_inventory():
    response = client.get("/api/v1/inventory")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 5

def test_api_evaluate_surge():
    response = client.post("/api/v1/decisions/evaluate-surge?product_id=P100")
    assert response.status_code == 200
    decision = response.json()
    assert decision["product_id"] == "P100"
    assert decision["mathematical_feasibility"] is True
    assert decision["total_upfront_cash_impact"] <= 180000.0
    assert len(decision["allocation_plan"]) >= 2
