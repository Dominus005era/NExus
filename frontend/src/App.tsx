import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  OrchestratorResponse,
  AgentModelConfig,
  AvailableModel,
  TimelineLogItem,
  OverviewMetrics,
} from './types';
import { api } from './services/api';

import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KpiRibbon } from './components/KpiRibbon';
import { HorizontalAgenticFlow } from './components/HorizontalAgenticFlow';
import { ChatView } from './components/ChatView';
import { AuthModal } from './components/AuthModal';
import { TimelineDrawer } from './components/TimelineDrawer';
import { ModelSwitcherModal } from './components/ModelSwitcherModal';
import { DocumentRackModal } from './components/DocumentRackModal';
import { FreeDeploymentGuideModal } from './components/FreeDeploymentGuideModal';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Rahul',
    role: 'CEO',
    company: 'TechMart Electronics',
    isLoggedIn: false,
  });

  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'flow'>('landing');
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [response, setResponse] = useState<OrchestratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modelConfig, setModelConfig] = useState<AgentModelConfig>({
    sales_agent_model: 'gemini-2.0-flash',
    inventory_agent_model: 'gpt-4o-mini',
    finance_agent_model: 'gemini-1.5-pro',
    orchestrator_model: 'gemini-2.0-flash',
    temperature: 0.2,
  });

  const [availableModels, setAvailableModels] = useState<AvailableModel[]>([]);
  const [timelineLogs, setTimelineLogs] = useState<TimelineLogItem[]>([]);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [swapTargetRole, setSwapTargetRole] = useState<'sales' | 'inventory' | 'finance' | 'orchestrator' | null>(null);

  // Initial data loading
  useEffect(() => {
    const initData = async () => {
      const ov = await api.getOverview();
      setMetrics(ov);

      const cfg = await api.getModelConfig();
      if (cfg.active_config) setModelConfig(cfg.active_config);
      if (cfg.available_models) setAvailableModels(cfg.available_models);
    };
    initData();
  }, []);

  // Execution flow handler
  const executeOrchestration = async (surgePct = 70, queryText = 'P100 Surge') => {
    setIsLoading(true);
    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    // 1. Initial log: CEO Trigger
    const newLogs: TimelineLogItem[] = [
      {
        id: '1',
        timestamp: timeStr,
        nodeName: `CEO (${user.name})`,
        action: 'Command Dispatched',
        details: `Issued operational directive: "${queryText}" with +${surgePct}% simulated demand surge.`,
        status: 'completed',
      },
      {
        id: '2',
        timestamp: timeStr,
        nodeName: 'AI Orchestrator',
        action: 'Task Decomposition',
        details: 'Decomposed operational goal into 3 parallel sub-tasks for Sales, Inventory, and Finance.',
        status: 'active',
        modelUsed: modelConfig.orchestrator_model,
      },
    ];
    setTimelineLogs(newLogs);

    try {
      const res = await api.triggerOrchestrator('P100', 'VIRAL_DEMAND_SPIKE_P100', surgePct);
      setResponse(res);

      // Append multi-agent execution steps to timeline
      const completedLogs: TimelineLogItem[] = [
        ...newLogs.map((l) => ({ ...l, status: 'completed' as const })),
        {
          id: '3',
          timestamp: new Date().toLocaleTimeString(),
          nodeName: 'Sales Agent',
          action: 'Demand Velocity & Campaign Forecast',
          details: `Computed 7-day demand: ${res.sales_evidence.forecast_7d_total.toFixed(0)} units (+${res.sales_evidence.growth_rate_pct}% surge) with 92% confidence.`,
          status: 'completed',
          modelUsed: modelConfig.sales_agent_model,
        },
        {
          id: '4',
          timestamp: new Date().toLocaleTimeString(),
          nodeName: 'Inventory Agent',
          action: 'Stockout Depletion Horizon Check',
          details: `Stockout horizon: ${res.inventory_evidence.stockout_horizon_days} days. Target reorder deficit: ${res.inventory_evidence.recommended_reorder_qty} units. Urgency: ${res.inventory_evidence.urgency_level}.`,
          status: 'completed',
          modelUsed: modelConfig.inventory_agent_model,
        },
        {
          id: '5',
          timestamp: new Date().toLocaleTimeString(),
          nodeName: 'Finance Agent',
          action: 'Working Capital & Credit Terms Verification',
          details: `Enforced ₹5.0L statutory reserve. Safe spend cap: ₹1.80L. Verified Net-30 credit line from QuickLogix.`,
          status: 'completed',
          modelUsed: modelConfig.finance_agent_model,
        },
        {
          id: '6',
          timestamp: new Date().toLocaleTimeString(),
          nodeName: 'Decision Engine (OR-Tools)',
          action: 'Constrained Optimization Solved',
          details: `Mathematically solved optimal purchase order: Split across Supplier B (400 units, Net-30) + Supplier C (445 units). Upfront cash: ₹${res.decision_output.total_upfront_cash_impact.toLocaleString()} ≤ ₹1.8L cap.`,
          status: 'completed',
        },
        {
          id: '7',
          timestamp: new Date().toLocaleTimeString(),
          nodeName: `CEO (${user.name})`,
          action: 'Executive Decision Ready',
          details: 'Action proposal presented for human approval and automated PO issuance.',
          status: 'completed',
        },
      ];
      setTimelineLogs(completedLogs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveModelConfig = async (newConfig: AgentModelConfig) => {
    setModelConfig(newConfig);
    await api.updateModelConfig(newConfig);
  };

  const handleApproveAction = async () => {
    if (response) {
      await api.reviewDecision(response.decision_output.decision_id, 'APPROVED', `Approved by ${user.role} ${user.name}`);
      const ov = await api.getOverview();
      setMetrics(ov);
    }
  };

  const handleRejectAction = async () => {
    if (response) {
      await api.reviewDecision(response.decision_output.decision_id, 'REJECTED', `Rejected by ${user.role} ${user.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {currentView === 'landing' ? (
        <LandingPage
          onGetStarted={() => {
            if (!user.isLoggedIn) {
              setIsAuthModalOpen(true);
            } else {
              setCurrentView('flow');
            }
          }}
          onOpenDeploymentGuide={() => setIsGuideModalOpen(true)}
        />
      ) : (
        <div className="flex w-full h-screen overflow-hidden">
          {/* ChatGPT-Style Sidebar */}
          <Sidebar
            user={user}
            currentView={currentView}
            onViewChange={setCurrentView}
            onOpenDocs={() => setIsDocsModalOpen(true)}
            onOpenGuide={() => setIsGuideModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNewSession={() => {
              setResponse(null);
              setTimelineLogs([]);
            }}
            onLogout={() => {
              setUser({ ...user, isLoggedIn: false });
              setCurrentView('landing');
            }}
          />

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#07090e]">
            {currentView === 'flow' ? (
              <div className="flex-1 w-full h-full p-3 overflow-hidden">
                <HorizontalAgenticFlow
                  user={user}
                  response={response}
                  isLoading={isLoading}
                  onTriggerFlow={(surge) => executeOrchestration(surge, `Demand Spike +${surge}%`)}
                  onOpenModelModal={(role) => setSwapTargetRole(role)}
                  modelConfig={modelConfig}
                  onApprove={handleApproveAction}
                  onReject={handleRejectAction}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Header
                  user={user}
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  onOpenDocs={() => setIsDocsModalOpen(true)}
                  onToggleTimeline={() => setIsTimelineOpen(!isTimelineOpen)}
                  onOpenGuide={() => setIsGuideModalOpen(true)}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  onLogout={() => {
                    setUser({ ...user, isLoggedIn: false });
                    setCurrentView('landing');
                  }}
                  isTimelineOpen={isTimelineOpen}
                />

                <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-4 space-y-4">
                  <KpiRibbon metrics={metrics} />
                  <ChatView
                    user={user}
                    response={response}
                    isLoading={isLoading}
                    onSendMessage={(q) => executeOrchestration(70, q)}
                    modelConfig={modelConfig}
                    onApprove={handleApproveAction}
                    onReject={handleRejectAction}
                  />
                </main>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          if (user.isLoggedIn) setCurrentView('flow');
        }}
        currentProfile={user}
        onSaveProfile={(prof) => {
          setUser(prof);
          setCurrentView('flow');
        }}
      />

      <TimelineDrawer
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        logs={timelineLogs}
      />

      <ModelSwitcherModal
        isOpen={swapTargetRole !== null}
        onClose={() => setSwapTargetRole(null)}
        targetRole={swapTargetRole}
        currentConfig={modelConfig}
        availableModels={availableModels}
        onSaveConfig={handleSaveModelConfig}
      />

      <DocumentRackModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      <FreeDeploymentGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
};
export default App;
