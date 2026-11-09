import React from 'react';
import { Instagram, ArrowUp, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer class="w-full bg-[#080C14] border-t border-slate-800/80 text-slate-400 py-10 px-4 text-xs">
      <div class="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        
        {/* Brand identity */}
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-[10px]">
            .99
          </div>
          <span class="font-bold text-slate-200 text-sm">SuperDiscount.99</span>
        </div>

        <p class="max-w-md text-slate-400 leading-relaxed">
          Curating the web's deepest bargains, flash glitches, and 99¢ doorbusters. 
          Updated throughout the day.
        </p>

        {/* Affiliate Disclosure */}
        <div class="max-w-lg bg-slate-900/60 border border-slate-800 rounded-lg p-3 text-[11px] text-slate-400 leading-normal">
          <strong class="text-slate-300">Affiliate Disclosure:</strong> SuperDiscount.99 participates in various affiliate marketing programs. We may earn a commission on qualifying purchases made through links on this site at zero extra cost to you.
        </div>

        {/* Action & Copyright */}
        <div class="flex items-center justify-between w-full pt-4 border-t border-slate-800/60 text-[11px]">
          <span>© {new Date().getFullYear()} SuperDiscount.99. All rights reserved.</span>
          
          <button
            onClick={scrollToTop}
            class="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
