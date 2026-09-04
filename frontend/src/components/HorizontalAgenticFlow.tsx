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
  BarChart3,
  HelpCircle,
  Bell,
  Target,
  Sparkle,
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
  const [activeTab, setActiveTab] = useState<'editor' | 'executions' | 'evaluations' | 'roadmap'>('editor');
  const [surgeSlider, setSurgeSlider] = useState<number>(70);
  const [zoom, setZoom] = useState<number>(0.92);
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
      setZoom((prev) => Math.min(1.4, Math.max(0.5, prev + zoomFactor)));
    }
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-[#0e1017] text-zinc-200 select-none overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl relative font-sans">
      {/* ================= 1. N8N LEFT DOCK NAVIGATION ================= */}
      <aside className="w-13 h-full bg-[#101217] border-r border-[#222634] flex flex-col items-center justify-between py-3 z-30 flex-shrink-0">
        {/* Top dock icons */}
        <div className="flex flex-col items-center space-y-3 w-full">
          {/* Logo icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ea3355] via-[#ff5c7c] to-[#6366f1] p-[1.5px] shadow-lg shadow-rose-500/20 mb-2 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#101217] rounded-[6.5px] flex items-center justify-center">
              <Workflow className="w-4 h-4 text-[#ff5c7c]" />
            </div>
          </div>

          <button
            onClick={() => onTriggerFlow(surgeSlider)}
            className="w-8 h-8 rounded-lg bg-[#222634] hover:bg-[#2d3245] text-zinc-300 hover:text-white flex items-center justify-center transition-all group"
            title="Add Node"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              activeTab === 'editor'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Canvas Editor"
          >
            <Home className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenModelModal('orchestrator')}
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
            title="AI Model Configuration"
          >
            <Bot className="w-4 h-4 text-rose-400" />
          </button>

          <div className="text-[10px] font-mono font-bold text-zinc-500 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/5">
            NT
          </div>

          <div className="w-6 h-[1px] bg-white/10 my-1" />

          <button
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
            title="Cloud Document Storage (RBAC)"
          >
            <Cloud className="w-4 h-4 text-sky-400" />
          </button>

          <button
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
            title="PostgreSQL Neon DB Connection"
          >
            <Database className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
            title="OR-Tools Integer Solver"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              activeTab === 'roadmap'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Operational Roadmap"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom dock icons */}
        <div className="flex flex-col items-center space-y-3 w-full">
          <button
            className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
          </button>

          <div
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white font-bold text-xs flex items-center justify-center shadow-md cursor-pointer border border-white/20"
            title={`${user.name} (${user.role})`}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </aside>

      {/* ================= 2. MAIN STUDIO WORKSPACE ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* ================= TOP STUDIO HEADER ================= */}
        <header className="h-13 border-b border-[#222634] bg-[#12151e] px-4 flex items-center justify-between z-20 flex-shrink-0 shadow-sm">
          {/* Left: Swarm Title & Tag */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-zinc-400">Personal /</span>
              <span className="text-sm font-extrabold text-white tracking-tight flex items-center space-x-1.5">
                <span>NEXUS Agent Swarm</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1e2333] text-zinc-300 border border-white/10 flex items-center space-x-1">
              <span>+ TechMart Electronics</span>
            </span>
          </div>

          {/* Center: Editor / Executions / Evaluations / Roadmap Switcher */}
          <div className="bg-[#090b10] border border-white/10 p-1 rounded-xl flex items-center space-x-1 shadow-inner">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'editor'
                  ? 'bg-[#22283a] text-white shadow-md border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('executions')}
              className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'executions'
                  ? 'bg-[#22283a] text-white shadow-md border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Executions</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/30 text-rose-300 rounded-full font-mono">
                {response ? '1' : '0'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-[#22283a] text-white shadow-md border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setActiveTab('evaluations')}
              className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'evaluations'
                  ? 'bg-[#22283a] text-white shadow-md border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Evaluations
            </button>
          </div>

          {/* Right: Active Toggle, Share, Saved & Star Count */}
          <div className="flex items-center space-x-3">
            {/* Active Toggle */}
            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <span className="text-[11px] font-medium text-zinc-300">Active</span>
              <div className="w-8 h-4 rounded-full bg-emerald-500/30 border border-emerald-500/60 p-0.5 flex items-center justify-end cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
              </div>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Copied' : 'Share'}</span>
            </button>

            {/* Saved state */}
            <div className="flex items-center space-x-1 text-xs text-zinc-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Saved</span>
            </div>

            {/* Star Counter */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">123,515</span>
            </div>
          </div>
        </header>

        {/* ================= 3. TAB 1: VISUAL CANVAS EDITOR ================= */}
        {activeTab === 'editor' && (
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            className={`flex-1 relative overflow-hidden bg-[#0a0c12] bg-canvas-dots cursor-${
              isDragging ? 'grabbing' : 'grab'
            }`}
          >
            {/* Top Demand Surge Scenario Controller Bar */}
            <div className="absolute top-4 left-6 z-20 bg-[#141824]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Simulate Surge:</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={surgeSlider}
                onChange={(e) => setSurgeSlider(Number(e.target.value))}
                className="w-32 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono text-cyan-300 text-xs font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                +{surgeSlider}%
              </span>
              <button
                onClick={() => onTriggerFlow(surgeSlider)}
                disabled={isLoading}
                className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-1 transition-all disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                <span>Simulate</span>
              </button>
            </div>

            {/* Transformable Canvas Surface */}
            <div
              className="absolute inset-0 transition-transform duration-75 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
              }}
            >
              {/* Inner Node Canvas Box */}
              <div className="relative w-[1500px] h-[720px] pointer-events-auto py-6 select-none">
                {/* SVG Bezier Flow Cables Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                  <defs>
                    <linearGradient id="n8n-wire-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#ea3355" />
                    </linearGradient>
                  </defs>

                  {/* Top Pipeline Horizontal Cables */}
                  {/* Cable 1: Trigger -> Switch */}
                  <path
                    d="M 175 100 C 210 100, 210 100, 245 100"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Cable 2: Switch -> Input */}
                  <path
                    d="M 365 100 C 400 100, 400 100, 435 100"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Cable 3: Input -> Central AI Agent */}
                  <path
                    d="M 555 100 C 590 100, 590 100, 625 100"
                    stroke="url(#n8n-wire-gradient)"
                    strokeWidth="3"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Cable 4: AI Agent -> Decision Engine Solver */}
                  <path
                    d="M 825 100 C 865 100, 865 100, 905 100"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Cable 5: Decision Engine Solver -> Split PO Execution */}
                  <path
                    d="M 1105 100 C 1145 100, 1145 100, 1185 100"
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />

                  {/* Hierarchical Tree Connections Branching DOWN from Central AI Agent */}
                  {/* Tree Cable to LLM / Reasoner / Memory */}
                  <path
                    d="M 680 145 C 680 200, 120 180, 120 270"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Tree Cable to Sales Swarm */}
                  <path
                    d="M 700 145 C 700 210, 360 190, 360 270"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Tree Cable to Inventory Swarm */}
                  <path
                    d="M 725 145 C 725 210, 660 200, 660 270"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Tree Cable to Finance Swarm */}
                  <path
                    d="M 750 145 C 750 210, 960 200, 960 270"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                  {/* Tree Cable to Supplier Fulfillment Swarm */}
                  <path
                    d="M 770 145 C 770 210, 1260 200, 1260 270"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    className={isLoading ? 'flow-wire-animated' : ''}
                  />
                </svg>

                {/* ================= TOP PIPELINE NODES ================= */}
                <div className="flex items-center space-x-18 relative z-10">
                  {/* Node 1: Trigger Node */}
                  <div
                    onClick={() => setSelectedNodeInfo('CEO Directive: P100 demand spike trigger')}
                    className="canvas-node w-[175px] bg-[#141824] border border-[#38bdf8]/60 rounded-2xl p-3.5 shadow-xl text-center space-y-2 relative group hover:border-[#38bdf8] transition-all cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#38bdf8] border-2 border-[#141824] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />
                    
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                      <Send className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-tight">CEO Directive</div>
                      <div className="text-[10px] text-sky-300 font-mono">{user.name} (P100 Trigger)</div>
                    </div>
                    <div className="text-[9px] bg-black/40 text-zinc-400 rounded px-1.5 py-0.5 font-mono">
                      1 item • manual
                    </div>
                  </div>

                  {/* Node 2: Switch Node */}
                  <div
                    onClick={() => setSelectedNodeInfo('Switch Node: Routing surge percentage to departments')}
                    className="canvas-node w-[120px] bg-[#141824] border border-cyan-500/60 rounded-2xl p-3 shadow-xl text-center space-y-1.5 relative group hover:border-cyan-400 transition-all cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#141824] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#141824] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />

                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Switch</div>
                    <div className="text-[10px] text-cyan-300 font-mono">Surge +{surgeSlider}%</div>
                    <div className="text-[9px] bg-black/40 text-zinc-400 rounded px-1 py-0.5 font-mono">
                      mode: Rules
                    </div>
                  </div>

                  {/* Node 3: Context Input Node */}
                  <div
                    onClick={() => setSelectedNodeInfo('Context Input: Pulling 5,229 database rows and RBAC markdown files')}
                    className="canvas-node w-[120px] bg-[#141824] border border-purple-500/60 rounded-2xl p-3 shadow-xl text-center space-y-1.5 relative group hover:border-purple-400 transition-all cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full bg-purple-400 border-2 border-[#141824] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow" />
                    <span className="w-3 h-3 rounded-full bg-purple-400 border-2 border-[#141824] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />

                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">Context Input</div>
                    <div className="text-[10px] text-purple-300 font-mono">DB + RBAC</div>
                    <div className="text-[9px] bg-black/40 text-zinc-400 rounded px-1 py-0.5 font-mono">
                      5,229 items
                    </div>
                  </div>

                  {/* Node 4: CENTRAL AI ORCHESTRATOR NODE */}
                  <div
                    onClick={() => onOpenModelModal('orchestrator')}
                    className="canvas-node w-[200px] bg-[#22131d] border-2 border-[#ea3355] rounded-2xl p-4 shadow-2xl text-center space-y-2 relative cursor-pointer hover:border-[#ff5c7c] transition-all glow-primary"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#ea3355] border-2 border-[#22131d] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow" />
                    <span className="w-3 h-3 rounded-full bg-[#ea3355] border-2 border-[#22131d] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ea3355] border-2 border-[#22131d] absolute left-1/2 -translate-x-1/2 -bottom-1.5 shadow animate-pulse" />

                    <div className="flex items-center justify-between text-[10px] font-mono text-rose-400 font-bold">
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-rose-400" />
                        <span>AI AGENT</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-rose-950/80 rounded border border-rose-800 text-rose-300">
                        {modelConfig.orchestrator_model}
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
                      <Bot className="w-6 h-6 animate-pulse" />
                    </div>

                    <div>
                      <div className="text-sm font-extrabold text-white tracking-tight">AI Orchestrator</div>
                      <div className="text-[10px] text-rose-300 font-mono">Autonomous Decision Swarm</div>
                    </div>

                    <div className="text-[9px] bg-rose-950/60 text-rose-200 border border-rose-800/40 rounded px-2 py-0.5 font-mono">
                      Sub-Agents: 3 Active • Solver: ON
                    </div>
                  </div>

                  {/* Node 5: OR-Tools Solver Node */}
                  <div
                    onClick={() => setSelectedNodeInfo('OR-Tools Solver: Mathematical Linear Optimization without Hallucinations')}
                    className="canvas-node w-[200px] bg-[#1d1606] border-2 border-amber-400 rounded-2xl p-4 shadow-2xl text-center space-y-2 relative group hover:border-amber-300 transition-all cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-400 border-2 border-[#1d1606] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 border-2 border-[#1d1606] absolute -right-1.5 top-1/2 -translate-y-1/2 shadow" />

                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                      <span>INTEGER MATH</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-950 rounded border border-amber-800 text-amber-300">
                        OR-Tools
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-sm font-extrabold text-white tracking-tight">Decision Engine</div>
                      <div className="text-[10px] text-amber-300 font-mono">Constraint Optimizer</div>
                    </div>

                    <div className="text-[9px] bg-black/40 text-amber-200/80 rounded px-1.5 py-0.5 font-mono">
                      Hard Cap: ₹1.80L • Buffer: ₹5.0L
                    </div>
                  </div>

                  {/* Node 6: Purchase Order Execution Node */}
                  <div
                    onClick={() => setSelectedNodeInfo('PO Execution: Optimal 2-supplier split allocation')}
                    className="canvas-node w-[210px] bg-[#0b1c13] border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl text-center space-y-2 relative group hover:border-emerald-400 transition-all cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0b1c13] absolute -left-1.5 top-1/2 -translate-y-1/2 shadow" />

                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                      <span>ERP DISPATCH</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950 rounded border border-emerald-800 text-emerald-300">
                        Optimal
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-sm font-extrabold text-white tracking-tight">Split PO Execution</div>
                      <div className="text-[10px] text-emerald-300 font-mono">400u (Net-30) + 445u (Adv)</div>
                    </div>

                    <div className="text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded px-2 py-0.5 font-mono">
                      Stockout Risk: 94% → 8%
                    </div>
                  </div>
                </div>

                {/* ================= HIERARCHICAL SUB-AGENT CLUSTERS ================= */}
                <div className="grid grid-cols-5 gap-6 pt-24 relative z-10">
                  {/* SUB-CLUSTER 1: REASONING CORE & MEMORY */}
                  <div className="space-y-3">
                    <div className="w-full bg-[#181a28] border border-indigo-500/60 rounded-xl p-2.5 text-center shadow-lg space-y-1">
                      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-indigo-300">
                        <Brain className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Core LLM & Memory</span>
                      </div>
                      <div className="text-[9px] text-zinc-400 font-mono">Multi-Turn Context</div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-[#0e101a] border border-indigo-500/30 text-zinc-300 flex items-center space-x-2">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Gemini 2.0 Flash</div>
                          <div className="text-[8px] text-zinc-500">Fast Reasoning</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#0e101a] border border-indigo-500/30 text-zinc-300 flex items-center space-x-2">
                        <Database className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Neon Vector Memory</div>
                          <div className="text-[8px] text-indigo-400">PostgreSQL Cloud</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-CLUSTER 2: SALES AGENT CLUSTER */}
                  <div className="space-y-3">
                    <div
                      onClick={() => onOpenModelModal('sales')}
                      className="w-full bg-[#0d2218] border-2 border-emerald-500/80 rounded-xl p-2.5 text-center shadow-lg space-y-1 cursor-pointer hover:border-emerald-400 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-emerald-300">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sales Agent</span>
                      </div>
                      <div className="text-[9px] text-emerald-400 font-mono">
                        Surge: +{response ? response.sales_evidence.growth_rate_pct : 70.6}%
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-[#08150f] border border-emerald-500/30 text-zinc-300 flex items-center space-x-2">
                        <Database className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Sales DB Orders</div>
                          <div className="text-[8px] text-zinc-400">5,229 records query</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#08150f] border border-emerald-500/30 text-zinc-300 flex items-center space-x-2">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">ML Demand Model</div>
                          <div className="text-[8px] text-emerald-400">1,015 units 7d forecast</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#08150f] border border-emerald-500/30 text-zinc-300 flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Promo Documents</div>
                          <div className="text-[8px] text-zinc-400">Shopify Q3 viral push</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-CLUSTER 3: INVENTORY AGENT CLUSTER */}
                  <div className="space-y-3">
                    <div
                      onClick={() => onOpenModelModal('inventory')}
                      className="w-full bg-[#241c0e] border-2 border-amber-500/80 rounded-xl p-2.5 text-center shadow-lg space-y-1 cursor-pointer hover:border-amber-400 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-amber-300">
                        <Package className="w-3.5 h-3.5 text-amber-400" />
                        <span>Inventory Agent</span>
                      </div>
                      <div className="text-[9px] text-amber-400 font-mono">
                        Depletion: {response ? response.inventory_evidence.stockout_horizon_days : 1.17} days
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-[#140f08] border border-amber-500/30 text-zinc-300 flex items-center space-x-2">
                        <Package className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Stock Level Monitor</div>
                          <div className="text-[8px] text-amber-400">320 units on-hand</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#140f08] border border-amber-500/30 text-zinc-300 flex items-center space-x-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Safety Stock Floor</div>
                          <div className="text-[8px] text-zinc-400">150 units minimum</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#140f08] border border-amber-500/30 text-zinc-300 flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Warehouse SLA</div>
                          <div className="text-[8px] text-zinc-400">24-hour turnaround</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-CLUSTER 4: FINANCE AGENT CLUSTER */}
                  <div className="space-y-3">
                    <div
                      onClick={() => onOpenModelModal('finance')}
                      className="w-full bg-[#0d1e26] border-2 border-cyan-500/80 rounded-xl p-2.5 text-center shadow-lg space-y-1 cursor-pointer hover:border-cyan-400 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-cyan-300">
                        <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Finance Agent</span>
                      </div>
                      <div className="text-[9px] text-cyan-400 font-mono">
                        Safe Spend Cap: ₹1.80L
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-[#081318] border border-cyan-500/30 text-zinc-300 flex items-center space-x-2">
                        <IndianRupee className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Treasury Balance</div>
                          <div className="text-[8px] text-cyan-400">₹8.50L Total Cash</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#081318] border border-cyan-500/30 text-zinc-300 flex items-center space-x-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Buffer Protection</div>
                          <div className="text-[8px] text-zinc-400">₹5.00L Statutory Lock</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#081318] border border-cyan-500/30 text-zinc-300 flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Credit Terms Audit</div>
                          <div className="text-[8px] text-cyan-400">Net-30 Days Line</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-CLUSTER 5: SUPPLIER FULFILLMENT CLUSTER */}
                  <div className="space-y-3">
                    <div className="w-full bg-[#201228] border-2 border-purple-500/80 rounded-xl p-2.5 text-center shadow-lg space-y-1">
                      <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-purple-300">
                        <Truck className="w-3.5 h-3.5 text-purple-400" />
                        <span>Suppliers Swarm</span>
                      </div>
                      <div className="text-[9px] text-purple-300 font-mono">Capacity: 1,300u</div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                      <div className="p-2 rounded-xl bg-[#130b18] border border-purple-500/30 text-zinc-300 flex items-center space-x-2">
                        <Truck className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">QuickLogix (400u)</div>
                          <div className="text-[8px] text-purple-300">Net-30 • ₹180/u • 3d</div>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#130b18] border border-purple-500/30 text-zinc-300 flex items-center space-x-2">
                        <Truck className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white">Zenith Direct (445u)</div>
                          <div className="text-[8px] text-purple-300">Advance • ₹210/u • 2d</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Info Pill for Clicked Nodes */}
            {selectedNodeInfo && (
              <div className="absolute top-4 right-6 z-20 bg-[#161a28]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex items-center space-x-3 max-w-sm animate-in fade-in duration-200">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div className="text-xs text-zinc-200">{selectedNodeInfo}</div>
                <button
                  onClick={() => setSelectedNodeInfo(null)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* ================= 4. FLOATING CANVAS CONTROLS ================= */}
            {/* Bottom-Left Zoom & Canvas Nav */}
            <div className="absolute bottom-6 left-6 z-30 bg-[#161a29]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-2xl flex items-center space-x-1 text-xs">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-zinc-300 text-xs px-2 font-bold min-w-[45px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/10" />
              <button
                onClick={() => {
                  setZoom(0.92);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Fit to Screen (Reset)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom-Center Coral Glow Execution Button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
              <button
                onClick={() => onTriggerFlow(surgeSlider)}
                disabled={isLoading}
                className="px-8 py-3 rounded-2xl bg-[#ea3355] hover:bg-[#ff496c] text-white font-extrabold text-sm shadow-2xl shadow-rose-500/40 flex items-center space-x-2.5 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Executing workflow...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Execute Operations Swarm</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom-Right Radar Mini-Map & Sign-off Action */}
            <div className="absolute bottom-6 right-6 z-30 flex items-center space-x-3">
              {response && (
                <button
                  onClick={handleApprove}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-1.5 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve PO (₹1.80L)</span>
                </button>
              )}

              {/* Mini-Map Radar Box */}
              <div className="w-28 h-18 bg-[#141824]/90 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl hidden md:flex flex-col justify-between">
                <div className="flex justify-between items-center text-[8px] font-mono text-zinc-400">
                  <span>RADAR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="w-full h-8 bg-black/40 rounded border border-white/5 relative flex items-center justify-center">
                  <div className="w-12 h-4 border border-rose-500/80 rounded bg-rose-500/20" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. TAB 2: EXECUTIONS VIEW ================= */}
        {activeTab === 'executions' && (
          <div className="flex-1 p-8 overflow-y-auto bg-[#0a0c12] space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Execution History</h3>
                  <p className="text-xs text-zinc-400">Chronological multi-agent runs and mathematical constraint proofs</p>
                </div>
                <button
                  onClick={() => onTriggerFlow(surgeSlider)}
                  className="px-4 py-2 rounded-xl bg-[#ea3355] text-white text-xs font-bold"
                >
                  Run New Execution
                </button>
              </div>

              {response ? (
                <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="font-mono text-sm font-bold text-white">Execution #{response.event_id.slice(0, 8)}</span>
                      <span className="text-xs text-zinc-400">{response.timestamp}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                      Optimal Consensus
                    </span>
                  </div>

                  <p className="text-sm text-zinc-200 leading-relaxed">{response.orchestrator_summary}</p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="text-[10px] text-zinc-400">Sales Forecast</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">+{response.sales_evidence.growth_rate_pct}% surge</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="text-[10px] text-zinc-400">Stockout Risk Horizon</div>
                      <div className="text-sm font-bold text-amber-400 font-mono">{response.inventory_evidence.stockout_horizon_days} days</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                      <div className="text-[10px] text-zinc-400">Upfront Cash Impact</div>
                      <div className="text-sm font-bold text-cyan-400 font-mono">₹{response.decision_output.total_upfront_cash_impact.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-zinc-500 text-sm">
                  No active executions yet. Click "Execute Operations Swarm" to run.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 5. TAB 3: ROADMAP VIEW ================= */}
        {activeTab === 'roadmap' && (
          <div className="flex-1 p-8 overflow-y-auto bg-[#0a0c12] bg-canvas-grid space-y-8 flex flex-col items-center">
            {/* Top Metric Header */}
            <div className="w-full max-w-2xl bg-[#141824]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">PROGRESS</div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">80%</span>
                  <div className="w-32 h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-4/5 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-white/10" />

              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">NODES COMPLETED</div>
                <div className="text-sm font-extrabold text-white font-mono">4 / 5 Active</div>
              </div>

              <div className="h-8 w-[1px] bg-white/10" />

              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">EST. REMAINING</div>
                <div className="text-sm font-extrabold text-zinc-300 font-mono">~1.2 mins</div>
              </div>
            </div>

            {/* Vertical Flow Roadmap Pipeline */}
            <div className="w-full max-w-lg space-y-6 relative">
              {/* Vertical Connecting Line */}
              <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-amber-400 -z-0" />

              {/* Step 1 Node */}
              <div className="relative z-10 bg-[#141824] border-2 border-cyan-400 rounded-2xl p-4 shadow-xl text-left flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">CEO Directive: Viral Surge Event</div>
                    <div className="text-[10px] text-zinc-400">P100 demand spike trigger dispatched</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded">10m</span>
              </div>

              {/* Step 2 Node */}
              <div className="relative z-10 bg-[#141824] border-2 border-cyan-400 rounded-2xl p-4 shadow-xl text-left flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Parallel Department Agent Swarm</div>
                    <div className="text-[10px] text-zinc-400">Sales, Inventory, & Finance ground-truth audit</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded">8m</span>
              </div>

              {/* Milestone Node */}
              <div className="relative z-10 bg-[#251d08] border-2 border-amber-400 rounded-2xl p-4 shadow-2xl text-left flex items-center justify-between glow-amber">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-lg shadow">
                    🏆
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-amber-300">Milestone: Mathematical Consensus</div>
                    <div className="text-[10px] text-amber-200/80">Statutory buffer & supplier constraint resolution</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Solved
                </span>
              </div>

              {/* Step 4 Node */}
              <div className="relative z-10 bg-[#141824] border-2 border-emerald-400 rounded-2xl p-4 shadow-xl text-left flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">OR-Tools Integer Linear Solver</div>
                    <div className="text-[10px] text-zinc-400">Zero-hallucination PO allocation optimization</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Optimal</span>
              </div>

              {/* Step 5 Node */}
              <div className="relative z-10 bg-[#141824] border-2 border-purple-400 rounded-2xl p-4 shadow-xl text-left flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-purple-400/20 text-purple-400 flex items-center justify-center font-bold">
                    ⚙
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Purchase Order Dispatch & ERP Sync</div>
                    <div className="text-[10px] text-zinc-400">Supplier B (400u Net-30) + Supplier C (445u)</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>

            {/* Floating Bottom Roadmap Navigation Toolbar */}
            <div className="bg-[#141824]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 shadow-2xl flex items-center space-x-4 text-xs">
              <button className="text-zinc-400 hover:text-white flex items-center space-x-1">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search</span>
              </button>
              <div className="h-4 w-[1px] bg-white/10" />
              <button className="text-zinc-400 hover:text-white flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span>Filter</span>
              </button>
              <div className="h-4 w-[1px] bg-white/10" />
              <button
                onClick={() => onTriggerFlow(surgeSlider)}
                className="text-cyan-400 font-bold flex items-center space-x-1"
              >
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>My Goal</span>
              </button>
              <div className="h-4 w-[1px] bg-white/10" />
              <button
                onClick={() => setActiveTab('editor')}
                className="text-rose-400 font-bold flex items-center space-x-1"
              >
                <Workflow className="w-3.5 h-3.5 text-rose-400" />
                <span>Canvas View</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= 6. TAB 4: EVALUATIONS VIEW ================= */}
        {activeTab === 'evaluations' && (
          <div className="flex-1 p-8 overflow-y-auto bg-[#0a0c12] space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white tracking-tight">Agent Swarm Evaluations & Benchmarks</h3>
                <p className="text-xs text-zinc-400">Evaluation of model latency, zero-hallucination math, and constraint bounds</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white">Mathematical Invariance Score</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                  <p className="text-xs text-zinc-400">All procurement sums strictly satisfy spend caps and buffer limits.</p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white">Stockout Mitigation Score</div>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono">92%</div>
                  <p className="text-xs text-zinc-400">Stockout risk reduced from 94% down to 8% post-execution.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. COLLAPSIBLE BOTTOM LOGS DRAWER ================= */}
        <div className="border-t border-[#222634] bg-[#0c0e15] z-20 flex-shrink-0">
          <button
            onClick={() => setShowLogsDrawer(!showLogsDrawer)}
            className="w-full px-4 py-2 flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-zinc-300">Logs</span>
              <span className="text-[10px] text-zinc-500">Live Execution Trace & Constraints</span>
              {response && (
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-800/40">
                  Optimal Solved
                </span>
              )}
            </div>
            {showLogsDrawer ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {showLogsDrawer && (
            <div className="p-4 max-h-48 overflow-y-auto font-mono text-xs text-zinc-300 space-y-1.5 bg-black/60 border-t border-white/5">
              <div className="text-zinc-500">[00:00.01] CEO ({user.name}) triggered operational directive for P100 (Surge +{surgeSlider}%)</div>
              <div className="text-indigo-400">[00:00.12] AI Orchestrator ({modelConfig.orchestrator_model}) dispatched parallel sub-agents</div>
              <div className="text-emerald-400">[00:00.35] Sales Agent: 7-day forecast 1,015 units (+{response?.sales_evidence.growth_rate_pct || 70.6}%)</div>
              <div className="text-amber-400">[00:00.41] Inventory Agent: Stockout in 1.17 days • Reorder deficit: 845 units</div>
              <div className="text-cyan-400">[00:00.52] Finance Agent: Safe spend cap ₹1.80L • Net-30 supplier credit locked</div>
              <div className="text-rose-400 font-bold">[00:00.68] OR-Tools Solver: Optimal PO Split &rarr; 400u QuickLogix (Net-30) + 445u Zenith Direct</div>
              <div className="text-emerald-300 font-bold">[00:00.82] Mathematical Consensus Feasible • Residual stockout risk 8% • Ready for CEO sign-off</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

