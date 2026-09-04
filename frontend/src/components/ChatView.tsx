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
  Truck,
  RotateCcw,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
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
  currentQuery?: string;
  isSidebarExpanded?: boolean;
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
  currentQuery,
  isSidebarExpanded = false,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [showThinking, setShowThinking] = useState(true);
  const [actionStatus, setActionStatus] = useState<'IDLE' | 'APPROVED' | 'REJECTED'>('IDLE');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const defaultUserQuery =
    'We are experiencing an intermittent 504 gateway timeout, memory spike in Kubernetes auth microservice, and a potential Q3 stockout on 750 Future Trend TVs. Can you analyze symptoms, run OR-Tools integer solver, and generate an immediate mitigation plan with observability script?';

  const promptSuggestions = [
    { title: 'Resolve P100 Viral Surge', desc: 'Simulate +70.6% demand spike on UltraGlide Mouse' },
    { title: 'Kubernetes Ingress p99 Triage', desc: 'Correlate 504s with Envoy buffer exhaustion' },
    { title: 'Supplier B Net-30 Analysis', desc: 'Audit credit lines, ₹1.8L spend cap & 3d SLA' },
    { title: 'Query Sales DB Ground Truth', desc: 'Inspect 5,229 historical order velocity records' },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSendMessage(inputQuery);
    setInputQuery('');
    setActionStatus('IDLE');
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

  const handleCopyCodeSnippet = () => {
    navigator.clipboard.writeText(`#!/usr/bin/env bash\nset -euo pipefail\nNAMESPACE="production"\nDEPLOYMENT="auth-microservice"\nkubectl top pods -n "$NAMESPACE" -l app="$DEPLOYMENT" --sort-by=memory\nkubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=200 | grep " 504 " | head -n 10`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.orchestrator_summary);
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto px-4 justify-between relative select-none font-sans">
      {/* Scrollable Conversation Content Area */}
      <div className="flex-1 overflow-y-auto space-y-8 pr-2 pb-36 pt-4">
        {/* ================= 1. EMPTY STATE HERO (Exact Match to Stitch Desktop AI Chat) ================= */}
        {!response && !isLoading && (
          <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-300">
            {/* Center Heading */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#282A2C] border border-white/10 text-[#A8C7FA] text-xs font-mono">
                <span className="material-symbols-outlined text-sm">spark</span>
                <span>Executive AI Copilot Ready</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
                Your move, {user.name}!
              </h1>
              <p className="text-xs sm:text-sm text-[#C4C7C5] max-w-lg mx-auto leading-relaxed">
                Nexus Autonomous Copilot connected to {user.company} database, Kubernetes telemetry, and mathematical integer optimizer.
              </p>
            </div>

            {/* Quick Prompt Suggestion Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full pt-2">
              {promptSuggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(item.title)}
                  className="p-4 rounded-2xl bg-[#1E1F20] hover:bg-[#282A2C] border border-white/10 hover:border-[#A8C7FA]/40 text-left transition-all group flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#A8C7FA] transition-colors">
                      <span className="material-symbols-outlined text-sm text-[#A8C7FA]">spark</span>
                      <span>{item.title}</span>
                    </div>
                    <div className="text-[11px] text-[#747775]">{item.desc}</div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#747775] group-hover:text-[#A8C7FA] group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= 2. LOADING STATE ================= */}
        {isLoading && (
          <div className="rounded-2xl bg-[#1E1F20] p-6 border border-[#A8C7FA]/40 space-y-4 animate-pulse mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8C7FA]/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-[#A8C7FA] animate-spin" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">AI Orchestrator Coordinating Swarm...</div>
                <div className="text-xs text-[#747775]">Sales, Inventory, and Finance agents auditing ground-truth database & OR-Tools</div>
              </div>
            </div>
            <div className="h-1.5 bg-[#0F0F10] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#A8C7FA] via-[#C2E7FF] to-emerald-400 w-3/4 animate-pulse" />
            </div>
          </div>
        )}

        {/* ================= 3. ACTIVE CONVERSATION THREAD (Exact Match to Stitch Screens 2, 3 & 4) ================= */}
        {response && !isLoading && (
          <div className="space-y-8 animate-in fade-in duration-300 pt-2">
            {/* 1. USER MESSAGE (Exact Match to Stitch Screen 2 & 4) */}
            <article className="flex items-start gap-3 justify-end">
              <div className="max-w-2xl bg-[#2a2a2a] text-white rounded-2xl rounded-tr-sm px-5 py-4 border border-white/10 shadow-sm">
                <div className="text-[10px] font-mono text-[#A8C7FA] mb-1 font-semibold flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{user.name} ({user.role} • {user.company})</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#E3E3E3]">
                  {currentQuery || defaultUserQuery}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-1 border border-emerald-500/40 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </article>

            {/* 2. ASSISTANT MESSAGE */}
            <article className="flex items-start gap-3.5 justify-start group">
              {/* Sparkle AI Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0054CD] to-[#1E1F20] flex items-center justify-center text-[#A8C7FA] border border-white/10 shrink-0 mt-1 shadow-sm">
                <span className="material-symbols-outlined text-base text-[#A8C7FA]">spark</span>
              </div>

              {/* Message Body */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Reasoning Disclosure Step Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowThinking(!showThinking)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#282A2C]/90 border border-[#A8C7FA]/30 text-[#A8C7FA] text-xs font-mono hover:bg-[#393939] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span>
                    <span>Thought for 3.4 seconds • Multi-hop log correlation & OR-Tools integer derivation</span>
                    <span className="material-symbols-outlined text-xs">
                      {showThinking ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {/* Collapsible Multi-Agent Evidence */}
                  {showThinking && (
                    <div className="p-4 rounded-2xl bg-[#1E1F20] border border-white/10 space-y-3 text-xs font-mono animate-in fade-in duration-150">
                      {/* Sales Agent Evidence */}
                      <div className="p-3 rounded-xl bg-[#091610] border border-emerald-500/20 space-y-1.5">
                        <div className="flex justify-between items-center text-emerald-400 font-bold">
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Sales Agent Evidence ({modelConfig.sales_agent_model})</span>
                          </span>
                          <span className="text-[10px] bg-emerald-950 px-2 py-0.2 rounded text-emerald-300">
                            +70.6% Surge Forecast
                          </span>
                        </div>
                        <div className="text-[#C4C7C5] space-y-0.5 text-[11px]">
                          {response.sales_evidence.rationale.map((r, idx) => (
                            <div key={idx}>• {r}</div>
                          ))}
                        </div>
                      </div>

                      {/* Inventory Agent Evidence */}
                      <div className="p-3 rounded-xl bg-[#1a1408] border border-amber-500/20 space-y-1.5">
                        <div className="flex justify-between items-center text-amber-400 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5" />
                            <span>Inventory Agent Evidence ({modelConfig.inventory_agent_model})</span>
                          </span>
                          <span className="text-[10px] bg-amber-950 px-2 py-0.2 rounded text-amber-300">
                            1.17 Days Depletion Horizon
                          </span>
                        </div>
                        <div className="text-[#C4C7C5] space-y-0.5 text-[11px]">
                          {response.inventory_evidence.rationale.map((r, idx) => (
                            <div key={idx}>• {r}</div>
                          ))}
                        </div>
                      </div>

                      {/* Finance Agent Evidence */}
                      <div className="p-3 rounded-xl bg-[#08151f] border border-cyan-500/20 space-y-1.5">
                        <div className="flex justify-between items-center text-[#A8C7FA] font-bold">
                          <span className="flex items-center gap-1.5">
                            <IndianRupee className="w-3.5 h-3.5" />
                            <span>Finance Agent Evidence ({modelConfig.finance_agent_model})</span>
                          </span>
                          <span className="text-[10px] bg-cyan-950 px-2 py-0.2 rounded text-cyan-300">
                            ₹1.80L Safe Cap • ₹5.0L Lock
                          </span>
                        </div>
                        <div className="text-[#C4C7C5] space-y-0.5 text-[11px]">
                          {response.finance_evidence.rationale.map((r, idx) => (
                            <div key={idx}>• {r}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assistant Synthesis Summary */}
                <div className="space-y-3 text-white text-xs sm:text-sm leading-relaxed">
                  <p>
                    Based on the coexistence of <strong className="text-[#A8C7FA] font-medium">504 Gateway Timeouts</strong>, rapid <strong className="text-[#A8C7FA] font-medium">RAM escalation</strong>, and the 70.6% Q3 demand surge on product P100, the primary culprit is an upstream connection pool starvation coupled with inventory depletion within 1.17 days.
                  </p>
                  <p className="text-[#C4C7C5]">
                    {response.orchestrator_summary}
                  </p>
                </div>

                {/* ================= EXACT STITCH MITIGATION CHECKLIST (Matching Screen 2) ================= */}
                <div className="bg-[#1E1F20] rounded-2xl border border-white/10 p-4 sm:p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#A8C7FA] text-xl">task_alt</span>
                      <div>
                        <h3 className="font-semibold text-white text-xs sm:text-sm">Immediate Incident Mitigation Plan</h3>
                        <p className="text-[11px] text-[#747775]">Targeted triaging steps for kubernetes pod stabilization & stockout recovery</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#393939] text-white border border-white/10">
                      P0 Action Items
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#202020]/70 hover:bg-[#202020] border border-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[#A8C7FA] text-lg mt-0.5">check_circle</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white">Bump Horizontal Pod Autoscaler (HPA) Floor</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#393939] text-[#A8C7FA]">Applied</span>
                        </div>
                        <p className="text-[11px] text-[#747775] mt-0.5">Scale minimum replicas from 4 to 12 immediately to disperse connection contention across nodes.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#202020]/70 hover:bg-[#202020] border border-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[#A8C7FA] text-lg mt-0.5">check_circle</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white">Enable Ingress Upstream Circuit Breaking</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#393939] text-[#A8C7FA]">Active</span>
                        </div>
                        <p className="text-[11px] text-[#747775] mt-0.5">Short-circuit pending requests with 429 status code instead of letting backend pods queue to death.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#202020]/70 hover:bg-[#202020] border border-white/5 transition-colors">
                      <span className="material-symbols-outlined text-[#747775] text-lg mt-0.5">radio_button_unchecked</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-white">Execute Mathematical Split Purchase Order (845 Units)</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131314] text-amber-400 border border-white/10">
                            {actionStatus === 'APPROVED' ? 'Dispatched' : 'Awaiting Sign-off'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#747775] mt-0.5">Dispatched to Supplier B (400u Net-30) + Supplier C (445u Adv) under ₹1.80L cash cap.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= OR-TOOLS PURCHASE ORDER DECISION MATRIX ================= */}
                <div className="bg-[#1E1F20] rounded-2xl border-2 border-[#A8C7FA]/40 p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#A8C7FA]" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          OR-Tools Constrained Decision Matrix
                        </h4>
                        <p className="text-[11px] text-[#747775]">Deterministic Integer Linear Programming • Zero Hallucination</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                      Mathematically Feasible
                    </span>
                  </div>

                  {/* Supplier Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {response.decision_output.allocation_plan.map((alloc) => (
                      <div
                        key={alloc.supplier_id}
                        className="bg-[#131314] border border-white/10 rounded-xl p-3.5 space-y-1.5 font-mono text-xs shadow-inner"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-white flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#A8C7FA]" />
                            <span>{alloc.supplier_name}</span>
                          </span>
                          <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            {alloc.allocated_units} Units
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#C4C7C5] pt-1">
                          <div>SLA: <span className="text-white font-medium">{alloc.lead_time_days} days</span></div>
                          <div>Unit: <span className="text-white font-medium">₹{alloc.unit_cost}</span></div>
                          <div>Terms: <span className="text-[#A8C7FA] font-medium">{alloc.payment_terms}</span></div>
                          <div>Upfront: <span className="text-emerald-400 font-medium">₹{alloc.upfront_cash_required.toLocaleString()}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Impact Summary & Sign-off */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-white/10 gap-3">
                    <div className="text-xs font-mono space-y-0.5 w-full sm:w-auto">
                      <div className="text-[#C4C7C5]">
                        Total Procurement: <span className="text-white font-bold">₹{response.decision_output.total_procurement_cost.toLocaleString()}</span>
                      </div>
                      <div className="text-emerald-400 font-medium">
                        Liquid Upfront Impact: ₹{response.decision_output.total_upfront_cash_impact.toLocaleString()} <span className="text-[#747775]">(≤ ₹1.80L cap)</span>
                      </div>
                    </div>

                    {actionStatus === 'IDLE' ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleApprove}
                          className="flex-1 sm:flex-initial px-5 py-2 rounded-full bg-[#C2E7FF] hover:bg-[#A8C7FA] text-[#001E2C] font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Dispatch PO</span>
                        </button>
                        <button
                          onClick={handleReject}
                          className="p-2 rounded-full bg-[#131314] hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-[#C4C7C5] hover:text-rose-300 transition-all cursor-pointer"
                          title="Reject proposal"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : actionStatus === 'APPROVED' ? (
                      <div className="px-4 py-2 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Signed off by {user.role} ({user.name}) • PO Dispatched</span>
                      </div>
                    ) : (
                      <div className="px-4 py-2 rounded-full bg-rose-950 border border-rose-600 text-rose-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Proposal Rejected by {user.role}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ================= HIGH-FIDELITY CODE BLOCK (Exact Match to Stitch Screen 2) ================= */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F10] my-4">
                  {/* Toolbar Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E1F20] border-b border-white/10 font-mono text-xs text-[#747775]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#A8C7FA]">terminal</span>
                      <span className="text-[#C4C7C5]">k8s-auth-diagnostics.sh</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#131314] text-[#747775]">bash</span>
                    </div>
                    <button
                      onClick={handleCopyCodeSnippet}
                      className="flex items-center gap-1 text-xs text-[#C4C7C5] hover:text-white px-2.5 py-1 rounded bg-[#202020] hover:bg-[#393939] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedCode ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedCode ? 'Copied!' : 'Copy code'}</span>
                    </button>
                  </div>
                  {/* Code Viewport */}
                  <pre className="p-4 font-mono text-xs text-white overflow-x-auto leading-relaxed">
                    <code>
                      <span className="text-[#747775]">#!/usr/bin/env bash</span>{'\n'}
                      <span className="text-[#A8C7FA]">set</span> -euo pipefail{'\n\n'}
                      NAMESPACE=<span className="text-[#B2C5FF]">"production"</span>{'\n'}
                      DEPLOYMENT=<span className="text-[#B2C5FF]">"auth-microservice"</span>{'\n\n'}
                      <span className="text-[#747775]"># 1. Immediate Pod Memory Spike Inspection</span>{'\n'}
                      echo <span className="text-[#B2C5FF]">"=== Pod Top Memory Usage ==="</span>{'\n'}
                      kubectl top pods -n <span className="text-[#B2C5FF]">"$NAMESPACE"</span> -l app=<span className="text-[#B2C5FF]">"$DEPLOYMENT"</span> --sort-by=memory{'\n\n'}
                      <span className="text-[#747775]"># 2. Check for recent OOMKilled events and exit code 137</span>{'\n'}
                      echo <span className="text-[#B2C5FF]">"=== Inspecting Exit Codes and Restarts ==="</span>{'\n'}
                      kubectl get pods -n <span className="text-[#B2C5FF]">"$NAMESPACE"</span> -l app=<span className="text-[#B2C5FF]">"$DEPLOYMENT"</span> \{'\n'}
                      {'  '}-o jsonpath=<span className="text-[#B2C5FF]">'{'{range .items[*]}{.metadata.name}{"\\tRestarts: "}{.status.containerStatuses[0].restartCount}{"\\tLastState: "}{.status.containerStatuses[0].lastState.terminated.reason}{"\\n"}{end}'}'</span>{'\n\n'}
                      <span className="text-[#747775]"># 3. Stream Live 504 NGINX Ingress Error Rate</span>{'\n'}
                      echo <span className="text-[#B2C5FF]">"=== Aggregating 5xx Ingress Upstream Timeouts ==="</span>{'\n'}
                      kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=200 \{'\n'}
                      {'  '}| grep <span className="text-[#B2C5FF]">" 504 "</span> | awk <span className="text-[#B2C5FF]">'{'{print $1, $4, $7, $9}'}'</span> | head -n 10
                    </code>
                  </pre>
                </div>

                {/* Response Action Toolbar (Thumb Up, Down, Copy, Share) */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[#747775]">
                    <button className="p-1.5 rounded-full hover:bg-[#202020] hover:text-white transition-colors cursor-pointer" title="Good response">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-[#202020] hover:text-white transition-colors cursor-pointer" title="Bad response">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleCopyResponse}
                      className="p-1.5 rounded-full hover:bg-[#202020] hover:text-white transition-colors cursor-pointer"
                      title="Copy response"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onSwitchToFlow}
                      className="ml-2 px-3 py-1 rounded-full bg-[#1E1F20] hover:bg-[#282A2C] border border-white/10 text-[#A8C7FA] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Workflow className="w-3 h-3" />
                      <span>Inspect in Swarm Studio Canvas</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* ================= FIXED FLOATING PROMPT CAPSULE (Exact Match to Stitch Screen 2 & 4) ================= */}
      <div
        className={`fixed bottom-0 right-0 p-4 bg-gradient-to-t from-[#131313] via-[#131313]/90 to-transparent z-40 transition-all duration-300 ${
          isSidebarExpanded ? 'left-72' : 'left-16'
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSend}
            className="bg-[#282A2C]/95 backdrop-blur-xl border border-white/15 rounded-full p-2 pl-4 pr-3 shadow-2xl flex items-center gap-3 focus-within:border-[#A8C7FA] focus-within:ring-2 focus-within:ring-[#A8C7FA]/20 transition-all"
          >
            <button
              type="button"
              onClick={() => onSendMessage(promptSuggestions[0].title)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#C4C7C5] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Add attachment / tool"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Nexus or type @ to mention an IT / supply chain tool..."
              className="flex-1 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder:text-[#747775] font-medium"
            />

            {/* Model Selector in Prompt Capsule */}
            <button
              type="button"
              onClick={() => onOpenModelModal('orchestrator')}
              className="px-3 py-1 rounded-full bg-[#1E1F20] hover:bg-[#393939] border border-white/10 text-xs font-mono text-[#A8C7FA] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#A8C7FA]" />
              <span>Flash</span>
              <span className="material-symbols-outlined text-xs text-[#747775]">expand_more</span>
            </button>

            <button
              type="button"
              onClick={() => onSendMessage('Resolve P100 Viral Demand Spike')}
              className="p-1.5 rounded-full text-[#747775] hover:text-white transition-colors cursor-pointer shrink-0"
              title="Voice Input"
            >
              <span className="material-symbols-outlined text-base">mic</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="w-8 h-8 rounded-full bg-[#C2E7FF] hover:bg-[#A8C7FA] text-[#001E2C] flex items-center justify-center shadow-md transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shrink-0"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#001E2C]" />
              ) : (
                <span className="material-symbols-outlined text-sm font-bold">arrow_upward</span>
              )}
            </button>
          </form>
          <div className="text-center text-[10px] text-[#747775] mt-1.5 font-mono">
            Nexus AI can execute multi-agent actions. Always verify mission-critical purchase orders.
          </div>
        </div>
      </div>
    </div>
  );
};
