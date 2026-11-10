import React from 'react';
import { Tag, DollarSign, Percent, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AnalyticsSummary({ deals }) {
  const totalDeals = deals.length;
  const underOneDollarCount = deals.filter(d => d.salePrice <= 1.00).length;
  const avgDiscount = totalDeals > 0 
    ? Math.round(deals.reduce((acc, d) => acc + (d.discountPercent || 0), 0) / totalDeals) 
    : 0;
  
  // Total potential savings across catalog
  const totalSavings = deals.reduce((acc, d) => acc + (d.originalPrice - d.salePrice), 0).toFixed(0);

  const merchants = deals.reduce((acc, d) => {
    acc[d.merchant] = (acc[d.merchant] || 0) + 1;
    return acc;
  }, {});

  const topMerchant = Object.entries(merchants).sort((a, b) => b[1] - a[1])[0] || ['None', 0];

  return (
    <div class="space-y-4">
      {/* 4 Stat Cards */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Drops</span>
            <Tag size={14} class="text-pink-400" />
          </div>
          <div class="text-xl sm:text-2xl font-black text-white">{totalDeals}</div>
          <div class="text-[10px] text-slate-500 mt-1">Live in 3-across grid</div>
        </div>

        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>99¢ Steals</span>
            <DollarSign size={14} class="text-emerald-400" />
          </div>
          <div class="text-xl sm:text-2xl font-black text-emerald-400">{underOneDollarCount}</div>
          <div class="text-[10px] text-emerald-500/80 mt-1">{Math.round((underOneDollarCount / (totalDeals || 1)) * 100)}% of feed</div>
        </div>

        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Discount</span>
            <Percent size={14} class="text-amber-400" />
          </div>
          <div class="text-xl sm:text-2xl font-black text-amber-400">{avgDiscount}%</div>
          <div class="text-[10px] text-slate-500 mt-1">${totalSavings} total savings pool</div>
        </div>

        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
          <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Top Retailer</span>
            <TrendingUp size={14} class="text-indigo-400" />
          </div>
          <div class="text-base sm:text-lg font-black text-indigo-300 truncate">{topMerchant[0]}</div>
          <div class="text-[10px] text-slate-500 mt-1">{topMerchant[1]} deals active</div>
        </div>
      </div>

      {/* Real-time Status Card */}
      <div class="bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/20 rounded-xl p-3 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2">
          <CheckCircle2 size={16} class="text-emerald-400" />
          <span class="text-slate-200">Catalog healthy & auto-persisted to browser storage.</span>
        </div>
        <span class="text-[11px] text-pink-400 font-semibold hidden sm:inline">Feed updates live</span>
      </div>
    </div>
  );
}
