from datetime import datetime
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field

# ==================== Agent Communication Contracts ====================

class SalesEvidence(BaseModel):
    agent: str = "sales"
    product_id: str
    historical_daily_avg: float
    current_daily_velocity: float
    forecast_7d_total: float
    forecast_confidence: float = Field(ge=0.0, le=1.0)
    growth_rate_pct: float
    active_campaign: Optional[str] = None
    rationale: List[str] = Field(default_factory=list)


class InventoryEvidence(BaseModel):
    agent: str = "inventory"
    product_id: str
    current_stock: int
    safety_stock: int
    reorder_point: int
    daily_burn_rate: float
    stockout_horizon_days: float
    stockout_risk_score: float = Field(ge=0.0, le=1.0)
    recommended_reorder_qty: int
    urgency_level: str  # LOW, MEDIUM, HIGH, CRITICAL
    rationale: List[str] = Field(default_factory=list)


class SupplierOption(BaseModel):
    supplier_id: str
    supplier_name: str
    unit_cost: float
    lead_time_days: int
    max_capacity: int
    payment_terms: str
    upfront_cash_pct: float
    contract_flexibility: Optional[str] = None


class FinanceEvidence(BaseModel):
    agent: str = "finance"
    total_cash_balance: float
    statutory_buffer: float
    unallocated_free_cash: float
    max_procurement_budget: float
    accounts_payable: float
    accounts_receivable: float
    preferred_payment_terms: str
    available_suppliers: List[SupplierOption]
    rationale: List[str] = Field(default_factory=list)


# ==================== Decision Engine Schemas ====================

class SupplierAllocation(BaseModel):
    supplier_id: str
    supplier_name: str
    allocated_units: int
    unit_cost: float
    total_cost: float
    upfront_cash_required: float
    lead_time_days: int
    payment_terms: str


class DecisionEngineOutput(BaseModel):
    decision_id: str
    product_id: str
    timestamp: datetime
    trigger_event: str
    total_recommended_units: int
    unmet_deficit_units: int
    total_procurement_cost: float
    total_upfront_cash_impact: float
    expected_revenue: float
    expected_net_margin: float
    stockout_risk_post_action: float
    allocation_plan: List[SupplierAllocation]
    mathematical_feasibility: bool
    optimization_explanation: str
    tradeoffs_identified: List[str]


# ==================== Knowledge Hub & RBAC Schemas ====================

class KnowledgeQueryRequest(BaseModel):
    requesting_agent: str  # sales, inventory, finance, orchestrator
    department: str        # sales, inventory, finance
    query_text: str
    cross_domain_reason: Optional[str] = None


class KnowledgeDocSnippet(BaseModel):
    doc_name: str
    department: str
    snippet: str
    relevance_score: float


class KnowledgeQueryResponse(BaseModel):
    access_granted: bool
    status_message: str
    snippets: List[KnowledgeDocSnippet] = Field(default_factory=list)


# ==================== Action & Human Review Schemas ====================

class ActionReviewRequest(BaseModel):
    decision_id: str
    action: str  # APPROVED, REJECTED, MODIFIED
    modified_allocations: Optional[Dict[str, int]] = None
    reviewer_notes: Optional[str] = None
