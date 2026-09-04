export interface UserProfile {
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
}

export interface SupplierAllocation {
  supplier_id: string;
  supplier_name: string;
  allocated_units: number;
  unit_cost: number;
  total_cost: number;
  upfront_cash_required: number;
  lead_time_days: number;
  payment_terms: string;
}

export interface DecisionEngineOutput {
  decision_id: string;
  product_id: string;
  timestamp: string;
  trigger_event: string;
  total_recommended_units: number;
  unmet_deficit_units: number;
  total_procurement_cost: number;
  total_upfront_cash_impact: number;
  expected_revenue: number;
  expected_net_margin: number;
  stockout_risk_post_action: number;
  allocation_plan: SupplierAllocation[];
  mathematical_feasibility: boolean;
  optimization_explanation: string;
  tradeoffs_identified: string[];
}

export interface SalesEvidence {
  agent: string;
  product_id: string;
  historical_daily_avg: number;
  current_daily_velocity: number;
  forecast_7d_total: number;
  forecast_confidence: number;
  growth_rate_pct: number;
  active_campaign?: string;
  rationale: string[];
}

export interface InventoryEvidence {
  agent: string;
  product_id: string;
  current_stock: number;
  safety_stock: number;
  reorder_point: number;
  daily_burn_rate: number;
  stockout_horizon_days: number;
  stockout_risk_score: number;
  recommended_reorder_qty: number;
  urgency_level: string;
  rationale: string[];
}

export interface FinanceEvidence {
  agent: string;
  total_cash_balance: number;
  statutory_buffer: number;
  unallocated_free_cash: number;
  max_procurement_budget: number;
  accounts_payable: number;
  accounts_receivable: number;
  preferred_payment_terms: string;
  rationale: string[];
}

export interface OrchestratorResponse {
  event_id: string;
  trigger_event: string;
  product_id: string;
  timestamp: string;
  active_models_used: Record<string, string>;
  sales_evidence: SalesEvidence;
  inventory_evidence: InventoryEvidence;
  finance_evidence: FinanceEvidence;
  decision_output: DecisionEngineOutput;
  orchestrator_summary: string;
}

export interface AgentModelConfig {
  sales_agent_model: string;
  inventory_agent_model: string;
  finance_agent_model: string;
  orchestrator_model: string;
  temperature: number;
}

export interface AvailableModel {
  id: string;
  provider: string;
  description: string;
}

export interface TimelineLogItem {
  id: string;
  timestamp: string;
  nodeName: string;
  action: string;
  details: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  modelUsed?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  query: string;
  response: OrchestratorResponse | null;
  timelineLogs: TimelineLogItem[];
  timestamp: string;
  createdAt: number;
}

export interface OverviewMetrics {
  cash_balance: number;
  safe_procurement_budget: number;
  revenue_7d: number;
  critical_stock_risks: number;
  active_campaigns_count: number;
  inventory_summary: Array<{
    product_id: string;
    product_name: string;
    current_stock: number;
    min_safety_stock: number;
    reorder_point: number;
    is_critical: boolean;
  }>;
}
