import React, { useState } from 'react';
import { AgentModelConfig, AvailableModel } from '../types';
import { Settings2, X, Cpu, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface ModelSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: 'sales' | 'inventory' | 'finance' | 'orchestrator' | null;
  currentConfig: AgentModelConfig;
  availableModels: AvailableModel[];
  onSaveConfig: (newConfig: AgentModelConfig) => void;
}

export const ModelSwitcherModal: React.FC<ModelSwitcherModalProps> = ({
  isOpen,
  onClose,
  targetRole,
  currentConfig,
  availableModels,
  onSaveConfig,
}) => {
  if (!isOpen || !targetRole) return null;

  const roleKey = `${targetRole}_agent_model` as keyof AgentModelConfig;
  const currentModel = currentConfig[roleKey] as string || 'gemini-2.0-flash';
  const [selectedModel, setSelectedModel] = useState<string>(currentModel);

  const handleSave = () => {
    const updated = { ...currentConfig, [roleKey]: selectedModel };
    onSaveConfig(updated);
    onClose();
  };

  const getRoleTitle = () => {
    switch (targetRole) {
      case 'sales': return 'Sales Forecasting Agent';
      case 'inventory': return 'Inventory & Stockout Agent';
      case 'finance': return 'Finance & Liquidity Agent';
      case 'orchestrator': return 'Central AI Orchestrator';
      default: return 'Agent Engine';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#0e1424] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Hot-Swap AI Model</h3>
              <p className="text-xs text-slate-400">{getRoleTitle()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-2.5 max-h-[350px] overflow-y-auto">
          {availableModels.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedModel === model.id
                  ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-sm text-white">{model.id}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {model.provider}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{model.description}</div>
              </div>

              {selectedModel === model.id && (
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Model to {targetRole.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
