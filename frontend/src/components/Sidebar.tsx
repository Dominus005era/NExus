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
      className={`h-screen flex flex-col justify-between py-3 px-2 z-50 bg-[#131314] border-r border-white/[0.08] transition-all duration-300 font-sans select-none flex-shrink-0 ${
        isExpanded ? 'w-72 min-w-[18rem] max-w-[18rem]' : 'w-16 min-w-[4rem] max-w-[4rem]'
      }`}
      id="main-sidebar"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center gap-2.5 w-full min-h-0">
        {/* Top Header Row with Logo & Integrated Collapse/Expand Toggle */}
        {isExpanded ? (
          <div className="w-full flex items-center justify-between px-2 py-1.5 border-b border-white/5 pb-2.5">
            <div
              onClick={onGoHome}
              className="flex items-center gap-2 cursor-pointer group min-w-0"
              title="Return to Nexus Landing Page"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#282A2C] text-[#A8C7FA] group-hover:bg-[#A8C7FA] group-hover:text-[#001E2C] transition-colors flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-lg group-hover:rotate-45 transition-transform duration-300">
                  auto_awesome
                </span>
              </div>
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white tracking-tight">Nexus AI</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-[#A8C7FA] border border-white/10 font-semibold">
                    v2.5
                  </span>
                </div>
                <span className="text-[10px] text-[#747775] truncate">Frontier Copilot</span>
              </div>
            </div>

            {/* Collapse toggle cleanly placed on the top-right */}
            <button
              onClick={onToggleExpand}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#C4C7C5] hover:text-white hover:bg-[#202020] transition-colors cursor-pointer flex-shrink-0"
              title="Collapse sidebar"
            >
              <span className="material-symbols-outlined text-lg">menu_open</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 w-full pb-1 border-b border-white/5">
            <div
              onClick={onGoHome}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#A8C7FA] hover:bg-[#202020] transition-colors cursor-pointer group"
              title="Return to Nexus Landing Page"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-45 transition-transform duration-300">
                auto_awesome
              </span>
            </div>
            <button
              onClick={onToggleExpand}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#C4C7C5] hover:text-white hover:bg-[#202020] transition-all cursor-pointer"
              title="Expand sidebar"
            >
              <span className="material-symbols-outlined text-lg">menu</span>
            </button>
          </div>
        )}

        {/* Action Buttons Rail (Strictly Left-Aligned when Expanded) */}
        <div className="flex flex-col items-stretch gap-1.5 w-full flex-shrink-0">
          {/* New Chat */}
          <button
            onClick={onNewSession}
            className={`h-10 rounded-xl flex items-center transition-all cursor-pointer ${
              isExpanded
                ? 'w-full px-3.5 bg-[#1E1F20] hover:bg-[#282A2C] border border-white/10 text-white justify-between shadow-sm'
                : 'w-10 mx-auto justify-center text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            }`}
            title="New chat"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-[#A8C7FA] flex-shrink-0">edit_square</span>
              {isExpanded && <span className="text-xs font-semibold text-left">New chat</span>}
            </div>
            {isExpanded && <span className="text-[10px] font-mono text-[#747775]">⌘K</span>}
          </button>

          {/* Executive Copilot View */}
          <button
            onClick={() => onViewChange('chat')}
            className={`h-10 rounded-xl flex items-center transition-all cursor-pointer ${
              isExpanded ? 'w-full px-3.5 justify-start text-left gap-3' : 'w-10 mx-auto justify-center'
            } ${
              currentView === 'chat'
                ? 'bg-[#282A2C] text-[#A8C7FA] border border-[#A8C7FA]/40 shadow-sm font-semibold'
                : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            }`}
            title="Executive Copilot Chat"
          >
            <span className="material-symbols-outlined text-lg flex-shrink-0">chat_bubble</span>
            {isExpanded && <span className="text-xs text-left">Executive Copilot</span>}
          </button>

          {/* Swarm Studio View */}
          <button
            onClick={() => onViewChange('flow')}
            className={`h-10 rounded-xl flex items-center transition-all cursor-pointer ${
              isExpanded ? 'w-full px-3.5 justify-start text-left gap-3' : 'w-10 mx-auto justify-center'
            } ${
              currentView === 'flow'
                ? 'bg-[#282A2C] text-[#FFB2B2] border border-[#EA3355]/40 shadow-sm font-semibold'
                : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
            }`}
            title="Agentic Swarm Studio"
          >
            <span className="material-symbols-outlined text-lg text-[#FFB2B2] flex-shrink-0">hub</span>
            {isExpanded && <span className="text-xs text-left">Swarm Studio</span>}
          </button>

          {/* Document Racks */}
          <button
            onClick={onOpenDocs}
            className={`h-10 rounded-xl flex items-center transition-all cursor-pointer text-[#C4C7C5] hover:text-white hover:bg-[#202020] ${
              isExpanded ? 'w-full px-3.5 justify-start text-left gap-3' : 'w-10 mx-auto justify-center'
            }`}
            title="Document Racks (RBAC)"
          >
            <span className="material-symbols-outlined text-lg text-[#C2E7FF] flex-shrink-0">folder_open</span>
            {isExpanded && <span className="text-xs font-medium text-left">Document Racks</span>}
          </button>
        </div>

        {/* Expanded Drawer Details: Real Sessions List */}
        {isExpanded && (
          <div className="w-full pt-3 space-y-3 border-t border-white/5 animate-in fade-in duration-200 overflow-y-auto flex-1 pr-1 text-left">
            {/* Recent Section */}
            <div className="space-y-1.5 text-left">
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
                      className={`w-full px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer group text-left ${
                        session.id === activeSessionId
                          ? 'bg-[#282A2C] text-white border border-[#A8C7FA]/40 shadow-sm'
                          : 'text-[#C4C7C5] hover:text-white hover:bg-[#202020]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2 text-left">
                        <span className="material-symbols-outlined text-sm text-[#A8C7FA] flex-shrink-0">
                          chat_bubble
                        </span>
                        <div className="flex flex-col min-w-0 text-left">
                          <span className="truncate text-xs font-medium leading-tight text-left">
                            {session.title || 'Untitled Conversation'}
                          </span>
                          <span className="text-[10px] font-mono text-[#747775] mt-0.5 text-left">
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

      {/* Bottom Section: Settings & User Profile (Strictly Left-Aligned when Expanded) */}
      <div className="flex flex-col items-stretch gap-1.5 w-full border-t border-white/5 pt-2.5 flex-shrink-0">
        {/* Cloud Guide */}
        <button
          onClick={onOpenGuide}
          className={`h-10 rounded-xl flex items-center transition-all text-emerald-400 hover:text-emerald-300 hover:bg-[#202020] cursor-pointer ${
            isExpanded ? 'w-full px-3.5 justify-start text-left gap-3' : 'w-10 mx-auto justify-center'
          }`}
          title="100% Free Live Cloud Deployment Guide"
        >
          <span className="material-symbols-outlined text-lg flex-shrink-0">help</span>
          {isExpanded && <span className="text-xs font-medium text-left">Cloud Deploy Guide</span>}
        </button>

        {/* Settings */}
        <button
          onClick={onOpenAuth}
          className={`h-10 rounded-xl flex items-center transition-all text-[#C4C7C5] hover:text-white hover:bg-[#202020] cursor-pointer ${
            isExpanded ? 'w-full px-3.5 justify-start text-left gap-3' : 'w-10 mx-auto justify-center'
          }`}
          title="Settings"
        >
          <span className="material-symbols-outlined text-lg flex-shrink-0">settings</span>
          {isExpanded && <span className="text-xs font-medium text-left">Settings</span>}
        </button>

        {/* User Profile */}
        {isExpanded ? (
          <div
            onClick={onOpenAuth}
            className="w-full p-2 rounded-xl bg-[#1E1F20] hover:bg-[#282A2C] border border-white/5 flex items-center justify-between cursor-pointer transition-colors mt-0.5 text-left"
          >
            <div className="flex items-center gap-2.5 text-left min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center border border-emerald-500/40 shadow-sm flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-semibold text-white truncate max-w-[130px] text-left">{user.name}</div>
                <div className="text-[10px] text-[#A8C7FA] font-mono truncate text-left">{user.role} • {user.company}</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mr-1" />
          </div>
        ) : (
          <div
            onClick={onOpenAuth}
            className="relative cursor-pointer mx-auto mt-0.5"
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
