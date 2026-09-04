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
  Share2,
  Check,
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
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-[#1E1F20]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-2.5 sticky top-0 z-30 shadow-md font-sans">
      <div className="w-full flex items-center justify-between">
        {/* ================= EXACT RED BOX REGION (Top-Left Segmented Switcher Capsule) ================= */}
        <div className="flex items-center space-x-3">
          {/* Segmented Switcher Pill */}
          <div className="bg-[#131314] border border-white/10 p-1 rounded-2xl flex items-center space-x-1 shadow-inner">
            <button
              onClick={() => onViewChange('chat')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentView === 'chat'
                  ? 'bg-[#282A2C] text-[#A8C7FA] border border-[#A8C7FA]/50 shadow-md shadow-[#A8C7FA]/10'
                  : 'text-[#C4C7C5] hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8C7FA]" />
              <span>Executive Copilot</span>
            </button>

            <button
              onClick={() => onViewChange('flow')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentView === 'flow'
                  ? 'bg-[#282A2C] text-[#FFB2B2] border border-[#EA3355]/50 shadow-md shadow-rose-500/10'
                  : 'text-[#C4C7C5] hover:text-white hover:bg-white/5'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-[#FFB2B2]" />
              <span>Agentic Swarm Studio</span>
            </button>
          </div>

          {/* Hot-Swap Model Indicator Pill */}
          {onOpenModelModal && (
            <button
              onClick={() => onOpenModelModal('orchestrator')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#282A2C] hover:bg-[#393939] border border-white/10 text-xs font-mono text-[#A8C7FA] transition-colors cursor-pointer"
              title="Click to Switch Active AI Model"
            >
              <span className="w-2 h-2 rounded-full bg-[#A8C7FA] animate-pulse" />
              <span>{activeModel}</span>
              <ChevronDown className="w-3 h-3 text-[#747775]" />
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
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl bg-[#282A2C] hover:bg-[#393939] border border-white/[0.08] text-[#C4C7C5] hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Share Workspace Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="px-3 py-1.5 rounded-xl bg-[#282A2C] hover:bg-[#393939] border border-white/[0.08] text-[#C4C7C5] hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Department Document Racks (RBAC)"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#C2E7FF]" />
            <span className="hidden md:inline">Doc Racks</span>
          </button>

          <button
            onClick={onToggleTimeline}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isTimelineOpen
                ? 'bg-indigo-950/80 border-indigo-600 text-indigo-300'
                : 'bg-[#282A2C] hover:bg-[#393939] border-white/[0.08] text-[#C4C7C5] hover:text-white'
            }`}
            title="Chronological Execution Timeline"
          >
            <History className="w-3.5 h-3.5 text-[#A8C7FA]" />
            <span className="hidden md:inline">Timeline</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="p-2 rounded-xl bg-[#282A2C] hover:bg-[#393939] border border-white/[0.08] text-emerald-400 hover:text-emerald-300 text-xs transition-colors cursor-pointer"
            title="100% Free Live Cloud Deployment Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-xl bg-[#282A2C] hover:bg-[#393939] border border-white/[0.08] text-left transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">{user.name}</span>{' '}
                <span className="text-[#A8C7FA] font-mono">({user.role})</span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#747775]" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-dropdown rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#C4C7C5] hover:bg-white/[0.06] flex items-center space-x-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#A8C7FA]" />
                  <span>Edit Profile & Role</span>
                </button>
                <div className="border-t border-white/5 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-rose-950/30 flex items-center space-x-2 cursor-pointer"
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
