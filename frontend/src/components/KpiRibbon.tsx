import React from 'react';
import { OverviewMetrics } from '../types';
import { IndianRupee, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface KpiRibbonProps {
  metrics: OverviewMetrics | null;
}

export const KpiRibbon: React.FC<KpiRibbonProps> = ({ metrics }) => {
  const cash = metrics?.cash_balance ?? 850000;
  const reserve = metrics?.safe_procurement_budget ?? 180000;
  const rev = metrics?.revenue_7d ?? 142850;
  const risks = metrics?.critical_stock_risks ?? 1;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {/* 1. Treasury Cash */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.08] hover:border-emerald-500/30 transition-all shadow-lg flex items-center justify-between group">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Treasury Cash
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            ₹{(cash / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">₹5.0L statutory reserve safe</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          <IndianRupee className="w-5 h-5" />
        </div>
      </div>

      {/* 2. 7-Day Revenue */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.08] hover:border-cyan-500/30 transition-all shadow-lg flex items-center justify-between group">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            7-Day Revenue
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            ₹{(rev / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] text-cyan-400 font-medium">+18.4% velocity lift</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Safe Spend Cap */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.08] hover:border-indigo-500/30 transition-all shadow-lg flex items-center justify-between group">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Safe Spend Cap
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            ₹{(reserve / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] text-indigo-400 font-medium">Working capital spend limit</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Critical Stockout Risks */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.08] hover:border-amber-500/30 transition-all shadow-lg flex items-center justify-between group">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Stockout Alerts
          </div>
          <div className="text-xl font-extrabold text-amber-400 font-mono">
            {risks} SKU Alert
          </div>
          <div className="text-[10px] text-amber-400/80 font-medium">P100 (UltraGlide Mouse)</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
