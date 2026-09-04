import React from 'react';
import { OverviewMetrics } from '../types';
import { IndianRupee, TrendingUp, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface KpiRibbonProps {
  metrics: OverviewMetrics | null;
}

export const KpiRibbon: React.FC<KpiRibbonProps> = ({ metrics }) => {
  const cash = metrics?.cash_balance ?? 850000;
  const reserve = metrics?.safe_procurement_budget ?? 180000;
  const rev = metrics?.revenue_7d ?? 142850;
  const risks = metrics?.critical_stock_risks ?? 1;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {/* 1. Cash Balance */}
      <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider flex items-center space-x-1.5">
            <span>Treasury Cash</span>
          </div>
          <div className="text-xl font-bold text-white flex items-center">
            <span>₹{(cash / 100000).toFixed(2)}L</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">₹5.0L statutory reserve safe</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <IndianRupee className="w-5 h-5" />
        </div>
      </div>

      {/* 2. 7-Day Revenue */}
      <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            7-Day Revenue
          </div>
          <div className="text-xl font-bold text-white">
            ₹{(rev / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] text-blue-400 font-medium">+18.4% velocity lift</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Safe Procurement Budget */}
      <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            Safe Spend Cap
          </div>
          <div className="text-xl font-bold text-white">
            ₹{(reserve / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] text-indigo-400 font-medium">Max liquid spend approved</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Critical Stockout Risks */}
      <div className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            Stockout Alerts
          </div>
          <div className="text-xl font-bold text-amber-400 flex items-center space-x-1">
            <span>{risks} SKU Alert</span>
          </div>
          <div className="text-[10px] text-amber-400/80 font-medium">P100 (UltraGlide Mouse)</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
