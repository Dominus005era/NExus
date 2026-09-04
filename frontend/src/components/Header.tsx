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
  Trophy,
  Database,
  Cpu,
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
  activeModel?: string;
  onOpenModelModal?: (role: 'sales' | 'inventory' | 'finance' | 'orchestrator') => void;
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
  activeModel = 'gemini-2.0-flash',
  onOpenModelModal,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-[#080b12]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-2.5 sticky top-0 z-30 shadow-md">
      <div className="w-full flex items-center justify-between">
        {/* ================= EXACT RED BOX REGION (Top-Left Segmented Switcher) ================= */}
        <div className="flex items-center space-x-3">
          {/* Segmented Switcher Pill */}
          <div className="bg-[#101420] border border-white/10 p-1 rounded-2xl flex items-center space-x-1 shadow-inner">
            <button
              onClick={() => onViewChange('chat')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                currentView === 'chat'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Executive Copilot</span>
            </button>

            <button
              onClick={() => onViewChange('flow')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                currentView === 'flow'
                  ? 'bg-gradient-to-r from-rose-500/30 to-indigo-600/30 text-rose-300 border border-rose-500/50 shadow-md shadow-rose-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-rose-400" />
              <span>Agentic Swarm Studio</span>
            </button>
          </div>

          {/* Hot-Swap Model Indicator Pill */}
          {onOpenModelModal && (
            <button
              onClick={() => onOpenModelModal('orchestrator')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
              title="Click to Switch Active AI Model"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{activeModel}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
          )}

          {/* Database Connection Tag */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
            <Database className="w-3 h-3 text-emerald-400" />
            <span>Neon DB Connected</span>
          </div>
        </div>

        {/* ================= RIGHT UTILITIES & PROFILE ================= */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenDocs}
            className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="Department Document Racks (RBAC)"
          >
            <FolderOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Doc Racks</span>
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
            <span className="hidden md:inline">Timeline</span>
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
              <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
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

