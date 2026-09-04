import React from 'react';
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
  const pastSessions = [
    { title: 'Viral Demand Surge (P100)', date: 'Today', status: 'Resolved' },
    { title: 'Supplier B Net-30 Analysis', date: 'Yesterday', status: 'Optimal' },
    { title: '+30% Marketing Simulation', date: 'Sep 2', status: 'Simulated' },
    { title: 'Q3 Buffer Cash Re-allocation', date: 'Aug 28', status: 'Approved' },
  ];

  return (
    <aside className="w-64 h-screen bg-[#070b14] border-r border-white/[0.06] flex flex-col justify-between p-3.5 select-none z-30 flex-shrink-0">
      {/* Top: Brand & New Session */}
      <div className="space-y-4">
        {/* Workspace Brand */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-sm text-white tracking-tight">NEXUS</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 font-semibold">
                  2.0 OS
                </span>
              </div>
              <div className="text-[10px] text-zinc-400 truncate max-w-[120px]">{user.company}</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Live" />
        </div>

        {/* New Session Button */}
        <button
          onClick={onNewSession}
          className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-between transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-200" />
            <span>New Operational Task</span>
          </div>
          <kbd className="text-[10px] font-mono text-zinc-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
            ⌘K
          </kbd>
        </button>

        {/* Core Nav Tabs */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1 font-semibold">
            Interface Views
          </div>
          <button
            onClick={() => onViewChange('chat')}
            className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all ${
              currentView === 'chat'
                ? 'bg-gradient-to-r from-indigo-600/30 to-blue-600/20 text-white border border-indigo-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
            }`}
          >
            <MessageSquare className={`w-4 h-4 ${currentView === 'chat' ? 'text-cyan-400' : 'text-zinc-400'}`} />
            <span>Executive Chat Copilot</span>
          </button>

          <button
            onClick={() => onViewChange('flow')}
            className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all ${
              currentView === 'flow'
                ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-600/20 text-white border border-cyan-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
            }`}
          >
            <Workflow className={`w-4 h-4 ${currentView === 'flow' ? 'text-indigo-400' : 'text-zinc-400'}`} />
            <span>Horizontal Topology</span>
          </button>
        </div>

        {/* Recent Operations History */}
        <div className="space-y-1 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1 font-semibold flex items-center justify-between">
            <span>Recent Decisions</span>
            <Clock className="w-3 h-3" />
          </div>
          <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
            {pastSessions.map((session, idx) => (
              <div
                key={idx}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate max-w-[140px] text-[11px]">{session.title}</span>
                <span className="text-[9px] font-mono px-1 rounded bg-white/[0.04] text-emerald-400 border border-emerald-500/20">
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="space-y-2 pt-3 border-t border-white/[0.06]">
        <button
          onClick={onOpenDocs}
          className="w-full px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-purple-400" />
            <span>Document Racks</span>
          </div>
          <span className="text-[9px] font-mono text-purple-400 bg-purple-950/60 px-1 py-0.5 rounded border border-purple-800/40">
            RBAC
          </span>
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>100% Free Live Guide</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800/40">
            Cloud
          </span>
        </button>

        {/* User Card */}
        <div className="pt-2">
          <div
            onClick={onOpenAuth}
            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-zinc-200 group-hover:text-white">{user.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono">{user.role}</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          </div>
        </div>
      </div>
    </aside>
  );
};
