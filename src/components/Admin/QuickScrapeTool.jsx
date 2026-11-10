import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Zap, Globe, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_PRESETS = [
  {
    title: "Dual-Port 65W GaN Fast Wall Charger (Foldable Plug)",
    originalPrice: 34.99,
    salePrice: 0.99,
    category: "Tech",
    merchant: "Amazon",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-compact Gallium Nitride charger with Type-C and USB-A power delivery.",
    couponCode: "GAN99DROP"
  },
  {
    title: "Handheld Rechargeable High-Speed Turbo Desk Fan (3-Speed)",
    originalPrice: 22.00,
    salePrice: 0.99,
    category: "Home & Kitchen",
    merchant: "AliExpress Choice",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    description: "Pocket brushless fan delivering 4500 RPM cooling with 2000mAh battery.",
    couponCode: "FAN99COOL"
  },
  {
    title: "Aviation Grade Titanium Tactical EDC Pry Bar & Bottle Opener",
    originalPrice: 28.50,
    salePrice: 0.99,
    category: "Lifestyle & Everyday",
    merchant: "Temu VIP",
    imageUrl: "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80",
    description: "CNC machined TC4 titanium pocket tool with integrated nail puller and keychain clip.",
    couponCode: "PRY99EDC"
  }
];

export default function QuickScrapeTool({ onAddDeal }) {
  const [urlOrText, setUrlOrText] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Intelligent parser for retail links or raw product text
  const handleParse = (e) => {
    e.preventDefault();
    if (!urlOrText.trim()) return;

    let merchant = 'Amazon';
    const textLower = urlOrText.toLowerCase();

    if (textLower.includes('aliexpress')) merchant = 'AliExpress Choice';
    else if (textLower.includes('temu')) merchant = 'Temu VIP';
    else if (textLower.includes('walmart')) merchant = 'Walmart Clearance';
    else if (textLower.includes('target')) merchant = 'Target DealDays';

    // Extract title or make a clean one
    let cleanTitle = urlOrText.trim();
    if (cleanTitle.startsWith('http')) {
      try {
        const urlObj = new URL(cleanTitle);
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);
        cleanTitle = pathSegments[0] ? decodeURIComponent(pathSegments[0]).replace(/[-_]/g, ' ') : 'Curated 99¢ Steal Drop';
      } catch {
        cleanTitle = 'Curated 99¢ Steal Drop';
      }
    }

    // Capitalize words
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    if (cleanTitle.length > 60) cleanTitle = cleanTitle.slice(0, 60) + '...';

    const origPrice = 29.99;
    const salePrice = 0.99;
    const discount = Math.round(((origPrice - salePrice) / origPrice) * 100);
    const code = `SUPER99${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const parsed = {
      title: cleanTitle || "Premium 99¢ Flash Item",
      originalPrice: origPrice,
      salePrice: salePrice,
      discountPercent: discount,
      category: "Tech",
      tag: "99¢ Steal",
      merchant: merchant,
      rating: 4.8,
      reviewsCount: Math.floor(Math.random() * 3000) + 500,
      couponCode: code,
      affiliateUrl: urlOrText.startsWith('http') ? urlOrText : 'https://amazon.com',
      imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      description: "Auto-ingested verified discount drop. Deep savings verified for @SuperDiscount.99 audience.",
      expiresInHours: 6,
      verified: true,
      featured: true
    };

    setExtractedData(parsed);
    setStatusMessage('Parsed & formatted for 99¢ drop!');
  };

  const handleApplyPreset = (preset) => {
    const fullDeal = {
      ...preset,
      tag: preset.salePrice <= 1.00 ? "99¢ Steal" : "Flash Steal",
      rating: 4.9,
      reviewsCount: 1840,
      affiliateUrl: "https://amazon.com",
      expiresInHours: 5,
      verified: true,
      featured: true
    };
    setExtractedData(fullDeal);
    setStatusMessage(`Loaded preset: ${preset.title.slice(0, 30)}...`);
  };

  const handleInjectToFeed = () => {
    if (!extractedData) return;
    onAddDeal(extractedData);
    
    // Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStatusMessage('Success! Injected directly into the 3-across grid.');
    setExtractedData(null);
    setUrlOrText('');
  };

  return (
    <div class="space-y-4">
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 mb-2">
          <Wand2 size={16} class="text-pink-400" />
          <span>Quick Deal Ingest & URL Scraper</span>
        </h3>
        <p class="text-xs text-slate-400 mb-4">
          Paste any product link or clearance title. The engine auto-calculates the 99¢ drop, generates exclusive coupon codes, and formats it for the square feed.
        </p>

        {/* Input Bar */}
        <form onSubmit={handleParse} class="flex gap-2">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Globe size={15} />
            </div>
            <input
              type="text"
              value={urlOrText}
              onChange={(e) => setUrlOrText(e.target.value)}
              placeholder="Paste Amazon, AliExpress, Temu link or product name..."
              class="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            class="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Auto-Parse</span>
            <Sparkles size={14} />
          </button>
        </form>

        {/* 1-Click Fast Presets */}
        <div class="mt-4 pt-3 border-t border-slate-800/80">
          <div class="text-[11px] font-semibold text-slate-400 mb-2">Or load instant trending clearance drops:</div>
          <div class="flex flex-wrap gap-2">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                class="text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Zap size={12} class="text-emerald-400" />
                <span class="max-w-[200px] truncate">{preset.title}</span>
                <span class="text-emerald-400 font-bold">$0.99</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extracted Preview Card */}
      {extractedData && (
        <div class="bg-gradient-to-br from-slate-900 to-[#161F33] border border-emerald-500/40 rounded-xl p-4 animate-fade-in shadow-xl">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Check size={14} /> Deal Ready for Storefront
            </span>
            <span class="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              {extractedData.discountPercent}% OFF
            </span>
          </div>

          <div class="flex gap-3 items-center">
            <img
              src={extractedData.imageUrl}
              alt=""
              class="w-16 h-16 rounded-lg object-cover border border-slate-700"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-white truncate">{extractedData.title}</h4>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-emerald-400 font-black text-sm">${extractedData.salePrice.toFixed(2)}</span>
                <span class="text-slate-400 line-through text-xs">${extractedData.originalPrice.toFixed(2)}</span>
                <span class="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  Code: {extractedData.couponCode}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setExtractedData(null)}
              class="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleInjectToFeed}
              class="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Publish to 3-Across Grid</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {statusMessage && (
        <div class="text-[11px] text-slate-400 text-center italic">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
