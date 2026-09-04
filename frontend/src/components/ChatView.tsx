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
  Plus,
  Mic,
  Workflow,
  Search,
  FileText,
  Database,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatViewProps {
  user: UserProfile;
  response: OrchestratorResponse | null;
  isLoading: boolean;
  onSendMessage: (query: string) => void;
  modelConfig: AgentModelConfig;
  onOpenModelModal: (agentRole: 'sales' | 'inventory' | 'finance' | 'orchestrator') => void;
  onApprove: () => void;
  onReject: () => void;
  onSwitchToFlow: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  user,
  response,
  isLoading,
  onSendMessage,
  modelConfig,
  onOpenModelModal,
  onApprove,
  onReject,
  onSwitchToFlow,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [showThinking, setShowThinking] = useState(true);
  const [actionStatus, setActionStatus] = useState<'IDLE' | 'APPROVED' | 'REJECTED'>('IDLE');

  const promptSuggestions = [
    { title: 'Resolve P100 Viral Surge', desc: 'Simulate +70.6% demand spike on UltraGlide Mouse' },
    { title: 'Simulate +30% Marketing', desc: 'Assess stockout risk & cash burn horizon' },
    { title: 'Supplier B Net-30 Analysis', desc: 'Audit credit lines, ₹1.8L spend cap & 3d SLA' },
    { title: 'Query Sales DB ground truth', desc: 'Inspect 5,229 historical order velocity records' },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSendMessage(inputQuery);
    setInputQuery('');
    setActionStatus('IDLE');
  };

  const handleApprove = () => {
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
    setActionStatus('APPROVED');
    onApprove();
  };

  const handleReject = () => {
    setActionStatus('REJECTED');
    onReject();
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full max-w-5xl mx-auto px-4 justify-between relative select-none">
      {/* Scrollable Conversation Content Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-6 pt-4">
        {/* ================= 1. EMPTY STATE HERO (Exact Gemini Layout from Screenshot) ================= */}
        {!response && !isLoading && (
          <div className="min-h-[calc(100vh-220px)] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-300">
            {/* Center Heading matching screenshot */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Your move, {user.name}!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                NEXUS Autonomous Operations Copilot connected to {user.company} database, document racks, and mathematical integer optimizer.
              </p>
            </div>

            {/* Centered Floating Gemini Input Pill (Matching screenshot) */}
            <div className="w-full max-w-2xl">
              <form
                onSubmit={handleSend}
                className="bg-[#141824]/90 backdrop-blur-2xl border border-white/15 rounded-full p-2 pl-4 pr-3 shadow-2xl flex items-center space-x-3 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all group"
              >
                <button
                  type="button"
                  onClick={() => onSendMessage(promptSuggestions[0].title)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                  title="Prompt Actions"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask NEXUS or simulate demand (e.g. 'Handle P100 viral surge')..."
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
                />

                {/* Model Dropdown Pill in Input (Matching screenshot '● Flash ⌵') */}
                <button
                  type="button"
                  onClick={() => onOpenModelModal('orchestrator')}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Switch Active Foundation Model"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Flash</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400" />
                </button>

                <button
                  type="button"
                  onClick={() => onSendMessage('Resolve P100 Viral Demand Spike')}
                  className="p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4 text-zinc-400" />
                </button>

                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Prompt Suggestion Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full pt-2">
              {promptSuggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(item.title)}
                  className="p-3.5 rounded-2xl bg-[#141824]/60 hover:bg-[#182030] border border-white/10 hover:border-cyan-500/40 text-left transition-all group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.title}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">{item.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= 2. LOADING STATE ================= */}
        {isLoading && (
          <div className="glass-panel rounded-3xl p-6 border border-cyan-500/40 space-y-4 animate-pulse mt-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AI Orchestrator Coordinating Swarm...</div>
                <div className="text-xs text-zinc-400">Sales, Inventory, and Finance agents auditing ground-truth database</div>
              </div>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 w-3/4 animate-pulse" />
            </div>
          </div>
        )}

        {/* ================= 3. ACTIVE CONVERSATION THREAD ================= */}
        {response && !isLoading && (
          <div className="space-y-6 animate-in fade-in duration-300 pt-2">
            {/* Orchestrator Executive Response */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-cyan-500/20">
                <Zap className="w-4 h-4 fill-white" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-mono text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold text-white">AI Orchestrator Synthesis</span>
                    </div>
                    <button
                      onClick={() => onOpenModelModal('orchestrator')}
                      className="text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800 text-[10px] font-mono hover:bg-cyan-900 transition-colors"
                    >
                      Model: {modelConfig.orchestrator_model}
                    </button>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                    {response.orchestrator_summary}
                  </p>

                  <div className="flex items-center space-x-3 pt-1 text-xs">
                    <button
                      onClick={onSwitchToFlow}
                      className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 font-bold flex items-center space-x-1.5 transition-colors"
                    >
                      <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect in Agentic Swarm Studio</span>
                    </button>
                  </div>
                </div>

                {/* Gemini Thinking Accordion */}
                <div className="border border-white/10 rounded-2xl overflow-hidden glass-card shadow-xl">
                  <button
                    onClick={() => setShowThinking(!showThinking)}
                    className="w-full px-5 py-3.5 bg-white/[0.02] hover:bg-white/[0.04] flex items-center justify-between text-xs font-semibold text-zinc-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Multi-Agent Rationale & Evidence (3 Department Streams)</span>
                    </div>
                    {showThinking ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showThinking && (
                    <div className="p-4 space-y-3 bg-[#080d1a]/90 text-xs border-t border-white/5">
                      {/* Sales Agent Evidence */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-400 flex items-center space-x-1.5 font-mono">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Sales Agent Evidence</span>
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800/50">
                            {modelConfig.sales_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.sales_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Inventory Agent Evidence */}
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400 flex items-center space-x-1.5 font-mono">
                            <Package className="w-3.5 h-3.5" />
                            <span>Inventory Agent Evidence</span>
                          </span>
                          <span className="text-[10px] font-mono bg-amber-950 px-2 py-0.5 rounded text-amber-300 border border-amber-800/50">
                            {modelConfig.inventory_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.inventory_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Finance Agent Evidence */}
                      <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-400 flex items-center space-x-1.5 font-mono">
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>Finance Agent Evidence</span>
                          </span>
                          <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-800/50">
                            {modelConfig.finance_agent_model}
                          </span>
                        </div>
                        <div className="text-zinc-300 space-y-1">
                          {response.finance_evidence.rationale.map((r, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Constrained Linear Optimizer Decision Matrix */}
                <div className="glass-panel border-2 border-indigo-500/40 rounded-3xl p-6 shadow-2xl space-y-4 glow-primary">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          Optimal Purchase Order Execution Plan
                        </h4>
                        <p className="text-[11px] text-zinc-400">
                          Solved via OR-Tools Integer Linear Programming (Zero Hallucination)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 font-bold">
                      Mathematically Feasible
                    </span>
                  </div>

                  {/* Supplier Allocation Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {response.decision_output.allocation_plan.map((alloc) => (
                      <div
                        key={alloc.supplier_id}
                        className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-2 relative overflow-hidden shadow-inner"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{alloc.supplier_name}</span>
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/40">
                            {alloc.allocated_units} Units
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 font-mono pt-1">
                          <div>SLA: <span className="text-zinc-200 font-semibold">{alloc.lead_time_days} days</span></div>
                          <div>Unit Cost: <span className="text-zinc-200 font-semibold">₹{alloc.unit_cost}</span></div>
                          <div>Terms: <span className="text-indigo-300 font-semibold">{alloc.payment_terms}</span></div>
                          <div>Upfront: <span className="text-emerald-400 font-semibold">₹{alloc.upfront_cash_required.toLocaleString()}</span></div>
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
                        Liquid Upfront Impact: ₹{response.decision_output.total_upfront_cash_impact.toLocaleString()} <span className="text-zinc-500">(≤ ₹1.8L spend cap)</span>
                      </div>
                    </div>

                    {actionStatus === 'IDLE' ? (
                      <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                        <button
                          onClick={handleApprove}
                          className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition-all transform active:scale-95"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Dispatch PO</span>
                        </button>
                        <button
                          onClick={handleReject}
                          className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-zinc-400 hover:text-rose-300 text-xs font-medium transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : actionStatus === 'APPROVED' ? (
                      <div className="px-5 py-2.5 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Signed off by {user.role} ({user.name}) • Purchase Order Active</span>
                      </div>
                    ) : (
                      <div className="px-5 py-2.5 rounded-2xl bg-rose-950 border border-rose-600 text-rose-300 text-xs font-bold flex items-center space-x-2">
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

      {/* Persistent Bottom Floating Gemini Search Bar (When Thread is active) */}
      {(response || isLoading) && (
        <div className="pt-2 pb-3 sticky bottom-0 z-20">
          <form
            onSubmit={handleSend}
            className="bg-[#141824]/90 backdrop-blur-2xl border border-white/15 rounded-full p-2 pl-4 pr-3 shadow-2xl flex items-center space-x-3 focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all"
          >
            <button
              type="button"
              onClick={() => onSendMessage('Resolve P100 Viral Demand Spike')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question or issue an operational command..."
              className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
            />

            <button
              type="button"
              onClick={() => onOpenModelModal('orchestrator')}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Flash</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

