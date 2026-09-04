import React, { useState } from 'react';
import { FolderOpen, X, Shield, Lock, FileText, Search, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface DocumentRackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentRackModal: React.FC<DocumentRackModalProps> = ({ isOpen, onClose }) => {
  const [selectedDept, setSelectedDept] = useState<'sales' | 'inventory' | 'finance'>('sales');
  const [requestingAgent, setRequestingAgent] = useState<'sales' | 'inventory' | 'finance'>('sales');
  const [queryText, setQueryText] = useState('promotional calendar supplier terms discount');
  const [crossReason, setCrossReason] = useState('Emergency replenishment supplier comparison');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const res = await api.queryKnowledge(requestingAgent, selectedDept, queryText, crossReason);
      setQueryResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e1424] border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl p-6 relative flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Department Document Racks & RBAC Explorer</h3>
              <p className="text-xs text-slate-400">Inspect unstructured company knowledge with security governance</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Permission Tester */}
        <div className="py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Requesting Agent:</label>
              <select
                value={requestingAgent}
                onChange={(e: any) => setRequestingAgent(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
              >
                <option value="sales">Sales Agent</option>
                <option value="inventory">Inventory Agent</option>
                <option value="finance">Finance Agent</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Target Document Rack:</label>
              <select
                value={selectedDept}
                onChange={(e: any) => setSelectedDept(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
              >
                <option value="sales">/storage/docs/sales</option>
                <option value="inventory">/storage/docs/inventory</option>
                <option value="finance">/storage/docs/finance (Protected Contracts)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Search terms (e.g. credit terms, SLA, limits)..."
              className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Query RBAC Rack</span>
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
          {queryResult ? (
            <div className="space-y-3">
              <div
                className={`p-3 rounded-lg font-mono text-xs ${
                  queryResult.access_granted
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}
              >
                {queryResult.status_message}
              </div>

              {queryResult.snippets && queryResult.snippets.length > 0 && (
                <div className="space-y-2">
                  <div className="text-slate-400 font-semibold font-mono">Retrieved Document Snippets:</div>
                  {queryResult.snippets.map((snip: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex justify-between font-mono text-purple-400 font-bold">
                        <span>📄 {snip.doc_name}</span>
                        <span className="text-slate-400">Score: {snip.relevance_score}</span>
                      </div>
                      <p className="text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                        {snip.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono">
              Select an agent and target department to test role-based document access.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
