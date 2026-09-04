import asyncio
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel

from backend.app.models.db_models import Product, DecisionLog
from backend.app.models.schemas import DecisionEngineOutput, SalesEvidence, InventoryEvidence, FinanceEvidence
from backend.app.agents.sales_agent import sales_agent
from backend.app.agents.inventory_agent import inventory_agent
from backend.app.agents.finance_agent import finance_agent
from backend.app.services.decision_engine import decision_engine
from backend.app.services.llm_provider import llm_provider, active_model_config

class OrchestratorResponse(BaseModel):
    event_id: str
    trigger_event: str
    product_id: str
    timestamp: datetime
    active_models_used: Dict[str, str]
    sales_evidence: SalesEvidence
    inventory_evidence: InventoryEvidence
    finance_evidence: FinanceEvidence
    decision_output: DecisionEngineOutput
    orchestrator_summary: str

class AIOrchestrator:
    """
    Central AI Orchestration Engine.
    Dispatches tasks to specialized department agents in parallel, aggregates structured evidence,
    and runs the Constrained Decision Engine to generate explainable, executable operational proposals.
    """

    async def execute_workflow(
        self,
        product_id: str,
        trigger_event: str,
        db: Session,
        simulated_surge_pct: float = 0.0,
    ) -> OrchestratorResponse:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise ValueError(f"Product {product_id} does not exist.")

        # Step 1: Run Sales Agent first to get demand trajectory
        sales_ev = await sales_agent.analyze(product_id=product_id, db=db, simulated_surge_pct=simulated_surge_pct)

        # Step 2: Run Inventory & Finance agents in parallel
        inv_task = inventory_agent.analyze(
            product_id=product_id,
            daily_burn_rate=sales_ev.current_daily_velocity,
            forecast_7d=sales_ev.forecast_7d_total,
            db=db,
        )
        fin_task = finance_agent.analyze(product_id=product_id, db=db)

        inv_ev, fin_ev = await asyncio.gather(inv_task, fin_task)

        # Step 3: Solve optimal multi-supplier allocation via Constrained Decision Engine
        decision = decision_engine.evaluate_procurement(
            sales=sales_ev,
            inventory=inv_ev,
            finance=fin_ev,
            selling_price=product.selling_price,
            trigger_event=trigger_event,
        )

        # Step 4: Generate Executive Synthesis via Orchestrator LLM
        orchestrator_model = active_model_config.orchestrator_model
        system_prompt = (
            "You are the Chief AI Operations Orchestrator for TechMart. Synthesize the multi-agent findings "
            "and mathematical procurement plan into a crisp, transparent executive decision summary."
        )
        context = {
            "trigger_event": trigger_event,
            "product_id": product_id,
            "sales_growth": sales_ev.growth_rate_pct,
            "stockout_horizon": inv_ev.stockout_horizon_days,
            "reorder_qty": decision.total_recommended_units,
            "total_cost": decision.total_procurement_cost,
            "upfront_cash": decision.total_upfront_cash_impact,
            "allocations": [a.model_dump() for a in decision.allocation_plan],
        }
        llm_res = llm_provider.generate_agent_reasoning("orchestrator", system_prompt, context, model_name=orchestrator_model)
        exec_summary = llm_res.get("executive_summary", decision.optimization_explanation)

        # Step 5: Record Decision in Organizational Memory (Database)
        log_entry = DecisionLog(
            id=decision.decision_id,
            timestamp=datetime.now(timezone.utc),
            trigger_event=trigger_event,
            product_id=product_id,
            agent_evidence={
                "sales": sales_ev.model_dump(),
                "inventory": inv_ev.model_dump(),
                "finance": fin_ev.model_dump(),
                "models_used": {
                    "sales": active_model_config.sales_agent_model,
                    "inventory": active_model_config.inventory_agent_model,
                    "finance": active_model_config.finance_agent_model,
                    "orchestrator": orchestrator_model,
                }
            },
            optimization_output=decision.model_dump(mode="json"),
            human_action="PENDING",
            expected_roi=decision.expected_net_margin,
            lessons_learned=f"Simulated execution for {product_id} under event {trigger_event}.",
        )
        db.add(log_entry)
        db.commit()

        return OrchestratorResponse(
            event_id=f"EVT-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            trigger_event=trigger_event,
            product_id=product_id,
            timestamp=datetime.now(timezone.utc),
            active_models_used={
                "sales": active_model_config.sales_agent_model,
                "inventory": active_model_config.inventory_agent_model,
                "finance": active_model_config.finance_agent_model,
                "orchestrator": orchestrator_model,
            },
            sales_evidence=sales_ev,
            inventory_evidence=inv_ev,
            finance_evidence=fin_ev,
            decision_output=decision,
            orchestrator_summary=exec_summary,
        )

orchestrator = AIOrchestrator()
