import React from 'react';
import { CheckCircle2, Flame, Bell, Share2, Instagram, Send, Sparkles } from 'lucide-react';

export default function Header({ dealsCount, dealsUnderOneDollar }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SuperDiscount.99',
        text: 'Check out these crazy 99¢ steals and price drops on @SuperDiscount.99!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header class="w-full bg-[#111827]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 transition-all">
      {/* Top Flash Ticker */}
      <div class="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <span class="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
        <Flame size={14} class="fill-white animate-bounce-subtle" />
        <span>LIVE FLASH HOUR: {dealsUnderOneDollar} ITEMS DISCOUNTED TO 99¢ TODAY</span>
      </div>

      <div class="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          
          {/* Instagram Story Avatar */}
          <div class="relative group cursor-pointer">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
              <div class="w-full h-full rounded-full bg-[#0B0F19] p-1 flex items-center justify-center overflow-hidden">
                <div class="w-full h-full rounded-full bg-gradient-to-br from-rose-500 to-indigo-700 flex flex-col items-center justify-center font-black text-white">
                  <span class="text-xs uppercase tracking-widest text-pink-200">SUPER</span>
                  <span class="text-xl sm:text-2xl font-extrabold tracking-tighter">.99</span>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-1 rounded-full border-2 border-[#0B0F19]" title="Verified Deals Active">
              <Sparkles size={12} class="fill-current" />
            </div>
          </div>

          {/* Profile Details */}
          <div class="flex-1 text-center sm:text-left">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <h1 class="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                SuperDiscount.99
                <CheckCircle2 size={18} class="text-sky-400 fill-sky-400/20" />
              </h1>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/30">
                Curated Bargains
              </span>
            </div>

            <p class="text-slate-300 text-sm max-w-xl leading-relaxed mb-3">
              Daily deep drops, 99¢ steals, and secret glitch coupons. 
              Tap any square below to clip promo codes & claim deals before expiration.
            </p>

            {/* Quick Stats Pill Bar */}
            <div class="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              <div>
                <strong class="text-white font-bold text-sm block sm:inline mr-1">{dealsCount}</strong>
                <span>Deals Active</span>
              </div>
              <div class="h-3 w-[1px] bg-slate-800"></div>
              <div>
                <strong class="text-emerald-400 font-bold text-sm block sm:inline mr-1">98%</strong>
                <span>Max Savings</span>
              </div>
              <div class="h-3 w-[1px] bg-slate-800"></div>
              <div>
                <strong class="text-pink-400 font-bold text-sm block sm:inline mr-1">49.8k</strong>
                <span>IG Community</span>
              </div>
            </div>
          </div>

          {/* Follow & Action CTA */}
          <div class="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              class="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all shadow-md shadow-pink-600/20 active:scale-95"
            >
              <Instagram size={14} />
              <span>Follow IG</span>
            </a>
            <button
              onClick={handleShare}
              class="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3 py-2 rounded-lg transition-all active:scale-95 border border-slate-700"
            >
              <Share2 size={14} />
              <span class="hidden sm:inline">Share Feed</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
