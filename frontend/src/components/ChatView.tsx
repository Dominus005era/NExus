import React, { useState } from 'react';
import { UserProfile, OrchestratorResponse, AgentModelConfig } from '../types';
import {
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Package,
  IndianRupee,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatViewProps {
  user: UserProfile;
  response: OrchestratorResponse | null;
  isLoading: boolean;
  onSendMessage: (query: string) => void;
  modelConfig: AgentModelConfig;
  onApprove: () => void;
  onReject: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  user,
  response,
  isLoading,
  onSendMessage,
  modelConfig,
  onApprove,
  onReject,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [showThinking, setShowThinking] = useState(true);
  const [actionStatus, setActionStatus] = useState<'IDLE' | 'APPROVED' | 'REJECTED'>('IDLE');

  const promptSuggestions = [
    'Resolve viral demand surge on Product P100 (UltraGlide Mouse)',
    'Simulate +30% marketing spend impact on inventory and cash runway',
    'Audit Supplier B QuickLogix payment terms and capacity limits',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSendMessage(inputQuery);
    setInputQuery('');
    setActionStatus('IDLE');
  };

  const handleApprove = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setActionStatus('APPROVED');
    onApprove();
  };

  const handleReject = () => {
    setActionStatus('REJECTED');
    onReject();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Personalized Welcome Banner */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono uppercase text-blue-400 tracking-wider font-semibold">
            Autonomous Business Copilot
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Welcome back, {user.name} ({user.role})
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {user.company} operations orchestrator active. How would you like to direct the business today?
        </p>

        {/* Prompt Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-left flex items-center space-x-1.5"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Response Box with Thinking Accordion & Decision Proposal */}
      {response && (
        <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Executive Summary Message */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Orchestrator Model:</span>
              <span className="text-blue-400 font-bold">{modelConfig.orchestrator_model}</span>
            </div>
            <p className="text-base text-slate-200 leading-relaxed font-normal bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {response.orchestrator_summary}
            </p>
          </div>

          {/* Expandable Thinking Process Accordion */}
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/60">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="w-full px-4 py-3 bg-slate-900/70 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Multi-Agent Reasoning & Evidence Trace (3 Specialized Streams)</span>
              </div>
              {showThinking ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showThinking && (
              <div className="p-4 space-y-4 text-xs">
                {/* 1. Sales Agent Stream */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-emerald-900/40 space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Sales Agent ({modelConfig.sales_agent_model})</span>
                    </span>
                    <span className="text-slate-400">Confidence: 92%</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {response.sales_evidence.rationale.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Inventory Agent Stream */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-amber-900/40 space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                      <Package className="w-3.5 h-3.5" />
                      <span>Inventory Agent ({modelConfig.inventory_agent_model})</span>
                    </span>
                    <span className="text-amber-400 font-bold">Urgency: {response.inventory_evidence.urgency_level}</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {response.inventory_evidence.rationale.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* 3. Finance Agent Stream */}
                <div className="p-3 rounded-lg bg-slate-900/60 border border-blue-900/40 space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-blue-400 flex items-center space-x-1.5">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Finance Agent ({modelConfig.finance_agent_model})</span>
                    </span>
                    <span className="text-blue-400 font-bold">Budget Cap: ₹1.80L</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {response.finance_evidence.rationale.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Decision Engine Action Proposal Card */}
          <div className="bg-gradient-to-br from-[#0e172e] to-[#0d121f] border-2 border-blue-500/50 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Recommended Purchase Order (Decision Engine Solver)
                </h4>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                Feasibility: Optimal
              </span>
            </div>

            {/* Split Allocations Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {response.decision_output.allocation_plan.map((alloc) => (
                <div key={alloc.supplier_id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-white">
                    <span>{alloc.supplier_name}</span>
                    <span className="text-emerald-400 font-mono">{alloc.allocated_units} Units</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Delivery SLA: {alloc.lead_time_days} days</span>
                    <span className="font-mono text-slate-300">₹{alloc.unit_cost}/unit</span>
                  </div>
                  <div className="text-[11px] text-indigo-400 font-mono flex justify-between">
                    <span>Terms: {alloc.payment_terms}</span>
                    <span>Upfront: ₹{alloc.upfront_cash_required.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Metrics & Action Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-800 gap-3">
              <div className="text-xs text-slate-400 space-y-0.5">
                <div>
                  Total Cost: <span className="text-white font-mono font-bold">₹{response.decision_output.total_procurement_cost.toLocaleString()}</span>
                </div>
                <div>
                  Upfront Cash: <span className="text-emerald-400 font-mono font-bold">₹{response.decision_output.total_upfront_cash_impact.toLocaleString()}</span> (Safe within ₹1.8L cap)
                </div>
              </div>

              {actionStatus === 'IDLE' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleApprove}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Purchase Order</span>
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300 text-xs font-medium transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              ) : actionStatus === 'APPROVED' ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Approved by CEO ({user.name}) • Purchase Order Dispatched</span>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-rose-950 border border-rose-700 text-rose-300 text-xs font-semibold flex items-center space-x-1.5">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Proposal Rejected by CEO ({user.name})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input Message Form */}
      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask a question or issue an operational command (e.g. 'How do we handle the P100 demand spike?')..."
          className="w-full pl-5 pr-28 py-4 bg-[#0e1424] border border-slate-800 rounded-2xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xl transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="absolute right-2.5 top-2.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all flex items-center space-x-1.5 disabled:opacity-40"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
          ) : (
            <>
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
