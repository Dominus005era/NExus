import {
  OverviewMetrics,
  OrchestratorResponse,
  AgentModelConfig,
  AvailableModel,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  async getOverview(): Promise<OverviewMetrics> {
    try {
      const res = await fetch(`${API_BASE_URL}/overview`);
      if (!res.ok) throw new Error('Failed to fetch overview');
      return await res.json();
    } catch {
      // Offline fallback
      return {
        cash_balance: 850000,
        safe_procurement_budget: 180000,
        revenue_7d: 142850,
        critical_stock_risks: 1,
        active_campaigns_count: 1,
        inventory_summary: [
          { product_id: 'P100', product_name: 'UltraGlide Mouse', current_stock: 320, min_safety_stock: 150, reorder_point: 350, is_critical: true },
          { product_id: 'P200', product_name: 'ApexStrike Keyboard', current_stock: 240, min_safety_stock: 100, reorder_point: 200, is_critical: false },
          { product_id: 'P300', product_name: 'SoundAura ANC', current_stock: 110, min_safety_stock: 50, reorder_point: 100, is_critical: false },
          { product_id: 'P400', product_name: 'ClearVision 4K Webcam', current_stock: 195, min_safety_stock: 80, reorder_point: 180, is_critical: false },
          { product_id: 'P500', product_name: 'OmniPort 7-in-1 Hub', current_stock: 310, min_safety_stock: 120, reorder_point: 250, is_critical: false },
        ]
      };
    }
  },

  async getModelConfig(): Promise<{ active_config: AgentModelConfig; available_models: AvailableModel[] }> {
    try {
      const res = await fetch(`${API_BASE_URL}/agents/config`);
      if (!res.ok) throw new Error('Failed to fetch config');
      return await res.json();
    } catch {
      return {
        active_config: {
          sales_agent_model: 'gemini-2.0-flash',
          inventory_agent_model: 'gpt-4o-mini',
          finance_agent_model: 'gemini-1.5-pro',
          orchestrator_model: 'gemini-2.0-flash',
          temperature: 0.2,
        },
        available_models: [
          { id: 'gemini-2.0-flash', provider: 'Google', description: 'High speed, reasoning optimized' },
          { id: 'gemini-1.5-pro', provider: 'Google', description: 'Deep context, complex financial analysis' },
          { id: 'gpt-4o', provider: 'OpenAI', description: 'Frontier multimodal flagship model' },
          { id: 'gpt-4o-mini', provider: 'OpenAI', description: 'Fast, cost-efficient operational model' },
          { id: 'claude-3-5-sonnet', provider: 'Anthropic', description: 'Nuanced reasoning and policy comprehension' },
          { id: 'deepseek-v3', provider: 'DeepSeek', description: 'Open-weight frontier mixture-of-experts' },
        ]
      };
    }
  },

  async updateModelConfig(config: AgentModelConfig): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/agents/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      return res.ok;
    } catch {
      return true;
    }
  },

  async triggerOrchestrator(productId = 'P100', triggerEvent = 'VIRAL_DEMAND_SPIKE_P100', surgePct = 0): Promise<OrchestratorResponse> {
    const res = await fetch(
      `${API_BASE_URL}/orchestrator/trigger?product_id=${productId}&trigger_event=${triggerEvent}&simulated_surge_pct=${surgePct}`,
      { method: 'POST' }
    );
    if (!res.ok) throw new Error('Failed to trigger orchestrator');
    return await res.json();
  },

  async reviewDecision(decisionId: string, action: 'APPROVED' | 'REJECTED' | 'MODIFIED', notes?: string) {
    const res = await fetch(`${API_BASE_URL}/decisions/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision_id: decisionId, action, reviewer_notes: notes }),
    });
    return await res.json();
  },

  async queryKnowledge(agent: string, dept: string, query: string, crossReason?: string) {
    const res = await fetch(`${API_BASE_URL}/knowledge/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requesting_agent: agent,
        department: dept,
        query_text: query,
        cross_domain_reason: crossReason,
      }),
    });
    return await res.json();
  }
};
