import React from 'react';
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
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDeploymentGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenDeploymentGuide }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-purple-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Top Navbar */}
      <header className="border-b border-white/[0.06] backdrop-blur-2xl sticky top-0 z-40 bg-[#030712]/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-cyan-400">
                NEXUS
              </span>
              <span className="ml-2 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 font-semibold">
                Autonomous 2.0
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-400">
            <a href="#pipeline" className="hover:text-white transition-colors">Horizontal Topology</a>
            <a href="#bento" className="hover:text-white transition-colors">Capabilities</a>
            <button
              onClick={onOpenDeploymentGuide}
              className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center space-x-1"
            >
              <span>100% Free Live Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-xl shadow-indigo-600/25 transition-all transform active:scale-95 flex items-center space-x-2"
            >
              <span>Launch Control Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-28 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-cyan-300 text-xs font-medium backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Agent Operational Decision System</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Don't just monitor business. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                Let specialized AI reason about it.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal">
              A cross-functional operations engine where <strong>Sales</strong>, <strong>Inventory</strong>, and <strong>Finance</strong> agents observe real-time ground truth, exchange structured Pydantic contracts, and solve complex business trade-offs with zero hallucinations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <span>Enter Workspace (CEO Rahul)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenDeploymentGuide}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-medium text-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 transition-all flex items-center justify-center space-x-2"
              >
                <span>Free Cloud Deploy (Neon + Render + Vercel)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="bento" className="py-20 px-6 border-t border-white/[0.06] bg-[#050811]/70">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Architected for Verifiable Operations
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto">
                No hallucinated calculations. Every decision is grounded in real SQL data and solved via mathematical linear optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bento Card 1 */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-indigo-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-md">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Horizontal Multi-Agent Pipeline</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Real-time visual node graph showing how CEO directives travel from the Orchestrator to Sales, Inventory, and Finance agents simultaneously.
                </p>
              </div>

              {/* Bento Card 2 */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-cyan-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-md">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Hot-Swappable Foundation Models</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Swap models per agent on the fly. Assign Gemini 2.0 Flash to Sales, GPT-4o Mini to Inventory, and Gemini 1.5 Pro to Finance.
                </p>
              </div>

              {/* Bento Card 3 */}
              <div className="glass-panel rounded-3xl p-7 space-y-4 border border-white/[0.08] hover:border-emerald-500/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-md">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Constrained Integer Math Solver</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Mathematical optimization guarantees procurement allocations respect the ₹5,00,000 statutory cash buffer and supplier capacities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#02050c] py-12 px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-zinc-300">NEXUS Autonomous Operations 2.0</span>
          </div>
          <div>Engineered for HackVilla 2026 • 100% Free Hosting Ready</div>
        </div>
      </footer>
    </div>
  );
};
