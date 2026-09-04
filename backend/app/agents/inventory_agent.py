from sqlalchemy.orm import Session
from backend.app.models.db_models import Inventory, Product
from backend.app.models.schemas import InventoryEvidence, KnowledgeQueryRequest
from backend.app.services.knowledge_hub import knowledge_hub
from backend.app.services.llm_provider import llm_provider, active_model_config

class InventoryAgent:
    """
    Autonomous Inventory Department Agent.
    Monitors warehouse stock, burn rates, safety stock buffers, and computes reorder deficits.
    """

    def __init__(self):
        self.role = "inventory"

    async def analyze(
        self, product_id: str, daily_burn_rate: float, forecast_7d: float, db: Session
    ) -> InventoryEvidence:
        # 1. Fetch DB ground truth
        inventory = db.query(Inventory).filter(Inventory.product_id == product_id).first()
        product = db.query(Product).filter(Product.id == product_id).first()

        current_stock = inventory.current_stock if inventory else 320
        safety_stock = product.min_safety_stock if product else 150
        reorder_point = product.reorder_point if product else 350

        usable_buffer = max(0, current_stock - safety_stock)
        burn = max(1.0, daily_burn_rate)
        horizon_days = round(usable_buffer / burn, 2)
        stockout_risk = 0.94 if horizon_days < 2.0 else (0.45 if horizon_days < 5.0 else 0.10)
        recommended_reorder = max(0, int(forecast_7d + safety_stock - current_stock))

        # 2. Query inventory knowledge rack (RBAC verified)
        knowledge_res = knowledge_hub.query(
            KnowledgeQueryRequest(
                requesting_agent=self.role,
                department="inventory",
                query_text="Safety stock policy lead time buffer and warehouse limits"
            )
        )

        # 3. LLM Pre-trained model reasoning
        system_prompt = (
            "You are the Inventory Operations Agent for TechMart. Analyze current warehouse stock, burn rate, "
            "and safety stock thresholds to determine stockout risk score and urgency level."
        )
        context = {
            "product_id": product_id,
            "current_stock": current_stock,
            "safety_stock": safety_stock,
            "daily_burn_rate": burn,
            "stockout_horizon_days": horizon_days,
            "reorder_deficit": recommended_reorder,
            "knowledge_snippets": [s.snippet for s in knowledge_res.snippets[:1]],
        }

        model_name = active_model_config.inventory_agent_model
        llm_output = llm_provider.generate_agent_reasoning(self.role, system_prompt, context, model_name=model_name)

        return InventoryEvidence(
            agent=self.role,
            product_id=product_id,
            current_stock=current_stock,
            safety_stock=safety_stock,
            reorder_point=reorder_point,
            daily_burn_rate=burn,
            stockout_horizon_days=horizon_days,
            stockout_risk_score=llm_output.get("stockout_risk_score", stockout_risk),
            recommended_reorder_qty=recommended_reorder,
            urgency_level=llm_output.get("urgency", "CRITICAL" if horizon_days < 2.0 else "MEDIUM"),
            rationale=llm_output.get("rationale", []),
        )

inventory_agent = InventoryAgent()
