import React from 'react';
import { TimelineLogItem } from '../types';
import { History, X, Clock, CheckCircle2, Cpu, Zap, User, ShieldCheck } from 'lucide-react';

interface TimelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: TimelineLogItem[];
}

export const TimelineDrawer: React.FC<TimelineDrawerProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0b0f19] border-l border-slate-800 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <History className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white text-base">Execution Timeline History</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {logs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No executions recorded yet. Trigger the agentic pipeline to view live tracking.
          </div>
        ) : (
          <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
            {logs.map((log) => (
              <div key={log.id} className="relative group">
                {/* Node icon bullet */}
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 text-blue-400 flex items-center justify-center text-[10px]">
                  <Clock className="w-3 h-3" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white font-mono">{log.nodeName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-400">{log.action}</div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    {log.details}
                  </p>
                  {log.modelUsed && (
                    <div className="text-[10px] text-indigo-400 font-mono">
                      Engine: {log.modelUsed}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
        All agent state transitions cryptographically logged to nexus.db
      </div>
    </div>
  );
};
