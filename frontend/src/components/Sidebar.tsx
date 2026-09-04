import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  MessageSquare,
  Workflow,
  Plus,
  FolderOpen,
  HelpCircle,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Search,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Compass,
  Trophy,
  LayoutGrid,
  Bot,
  Database,
  Code2,
} from 'lucide-react';

interface SidebarProps {
  user: UserProfile;
  currentView: 'chat' | 'flow';
  onViewChange: (view: 'chat' | 'flow') => void;
  onOpenDocs: () => void;
  onOpenGuide: () => void;
  onOpenAuth: () => void;
  onNewSession: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  currentView,
  onViewChange,
  onOpenDocs,
  onOpenGuide,
  onOpenAuth,
  onNewSession,
  onLogout,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const pastSessions = [
    { title: 'Viral Demand Surge (P100)', date: 'Today', status: 'Resolved' },
    { title: 'Supplier B Net-30 Analysis', date: 'Yesterday', status: 'Optimal' },
    { title: '+30% Marketing Simulation', date: 'Sep 2', status: 'Simulated' },
    { title: 'Q3 Buffer Cash Re-allocation', date: 'Aug 28', status: 'Approved' },
  ];

  const gemsList = [
    { name: 'Incident Copilot', desc: 'Autonomous triage & RCA' },
    { name: 'OR-Tools Integer Solver', desc: 'Deterministic PO math' },
  ];

