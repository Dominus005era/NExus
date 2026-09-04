import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  FolderOpen,
  History,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Database,
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
    <header className="flex justify-between items-center w-full h-14 px-4 bg-[#131313] border-b border-white/[0.08] z-40 flex-shrink-0 font-sans select-none">
      {/* Left: Brand + Model Selector Pill Capsule (Exact Match to Stitch Screen 2 & 4) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-white tracking-tight">Nexus</span>
        </div>

        {/* Model Selector Pill Capsule */}
        <div className="inline-flex p-1 rounded-full bg-[#2a2a2a] border border-white/[0.08] items-center">
          <button
            onClick={() => onViewChange('chat')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentView === 'chat'
                ? 'bg-[#393939] text-white shadow-sm'
                : 'text-[#C4C7C5] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-[#A8C7FA]">auto_awesome</span>
            <span>Executive Copilot</span>
          </button>

          <button
            onClick={() => onViewChange('flow')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentView === 'flow'
                ? 'bg-[#393939] text-[#FFB2B2] shadow-sm'
                : 'text-[#C4C7C5] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-[#B2C5FF]">hub</span>
            <span>Agentic Swarm Studio</span>
          </button>
        </div>

        {/* Hot-Swap Model Indicator Pill */}
        {onOpenModelModal && (
          <button
            onClick={() => onOpenModelModal('orchestrator')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1F20] hover:bg-[#282A2C] border border-white/10 text-xs font-mono text-[#A8C7FA] transition-colors cursor-pointer"
            title="Click to Switch Active AI Model"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7FA] animate-pulse" />
            <span>{activeModel}</span>
            <span className="material-symbols-outlined text-xs text-[#747775]">expand_more</span>
          </button>
        )}
      </div>

      {/* Center: Top Navigation Breadcrumb */}
      <nav className="hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-[#C4C7C5]">
          <span className="text-[#747775]">Nexus</span>
          <span className="material-symbols-outlined text-xs text-[#747775]">chevron_right</span>
          <span className="flex items-center gap-1.5 text-white font-medium px-2.5 py-1 rounded-full bg-[#202020] border border-white/10">
            <span className="material-symbols-outlined text-sm text-[#A8C7FA]">account_tree</span>
            <span>Swarm Canvas: Executive_ERP_v4</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold uppercase tracking-wider">
            Live Sync
          </span>
        </div>
      </nav>

      {/* Right Actions: Share + Trailing Icons + Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#202020] hover:bg-[#393939] text-white border border-white/10 hover:border-white/20 transition-all text-xs font-medium cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-sm text-[#C4C7C5]">
            {copied ? 'check' : 'share'}
          </span>
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>

        <button
          onClick={onOpenDocs}
          className="p-2 rounded-full text-[#C4C7C5] hover:text-white hover:bg-[#202020] transition-colors cursor-pointer"
          title="Document Racks (RBAC)"
        >
          <span className="material-symbols-outlined text-lg">folder_open</span>
        </button>

        <button
          onClick={onToggleTimeline}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            isTimelineOpen
              ? 'bg-[#A8C7FA]/20 text-[#A8C7FA]'
              : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
          }`}
          title="Chronological Execution Timeline"
        >
          <span className="material-symbols-outlined text-lg">history</span>
        </button>

        <button
          onClick={onOpenGuide}
          className="p-2 rounded-full text-emerald-400 hover:text-emerald-300 hover:bg-[#202020] transition-colors cursor-pointer"
          title="100% Free Live Cloud Deployment Guide"
        >
          <span className="material-symbols-outlined text-lg">help</span>
        </button>

        {/* User Profile Avatar Pill with Menu */}
        <div className="relative ml-1">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center border border-emerald-500/40 cursor-pointer shadow-sm transition-all"
            title={`${user.name} (${user.role}) - ${user.company}`}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1E1F20] border border-white/10 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in duration-150">
              <div className="px-3.5 py-2 border-b border-white/5 text-xs">
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-[10px] text-[#A8C7FA] font-mono">{user.role} • {user.company}</div>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onOpenAuth();
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#C4C7C5] hover:bg-white/5 flex items-center gap-2 cursor-pointer"
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
                className="w-full px-3.5 py-2 text-left text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
