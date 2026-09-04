import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Boxes,
  Zap,
  Layers,
  Activity,
  ChevronRight,
  Database,
  Sliders,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDeploymentGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenDeploymentGuide }) => {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header / Nav */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 bg-[#080b11]/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-[1px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#0d121f] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-blue-400">
                NEXUS
              </span>
              <span className="ml-2 text-xs font-mono uppercase px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60">
                Autonomous OS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Agentic Pipeline</a>
            <a href="#models" className="hover:text-white transition-colors">Swappable Models</a>
            <button
              onClick={onOpenDeploymentGuide}
              className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center space-x-1"
            >
              <span>100% Free Hosting Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onGetStarted}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all transform active:scale-95 flex items-center space-x-2"
            >
              <span>Launch Control Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-24 pb-20 px-6 overflow-hidden">
          {/* Subtle Glow backdrop */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-purple-600/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Next-Gen Enterprise AI Operating System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Don't just monitor your business. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Let specialized AI agents reason about it.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
              A cross-functional operations engine where <strong>Sales</strong>, <strong>Inventory</strong>, and <strong>Finance</strong> agents observe real-time ground truth, exchange structured evidence, and solve multi-constraint decisions with mathematical precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <span>Enter as CEO / Operator</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenDeploymentGuide}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-base bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-300 transition-all flex items-center justify-center space-x-2"
              >
                <span>Deploy Free (Vercel + Render)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Live Horizontal Pipeline Teaser */}
        <section id="pipeline" className="py-16 px-6 border-t border-slate-800/60 bg-[#0b0f19]/60">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Horizontal Autonomous Execution Flow
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Watch decisions travel horizontally from CEO intent to multi-agent structured analysis and non-hallucinated constrained optimization.
              </p>
            </div>

            {/* Visual Teaser Graph */}
            <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Step 1: CEO */}
                <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono text-blue-400 uppercase">Input Node</div>
                  <div className="text-sm font-semibold text-white">CEO (Rahul)</div>
                  <div className="text-[11px] text-slate-400">"Resolve P100 Surge"</div>
                </div>

                {/* Step 2: Orchestrator */}
                <div className="bg-slate-900/90 border border-indigo-900/60 rounded-xl p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono text-indigo-400 uppercase">Coordinator</div>
                  <div className="text-sm font-semibold text-white">AI Orchestrator</div>
                  <div className="text-[11px] text-slate-400">Async Task Dispatch</div>
                </div>

                {/* Step 3: Agents Stack */}
                <div className="bg-slate-900/90 border border-purple-900/60 rounded-xl p-3 text-center space-y-1.5">
                  <div className="text-xs font-mono text-purple-400 uppercase">Specialized Agents</div>
                  <div className="text-xs font-medium text-emerald-400 bg-emerald-950/60 py-0.5 rounded">🟦 Sales (+70.6% Demand)</div>
                  <div className="text-xs font-medium text-amber-400 bg-amber-950/60 py-0.5 rounded">🟩 Inventory (Stockout in 1.1d)</div>
                  <div className="text-xs font-medium text-blue-400 bg-blue-950/60 py-0.5 rounded">🟨 Finance (₹1.8L Cash Cap)</div>
                </div>

                {/* Step 4: Decision Engine */}
                <div className="bg-slate-900/90 border border-emerald-900/60 rounded-xl p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono text-emerald-400 uppercase">Math Solver</div>
                  <div className="text-sm font-semibold text-white">Decision Engine</div>
                  <div className="text-[11px] text-slate-400">OR-Tools Optimization</div>
                </div>

                {/* Step 5: Proposal */}
                <div className="bg-gradient-to-b from-blue-950/60 to-slate-900 border border-blue-500/40 rounded-xl p-4 text-center space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono text-blue-400 uppercase">Human-In-Loop</div>
                  <div className="text-sm font-semibold text-white">Action Card</div>
                  <div className="text-[11px] text-emerald-400">Order 845 Units (B+C)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Enterprise-Grade Operational Intelligence
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Engineered for verifiable enterprise operations where hallucinations are unacceptable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Swappable Foundation Models</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Swap models per agent on the fly. Power Sales with Gemini 2.0 Flash, Inventory with GPT-4o Mini, and Finance with Gemini 1.5 Pro.
                </p>
              </div>

              <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Department Document Racks (RBAC)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Unstructured knowledge (/sales, /inventory, /finance) governed by strict role-based access tokens and audited cross-domain requests.
                </p>
              </div>

              <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Constrained Optimization Solver</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Mathematical integer linear programming guarantees solutions strictly satisfy safe cash buffers and supplier capacities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#06080d] py-12 px-6 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-slate-300">NEXUS Autonomous Operations</span>
          </div>
          <div>Built for HackVilla 2026 • 100% Free Hosting Ready</div>
        </div>
      </footer>
    </div>
  );
};
