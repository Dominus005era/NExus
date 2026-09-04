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

  return (
    <aside
      className={`h-screen bg-[#080a10] border-r border-white/[0.08] flex flex-col justify-between p-2.5 select-none z-40 flex-shrink-0 transition-all duration-200 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Top: Sparkle Icon & Dock Navigation */}
      <div className="flex flex-col items-center space-y-3 w-full">
        {/* Gemini 4-pointed Sparkle Logo */}
        <div
          onClick={onNewSession}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all group"
          title="NEXUS Autonomous Copilot"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform fill-cyan-400/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5" />
          </div>
        </div>

        {/* Sidebar Expand / Collapse Toggle (Matches Screenshot) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
          title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
        </button>

        {/* New Chat / Action Button */}
        <button
          onClick={onNewSession}
          className={`h-10 rounded-xl flex items-center justify-center transition-all ${
            isExpanded
              ? 'w-full px-3 bg-white/5 hover:bg-white/10 text-white justify-between'
              : 'w-10 text-zinc-300 hover:text-white hover:bg-white/5'
          }`}
          title="New Chat / Directive"
        >
          <Plus className="w-5 h-5 text-cyan-400" />
          {isExpanded && <span className="text-xs font-semibold ml-2">New Operational Task</span>}
        </button>

        {/* Search Icon */}
        <button
          onClick={onNewSession}
          className={`h-10 rounded-xl flex items-center justify-center transition-all ${
            isExpanded
              ? 'w-full px-3 text-zinc-400 hover:text-white hover:bg-white/5 justify-start space-x-2'
              : 'w-10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
          title="Search Tasks"
        >
          <Search className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-medium">Search</span>}
        </button>

        {/* Executive Chat Copilot View Switcher */}
        <button
          onClick={() => onViewChange('chat')}
          className={`h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'chat'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          } ${isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'}`}
          title="Executive Copilot Chat"
        >
          <MessageSquare className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-semibold">Executive Chat</span>}
        </button>

        {/* Agentic Swarm Studio View Switcher */}
        <button
          onClick={() => onViewChange('flow')}
          className={`h-10 rounded-xl flex items-center justify-center transition-all ${
            currentView === 'flow'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          } ${isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'}`}
          title="Agentic Swarm Studio"
        >
          <Workflow className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-semibold">Swarm Studio</span>}
        </button>

        {/* Document Racks (RBAC) */}
        <button
          onClick={onOpenDocs}
          className={`h-10 rounded-xl flex items-center justify-center transition-all text-zinc-400 hover:text-white hover:bg-white/5 ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="Department Document Racks (RBAC)"
        >
          <FolderOpen className="w-5 h-5 text-purple-400" />
          {isExpanded && <span className="text-xs font-medium">Document Racks</span>}
        </button>

        {/* Expanded History List */}
        {isExpanded && (
          <div className="w-full pt-3 space-y-1 border-t border-white/5 animate-in fade-in duration-200">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1 font-semibold flex items-center justify-between">
              <span>Recent Decisions</span>
              <Clock className="w-3 h-3" />
            </div>
            <div className="space-y-0.5 max-h-36 overflow-y-auto pr-1">
              {pastSessions.map((session, idx) => (
                <div
                  key={idx}
                  onClick={onNewSession}
                  className="w-full px-2 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate max-w-[130px] text-[11px]">{session.title}</span>
                  <span className="text-[8px] font-mono px-1 rounded bg-white/5 text-emerald-400">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Settings & User Avatar (Exact match to screenshot) */}
      <div className="flex flex-col items-center space-y-3 w-full border-t border-white/5 pt-3">
        {/* Cloud Guide */}
        <button
          onClick={onOpenGuide}
          className={`h-10 rounded-xl flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300 hover:bg-white/5 ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="100% Free Live Cloud Deployment Guide"
        >
          <HelpCircle className="w-5 h-5" />
          {isExpanded && <span className="text-xs font-medium">Cloud Deploy</span>}
        </button>

        {/* Settings Gear with Blue Ping Dot (Matching screenshot) */}
        <button
          onClick={onOpenAuth}
          className={`h-10 rounded-xl relative flex items-center justify-center transition-all text-zinc-400 hover:text-white hover:bg-white/5 ${
            isExpanded ? 'w-full px-3 justify-start space-x-2' : 'w-10'
          }`}
          title="Settings & Role Profile"
        >
          <div className="relative">
            <Settings className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute -top-0.5 -right-0.5 shadow-sm" />
          </div>
          {isExpanded && <span className="text-xs font-medium">Settings</span>}
        </button>

        {/* Green Circle User Avatar 'R' (Matching screenshot) */}
        <div
          onClick={onOpenAuth}
          className="w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center cursor-pointer shadow-md transition-all border border-emerald-500/40"
          title={`${user.name} (${user.role}) - ${user.company}`}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </aside>
  );
};

