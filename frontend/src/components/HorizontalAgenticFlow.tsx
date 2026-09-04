import React, { useState } from 'react';
import {
  UserProfile,
  OrchestratorResponse,
  AgentModelConfig,
} from '../types';
import {
  User,
  Zap,
  Cpu,
  ShieldCheck,
  Play,
  TrendingUp,
  Package,
  IndianRupee,
  Sliders,
  Settings2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Sparkles,
  Activity,
  Layers,
  ArrowRight,
  HelpCircle,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HorizontalAgenticFlowProps {
  user: UserProfile;
  response: OrchestratorResponse | null;
  isLoading: boolean;
  onTriggerFlow: (surgePct: number) => void;
  onOpenModelModal: (agentRole: 'sales' | 'inventory' | 'finance' | 'orchestrator') => void;
  modelConfig: AgentModelConfig;
  onApprove: () => void;
  onReject: () => void;
}

export const HorizontalAgenticFlow: React.FC<HorizontalAgenticFlowProps> = ({
  user,
  response,
  isLoading,
  onTriggerFlow,
  onOpenModelModal,
  modelConfig,
  onApprove,
  onReject,
}) => {
  const [surgeSlider, setSurgeSlider] = useState<number>(70);
  const [actionStatus, setActionStatus] = useState<'IDLE' | 'APPROVED' | 'REJECTED'>('IDLE');
  const [selectedNode, setSelectedNode] = useState<string | null>('orchestrator');

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
    <div className="space-y-4">
      {/* Top Topology Studio Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white tracking-tight">Horizontal AI Operations Topology</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/50 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Orchestration Canvas</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400">Click any agent node to hot-swap models or inspect telemetry.</p>
          </div>
        </div>

        {/* Action Levers */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-400">Simulate Surge:</span>
            <span className="text-white font-mono font-bold">+{surgeSlider}%</span>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={surgeSlider}
              onChange={(e) => setSurgeSlider(Number(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer"
            />
          </div>

          <button
            onClick={() => onTriggerFlow(surgeSlider)}
            disabled={isLoading}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Trigger Live Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Workspace with Luxury Dot Matrix Background */}
      <div className="bg-[#050811] border border-white/10 rounded-2xl p-6 shadow-2xl relative min-h-[480px] overflow-x-auto bg-canvas-dots flex items-center">
        <div className="flex items-center justify-between space-x-4 min-w-[1150px] w-full z-10 py-6">
          {/* ================= NODE 1: CEO ORIGIN ================= */}
          <div
            onClick={() => setSelectedNode('ceo')}
            className={`w-[200px] flex-shrink-0 glass-card rounded-2xl p-4 border transition-all cursor-pointer relative group ${
              selectedNode === 'ceo' ? 'border-cyan-400 shadow-xl glow-cyan bg-cyan-950/20' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Origin Node</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="font-bold text-sm text-white">{user.name}</div>
              <div className="text-xs text-cyan-300 font-mono font-medium">Role: {user.role}</div>
              <div className="text-[10px] text-zinc-400 bg-black/40 border border-white/5 py-1 px-2 rounded-lg truncate mt-2">
                "P100 Surge +{surgeSlider}%"
              </div>
            </div>
          </div>

          {/* SVG Animated Bezier Cable 1 (CEO -> Orchestrator) */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#06b6d4"
                strokeWidth="3"
                className={isLoading ? 'flow-wire-animated' : ''}
              />
            </svg>
            <div className="absolute px-2.5 py-0.5 bg-cyan-950 border border-cyan-700/50 text-[10px] font-mono text-cyan-300 rounded-full shadow-lg">
              Goal Intent
            </div>
          </div>

          {/* ================= NODE 2: AI ORCHESTRATOR ================= */}
          <div
            onClick={() => {
              setSelectedNode('orchestrator');
              onOpenModelModal('orchestrator');
            }}
            className={`w-[210px] flex-shrink-0 glass-card rounded-2xl p-4 border transition-all cursor-pointer relative group ${
              selectedNode === 'orchestrator' ? 'border-indigo-400 shadow-xl glow-primary bg-indigo-950/20' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Coordinator</span>
              <Settings2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="font-bold text-sm text-white">AI Orchestrator</div>
              <div className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60 inline-block">
                {modelConfig.orchestrator_model}
              </div>
              <div className="text-[10px] text-zinc-400 pt-1">Async 3-way Dispatch</div>
            </div>
          </div>

          {/* SVG Animated Bezier Cable 2 (Orchestrator -> 3 Agents) */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#6366f1"
                strokeWidth="3"
                className={isLoading ? 'flow-wire-animated' : ''}
              />
            </svg>
            <div className="absolute px-2.5 py-0.5 bg-indigo-950 border border-indigo-700/50 text-[10px] font-mono text-indigo-300 rounded-full shadow-lg">
              Parallel Tasks
            </div>
          </div>

          {/* ================= NODE 3: SPECIALIZED AGENT MATRIX (Parallel 3) ================= */}
          <div className="w-[260px] flex-shrink-0 flex flex-col space-y-3">
            {/* Sales Agent Node */}
            <div
              onClick={() => {
                setSelectedNode('sales');
                onOpenModelModal('sales');
              }}
              className="glass-card rounded-xl p-3 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all hover:bg-emerald-950/20 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Sales Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700/40">
                  {modelConfig.sales_agent_model}
                </span>
              </div>
              <div className="text-[11px] font-mono flex justify-between text-zinc-300">
                <span>Surge:</span>
                <span className="text-emerald-400 font-bold">
                  +{response ? response.sales_evidence.growth_rate_pct : 70.6}%
                </span>
              </div>
            </div>

            {/* Inventory Agent Node */}
            <div
              onClick={() => {
                setSelectedNode('inventory');
                onOpenModelModal('inventory');
              }}
              className="glass-card rounded-xl p-3 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all hover:bg-amber-950/20 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-white">Inventory Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-700/40">
                  {modelConfig.inventory_agent_model}
                </span>
              </div>
              <div className="text-[11px] font-mono flex justify-between text-zinc-300">
                <span>Stockout in:</span>
                <span className="text-amber-400 font-bold">
                  {response ? response.inventory_evidence.stockout_horizon_days : 1.17} days
                </span>
              </div>
            </div>

            {/* Finance Agent Node */}
            <div
              onClick={() => {
                setSelectedNode('finance');
                onOpenModelModal('finance');
              }}
              className="glass-card rounded-xl p-3 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all hover:bg-cyan-950/20 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Finance Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-700/40">
                  {modelConfig.finance_agent_model}
                </span>
              </div>
              <div className="text-[11px] font-mono flex justify-between text-zinc-300">
                <span>Spend Cap:</span>
                <span className="text-cyan-400 font-bold">₹1.80 Lakhs</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Bezier Cable 3 (3 Agents -> Decision Engine) */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#10b981"
                strokeWidth="3"
                className={isLoading ? 'flow-wire-animated' : ''}
              />
            </svg>
            <div className="absolute px-2.5 py-0.5 bg-emerald-950 border border-emerald-700/50 text-[10px] font-mono text-emerald-300 rounded-full shadow-lg">
              Structured Evidence
            </div>
          </div>

          {/* ================= NODE 4: CONSTRAINED OPTIMIZATION ENGINE ================= */}
          <div
            onClick={() => setSelectedNode('decision_engine')}
            className={`w-[210px] flex-shrink-0 glass-card rounded-2xl p-4 border transition-all cursor-pointer relative group ${
              selectedNode === 'decision_engine' ? 'border-emerald-400 shadow-xl glow-emerald bg-emerald-950/20' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Mathematical Core</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="font-bold text-sm text-white">Decision Engine</div>
              <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60 inline-block">
                OR-Tools Solver
              </div>
              <div className="text-[10px] text-zinc-400 pt-1">Zero Hallucinations</div>
            </div>
          </div>

          {/* SVG Animated Bezier Cable 4 (Engine -> Action Proposal) */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#38bdf8"
                strokeWidth="3"
                className={isLoading ? 'flow-wire-animated' : ''}
              />
            </svg>
            <div className="absolute px-2.5 py-0.5 bg-blue-950 border border-blue-700/50 text-[10px] font-mono text-blue-300 rounded-full shadow-lg">
              Optimal PO
            </div>
          </div>

          {/* ================= NODE 5: HUMAN-IN-THE-LOOP ACTION PROPOSAL ================= */}
          <div className="w-[260px] flex-shrink-0 glass-panel border-2 border-indigo-500/50 rounded-2xl p-4 shadow-2xl space-y-3 glow-primary">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Executive Proposal</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-mono">
                Feasible
              </span>
            </div>

            <div className="space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs font-mono">
              <div className="text-zinc-300 font-medium">Split PO Recommendation:</div>
              <div className="text-emerald-400 text-[11px]">⚡ 400u (QuickLogix, Net-30)</div>
              <div className="text-cyan-400 text-[11px]">📦 445u (Zenith Direct)</div>
              <div className="text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                Upfront: ₹97.1K ≤ ₹1.8L cap
              </div>
            </div>

            {actionStatus === 'IDLE' ? (
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={handleApprove}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-1 transition-all transform active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve PO</span>
                </button>
                <button
                  onClick={handleReject}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-zinc-400 hover:text-rose-300 text-xs font-medium transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : actionStatus === 'APPROVED' ? (
              <div className="py-2.5 bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-center rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PO Dispatched & Ledger Updated</span>
              </div>
            ) : (
              <div className="py-2.5 bg-rose-950/90 border border-rose-600 text-rose-300 text-center rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-lg">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Proposal Rejected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
