from typing import List
from sqlalchemy.orm import Session
from backend.app.models.db_models import FinancialLedger, SupplierProduct
from backend.app.models.schemas import FinanceEvidence, SupplierOption, KnowledgeQueryRequest
from backend.app.core.config import settings
from backend.app.services.knowledge_hub import knowledge_hub
from backend.app.services.llm_provider import llm_provider, active_model_config

class FinanceAgent:
    """
    Autonomous Finance Department Agent.
    Monitors liquidity runway, statutory cash buffers, supplier credit terms, and defines safe spend caps.
    """

    def __init__(self):
        self.role = "finance"

    async def analyze(self, product_id: str, db: Session) -> FinanceEvidence:
        # 1. Fetch DB ground truth
        ledger = db.query(FinancialLedger).order_by(FinancialLedger.timestamp.desc()).first()
        cash_balance = ledger.cash_balance if ledger else 850000.0
        statutory_buffer = settings.STATUTORY_CASH_BUFFER
        free_cash = max(0.0, cash_balance - statutory_buffer)
        safe_budget = ledger.safe_procurement_reserve if ledger else 180000.0

        # Fetch supplier terms for this SKU
        supplier_links = db.query(SupplierProduct).filter(SupplierProduct.product_id == product_id).all()
        supplier_options: List[SupplierOption] = []
        for sl in supplier_links:
            sup = sl.supplier
            upfront_pct = 1.0 if sup.payment_terms_type == "IMMEDIATE" else (0.5 if sup.payment_terms_type == "SPLIT50_50" else 0.0)
            supplier_options.append(
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

        # 2. Query finance knowledge rack (RBAC verified)
        knowledge_res = knowledge_hub.query(
            KnowledgeQueryRequest(
                requesting_agent=self.role,
                department="finance",
                query_text="Supplier credit terms and cash reserve buffer limits"
            )
        )

        # 3. LLM Pre-trained model reasoning
        system_prompt = (
            "You are the Finance Operations Agent for TechMart. Enforce working capital rules, evaluate supplier payment terms, "
            "and establish the maximum safe procurement cash ceiling."
        )
        context = {
            "cash_balance": cash_balance,
            "statutory_buffer": statutory_buffer,
            "safe_budget": safe_budget,
            "suppliers": [s.model_dump() for s in supplier_options],
            "knowledge_snippets": [s.snippet for s in knowledge_res.snippets[:1]],
        }

        model_name = active_model_config.finance_agent_model
        llm_output = llm_provider.generate_agent_reasoning(self.role, system_prompt, context, model_name=model_name)

        return FinanceEvidence(
            agent=self.role,
            total_cash_balance=cash_balance,
            statutory_buffer=statutory_buffer,
            unallocated_free_cash=free_cash,
            max_procurement_budget=safe_budget,
            accounts_payable=ledger.accounts_payable if ledger else 120000.0,
            accounts_receivable=ledger.accounts_receivable if ledger else 340000.0,
            preferred_payment_terms=llm_output.get("preferred_terms", "NET30"),
            available_suppliers=supplier_options,
            rationale=llm_output.get("rationale", []),
        )

finance_agent = FinanceAgent()