  return (
    <aside
      className={`h-screen bg-[#1E1F20] border-r border-white/[0.08] flex flex-col justify-between p-2.5 select-none z-40 flex-shrink-0 transition-all duration-200 font-sans ${
        isExpanded ? 'w-72' : 'w-16'
      }`}
    >
      {/* Top: Sparkle Icon & Dock Navigation */}
      <div className="flex flex-col items-center space-y-2.5 w-full">
        {/* Lumina / Nexus 4-Point Sparkle Logo */}
        <div
          onClick={onNewSession}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all group"
          title="Nexus Autonomous Copilot"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-[#A8C7FA] group-hover:scale-110 transition-transform fill-[#A8C7FA]/20" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
        </div>

        {/* Sidebar Expand / Collapse Toggle (Matching Stitch Screen 2 & 5) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-xl text-[#C4C7C5] hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
          title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
        </button>

        {/* New Chat / Action Button */}
        <button
          onClick={onNewSession}
          className={`h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isExpanded
              ? 'w-full px-3 bg-[#282A2C] hover:bg-[#393939] text-white justify-between shadow-sm'
              : 'w-10 text-[#C4C7C5] hover:text-white hover:bg-white/5'
          }`}
          title="New Chat / Directive"
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-[#A8C7FA]" />
            {isExpanded && <span className="text-xs font-semibold">New chat</span>}
          </div>
        </button>

        {/* Search Icon */}
        <button
          onClick={onNewSession}
          className={`h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isExpanded
              ? 'w-full px-3 text-[#C4C7C5] hover:text-white hover:bg-white/5 justify-start space-x-2'
              : 'w-10 text-[#C4C7C5] hover:text-white hover:bg-white/5'
          }`}
          title="Search Conversations"
        >
          <Search className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-medium">Search</span>}
        </button>

        {/* Executive Chat Copilot View Switcher */}
        <button
          onClick={() => onViewChange('chat')}
          className={`h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            currentView === 'chat'
              ? 'bg-[#282A2C] text-[#A8C7FA] border border-[#A8C7FA]/40 shadow-sm'
              : 'text-[#C4C7C5] hover:text-white hover:bg-white/5'
          } ${isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'}`}
          title="Executive Copilot Chat"
        >
          <MessageSquare className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-semibold">Executive Copilot</span>}
        </button>

        {/* Agentic Swarm Studio View Switcher */}
        <button
          onClick={() => onViewChange('flow')}
          className={`h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            currentView === 'flow'
              ? 'bg-[#282A2C] text-[#FFB2B2] border border-[#EA3355]/40 shadow-sm'
              : 'text-[#C4C7C5] hover:text-white hover:bg-white/5'
          } ${isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'}`}
          title="Agentic Swarm Studio"
        >
          <Workflow className="w-5 h-5 text-[#FFB2B2]" />
          {isExpanded && <span className="text-xs font-semibold">Swarm Studio</span>}
        </button>

        {/* Document Racks (RBAC) */}
        <button
          onClick={onOpenDocs}
          className={`h-10 rounded-xl flex items-center justify-center transition-all text-[#C4C7C5] hover:text-white hover:bg-white/5 cursor-pointer ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="Department Document Racks (RBAC)"
        >
          <FolderOpen className="w-5 h-5 text-[#C2E7FF]" />
          {isExpanded && <span className="text-xs font-medium">Document Racks</span>}
        </button>

        {/* Expanded Categorized Drawer Content (Matching Stitch Screen 5) */}
        {isExpanded && (
          <div className="w-full pt-3 space-y-4 border-t border-white/5 animate-in fade-in duration-200 overflow-y-auto max-h-[calc(100vh-360px)] pr-1">
            {/* Recent Chats Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#747775] px-2 py-1 font-semibold flex items-center justify-between">
                <span>Recent Chats</span>
                <Clock className="w-3 h-3" />
              </div>
              <div className="space-y-0.5">
                {pastSessions.map((session, idx) => (
                  <div
                    key={idx}
                    onClick={onNewSession}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs text-[#C4C7C5] hover:text-white hover:bg-[#282A2C] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate max-w-[150px] text-[11px] font-medium">{session.title}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-emerald-400">
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gems & Workflows Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#747775] px-2 py-1 font-semibold flex items-center justify-between">
                <span>Gems & Workflows</span>
                <Bot className="w-3 h-3" />
              </div>
              <div className="space-y-0.5">
                {gemsList.map((gem, idx) => (
                  <div
                    key={idx}
                    onClick={onNewSession}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs text-[#C4C7C5] hover:text-white hover:bg-[#282A2C] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-semibold text-white">{gem.name}</div>
                      <div className="text-[9px] text-[#747775]">{gem.desc}</div>
                    </div>
                    <Sparkles className="w-3 h-3 text-[#A8C7FA]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Settings & User Avatar (Exact match to Stitch Screen 2 & 5) */}
      <div className="flex flex-col items-center space-y-2.5 w-full border-t border-white/5 pt-3">
        {/* Cloud Guide */}
        <button
          onClick={onOpenGuide}
          className={`h-10 rounded-xl flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300 hover:bg-white/5 cursor-pointer ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="100% Free Live Cloud Deployment Guide"
        >
          <HelpCircle className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-medium">Cloud Deploy</span>}
        </button>

        {/* Settings Gear with Blue Ping Dot */}
        <button
          onClick={onOpenAuth}
          className={`h-10 rounded-xl relative flex items-center justify-center transition-all text-[#C4C7C5] hover:text-white hover:bg-white/5 cursor-pointer ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="Settings & Role Profile"
        >
          <div className="relative">
            <Settings className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-[#A8C7FA] absolute -top-0.5 -right-0.5 shadow-sm" />
          </div>
          {isExpanded && <span className="text-xs font-medium">Settings</span>}
        </button>

        {/* User Avatar with Presence Dot */}
        {isExpanded ? (
          <div
            onClick={onOpenAuth}
            className="w-full p-2 rounded-xl bg-[#282A2C] hover:bg-[#393939] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center border border-emerald-500/40 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[130px]">{user.name}</div>
                <div className="text-[10px] text-[#A8C7FA] font-mono">{user.role} • {user.company}</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        ) : (
          <div
            onClick={onOpenAuth}
            className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center cursor-pointer shadow-md transition-all border border-emerald-500/40 relative"
            title={`${user.name} (${user.role}) - ${user.company}`}
          >
            {user.name.charAt(0).toUpperCase()}
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border border-[#1E1F20]" />
          </div>
        )}
      </div>
    </aside>
  );
};
