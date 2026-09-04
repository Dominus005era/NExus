import React from 'react';
import { UserProfile, ChatSession } from '../types';
import { Clock } from 'lucide-react';

export interface SidebarProps {
  user: UserProfile;
  currentView: 'chat' | 'flow';
  onViewChange: (view: 'chat' | 'flow') => void;
  onGoHome: () => void;
  onOpenDocs: () => void;
  onOpenGuide: () => void;
  onOpenAuth: () => void;
  onNewSession: () => void;
  onLogout: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  currentView,
  onViewChange,
  onGoHome,
  onOpenDocs,
  onOpenGuide,
  onOpenAuth,
  onNewSession,
  isExpanded,
  onToggleExpand,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
}) => {
  return (
    <aside
      className={`h-screen flex flex-col justify-between py-4 px-2 z-50 bg-[#131314] border-r border-white/[0.08] transition-all duration-300 font-sans select-none flex-shrink-0 ${
        isExpanded ? 'w-72' : 'w-16'
      }`}
      id="main-sidebar"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center gap-3 w-full min-h-0">
        {/* Brand Icon / Title: Takes user to Landing Page */}
        {isExpanded ? (
          <div
            onClick={onGoHome}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-[#202020] transition-colors cursor-pointer group mb-0.5"
            title="Return to Nexus Landing Page"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-[#A8C7FA] group-hover:rotate-45 transition-transform duration-300">
                auto_awesome
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white tracking-tight">Nexus AI</span>
                <span className="text-[9px] font-mono text-[#747775]">v2.5 Frontier</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A8C7FA] border border-white/10 group-hover:bg-[#A8C7FA] group-hover:text-[#001E2C] transition-colors">
              Home
            </span>
          </div>
        ) : (
          <div
            onClick={onGoHome}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#A8C7FA] hover:bg-[#202020] transition-colors cursor-pointer group mb-1"
            title="Return to Nexus Landing Page"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-45 transition-transform duration-300">
              auto_awesome
            </span>
          </div>
        )}

        {/* Action Buttons Rail */}
        <div className="flex flex-col items-center gap-1.5 w-full flex-shrink-0">
          {/* Expand/Collapse Toggle */}
          <button
            onClick={onToggleExpand}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#C4C7C5] hover:text-white hover:bg-[#202020] transition-all cursor-pointer"
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <span className="material-symbols-outlined text-lg">
              {isExpanded ? 'menu_open' : 'menu'}
            </span>
          </button>

          {/* New Chat */}
          <button
            onClick={onNewSession}
            className={`h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isExpanded
                ? 'w-full px-3 bg-[#282A2C] hover:bg-[#393939] text-white justify-between shadow-sm'
                : 'w-10 text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            }`}
            title="New chat"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#A8C7FA]">edit_square</span>
              {isExpanded && <span className="text-xs font-semibold">New chat</span>}
            </div>
            {isExpanded && <span className="text-[10px] font-mono text-[#747775]">⌘K</span>}
          </button>

          {/* Executive Copilot View */}
          <button
            onClick={() => onViewChange('chat')}
            className={`h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              currentView === 'chat'
                ? 'bg-[#282A2C] text-[#A8C7FA] border border-[#A8C7FA]/40 shadow-sm'
                : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            } ${isExpanded ? 'w-full px-3 justify-start gap-2.5' : 'w-10'}`}
            title="Executive Copilot Chat"
          >
            <span className="material-symbols-outlined text-lg">chat_bubble</span>
            {isExpanded && <span className="text-xs font-semibold">Executive Copilot</span>}
          </button>

          {/* Swarm Studio View */}
          <button
            onClick={() => onViewChange('flow')}
            className={`h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              currentView === 'flow'
                ? 'bg-[#282A2C] text-[#FFB2B2] border border-[#EA3355]/40 shadow-sm'
                : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            } ${isExpanded ? 'w-full px-3 justify-start gap-2.5' : 'w-10'}`}
            title="Agentic Swarm Studio"
          >
            <span className="material-symbols-outlined text-lg text-[#FFB2B2]">hub</span>
            {isExpanded && <span className="text-xs font-semibold">Swarm Studio</span>}
          </button>

          {/* Document Racks */}
          <button
            onClick={onOpenDocs}
            className={`h-10 rounded-full flex items-center justify-center transition-all text-[#C4C7C5] hover:text-white hover:bg-[#202020] cursor-pointer ${
              isExpanded ? 'w-full px-3 justify-start gap-2.5' : 'w-10'
            }`}
            title="Document Racks (RBAC)"
          >
            <span className="material-symbols-outlined text-lg text-[#C2E7FF]">folder_open</span>
            {isExpanded && <span className="text-xs font-medium">Document Racks</span>}
          </button>
        </div>

        {/* Expanded Drawer Details: Real Sessions List (No Dummy Chats!) */}
        {isExpanded && (
          <div className="w-full pt-3 space-y-3 border-t border-white/5 animate-in fade-in duration-200 overflow-y-auto flex-1 pr-1">
            {/* Recent Section */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#747775] px-2 py-1 font-semibold flex items-center justify-between">
                <span>Recent Conversations</span>
                <Clock className="w-3 h-3" />
              </div>

              {sessions.length > 0 ? (
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => onSelectSession(session.id)}
                      className={`w-full px-2.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer group ${
                        session.id === activeSessionId
                          ? 'bg-[#282A2C] text-white border border-[#A8C7FA]/40 shadow-sm'
                          : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
                        <span className="material-symbols-outlined text-sm text-[#A8C7FA] flex-shrink-0">
                          chat_bubble
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-[11px] font-medium leading-tight">
                            {session.title || 'Untitled Conversation'}
                          </span>
                          <span className="text-[9px] font-mono text-[#747775] mt-0.5">
                            {session.timestamp}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => onDeleteSession(session.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded transition-opacity cursor-pointer flex-shrink-0"
                        title="Delete conversation"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-6 text-center rounded-xl bg-white/[0.02] border border-dashed border-white/10 space-y-1.5">
                  <span className="material-symbols-outlined text-[#747775] text-lg">chat_bubble_outline</span>
                  <div className="text-[11px] font-medium text-[#747775]">No recent chats</div>
                  <div className="text-[10px] text-[#555]">Click "New chat" or type a prompt</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Settings & User Profile */}
      <div className="flex flex-col items-center gap-2 w-full border-t border-white/5 pt-3">
        {/* Cloud Guide */}
        <button
          onClick={onOpenGuide}
          className={`h-10 rounded-full flex items-center justify-center transition-all text-emerald-400 hover:text-emerald-300 hover:bg-[#202020] cursor-pointer ${
            isExpanded ? 'w-full px-3 justify-start gap-2.5' : 'w-10'
          }`}
          title="100% Free Live Cloud Deployment Guide"
        >
          <span className="material-symbols-outlined text-lg">help</span>
          {isExpanded && <span className="text-xs font-medium">Cloud Deploy Guide</span>}
        </button>

        {/* Settings */}
        <button
          onClick={onOpenAuth}
          className={`h-10 rounded-full flex items-center justify-center transition-all text-[#C4C7C5] hover:text-white hover:bg-[#202020] cursor-pointer ${
            isExpanded ? 'w-full px-3 justify-start gap-2.5' : 'w-10'
          }`}
          title="Settings"
        >
          <span className="material-symbols-outlined text-lg">settings</span>
          {isExpanded && <span className="text-xs font-medium">Settings</span>}
        </button>

        {/* User Profile */}
        {isExpanded ? (
          <div
            onClick={onOpenAuth}
            className="w-full p-2 rounded-2xl bg-[#282A2C] hover:bg-[#393939] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
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
            className="relative cursor-pointer mt-1"
            title={`${user.name} (${user.role}) - ${user.company}`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center border border-emerald-500/40 shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#131314]" />
          </div>
        )}
      </div>
    </aside>
  );
};
