import React, { useState } from 'react';
import { X, Save, Sparkles, Image, DollarSign, Tag, ExternalLink } from 'lucide-react';

export default function DealEditorModal({ deal, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: deal?.title || '',
    category: deal?.category || 'Tech',
    originalPrice: deal?.originalPrice || 24.99,
    salePrice: deal?.salePrice || 0.99,
    merchant: deal?.merchant || 'Amazon',
    couponCode: deal?.couponCode || 'SUPER99DROP',
    tag: deal?.tag || '99¢ Steal',
    imageUrl: deal?.imageUrl || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: deal?.affiliateUrl || 'https://amazon.com',
    description: deal?.description || 'Curated high-discount bargain verified for @SuperDiscount.99 audience.',
    featured: deal?.featured ?? true
  });

  const discountPercent = Math.round(
    ((parseFloat(formData.originalPrice) - parseFloat(formData.salePrice)) / parseFloat(formData.originalPrice)) * 100
  ) || 95;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave({
      ...formData,
      id: deal?.id,
      discountPercent
    });
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div class="relative w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <Tag size={16} class="text-pink-400" />
            <span>{deal ? 'Edit Deal Drop' : 'Create New Deal Drop'}</span>
          </h3>
          <button onClick={onClose} class="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} class="overflow-y-auto p-4 space-y-3.5 text-xs">
          
          {/* Title */}
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Deal Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 100W Fast Braided USB-C Cable"
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Pricing Row */}
          <div class="grid grid-cols-3 gap-2 items-center">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Regular Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Sale Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                class="w-full px-3 py-2 bg-slate-900 border border-emerald-500/60 text-emerald-400 font-bold rounded-lg"
              />
            </div>

            <div class="text-center pt-3">
              <span class="inline-block px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-black text-xs">
                {discountPercent}% OFF
              </span>
            </div>
          </div>

          {/* Category & Merchant */}
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                class="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
              >
                <option value="Tech">Tech</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Lifestyle & Everyday">Lifestyle & Everyday</option>
                <option value="Under $1">Under $1</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Merchant</label>
              <select
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                class="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
              >
                <option value="Amazon">Amazon</option>
                <option value="AliExpress Choice">AliExpress Choice</option>
                <option value="Temu VIP">Temu VIP</option>
                <option value="Walmart Clearance">Walmart Clearance</option>
                <option value="Target DealDays">Target DealDays</option>
                <option value="Best Buy Outlet">Best Buy Outlet</option>
              </select>
            </div>
          </div>

          {/* Coupon Code & Badge Tag */}
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                value={formData.couponCode}
                onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                class="w-full px-3 py-2 bg-slate-900 border border-pink-500/50 font-mono text-yellow-300 font-bold rounded-lg"
              />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. 99¢ Steal"
                class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
            />
          </div>

          {/* Affiliate URL */}
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Affiliate Outbound URL</label>
            <input
              type="url"
              required
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs"
            />
          </div>

          {/* Featured Toggle */}
          <div class="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              class="rounded text-pink-600 focus:ring-pink-500 bg-slate-900 border-slate-700"
            />
            <label htmlFor="featured" class="text-slate-300 cursor-pointer">
              Feature at top of 3-across grid
            </label>
          </div>

          {/* Bottom Actions */}
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              class="px-3 py-2 rounded-lg text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>Save Deal</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
