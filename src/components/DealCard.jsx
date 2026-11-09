import React from 'react';
import { Tag, ExternalLink, Zap, Star } from 'lucide-react';

export default function DealCard({ deal, onClick }) {
  const isUnderOneDollar = deal.salePrice <= 1.00;

  return (
    <div
      onClick={() => onClick(deal)}
      class="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer shadow-md hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-1 select-none"
    >
      {/* Product Image */}
      <img
        src={deal.imageUrl}
        alt={deal.title}
        loading="lazy"
        class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
      />

      {/* Subtle top & bottom dark gradients */}
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30 group-hover:via-slate-950/60 transition-opacity"></div>

      {/* Top Badges Row */}
      <div class="absolute top-1.5 left-1.5 right-1.5 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-start justify-between gap-1 z-10 pointer-events-none">
        
        {/* Deal Tag / Price Drop */}
        {isUnderOneDollar ? (
          <span class="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-lg shadow-emerald-500/30 tracking-tight uppercase">
            <Zap size={11} class="fill-current" />
            99¢ Drop
          </span>
        ) : (
          <span class="inline-flex items-center gap-0.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-md tracking-tight">
            -{deal.discountPercent}%
          </span>
        )}

        {/* Merchant Indicator */}
        <span class="bg-black/60 backdrop-blur-md text-slate-300 text-[9px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded border border-white/10 hidden min-[400px]:inline-block">
          {deal.merchant}
        </span>
      </div>

      {/* Bottom Content Row */}
      <div class="absolute bottom-0 inset-x-0 p-2 sm:p-3 z-10 flex flex-col justify-end">
        
        {/* Rating and Reviews (Desktop/Tablet) */}
        <div class="hidden sm:flex items-center gap-1 text-[11px] text-amber-400 mb-1 font-semibold">
          <Star size={12} class="fill-current" />
          <span>{deal.rating}</span>
          <span class="text-slate-400 text-[10px]">({deal.reviewsCount})</span>
        </div>

        {/* Product Title */}
        <h3 class="text-white font-semibold text-xs sm:text-sm line-clamp-1 group-hover:text-pink-300 transition-colors mb-1">
          {deal.title}
        </h3>

        {/* Price & Discount Bar */}
        <div class="flex items-baseline justify-between gap-1">
          <div class="flex items-baseline gap-1.5">
            <span class={`font-black text-sm sm:text-lg tracking-tight ${isUnderOneDollar ? 'text-emerald-400 text-base sm:text-xl' : 'text-white'}`}>
              ${deal.salePrice.toFixed(2)}
            </span>
            <span class="text-slate-400 line-through text-[10px] sm:text-xs font-normal">
              ${deal.originalPrice.toFixed(2)}
            </span>
          </div>

          <span class="text-[10px] font-bold text-rose-400 sm:hidden">
            -{deal.discountPercent}%
          </span>
        </div>

      </div>

      {/* Hover Overlay Icon / Action Hint */}
      <div class="absolute inset-0 bg-pink-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <div class="bg-black/80 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-full border border-pink-500/40 shadow-xl flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
          <Tag size={13} class="text-pink-400" />
          <span>Clip Deal</span>
        </div>
      </div>

    </div>
  );
}
