import React from 'react';
import { HelpCircle, X, ExternalLink, Globe, Database, Server, Key, CheckCircle2 } from 'lucide-react';

interface FreeDeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeDeploymentGuideModal: React.FC<FreeDeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e1424] border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl p-6 relative flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">100% Free Live Deployment & Production Guide</h3>
              <p className="text-xs text-slate-400">Step-by-step instructions to deploy NEXUS live with zero hosting costs</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6 text-xs text-slate-300">
          {/* Step 1: Free Database */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-bold font-mono">
              <Database className="w-4 h-4" />
              <span>STEP 1: Cloud Database (Neon / Supabase — 100% Free)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              1. Go to <a href="https://neon.tech" target="_blank" rel="noreferrer" className="text-blue-400 underline">neon.tech</a> or <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">supabase.com</a> and sign up for a free tier PostgreSQL database.
            </p>
            <p className="text-slate-400">
              2. Copy your connection URI string (e.g. <code className="bg-slate-950 px-1 py-0.5 rounded text-indigo-300">postgresql://user:password@ep-host.neon.tech/neondb</code>).
            </p>
            <p className="text-slate-400">
              3. Set <code className="bg-slate-950 px-1 py-0.5 rounded text-indigo-300">DATABASE_URL</code> in your backend environment variables.
            </p>
          </div>

          {/* Step 2: Free Backend */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold font-mono">
              <Server className="w-4 h-4" />
              <span>STEP 2: FastAPI Backend (Render / Railway / HuggingFace — 100% Free)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              1. Push your repository to GitHub.
            </p>
            <p className="text-slate-400 leading-relaxed">
              2. On <a href="https://render.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">render.com</a>, create a <strong>New Web Service</strong> connected to your GitHub repo.
            </p>
            <div className="bg-slate-950 p-2.5 rounded-lg font-mono space-y-1 text-[11px] text-slate-300">
              <div>Build Command: <span className="text-emerald-400">pip install -r backend/requirements.txt</span></div>
              <div>Start Command: <span className="text-emerald-400">uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT</span></div>
            </div>
            <p className="text-slate-400">
              3. Copy your live backend URL (e.g. <code className="text-indigo-300">https://nexus-ops.onrender.com</code>).
            </p>
          </div>

          {/* Step 3: Free Frontend */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
              <Globe className="w-4 h-4" />
              <span>STEP 3: React Vite Frontend (Vercel / Netlify — 100% Free)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              1. Import your GitHub repo on <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">vercel.com</a>.
            </p>
            <div className="bg-slate-950 p-2.5 rounded-lg font-mono space-y-1 text-[11px] text-slate-300">
              <div>Root Directory: <span className="text-emerald-400">frontend</span></div>
              <div>Environment Variable: <span className="text-emerald-400">VITE_API_URL = https://your-render-backend-url.onrender.com/api/v1</span></div>
            </div>
            <p className="text-slate-400">
              2. Click <strong>Deploy</strong>. Your site will be live instantly on a fast global CDN with free SSL!
            </p>
          </div>

          {/* Step 4: Free LLM API Keys */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-bold font-mono">
              <Key className="w-4 h-4" />
              <span>STEP 4: Free AI Models (Google AI Studio — 100% Free)</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              1. Visit <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">aistudio.google.com</a> and generate a free Gemini API Key (generous free tier for Gemini 2.0 Flash and 1.5 Pro).
            </p>
            <p className="text-slate-400">
              2. Add <code className="bg-slate-950 px-1 py-0.5 rounded text-purple-300">GEMINI_API_KEY=your_key</code> in your Render environment variables.
            </p>
            <p className="text-emerald-400 font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>If no API key is provided, the built-in deterministic engine runs for free forever!</span>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
