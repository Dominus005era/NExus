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
  Share2,
  HelpCircle,
  Copy,
  Brain,
  Code2,
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
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`nexus cluster inspect --namespace prod-eu-west --trace-window 15m\n[ACTION TAKEN] Applying dynamic ring-buffer patch and routing ingress spillover to fallback zone.`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex-1 bg-[#131313] text-[#E3E3E3] antialiased selection:bg-[#A8C7FA]/30 selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* ================= TOP APP BAR ================= */}
      <header className="sticky top-0 z-50 bg-[#131313]/90 backdrop-blur-md border-b border-white/[0.08] w-full">
        <div className="relative flex justify-between items-center w-full px-6 md:px-12 py-3.5 max-w-7xl mx-auto">
          {/* Brand Logo Anchor */}
          <div className="flex items-center gap-2 group cursor-pointer z-10" onClick={onGetStarted}>
            <span className="material-symbols-outlined text-[#A8C7FA] group-hover:rotate-45 transition-transform duration-300">
              spark
            </span>
            <span className="text-xl font-semibold text-white tracking-tight">
              Nexus AI
            </span>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1E1F20] text-[#A8C7FA] border border-white/10 font-semibold">
              v2.5 Frontier
            </span>
          </div>

          {/* Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#C4C7C5] absolute left-1/2 -translate-x-1/2">
            <a href="#models" className="hover:text-white transition-colors pb-1">Models</a>
            <a href="#capabilities" className="hover:text-white transition-colors pb-1">Capabilities</a>
            <a href="#research" className="hover:text-white transition-colors pb-1">Research</a>
            <a href="#benchmarks" className="hover:text-white transition-colors pb-1">Benchmarks</a>
            <a href="#safety" className="hover:text-white transition-colors pb-1">Safety</a>
            <button
              onClick={onOpenDeploymentGuide}
              className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>100% Free Live Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Trailing Icon & Primary Actions */}
          <div className="flex items-center gap-2.5 z-10">
            <button
              onClick={onGetStarted}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[#C4C7C5] hover:text-white border border-white/10 hover:border-white/20 bg-[#1E1F20] hover:bg-[#282A2C] transition-all text-xs font-medium cursor-pointer"
            >
              Launch Workspace
            </button>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#C2E7FF] text-[#001E2C] hover:bg-[#A8C7FA] transition-all text-xs font-semibold shadow-sm cursor-pointer active:scale-95"
            >
              Try Nexus
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main className="flex-1 w-full">
        <section className="relative pt-16 pb-20 px-6 md:px-10 overflow-hidden">
          {/* Atmospheric Gradient Backdrops */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-[#0054CD]/20 via-[#A8C7FA]/10 to-transparent blur-3xl opacity-40 -z-10" />
          <div className="pointer-events-none absolute top-32 left-1/4 w-[350px] h-[350px] bg-[#B2C5FF]/5 blur-[100px] rounded-full -z-10" />

          <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#282A2C] border border-white/10 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#A8C7FA] animate-ping" />
              <span className="w-2 h-2 -ml-3.5 rounded-full bg-[#A8C7FA]" />
              <span className="text-[#C4C7C5] text-xs font-mono">Nexus 2.5 Series • Now Available</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.08] max-w-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F1F5F9] to-[#94A3B8]">
              Nexus <span className="text-[#747775] font-light">—</span> Frontier intelligence with action
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#C4C7C5] max-w-2xl mb-8 leading-relaxed font-normal">
              Built from the ground up for agentic execution, multi-turn reasoning, and complex systems diagnostics. Designed to transform how engineers build, operate, and solve business trade-offs.
            </p>

            {/* Primary CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-8">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#C2E7FF] text-[#001E2C] hover:bg-[#A8C7FA] transition-all font-semibold text-xs shadow-lg shadow-[#A8C7FA]/15 group cursor-pointer active:scale-95"
              >
                <span>Try Nexus Chat</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <a
                href="#models"
                className="px-6 py-3 rounded-full bg-[#1E1F20] border border-white/10 hover:border-white/20 text-white hover:bg-[#282A2C] transition-all text-xs font-semibold"
              >
                Explore Models
              </a>
            </div>

            {/* Teaser Note */}
            <p className="text-[#747775] text-[11px] font-mono -mt-4 mb-10">
              Launches Desktop Nexus AI Chat Interface • Instant zero-setup sandbox
            </p>

            {/* HERO ARTIFACT: Glassmorphic Interactive Preview Teaser */}
            <div className="w-full max-w-4xl rounded-2xl bg-[#1E1F20]/75 backdrop-blur-xl border border-white/10 shadow-2xl p-4 sm:p-6 text-left overflow-hidden">
              {/* Terminal / Window Chrome */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-4 bg-[#131314]/60 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="text-[#747775] font-mono text-[11px] ml-2 hidden sm:inline">
                    nexus-session-v2.5-pro • telemetry: 42ms TTFT • Neon DB Connected
                  </span>
                </div>
                {/* Model Selector Pill in Teaser */}
                <div
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#282A2C] border border-white/10 text-white text-xs font-mono cursor-pointer hover:border-[#A8C7FA]/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#A8C7FA] text-sm">neurology</span>
                  <span>Nexus 2.5 Pro</span>
                  <span className="material-symbols-outlined text-xs text-[#747775]">expand_more</span>
                </div>
              </div>

              {/* Chat Teaser Stage */}
              <div className="space-y-4 px-1 pb-2">
                {/* User Prompt */}
                <div className="flex items-start gap-3 max-w-2xl ml-auto justify-end">
                  <div className="bg-[#282A2C] border border-white/10 rounded-2xl rounded-tr-sm px-4 py-3 text-[#E3E3E3] text-xs sm:text-sm leading-relaxed">
                    Analyze high p99 latency in production Kubernetes ingress cluster. Generate root-cause graph, verify rollback safety, and optimize purchase orders within ₹1.80L cash cap.
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#393939] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#C4C7C5] text-sm">person</span>
                  </div>
                </div>

                {/* Assistant Reasoning Accordion */}
                <div className="flex items-start gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-[#A8C7FA]/20 border border-[#A8C7FA]/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#A8C7FA] text-sm">spark</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    {/* Reasoning Disclosure Step */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#282A2C]/80 border border-[#A8C7FA]/30 text-[#A8C7FA] text-xs font-mono">
                      <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span>
                      <span>Thought for 3.4 seconds • Multi-hop log correlation & OR-Tools integer solver</span>
                      <span className="material-symbols-outlined text-xs">expand_less</span>
                    </div>

                    {/* Code block with action toolbar */}
                    <div className="rounded-xl bg-[#0F0F10] border border-white/10 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#1E1F20] border-b border-white/10 font-mono text-xs text-[#747775]">
                        <span className="flex items-center gap-1.5 text-[#C4C7C5]">
                          <span className="material-symbols-outlined text-xs text-[#A8C7FA]">terminal</span>
                          diagnostics.sh (Auto-remediation & PO playbook)
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer text-[#C4C7C5]"
                        >
                          <span className="material-symbols-outlined text-xs">
                            {copiedCode ? 'check' : 'content_copy'}
                          </span>
                          <span>{copiedCode ? 'Copied' : 'Copy code'}</span>
                        </button>
                      </div>
                      <pre className="p-4 text-white font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>
                          <span className="text-[#8c9196]"># Nexus autonomous diagnostic daemon</span>{'\n'}
                          $ nexus cluster inspect --namespace prod-eu-west --trace-window 15m{'\n'}
                          <span className="text-[#747775]">✔ Correlating Envoy buffer overflows with Node pool c5.4xlarge throttles</span>{'\n'}
                          <span className="text-[#A8C7FA]">[ACTION TAKEN]</span> Applying dynamic ring-buffer patch and routing ingress spillover to fallback zone.{'\n'}
                          <span className="text-emerald-400">[OR-TOOLS SOLVER]</span> Purchase order split: 400 units (Net-30) + 445 units (Advance).
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Floating Prompt Capsule Preview Mock */}
                <div className="pt-2">
                  <div className="bg-[#282A2C]/90 backdrop-blur-md rounded-full border border-white/15 p-1.5 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2 pl-3 text-[#747775] text-xs truncate">
                      <span className="material-symbols-outlined text-sm">attach_file</span>
                      <span className="truncate">Ask Nexus to orchestrate scripts, run evals, or solve supply chain trade-offs...</span>
                    </div>
                    <div className="flex items-center gap-2 pr-1">
                      <div className="px-2.5 py-0.5 rounded-full bg-[#1E1F20] border border-white/10 text-[#C4C7C5] text-[10px] font-mono">
                        ⌘K Tools
                      </div>
                      <button
                        onClick={onGetStarted}
                        className="w-7 h-7 rounded-full bg-[#C2E7FF] text-[#001E2C] flex items-center justify-center hover:bg-[#A8C7FA] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs font-bold">arrow_upward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODEL LINEUP SECTION ================= */}
        <section className="py-20 px-6 md:px-10 bg-[#131314] border-t border-white/[0.08]" id="models">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-[#A8C7FA] inline-flex items-center gap-1.5 mb-2 font-mono text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7FA]" />
                  FRONTIER ARCHITECTURES
                </div>
                <h2 className="text-3xl sm:text-4xl text-white font-semibold tracking-[-0.025em]">
                  Explore the Nexus Models
                </h2>
                <p className="text-[#C4C7C5] mt-1 max-w-xl text-xs sm:text-sm leading-relaxed">
                  From low-latency execution to trillion-parameter architectural reasoning, discover the right model configuration for your workflow.
                </p>
              </div>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-1 text-[#A8C7FA] hover:underline text-xs font-semibold cursor-pointer"
              >
                <span>Compare full benchmark evaluations</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </button>
            </div>

            {/* 3 Model Tier Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Nexus 2.5 Pro (Featured) */}
              <div className="relative rounded-2xl bg-[#1E1F20] border border-[#A8C7FA]/40 p-6 flex flex-col justify-between hover:border-[#A8C7FA] transition-all duration-300 shadow-xl group">
                <div className="absolute -top-3 right-6 bg-[#A8C7FA] text-[#001E2C] px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider">
                  Most Popular
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#A8C7FA]">psychology</span>
                    <h3 className="text-lg font-semibold text-white">Nexus 2.5 Pro</h3>
                  </div>
                  <p className="text-[#C4C7C5] text-xs mb-6 leading-relaxed">
                    Best for complex reasoning, architectural design, and deep codebase telemetry analysis. Excels in long-running agentic tasks.
                  </p>
                  {/* Specs */}
                  <div className="space-y-2 border-y border-white/10 py-4 mb-6 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Context Window</span>
                      <span className="text-white font-medium">2M Tokens</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Reasoning Mode</span>
                      <span className="text-[#A8C7FA] font-medium">Native Multimodal CoT</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Tool Integration</span>
                      <span className="text-white font-medium">Parallel Function Calling</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Architecture</span>
                      <span className="text-[#747775] font-medium">Mixture of Experts (MoE)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#C2E7FF] text-[#001E2C] hover:bg-[#A8C7FA] font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>Launch in Nexus Chat</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

              {/* Nexus 2.5 Flash */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#B2C5FF]">bolt</span>
                    <h3 className="text-lg font-semibold text-white">Nexus 2.5 Flash</h3>
                  </div>
                  <p className="text-[#C4C7C5] text-xs mb-6 leading-relaxed">
                    Built for high-throughput execution, ultra-low latency queries, and rapid tool calling across high-volume pipelines.
                  </p>
                  {/* Specs */}
                  <div className="space-y-2 border-y border-white/10 py-4 mb-6 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Context Window</span>
                      <span className="text-white font-medium">1M Tokens</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>TTFT Latency</span>
                      <span className="text-emerald-400 font-medium">&lt; 180ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Cost Efficiency</span>
                      <span className="text-white font-medium">10x Optimized</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Throughput</span>
                      <span className="text-[#747775] font-medium">High-Concurrency Streaming</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1E1F20] border border-white/15 text-white hover:bg-[#282A2C] font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>Launch in Nexus Chat</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

              {/* Nexus 3.1 Deep Think */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-amber-400">precision_manufacturing</span>
                    <h3 className="text-lg font-semibold text-white">Nexus 3.1 Deep Think</h3>
                  </div>
                  <p className="text-[#C4C7C5] text-xs mb-6 leading-relaxed">
                    Specialized in mathematical formal verification, self-correcting DAG logic, and deterministic OR-Tools integer optimization.
                  </p>
                  {/* Specs */}
                  <div className="space-y-2 border-y border-white/10 py-4 mb-6 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Context Window</span>
                      <span className="text-white font-medium">4M Tokens</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Constraint Engine</span>
                      <span className="text-amber-300 font-medium">Google OR-Tools v9.8</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Verification Mode</span>
                      <span className="text-white font-medium">Formal Sandbox Execution</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C4C7C5]">
                      <span>Search Method</span>
                      <span className="text-[#747775] font-medium">Tree-of-Thought RL</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1E1F20] border border-white/15 text-white hover:bg-[#282A2C] font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>Launch in Swarm Studio</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CAPABILITIES BENTO GRID ================= */}
        <section className="py-20 px-6 md:px-10 bg-[#131313] border-t border-white/[0.08]" id="capabilities">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <div className="text-[#A8C7FA] inline-flex items-center gap-1.5 font-mono text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7FA]" />
                AUTONOMOUS SYSTEM CAPABILITIES
              </div>
              <h2 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight">
                Architected for Verifiable Operations
              </h2>
              <p className="text-[#C4C7C5] text-xs sm:text-sm max-w-xl mx-auto">
                No hallucinated calculations. Every decision is grounded in real SQL data and solved via mathematical linear optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 p-7 space-y-3 hover:border-[#A8C7FA]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#A8C7FA]/10 border border-[#A8C7FA]/20 text-[#A8C7FA] flex items-center justify-center">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h3 className="text-base font-semibold text-white">Agentic Strategy Orchestration</h3>
                <p className="text-xs text-[#C4C7C5] leading-relaxed">
                  Real-time multi-agent coordination with hierarchical sub-agents (Sales, Inventory, Finance, Suppliers) communicating via strict Pydantic schemas.
                </p>
                <div className="pt-1 text-[11px] font-mono text-[#A8C7FA] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#A8C7FA]" />
                  <span>3 Specialized Agents • Swarm Latency &lt; 12ms</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 p-7 space-y-3 hover:border-[#A8C7FA]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#B2C5FF]/10 border border-[#B2C5FF]/20 text-[#B2C5FF] flex items-center justify-center">
                  <span className="material-symbols-outlined">account_tree</span>
                </div>
                <h3 className="text-base font-semibold text-white">Non-Linear Reasoning & Backtracking</h3>
                <p className="text-xs text-[#C4C7C5] leading-relaxed">
                  Tree-of-thought DAG planner with rollback capability, adaptive self-correction, and chronological audit trail logging across all stages.
                </p>
                <div className="pt-1 text-[11px] font-mono text-[#B2C5FF] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B2C5FF]" />
                  <span>DAG Depth: 4 Nodes • Backtrack Capable</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 p-7 space-y-3 hover:border-[#A8C7FA]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <h3 className="text-base font-semibold text-white">Dynamic Tools & Neon PostgreSQL Integration</h3>
                <p className="text-xs text-[#C4C7C5] leading-relaxed">
                  Plug-and-play API tool calling for ERP, Neon Cloud PostgreSQL, SAP, Shopify, and custom webhooks with strict RBAC permission racks.
                </p>
                <div className="pt-1 text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Neon PostgreSQL • REST APIs • Document Racks</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl bg-[#1E1F20] border border-white/10 p-7 space-y-3 hover:border-emerald-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h3 className="text-base font-semibold text-white">Zero-Hallucination Integer Linear Solver</h3>
                <p className="text-xs text-[#C4C7C5] leading-relaxed">
                  Deterministic mathematical constraint solver (Google OR-Tools) guarantees allocations respect statutory liquidity and supplier caps.
                </p>
                <div className="pt-1 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Exact Integer Linear Programming (ILP)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENCHMARKS RIBBON ================= */}
        <section className="py-14 px-6 md:px-10 bg-[#131314] border-t border-white/[0.08]" id="benchmarks">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl bg-[#1E1F20] p-8 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-semibold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#A8C7FA] to-[#B2C5FF]">
                  91.4%
                </div>
                <div className="text-[11px] text-[#747775] font-mono">SWE-bench Verified</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-semibold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#B2C5FF] to-[#C2E7FF]">
                  89.8%
                </div>
                <div className="text-[11px] text-[#747775] font-mono">GPQA Diamond Score</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-semibold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#C2E7FF] to-[#A8C7FA]">
                  4.0M
                </div>
                <div className="text-[11px] text-[#747775] font-mono">Production Context</div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-semibold text-white font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                  99.7%
                </div>
                <div className="text-[11px] text-[#747775] font-mono">Constraint Feasibility</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section className="py-20 px-6 md:px-10 bg-[#0e0e0e] border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Ready to experience Nexus?
            </h2>
            <p className="text-xs sm:text-sm text-[#C4C7C5] max-w-lg mx-auto leading-relaxed">
              Get instant access to autonomous enterprise workflows and state-of-the-art multi-agent swarm orchestration.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter enterprise email..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#1E1F20] border border-white/10 text-white text-xs focus:outline-none focus:border-[#A8C7FA] font-mono placeholder:text-[#747775]"
              />
              <button
                type="button"
                onClick={onGetStarted}
                className="px-6 py-2.5 rounded-full bg-[#C2E7FF] hover:bg-[#A8C7FA] text-[#001E2C] font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{subscribed ? 'Access Granted' : 'Get Started Free'}</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/[0.08] bg-[#0c0d10] py-8 px-6 text-xs text-[#747775]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#A8C7FA] text-sm">spark</span>
            <span className="font-semibold text-[#E3E3E3]">Nexus Autonomous Operating System 2.0</span>
          </div>
          <div className="font-mono text-[11px]">
            Built for Frontier AI Safety • HackVilla 2026 • 100% Free Hosting Ready
          </div>
        </div>
      </footer>
    </div>
  );
};
