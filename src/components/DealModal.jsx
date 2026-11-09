import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Clock, ShieldCheck, Star, Sparkles, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DealModal({ deal, onClose }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: deal.expiresInHours || 4, minutes: 42, seconds: 19 });

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(deal.couponCode);
    setCopied(true);
    
    // Fire confetti celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E1306C', '#10B981', '#F59E0B', '#3B82F6']
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareDeal = () => {
    const shareText = `Check out this 99¢ deal: ${deal.title} on @SuperDiscount.99! Use code: ${deal.couponCode}`;
    if (navigator.share) {
      navigator.share({
        title: deal.title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
      alert('Deal details copied to clipboard!');
    }
  };

  const savingsAmount = (deal.originalPrice - deal.salePrice).toFixed(2);
  const isUnderOneDollar = deal.salePrice <= 1.00;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      
      {/* Backdrop click to dismiss */}
      <div class="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div class="relative w-full max-w-lg bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header / Dismiss */}
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {deal.merchant} Verified Drop
            </span>
          </div>

          <div class="flex items-center gap-1">
            <button
              onClick={handleShareDeal}
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Share Deal"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={onClose}
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div class="overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Square Image Hero */}
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={deal.imageUrl}
              alt={deal.title}
              class="w-full h-full object-cover"
            />
            <div class="absolute top-2.5 left-2.5">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md">
                <Sparkles size={12} class="fill-current" />
                {deal.tag}
              </span>
            </div>
            <div class="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs text-amber-400 flex items-center gap-1 font-semibold">
              <Star size={13} class="fill-current" />
              <span>{deal.rating}</span>
              <span class="text-slate-400 font-normal">({deal.reviewsCount.toLocaleString()})</span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 class="text-lg font-bold text-white leading-snug mb-2">
              {deal.title}
            </h2>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {deal.description}
            </p>
          </div>

          {/* Pricing Highlight Card */}
          <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Deal Price</div>
              <div class="flex items-baseline gap-2 mt-0.5">
                <span class="text-2xl font-black text-emerald-400">
                  ${deal.salePrice.toFixed(2)}
                </span>
                <span class="text-sm line-through text-slate-500">
                  ${deal.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div class="text-right">
              <span class="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-400 border border-rose-500/30">
                Save ${savingsAmount} ({deal.discountPercent}% OFF)
              </span>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div class="bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-900 border border-pink-500/30 rounded-xl p-3.5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                <Sparkles size={13} /> Exclusive Coupon Code:
              </span>
              <span class="text-[10px] text-slate-400">Apply at checkout</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex-1 font-mono font-black text-base sm:text-lg tracking-wider bg-black/60 px-3 py-2 rounded-lg border border-pink-500/40 text-yellow-300 text-center select-all">
                {deal.couponCode}
              </div>
              <button
                onClick={handleCopyCode}
                class={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  copied
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-500 hover:to-rose-500 shadow-md shadow-pink-600/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Expiration Timer & Verification Note */}
          <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div class="flex items-center gap-1.5 text-amber-400 font-medium">
              <Clock size={14} />
              <span>Expires in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <div class="flex items-center gap-1 text-slate-400">
              <ShieldCheck size={14} class="text-emerald-400" />
              <span>Verified @SuperDiscount.99</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div class="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="noreferrer"
            class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-98 transition-all"
          >
            <span>CLAIM DEAL ON {deal.merchant.toUpperCase()}</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>

    </div>
  );
}
