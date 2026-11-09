import React from 'react';
import DealCard from './DealCard';
import { PackageOpen, Sparkles, Loader2 } from 'lucide-react';

export default function DealGrid({
  deals,
  onDealClick,
  hasMore,
  onLoadMore,
  isLoadingMore,
  onResetFilters
}) {
  if (deals.length === 0) {
    return (
      <div class="max-w-md mx-auto text-center py-16 px-4">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
          <PackageOpen size={30} />
        </div>
        <h3 class="text-lg font-bold text-slate-200 mb-1">No deals match your filter</h3>
        <p class="text-sm text-slate-400 mb-5">
          Try clearing your search query or switching categories to view all available 99¢ bargains.
        </p>
        <button
          onClick={onResetFilters}
          class="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-pink-600/30 transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div class="w-full max-w-4xl mx-auto px-4 pb-16">
      
      {/* 3-ACROSS SQUARE GRID: Strict 3 columns on all viewports */}
      <div class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {deals.map((deal, idx) => (
          <DealCard
            key={`${deal.id}-${idx}`}
            deal={deal}
            onClick={onDealClick}
          />
        ))}
      </div>

      {/* UNLIMITED DOWN: Load More / Endless Feed Loader */}
      <div class="mt-8 text-center flex flex-col items-center">
        {hasMore ? (
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            class="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-pink-500/40 hover:border-pink-500 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {isLoadingMore ? (
              <>
                <Loader2 size={16} class="animate-spin text-pink-400" />
                <span>Pulling fresh drops...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} class="text-pink-400 group-hover:rotate-12 transition-transform" />
                <span>Load More 99¢ Steals</span>
              </>
            )}
          </button>
        ) : (
          <div class="text-xs text-slate-500 py-4 flex items-center gap-2">
            <span class="w-8 h-[1px] bg-slate-800"></span>
            <span>You've seen all current flash drops • New drops arrive hourly</span>
            <span class="w-8 h-[1px] bg-slate-800"></span>
          </div>
        )}
      </div>

    </div>
  );
}
