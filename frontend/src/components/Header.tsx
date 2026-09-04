import React from 'react';
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
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="bg-[#0b0f19] border-b border-slate-800/80 px-6 py-3.5 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white tracking-tight">NEXUS</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60">
                  v2.0
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">{user.company}</div>
            </div>
          </div>
        </div>

        {/* Center: View Switcher (Chat vs Horizontal Pipeline) */}
        <div className="bg-slate-900/90 border border-slate-800 p-1 rounded-xl flex items-center space-x-1 shadow-inner">
          <button
            onClick={() => onViewChange('chat')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              currentView === 'chat'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Executive Chat</span>
          </button>
          <button
            onClick={() => onViewChange('flow')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              currentView === 'flow'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Agentic Pipeline (Horizontal)</span>
          </button>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenDocs}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="Browse Department Document Racks"
          >
            <FolderOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Doc Racks</span>
          </button>

          <button
            onClick={onToggleTimeline}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-colors ${
              isTimelineOpen
                ? 'bg-blue-950/80 border-blue-700 text-blue-300'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle Chronological Timeline Log"
          >
            <History className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Timeline</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
            title="100% Free Live Deployment Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">{user.name}</span>{' '}
                <span className="text-blue-400 font-mono">({user.role})</span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0e1424] border border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Edit Profile & Role</span>
                </button>
                <div className="border-t border-slate-800 my-1" />
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
