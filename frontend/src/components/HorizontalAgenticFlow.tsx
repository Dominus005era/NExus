import React, { useState } from 'react';
import {
  UserProfile,
  OrchestratorResponse,
  AgentModelConfig,
  AvailableModel,
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

  const handleApproveClick = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setActionStatus('APPROVED');
    onApprove();
  };

  const handleRejectClick = () => {
    setActionStatus('REJECTED');
    onReject();
  };

  return (
    <div className="space-y-6">
      {/* Interactive Controls & Scenario Bar */}
      <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Live Horizontal Multi-Agent Pipeline</span>
              <span className="text-xs font-mono font-normal text-blue-400 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800">
                Left ⟷ Right Flow
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Click any agent box to hot-swap its underlying LLM model in real time.
          </p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Demand Surge:</span>
            <span className="text-white font-bold font-mono">+{surgeSlider}%</span>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={surgeSlider}
              onChange={(e) => setSurgeSlider(Number(e.target.value))}
              className="w-24 accent-blue-500 cursor-pointer"
            />
          </div>

          <button
            onClick={() => onTriggerFlow(surgeSlider)}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Horizontal Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Horizontal Visual Canvas */}
      <div className="bg-[#0a0e1a] border border-slate-800/90 rounded-2xl p-6 shadow-2xl overflow-x-auto relative min-h-[460px] flex items-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="flex items-center justify-between space-x-4 min-w-[1050px] w-full z-10 py-6">
          {/* ================= NODE 1: CEO / USER (Rahul) ================= */}
          <div className="w-[180px] flex-shrink-0 bg-[#0e1424] border-2 border-blue-500/50 rounded-2xl p-4 shadow-xl text-center space-y-2 relative group hover:border-blue-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">Origin Node</div>
            <div className="font-bold text-sm text-white">{user.name}</div>
            <div className="text-xs text-blue-300 font-mono">Role: {user.role}</div>
            <div className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 rounded py-1 px-1.5 font-mono">
              "P100 Spike +{surgeSlider}%"
            </div>
          </div>

          {/* CABLE 1: CEO -> Orchestrator */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="#1e293b" strokeWidth="3" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#60a5fa"
                strokeWidth="3"
                className={isLoading ? 'flow-cable-active' : ''}
              />
            </svg>
            <div className="absolute px-2 py-0.5 bg-blue-950/90 border border-blue-800 text-[10px] font-mono text-blue-400 rounded-full">
              Intent
            </div>
          </div>

          {/* ================= NODE 2: AI ORCHESTRATOR ================= */}
          <div
            onClick={() => onOpenModelModal('orchestrator')}
            className="w-[190px] flex-shrink-0 bg-[#0e1424] border-2 border-indigo-500/50 rounded-2xl p-4 shadow-xl text-center space-y-2 relative group hover:border-indigo-400 cursor-pointer transition-all"
          >
            <div className="absolute top-2 right-2 text-slate-500 group-hover:text-indigo-400 transition-colors">
              <Settings2 className="w-3.5 h-3.5" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">Coordinator</div>
            <div className="font-bold text-sm text-white">AI Orchestrator</div>
            <div className="text-[10px] bg-indigo-950/80 border border-indigo-800 text-indigo-300 rounded py-0.5 px-2 font-mono">
              {modelConfig.orchestrator_model}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Async 3-way Dispatch</div>
          </div>

          {/* CABLE 2: Orchestrator -> Multi-Agents */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="#1e293b" strokeWidth="3" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#a855f7"
                strokeWidth="3"
                className={isLoading ? 'flow-cable-active' : ''}
              />
            </svg>
            <div className="absolute px-2 py-0.5 bg-purple-950/90 border border-purple-800 text-[10px] font-mono text-purple-300 rounded-full">
              Parallel
            </div>
          </div>

          {/* ================= NODE 3: SPECIALIZED AGENT STACK (Parallel 3) ================= */}
          <div className="w-[240px] flex-shrink-0 flex flex-col space-y-3">
            {/* Sales Agent Box */}
            <div
              onClick={() => onOpenModelModal('sales')}
              className="bg-[#0e1424] border border-emerald-500/40 hover:border-emerald-400 rounded-xl p-3 shadow-md space-y-1 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Sales Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 py-0.2 rounded">
                  {modelConfig.sales_agent_model}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex justify-between font-mono">
                <span>Demand Surge:</span>
                <span className="text-emerald-400 font-bold">
                  +{response ? response.sales_evidence.growth_rate_pct : 70.6}%
                </span>
              </div>
            </div>

            {/* Inventory Agent Box */}
            <div
              onClick={() => onOpenModelModal('inventory')}
              className="bg-[#0e1424] border border-amber-500/40 hover:border-amber-400 rounded-xl p-3 shadow-md space-y-1 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-white">Inventory Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-amber-950 border border-amber-800 text-amber-300 px-1.5 py-0.2 rounded">
                  {modelConfig.inventory_agent_model}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex justify-between font-mono">
                <span>Depletion in:</span>
                <span className="text-amber-400 font-bold">
                  {response ? response.inventory_evidence.stockout_horizon_days : 1.17} days
                </span>
              </div>
            </div>

            {/* Finance Agent Box */}
            <div
              onClick={() => onOpenModelModal('finance')}
              className="bg-[#0e1424] border border-blue-500/40 hover:border-blue-400 rounded-xl p-3 shadow-md space-y-1 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-bold text-white">Finance Agent</span>
                </div>
                <span className="text-[9px] font-mono bg-blue-950 border border-blue-800 text-blue-300 px-1.5 py-0.2 rounded">
                  {modelConfig.finance_agent_model}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex justify-between font-mono">
                <span>Safe Spend Cap:</span>
                <span className="text-blue-400 font-bold">₹1.80 Lakhs</span>
              </div>
            </div>
          </div>

          {/* CABLE 3: Multi-Agents -> Decision Engine */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="#1e293b" strokeWidth="3" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#22c55e"
                strokeWidth="3"
                className={isLoading ? 'flow-cable-active' : ''}
              />
            </svg>
            <div className="absolute px-2 py-0.5 bg-emerald-950/90 border border-emerald-800 text-[10px] font-mono text-emerald-400 rounded-full">
              Pydantic JSON
            </div>
          </div>

          {/* ================= NODE 4: CONSTRAINED DECISION ENGINE ================= */}
          <div className="w-[190px] flex-shrink-0 bg-[#0e1424] border-2 border-emerald-500/50 rounded-2xl p-4 shadow-xl text-center space-y-2 relative group hover:border-emerald-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">Math Core</div>
            <div className="font-bold text-sm text-white">Decision Engine</div>
            <div className="text-[10px] bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded py-0.5 px-2 font-mono">
              OR-Tools Solver
            </div>
            <div className="text-[10px] text-slate-400">Zero Hallucinations</div>
          </div>

          {/* CABLE 4: Decision Engine -> Action Proposal */}
          <div className="flex-1 flex items-center justify-center relative px-2">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line x1="0" y1="16" x2="100%" y2="16" stroke="#1e293b" strokeWidth="3" />
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke="#38bdf8"
                strokeWidth="3"
                className={isLoading ? 'flow-cable-active' : ''}
              />
            </svg>
            <div className="absolute px-2 py-0.5 bg-blue-950/90 border border-blue-800 text-[10px] font-mono text-blue-300 rounded-full">
              Optimal PO
            </div>
          </div>

          {/* ================= NODE 5: HUMAN-IN-THE-LOOP ACTION CARD ================= */}
          <div className="w-[240px] flex-shrink-0 bg-gradient-to-b from-slate-900 to-[#0e1424] border-2 border-blue-500/60 rounded-2xl p-4 shadow-2xl space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Executive Sign-Off</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                Feasible
              </span>
            </div>

            <div className="space-y-1.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-xs">
              <div className="text-slate-300 font-medium">Split Allocation:</div>
              <div className="text-emerald-400 font-mono text-[11px]">⚡ 400 Units (QuickLogix, Net-30)</div>
              <div className="text-blue-400 font-mono text-[11px]">📦 445 Units (Zenith Direct)</div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                Upfront: ₹97.1K ≤ ₹1.8L budget
              </div>
            </div>

            {actionStatus === 'IDLE' ? (
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={handleApproveClick}
                  className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={handleRejectClick}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 font-medium text-xs transition-all flex items-center justify-center"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : actionStatus === 'APPROVED' ? (
              <div className="py-2 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-center rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PO Issued & PO Ledger Updated</span>
              </div>
            ) : (
              <div className="py-2 bg-rose-950/80 border border-rose-700 text-rose-300 text-center rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5">
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
