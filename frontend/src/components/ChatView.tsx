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
  ShieldCheck,
  RefreshCw,
  Sliders,
  ArrowRight,
  Bot,
  User,
  Zap,
  Clock,
  Layers,
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
    { title: 'Resolve P100 Surge', desc: 'Demand spike +70.6% on UltraGlide Mouse' },
    { title: 'Simulate +30% Marketing', desc: 'Assess stockout risk & cash burn' },
    { title: 'Supplier B Net-30 Analysis', desc: 'Audit credit limits & 3-day SLA' },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSendMessage(inputQuery);
    setInputQuery('');
    setActionStatus('IDLE');
  };

  const handleApprove = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setActionStatus('APPROVED');
    onApprove();
  };

  const handleReject = () => {
    setActionStatus('REJECTED');
    onReject();
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-68px)] max-w-4xl mx-auto w-full px-4 py-3 justify-between">
      {/* Scrollable Chat Message Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-6">
        {/* Welcome Greeting Box (if no response yet or initial state) */}
        <div className="pt-6 pb-2 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[1px] mx-auto shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[15px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How can I assist your operations, {user.name}?
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Autonomous multi-agent orchestration connected to {user.company} database, document racks, and mathematical decision solver.
          </p>

          {/* Quick Prompt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 max-w-2xl mx-auto">
            {promptSuggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(item.title)}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-indigo-500/40 text-left transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200 group-hover:text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.title}</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1 line-clamp-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="glass-panel rounded-2xl p-5 border border-indigo-500/30 space-y-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">AI Orchestrator Dispatched 3 Agents</div>
                <div className="text-[11px] text-zinc-400">Querying Sales, Inventory, and Finance in parallel...</div>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* Response Message Thread */}
        {response && !isLoading && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Assistant Executive Rationale */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] font-mono text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-semibold text-zinc-200">AI Orchestrator Synthesis</span>
                    </div>
                    <span className="text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                      Model: {modelConfig.orchestrator_model}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                    {response.orchestrator_summary}
                  </p>
                </div>

                {/* Gemini-Style Expandable Thinking Accordion */}
                <div className="border border-white/10 rounded-2xl overflow-hidden glass-card shadow-lg">
                  <button
                    onClick={() => setShowThinking(!showThinking)}
                    className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] flex items-center justify-between text-xs font-semibold text-zinc-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Multi-Agent Evidence & Local Reasoning (3 Department Streams)</span>
                    </div>
                    {showThinking ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showThinking && (
                    <div className="p-4 space-y-3 bg-[#080d1a]/80 text-xs border-t border-white/5">
                      {/* Sales Agent Card */}
                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-400 flex items-center space-x-1.5 font-mono">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Sales Agent</span>
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800/50">
                            Engine: {modelConfig.sales_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.sales_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5">
                              <span className="text-emerald-400">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Inventory Agent Card */}
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400 flex items-center space-x-1.5 font-mono">
                            <Package className="w-3.5 h-3.5" />
                            <span>Inventory Agent</span>
                          </span>
                          <span className="text-[10px] font-mono bg-amber-950 px-2 py-0.5 rounded text-amber-300 border border-amber-800/50">
                            Engine: {modelConfig.inventory_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.inventory_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5">
                              <span className="text-amber-400">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Finance Agent Card */}
                      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-400 flex items-center space-x-1.5 font-mono">
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>Finance Agent</span>
                          </span>
                          <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-800/50">
                            Engine: {modelConfig.finance_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.finance_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5">
                              <span className="text-cyan-400">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Executive Decision Matrix Card */}
                <div className="glass-panel border-2 border-indigo-500/40 rounded-2xl p-5 shadow-2xl space-y-4 glow-primary">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          Optimal Purchase Order Recommendation
                        </h4>
                        <p className="text-[11px] text-zinc-400">Constrained Integer Optimization Solver (Zero Hallucination)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/60 font-semibold">
                      Mathematically Feasible
                    </span>
                  </div>

                  {/* Supplier Allocations Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {response.decision_output.allocation_plan.map((alloc) => (
                      <div
                        key={alloc.supplier_id}
                        className="bg-black/40 border border-white/10 rounded-xl p-3.5 space-y-2 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{alloc.supplier_name}</span>
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                            {alloc.allocated_units} Units
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 font-mono">
                          <div>SLA: <span className="text-zinc-200">{alloc.lead_time_days} days</span></div>
                          <div>Cost: <span className="text-zinc-200">₹{alloc.unit_cost}/u</span></div>
                          <div>Terms: <span className="text-indigo-300">{alloc.payment_terms}</span></div>
                          <div>Upfront: <span className="text-emerald-400">₹{alloc.upfront_cash_required.toLocaleString()}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financial Metrics Summary & Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/10 gap-4">
                    <div className="text-xs space-y-1 w-full sm:w-auto font-mono">
                      <div className="text-zinc-400">
                        Total Procurement: <span className="text-white font-bold">₹{response.decision_output.total_procurement_cost.toLocaleString()}</span>
                      </div>
                      <div className="text-emerald-400 font-semibold">
                        Liquid Upfront Impact: ₹{response.decision_output.total_upfront_cash_impact.toLocaleString()} <span className="text-zinc-500">(≤ ₹1.8L budget ceiling)</span>
                      </div>
                    </div>

                    {actionStatus === 'IDLE' ? (
                      <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                        <button
                          onClick={handleApprove}
                          className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition-all transform active:scale-95"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Dispatch PO</span>
                        </button>
                        <button
                          onClick={handleReject}
                          className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-zinc-400 hover:text-rose-300 text-xs font-medium transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : actionStatus === 'APPROVED' ? (
                      <div className="px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Signed off by {user.role} ({user.name}) • Purchase Order Active</span>
                      </div>
                    ) : (
                      <div className="px-5 py-2.5 rounded-xl bg-rose-950 border border-rose-600 text-rose-300 text-xs font-semibold flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Proposal Rejected by {user.role}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Pill Input Box (ChatGPT/Claude/Gemini Style) */}
      <div className="pt-2 sticky bottom-0 z-20">
        <form
          onSubmit={handleSend}
          className="glass-panel p-1.5 rounded-2xl border border-white/10 shadow-2xl flex items-center space-x-2 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all bg-[#090e1a]/90 backdrop-blur-2xl"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question or issue an operational command (e.g. 'Handle P100 viral demand spike')..."
            className="flex-1 px-4 py-3 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
