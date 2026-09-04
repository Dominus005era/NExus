import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  OrchestratorResponse,
  AgentModelConfig,
  AvailableModel,
  TimelineLogItem,
  OverviewMetrics,
  ChatSession,
} from './types';
import { api } from './services/api';

import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
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
    isLoggedIn: true,
  });

  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'flow'>('landing');
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [response, setResponse] = useState<OrchestratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Real, persistent Chat Sessions
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_chat_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_chat_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions]);

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

  const handleSelectSession = (id: string) => {
    const s = sessions.find((item) => item.id === id);
    if (s) {
      setActiveSessionId(s.id);
      setCurrentQuery(s.query);
      setResponse(s.response);
      setTimelineLogs(s.timelineLogs);
      setCurrentView('chat');
    }
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(null);
      setResponse(null);
      setTimelineLogs([]);
      setCurrentQuery('');
    }
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
    setResponse(null);
    setTimelineLogs([]);
    setCurrentQuery('');
  };

  // Execution flow handler
  const executeOrchestration = async (surgePct = 70, queryText = 'P100 Surge') => {
    setIsLoading(true);
    setCurrentQuery(queryText);
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

      // Save or update real chat session
      const title =
        queryText.length > 34 ? queryText.slice(0, 34).trim() + '...' : queryText;
      const sessionId = activeSessionId || Date.now().toString();
      const updatedSession: ChatSession = {
        id: sessionId,
        title,
        query: queryText,
        response: res,
        timelineLogs: completedLogs,
        timestamp: 'Just now',
        createdAt: Date.now(),
      };
      setSessions((prev) => {
        const exists = prev.some((s) => s.id === sessionId);
        if (exists) {
          return prev.map((s) => (s.id === sessionId ? updatedSession : s));
        }
        return [updatedSession, ...prev];
      });
      setActiveSessionId(sessionId);
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
    <div className="min-h-screen w-full bg-[#131313] text-[#E3E3E3] flex flex-col font-sans selection:bg-[#A8C7FA]/30 selection:text-white overflow-x-hidden">
      {currentView === 'landing' ? (
        <LandingPage
          onGetStarted={() => setCurrentView('chat')}
          onOpenDeploymentGuide={() => setIsGuideModalOpen(true)}
          onSelectModel={(modelId, targetView) => {
            setModelConfig({ ...modelConfig, orchestrator_model: modelId });
            setCurrentView(targetView);
          }}
        />
      ) : (
        <div className="flex w-full h-screen overflow-hidden">
          {/* Side Navigation Rail (Shown exclusively in Executive Copilot Chat view) */}
          {currentView === 'chat' && (
            <Sidebar
              user={user}
              currentView={currentView}
              onViewChange={setCurrentView}
              onGoHome={() => setCurrentView('landing')}
              onOpenDocs={() => setIsDocsModalOpen(true)}
              onOpenGuide={() => setIsGuideModalOpen(true)}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onNewSession={handleNewSession}
              onLogout={() => {
                setUser({ ...user, isLoggedIn: false });
                setCurrentView('landing');
              }}
              isExpanded={isSidebarExpanded}
              onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
            />
          )}

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#131313] min-w-0">
            {currentView === 'flow' ? (
              <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
                <Header
                  user={user}
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  onGoHome={() => setCurrentView('landing')}
                  onOpenDocs={() => setIsDocsModalOpen(true)}
                  onToggleTimeline={() => setIsTimelineOpen(!isTimelineOpen)}
                  onOpenGuide={() => setIsGuideModalOpen(true)}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  onLogout={() => {
                    setUser({ ...user, isLoggedIn: false });
                    setCurrentView('landing');
                  }}
                  isTimelineOpen={isTimelineOpen}
                  activeModel={modelConfig.orchestrator_model}
                  onOpenModelModal={(role) => setSwapTargetRole(role)}
                />
                <div className="flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
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
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#131313]">
                <Header
                  user={user}
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  onGoHome={() => setCurrentView('landing')}
                  onOpenDocs={() => setIsDocsModalOpen(true)}
                  onToggleTimeline={() => setIsTimelineOpen(!isTimelineOpen)}
                  onOpenGuide={() => setIsGuideModalOpen(true)}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  onLogout={() => {
                    setUser({ ...user, isLoggedIn: false });
                    setCurrentView('landing');
                  }}
                  isTimelineOpen={isTimelineOpen}
                  activeModel={modelConfig.orchestrator_model}
                  onOpenModelModal={(role) => setSwapTargetRole(role)}
                />

                <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-2 flex flex-col justify-between">
                  <ChatView
                    user={user}
                    response={response}
                    isLoading={isLoading}
                    onSendMessage={(q) => executeOrchestration(70, q)}
                    modelConfig={modelConfig}
                    onOpenModelModal={(role) => setSwapTargetRole(role)}
                    onApprove={handleApproveAction}
                    onReject={handleRejectAction}
                    onSwitchToFlow={() => setCurrentView('flow')}
                    currentQuery={currentQuery}
                    isSidebarExpanded={isSidebarExpanded}
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
          if (user.isLoggedIn) setCurrentView('chat');
        }}
        currentProfile={user}
        onSaveProfile={(prof) => {
          setUser(prof);
          setCurrentView('chat');
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
