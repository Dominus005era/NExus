import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Zap,
  MessageSquare,
  Workflow,
  FolderOpen,
  History,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  currentView: 'chat' | 'flow';
  onViewChange: (view: 'chat' | 'flow') => void;
  onOpenDocs: () => void;
  onToggleTimeline: () => void;
  onOpenGuide: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  isTimelineOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentView,
  onViewChange,
  onOpenDocs,
  onToggleTimeline,
  onOpenGuide,
  onOpenAuth,
  onLogout,
  isTimelineOpen,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-[#070b14]/90 backdrop-blur-2xl border-b border-white/[0.06] px-6 py-3.5 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-white tracking-tight">NEXUS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-950/80 text-cyan-400 border border-indigo-700/50 font-bold">
              Autonomous OS
            </span>
          </div>
          <span className="text-zinc-600">/</span>
          <div className="text-xs text-zinc-400 font-medium">{user.company}</div>
        </div>

        {/* Center: View Switcher (Chat vs Horizontal Topology) */}
        <div className="bg-black/40 border border-white/[0.08] p-1 rounded-xl flex items-center space-x-1 shadow-inner">
          <button
            onClick={() => onViewChange('chat')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              currentView === 'chat'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Executive Chat</span>
          </button>
          <button
            onClick={() => onViewChange('flow')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              currentView === 'flow'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Horizontal Topology</span>
          </button>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenDocs}
            className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="Department Document Racks (RBAC)"
          >
            <FolderOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Doc Racks</span>
          </button>

          <button
            onClick={onToggleTimeline}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-colors ${
              isTimelineOpen
                ? 'bg-indigo-950/80 border-indigo-600 text-indigo-300'
                : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] text-zinc-300 hover:text-white'
            }`}
            title="Chronological Execution Timeline"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Timeline</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
            title="100% Free Live Cloud Deployment Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-left transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">{user.name}</span>{' '}
                <span className="text-cyan-400 font-mono">({user.role})</span>
              </div>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-dropdown rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-zinc-300 hover:bg-white/[0.06] flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Profile & Role</span>
                </button>
                <div className="border-t border-white/5 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-rose-950/30 flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
