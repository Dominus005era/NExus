import React, { useState, useRef } from 'react';
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
  TrendingUp,
  Package,
  IndianRupee,
  RefreshCw,
  Sparkles,
  Activity,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Search,
  Filter,
  Layers,
  Check,
  Trophy,
  ArrowRight,
  Eye,
  Bot,
  Database,
  FileText,
  Workflow,
  Share2,
  Star,
  ChevronUp,
  ChevronDown,
  Terminal,
  Clock,
  Home,
  Plus,
  Compass,
  Sliders,
  CheckCircle2,
  XCircle,
  Copy,
  Brain,
  Send,
  MessageSquare,
  Truck,
  Cloud,
  Code2,
  HelpCircle,
  Bell,
  Play,
  Rocket,
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
  const [zoom, setZoom] = useState<number>(0.88);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showLogsDrawer, setShowLogsDrawer] = useState<boolean>(false);
  const [actionStatus, setActionStatus] = useState<'IDLE' | 'APPROVED' | 'REJECTED'>('IDLE');
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.canvas-node') || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.05 : -0.05;
      setZoom((prev) => Math.min(1.4, Math.max(0.4, prev + zoomFactor)));
    }
  };

  const handleApprove = () => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    setActionStatus('APPROVED');
    onApprove();
  };

  const handleReject = () => {
    setActionStatus('REJECTED');
    onReject();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-[calc(100vh-3.5rem)] overflow-hidden bg-[#0c0d10] font-sans select-none relative">
      {/* ================= CANVAS TOP FLOATING TOOLBARS (Exact Match to Stitch Screen 4) ================= */}
      {/* Top-Left Action Pill */}
      <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-[#1E1F20]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-semibold text-white uppercase tracking-wide">
            Cluster Swarm: Running
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#C4C7C5]">
          <button
            onClick={() => onTriggerFlow(surgeSlider)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-[#282A2C] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#A8C7FA]">add_box</span>
            <span>Add Agent</span>
          </button>
          <button
            onClick={() => onOpenModelModal('orchestrator')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-[#282A2C] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#B2C5FF]">link</span>
            <span>Connect Tool</span>
          </button>
          <button
            onClick={() => {
              setZoom(0.88);
              setPan({ x: 0, y: 0 });
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-[#282A2C] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#747775]">auto_fix_high</span>
            <span>Auto Layout</span>
          </button>
        </div>
      </div>

      {/* Top-Right Telemetry HUD */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-3 bg-[#1E1F20]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl font-mono text-xs">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#A8C7FA] text-base">speed</span>
          <span className="text-[#747775]">Latency:</span>
          <span className="text-emerald-400 font-medium">142ms</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#B2C5FF] text-base">memory</span>
          <span className="text-[#747775]">Tokens/s:</span>
          <span className="text-white font-medium">384 tok/s</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#A8C7FA] text-base">dataset</span>
          <span className="text-[#747775]">Context:</span>
          <span className="text-[#A8C7FA] font-medium">64k</span>
        </div>
      </div>

      {/* Center Panning Hint Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden lg:flex items-center gap-2 px-3.5 py-1 bg-[#202020]/80 backdrop-blur-md border border-white/10 rounded-full text-[#747775] text-[11px] font-mono">
        <span className="material-symbols-outlined text-xs text-[#A8C7FA]">drag_pan</span>
        <span>Click and drag to pan canvas • Scroll horizontally/vertically or use Zoom controls</span>
      </div>

      {/* Top Demand Surge Simulator Bar */}
      <div className="absolute top-16 left-6 z-20 bg-[#1E1F20]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <Sliders className="w-3.5 h-3.5 text-[#A8C7FA]" />
          <span>Simulate Surge:</span>
        </div>
        <input
          type="range"
          min="10"
          max="150"
          step="5"
          value={surgeSlider}
          onChange={(e) => setSurgeSlider(Number(e.target.value))}
          className="w-28 accent-[#A8C7FA] cursor-pointer"
        />
        <span className="font-mono text-[#A8C7FA] text-xs font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
          +{surgeSlider}%
        </span>
        <button
          onClick={() => onTriggerFlow(surgeSlider)}
          disabled={isLoading}
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
          <span>Simulate</span>
        </button>
      </div>

      {/* ================= 2D CANVAS VIEWPORT (Matching Stitch Screen 4) ================= */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full overflow-x-auto overflow-y-auto cursor-${
          isDragging ? 'grabbing' : 'grab'
        } relative`}
        id="canvas-scroller"
        style={{
          backgroundImage: 'radial-gradient(#1f293d 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="relative w-[3450px] min-h-[920px] pb-36 pt-24 px-10 origin-top-left transition-transform duration-75"
          id="canvas-stage"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* SVG Connectors Layer (Complete Horizontal LTR Flow from Stitch) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            id="canvas-svg"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.22))' }}
          >
            <defs>
              <linearGradient id="grad-h-cyan" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-h-purple" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-h-amber" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-h-violet" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-loop-feedback" x1="100%" x2="0%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#a7cbe3" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Stage 1 -> Stage 2 (USER to React Dashboard & FastAPI) */}
            <path className="flow-wire-animated" d="M 276 360 C 310 360, 310 240, 350 240" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <path className="flow-wire-animated" d="M 276 360 C 310 360, 310 470, 350 470" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Stage 2 -> Stage 3 (React Dashboard & FastAPI to AI ORCHESTRATOR) */}
            <path d="M 640 240 C 685 240, 685 360, 730 360" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <path d="M 640 470 C 685 470, 685 360, 730 360" fill="none" stroke="#2dd4bf" strokeWidth="2.5" />

            {/* Stage 3 -> Stage 4 (Orchestrator to 3 Branched Swarm Agents) */}
            <path className="flow-wire-animated" d="M 1130 290 C 1170 290, 1170 170, 1220 170" fill="none" stroke="url(#grad-h-cyan)" strokeWidth="2.5" />
            <path className="flow-wire-animated" d="M 1130 360 L 1220 360" fill="none" stroke="#818cf8" strokeWidth="2.5" />
            <path className="flow-wire-animated" d="M 1130 430 C 1170 430, 1170 550, 1220 550" fill="none" stroke="url(#grad-h-cyan)" strokeWidth="2.5" />

            {/* Stage 4 -> Stage 5 (3 Branched Agents to SHARED STATE) */}
            <path d="M 1530 170 C 1575 170, 1575 360, 1620 360" fill="none" stroke="url(#grad-h-purple)" strokeWidth="2.5" />
            <path d="M 1530 360 L 1620 360" fill="none" stroke="#34d399" strokeWidth="2.5" />
            <path d="M 1530 550 C 1575 550, 1575 360, 1620 360" fill="none" stroke="url(#grad-h-purple)" strokeWidth="2.5" />

            {/* Stage 5 -> Stage 6 (SHARED STATE to DECISION ENGINE) */}
            <path className="flow-wire-animated" d="M 1910 360 L 1960 360" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Stage 6 -> Stage 7 & 8 (DECISION ENGINE to LLM EXPLANATION and HUMAN APPROVAL) */}
            <path d="M 2260 320 C 2285 320, 2285 220, 2310 220" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <path className="flow-wire-animated" d="M 2260 400 C 2285 400, 2285 460, 2310 460" fill="none" stroke="url(#grad-h-amber)" strokeWidth="2.5" />

            {/* Stage 7 & 8 -> Stage 9 (LLM Explanation & Approval -> ACTION & OUTCOME) */}
            <path d="M 2630 220 C 2655 220, 2655 270, 2680 270" fill="none" stroke="#818cf8" strokeDasharray="4,4" strokeWidth="2" />
            <path className="flow-wire-animated" d="M 2630 460 C 2655 460, 2655 370, 2680 370" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            {/* Stage 9 -> Stage 10 (ACTION / OUTCOME to AI MEMORY) */}
            <path className="flow-wire-animated" d="M 3000 370 L 3050 370" fill="none" stroke="url(#grad-h-violet)" strokeWidth="2.5" />

            {/* Stage 10 Continuous Feedback Loop back to Stage 3 Orchestrator */}
            <path d="M 3200 480 C 3200 770, 930 770, 930 520" fill="none" opacity="0.75" stroke="url(#grad-loop-feedback)" strokeWidth="2.5" strokeDasharray="6,6" />
          </svg>

          {/* ================= STAGE 1: USER / CEO INPUT ================= */}
          <div className="canvas-node absolute left-10 top-[295px] w-64 z-10 bg-[#1E1F20]/95 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl hover:border-[#A8C7FA] transition-all group cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">{user.name} ({user.role})</h4>
                  <span className="text-[10px] font-mono text-[#747775] uppercase tracking-wider">Stage 01 • Trigger</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono">Directive</span>
            </div>
            <div className="pt-3 px-1 text-xs text-[#C4C7C5] flex items-center justify-between font-mono">
              <span className="truncate max-w-[170px] italic">"Optimize Q3 surge &amp; 504s"</span>
              <span className="material-symbols-outlined text-sm text-[#A8C7FA]">send</span>
            </div>
          </div>

          {/* ================= STAGE 2: INGRESS (React + FastAPI) ================= */}
          <div className="canvas-node absolute left-[350px] top-[170px] w-72 z-10 bg-[#1E1F20]/95 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl hover:border-[#38bdf8] transition-all cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">devices</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">React Executive Dashboard</h4>
                  <span className="text-[10px] font-mono text-[#747775]">Frontend • WebSocket Stream</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-mono">Port 5173</span>
            </div>
            <div className="pt-2 text-[11px] text-[#747775] font-mono">
              Real-time reactive node graph &amp; live chart telemetry
            </div>
          </div>

          <div className="canvas-node absolute left-[350px] top-[400px] w-72 z-10 bg-[#1E1F20]/95 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl hover:border-[#2dd4bf] transition-all cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">api</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">FastAPI Gateway (ASGI)</h4>
                  <span className="text-[10px] font-mono text-[#747775]">Backend • Port 8000</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-[10px] font-mono">Async REST</span>
            </div>
            <div className="pt-2 text-[11px] text-[#747775] font-mono">
              Pydantic contract validation &amp; orchestrator triggers
            </div>
          </div>

          {/* ================= STAGE 3: CENTRAL AI ORCHESTRATOR ================= */}
          <div
            onClick={() => onOpenModelModal('orchestrator')}
            className="canvas-node absolute left-[730px] top-[230px] w-[400px] z-10 bg-[#22131d]/95 backdrop-blur-xl rounded-2xl border-2 border-[#EA3355] p-5 shadow-2xl hover:border-[#FF5C7C] transition-all glow-primary cursor-pointer"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI ORCHESTRATOR</h3>
                  <span className="text-[10px] font-mono text-rose-300">Nexus 2.5 Pro Master Planner</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-mono border border-rose-800">
                {modelConfig.orchestrator_model}
              </span>
            </div>

            <div className="pt-3 grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
              <div className="p-2 rounded-lg bg-[#131314] border border-rose-500/30 text-rose-300">
                Event Detection
              </div>
              <div className="p-2 rounded-lg bg-[#131314] border border-rose-500/30 text-rose-300">
                Task Planning
              </div>
              <div className="p-2 rounded-lg bg-[#131314] border border-rose-500/30 text-rose-300">
                Dynamic Routing
              </div>
            </div>
          </div>

          {/* ================= STAGE 4: 3 BRANCHED SPECIALIZED SWARMS ================= */}
          {/* Sales Swarm */}
          <div
            onClick={() => onOpenModelModal('sales')}
            className="canvas-node absolute left-[1220px] top-[100px] w-76 z-10 bg-[#0d2218]/95 backdrop-blur-md rounded-2xl border-2 border-emerald-500 p-4 shadow-xl hover:border-emerald-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Sales Forecasting Swarm</h4>
                  <span className="text-[10px] font-mono text-emerald-400">{modelConfig.sales_agent_model}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono">
                +{response ? response.sales_evidence.growth_rate_pct : 70.6}% Surge
              </span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Audits 5,229 order rows &amp; ML velocity curves
            </div>
          </div>

          {/* Inventory Swarm */}
          <div
            onClick={() => onOpenModelModal('inventory')}
            className="canvas-node absolute left-[1220px] top-[290px] w-76 z-10 bg-[#241c0e]/95 backdrop-blur-md rounded-2xl border-2 border-amber-500 p-4 shadow-xl hover:border-amber-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Inventory Stockout Swarm</h4>
                  <span className="text-[10px] font-mono text-amber-400">{modelConfig.inventory_agent_model}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono">
                {response ? response.inventory_evidence.stockout_horizon_days : 1.17}d Horizon
              </span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Monitors 320 on-hand units &amp; 150 safety floor
            </div>
          </div>

          {/* Finance Swarm */}
          <div
            onClick={() => onOpenModelModal('finance')}
            className="canvas-node absolute left-[1220px] top-[480px] w-76 z-10 bg-[#0d1e26]/95 backdrop-blur-md rounded-2xl border-2 border-cyan-500 p-4 shadow-xl hover:border-cyan-400 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Finance &amp; Liquidity Swarm</h4>
                  <span className="text-[10px] font-mono text-cyan-400">{modelConfig.finance_agent_model}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono">
                ₹1.80L Cap
              </span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Enforces ₹5.00L statutory reserve &amp; Net-30 lines
            </div>
          </div>

          {/* ================= STAGE 5: SHARED STATE ================= */}
          <div className="canvas-node absolute left-[1620px] top-[290px] w-72 z-10 bg-[#181a28]/95 backdrop-blur-md rounded-2xl border-2 border-indigo-500 p-4 shadow-xl hover:border-indigo-400 transition-all cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">SHARED STATE STORE</h4>
                  <span className="text-[10px] font-mono text-indigo-300">Neon Vector DB &amp; Locks</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-mono">Sync</span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Consensus payload assembled with zero race conditions
            </div>
          </div>

          {/* ================= STAGE 6: DECISION ENGINE (OR-TOOLS) ================= */}
          <div className="canvas-node absolute left-[1960px] top-[280px] w-[300px] z-10 bg-[#1d1606]/95 backdrop-blur-xl rounded-2xl border-2 border-amber-400 p-5 shadow-2xl hover:border-amber-300 transition-all cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">DECISION ENGINE</h4>
                  <span className="text-[10px] font-mono text-amber-300">Google OR-Tools ILP Solver</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono">Optimal</span>
            </div>
            <div className="pt-2 text-[11px] text-amber-200/80 font-mono">
              Deterministic mathematical linear optimization with 0% hallucinations
            </div>
          </div>

          {/* ================= STAGE 7 & 8: EXPLANATION & HUMAN APPROVAL ================= */}
          <div className="canvas-node absolute left-[2310px] top-[150px] w-80 z-10 bg-[#1E1F20]/95 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-xl cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#A8C7FA]">psychology</span>
                <div>
                  <h4 className="text-xs font-semibold text-white">LLM EXPLANATION</h4>
                  <span className="text-[10px] font-mono text-[#747775]">Natural language executive briefing</span>
                </div>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Generates multi-hop rationale and supplier trade-off justification
            </div>
          </div>

          <div className="canvas-node absolute left-[2310px] top-[390px] w-80 z-10 bg-[#1E1F20]/95 backdrop-blur-md rounded-2xl border-2 border-amber-500/80 p-4 shadow-xl cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">gavel</span>
                <div>
                  <h4 className="text-xs font-semibold text-white">HUMAN IN THE LOOP GATE</h4>
                  <span className="text-[10px] font-mono text-amber-300">Sign-off required</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono">CEO Gate</span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Requires 1-click verification before PO dispatch to ERP/EDI
            </div>
          </div>

          {/* ================= STAGE 9: ACTION & OUTCOME ================= */}
          <div className="canvas-node absolute left-[2680px] top-[270px] w-[320px] z-10 bg-[#0b1c13]/95 backdrop-blur-xl rounded-2xl border-2 border-emerald-500 p-5 shadow-2xl hover:border-emerald-400 transition-all cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">ACTION &amp; ERP OUTCOME</h4>
                  <span className="text-[10px] font-mono text-emerald-300">Split PO Dispatch</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono">845 Units</span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono space-y-1">
              <div>• Supplier B (Apex): 400u (Net-30)</div>
              <div>• Supplier C (Pioneer): 445u (Advance)</div>
              <div className="text-emerald-400 font-bold">Stockout Risk: 94% → 8%</div>
            </div>
          </div>

          {/* ================= STAGE 10: AI LONG-TERM MEMORY ================= */}
          <div className="canvas-node absolute left-[3050px] top-[290px] w-[300px] z-10 bg-[#201228]/95 backdrop-blur-xl rounded-2xl border-2 border-purple-500 p-5 shadow-2xl cursor-pointer">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI LONG-TERM MEMORY</h4>
                  <span className="text-[10px] font-mono text-purple-300">Continuous RL Feedback</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-mono">Loopback</span>
            </div>
            <div className="pt-2 text-[11px] text-[#C4C7C5] font-mono">
              Stores incident resolution trajectory into vector store to refine future predictions
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM CANVAS CONTROLS & LOGS DRAWER ================= */}
      <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2 bg-[#1E1F20]/90 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-2xl">
        <button
          onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
          className="p-2 rounded-xl bg-[#282A2C] hover:bg-[#393939] text-[#C4C7C5] hover:text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
          className="p-2 rounded-xl bg-[#282A2C] hover:bg-[#393939] text-[#C4C7C5] hover:text-white transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setZoom(0.88);
            setPan({ x: 0, y: 0 });
          }}
          className="p-2 rounded-xl bg-[#282A2C] hover:bg-[#393939] text-[#C4C7C5] hover:text-white transition-colors cursor-pointer"
          title="Fit to Canvas"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-white/10" />

        <button
          onClick={() => setShowLogsDrawer(!showLogsDrawer)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
            showLogsDrawer
              ? 'bg-rose-950/80 border-rose-600 text-rose-300'
              : 'bg-[#282A2C] hover:bg-[#393939] border-white/10 text-[#C4C7C5] hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-rose-400" />
          <span>Live Swarm Trace</span>
          <span className="material-symbols-outlined text-xs">
            {showLogsDrawer ? 'expand_more' : 'expand_less'}
          </span>
        </button>
      </div>

      {/* Expandable Live Execution Logs Drawer */}
      {showLogsDrawer && (
        <div className="absolute bottom-16 right-6 z-30 w-96 max-h-72 bg-[#0F0F10]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl text-xs font-mono space-y-2.5 overflow-y-auto animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Real-time Swarm Telemetry</span>
            </div>
            <span className="text-[10px] text-[#747775]">Live WebSocket Stream</span>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#C4C7C5]">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400">[00.02s]</span>
              <span>CEO Directive: Demand spike +{surgeSlider}% initialized on P100.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400">[00.18s]</span>
              <span>AI Orchestrator: Dispatched parallel queries to Sales, Inventory, Finance.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400">[00.45s]</span>
              <span>Sales Agent: Forecasted 1,015 units 7d (+70.6%) with 92% confidence.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400">[00.68s]</span>
              <span>Inventory Agent: Detected 1.17 days stockout risk on 320 on-hand units.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400">[00.91s]</span>
              <span>Finance Agent: Locked ₹5.00L statutory buffer. Free cash spend cap: ₹1.80L.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">[01.12s]</span>
              <span>OR-Tools Solver: Integer linear programming optimal solution computed.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">[01.20s]</span>
              <span>ERP Dispatch Ready: 400u (Supplier B Net-30) + 445u (Supplier C Advance).</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
