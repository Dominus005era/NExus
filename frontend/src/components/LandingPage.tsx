import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  ChevronRight,
  Database,
  Sliders,
  Layers,
  Activity,
  Workflow,
  CheckCircle2,
  Lock,
  GitBranch,
  Terminal,
  Bot,
  ExternalLink,
  Star,
  Check,
  TrendingUp,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDeploymentGuide: () => void;
  onSelectModel?: (modelId: string, targetView: 'chat' | 'flow') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenDeploymentGuide,
  onSelectModel,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Spotlights & Dotted Grid */}
      <div className="absolute inset-0 bg-canvas-dots opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-gradient-to-b from-indigo-600/18 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-2/3 -left-40 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* ================= TOP NAVBAR ================= */}
      <header className="border-b border-white/[0.06] backdrop-blur-2xl sticky top-0 z-50 bg-[#06080e]/85 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onGetStarted}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Nexus AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">
                v2.5 Frontier
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-400">
            <a href="#models" className="hover:text-white transition-colors">Models</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
            <a href="#bento" className="hover:text-white transition-colors">Capabilities</a>
            <button
              onClick={onOpenDeploymentGuide}
              className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center space-x-1 transition-colors"
            >
              <span>100% Free Live Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onGetStarted}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 flex items-center space-x-2"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main className="flex-1">
        <section className="relative pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-cyan-300 text-xs font-medium backdrop-blur-md shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Frontier Intelligence 2.5 Active</span>
            </div>

            {/* Main Headline (Exact Match to Stitch Screen 1) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Nexus — Frontier intelligence <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400">
                with action
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Autonomous multi-agent operating system engineered for enterprise decisions, multi-step non-linear reasoning, complex system integration, transparent automated execution and mathematical safety.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-xs bg-white text-black hover:bg-zinc-200 shadow-2xl shadow-white/10 transition-all flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
              >
                <span>Try Nexus Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Demos</span>
              </button>
            </div>

            {/* ================= INTERACTIVE MOCK CONSOLE CARD (Matching Stitch Screen 1 Preview) ================= */}
            <div className="pt-8 max-w-3xl mx-auto">
              <div className="bg-[#0b0e17]/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-left space-y-4 glow-primary">
                {/* Mock Card Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-zinc-400 ml-2 font-medium">
                      nexus-executive-console v2.5
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Neon PostgreSQL Live</span>
                  </div>
                </div>

                {/* Mock Prompt Preview */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-cyan-400 font-bold">$</span>
                    <span className="truncate">Resolve stockout of 750 Future Trend TVs with 99.4% SLA for Q3 spike...</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-semibold border border-cyan-800">
                    Executed
                  </span>
                </div>

                {/* Mock Multi-Agent Status Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-[#091610] border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sales Forecast</span>
                    </div>
                    <span className="font-bold">+70.6%</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1a1408] border border-amber-500/30 text-amber-300 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Stockout Horizon</span>
                    </div>
                    <span className="font-bold">1.17 Days</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#08151f] border border-cyan-500/30 text-cyan-300 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>OR-Tools Solver</span>
                    </div>
                    <span className="font-bold">Optimal PO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPLORE THE NEXUS MODELS SECTION (Exact Match to Stitch Screen 1) ================= */}
        <section id="models" className="py-20 px-6 border-t border-white/[0.06] bg-[#070a12]/60">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-mono">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Foundation Model Matrix</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore the Nexus Models
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                From standard reasoning to complex multi-step orchestration, explore our family of frontier models built for zero-hallucination execution.
              </p>
            </div>

            {/* 3 Model Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Nexus 2.5 Flash */}
              <div className="glass-panel rounded-3xl p-6 space-y-5 border border-white/[0.08] hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                      Lightweight & Fast
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Nexus 2.5 Flash</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                      Fast & lightweight intelligence for real-time actions, sub-second latency, optimal token throughput.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2 text-[11px] font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Context Window:</span>
                      <span className="text-white font-semibold">1M Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output Rate:</span>
                      <span className="text-cyan-300 font-semibold">185 tps</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-emerald-400 font-semibold">&lt; 420ms</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGetStarted}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-400 text-xs font-semibold text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Launch in Copilot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: Nexus 1.5 Pro */}
              <div className="glass-panel rounded-3xl p-6 space-y-5 border border-indigo-500/30 hover:border-indigo-500/60 transition-all flex flex-col justify-between group relative glow-primary">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-700">
                      Frontier Reasoning
                    </span>
                    <Bot className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Nexus 1.5 Pro</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                      Deep reasoning & high-parameter synthesis for complex enterprise workflows, multi-modal analysis.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2 text-[11px] font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Context Window:</span>
                      <span className="text-white font-semibold">2M Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output Rate:</span>
                      <span className="text-indigo-300 font-semibold">95 tps</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reasoning Depth:</span>
                      <span className="text-indigo-300 font-semibold">Level 5</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGetStarted}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Launch in Copilot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: Nexus 2.0 Flash / Thinking */}
              <div className="glass-panel rounded-3xl p-6 space-y-5 border border-white/[0.08] hover:border-amber-500/50 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                      Mathematical Engine
                    </span>
                    <Cpu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Nexus 2.0 Flash (Thinking)</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                      Advanced mathematical OR-Tools solver & dynamic tool calling for zero-hallucination execution.
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2 text-[11px] font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Context Window:</span>
                      <span className="text-white font-semibold">1M Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimization Engine:</span>
                      <span className="text-amber-300 font-semibold">OR-Tools v9.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="text-emerald-400 font-semibold">99.7% Exact</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGetStarted}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-400 text-xs font-semibold text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Launch in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENTO GRID: BUILT FOR AUTONOMOUS EXECUTION ================= */}
        <section id="bento" className="py-20 px-6 border-t border-white/[0.06] bg-[#05070f]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
                <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                <span>Engineered for Reliability</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built for Autonomous Execution
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
                No hallucinated calculations. Every decision is grounded in real SQL data and solved via mathematical linear optimization.
              </p>
            </div>

            {/* 4 Bento Cards (2x2 Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bento Card 1: Agentic Strategy Orchestration */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-indigo-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-md">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Agentic Strategy Orchestration</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Real-time multi-agent coordination with hierarchical sub-agents (Sales, Inventory, Finance, Suppliers) sharing typed Pydantic payloads.
                </p>
                <div className="pt-2 text-[10px] font-mono text-indigo-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>3 Specialized Agents • Swarm Sync: &lt; 12ms</span>
                </div>
              </div>

              {/* Bento Card 2: Non-linear Reasoning */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-cyan-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-md">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Non-linear Reasoning</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Tree-of-thought DAG planner with backtrack capability, adaptive self-correction, and chronological audit trail logging.
                </p>
                <div className="pt-2 text-[10px] font-mono text-cyan-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>DAG Depth: 4 Nodes • Backtrack Capable</span>
                </div>
              </div>

              {/* Bento Card 3: Dynamic Tools Integration */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-purple-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shadow-md">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Dynamic Tools Integration</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Plug-and-play API tool calling for ERP, Neon Cloud PostgreSQL, SAP, Shopify, and custom webhooks with strict role-based access.
                </p>
                <div className="pt-2 text-[10px] font-mono text-purple-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Neon PostgreSQL • REST APIs • Document Racks</span>
                </div>
              </div>

              {/* Bento Card 4: Zero-Hallucination Execution Engine */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-emerald-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Zero-Hallucination Execution Engine</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Deterministic mathematical constraint solver (Google OR-Tools) guarantees allocations respect statutory liquidity and supplier caps.
                </p>
                <div className="pt-2 text-[10px] font-mono text-emerald-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Exact Integer Linear Programming (ILP)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= METRICS & BENCHMARK BANNER (Exact Match to Stitch Screen 1) ================= */}
        <section id="benchmarks" className="py-14 px-6 border-t border-white/[0.06] bg-[#060810]">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel rounded-3xl p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  91.4%
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">Multi-Agent Benchmark</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  89.8%
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">Complex Reasoning Score</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  4.0M
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">Production Context</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                  99.7%
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">Constraint Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM CTA CARD (Exact Match to Stitch Screen 1) ================= */}
        <section className="py-20 px-6 border-t border-white/[0.06] bg-[#03050a] relative">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-3xl p-10 border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/20 blur-[100px] pointer-events-none" />

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to experience Nexus?
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Get instant access to autonomous enterprise workflows and state-of-the-art multi-agent swarm orchestration.
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your enterprise email..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono placeholder:text-zinc-500"
                />
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>{subscribed ? 'Access Granted' : 'Get Started Free'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/[0.06] bg-[#020408] py-10 px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-zinc-300">Nexus Autonomous Operating System 2.0</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-500">
            Built for Frontier AI Safety • HackVilla 2026 • 100% Free Hosting Ready
          </div>
        </div>
      </footer>
    </div>
  );
};
