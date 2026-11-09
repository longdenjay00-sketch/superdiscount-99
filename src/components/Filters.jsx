import React from 'react';
import { Search, X, Sparkles, DollarSign, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function Filters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults
}) {
  return (
    <div class="w-full max-w-4xl mx-auto px-4 pt-4 pb-2">
      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
        
        {/* Search Bar */}
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 99¢ deals, brands, products..."
            class="w-full pl-9 pr-9 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div class="flex items-center gap-2 self-end md:self-auto">
          <span class="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown size={13} />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            class="bg-slate-900 text-slate-200 border border-slate-700/80 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500 cursor-pointer"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-asc">Price: Low to High ($0.99 first)</option>
            <option value="discount-desc">Deepest Discount (%)</option>
            <option value="rating-desc">Top Rated (4.8+ ★)</option>
          </select>
        </div>

      </div>

      {/* Category Pills Bar */}
      <div class="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              class={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/25 ring-2 ring-pink-400/30'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
              }`}
            >
              {cat.name === 'Under $1' && <DollarSign size={13} class="text-emerald-400" />}
              {cat.name === 'Flash Steals' && <Sparkles size={13} class="text-amber-400" />}
              {cat.name}
              <span class={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-700/80 text-slate-400'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count Bar */}
      <div class="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1 pb-2">
        <span>Showing <strong class="text-slate-200">{totalResults}</strong> curated drops</span>
        <span class="flex items-center gap-1 text-emerald-400 font-medium">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Prices verified live
        </span>
      </div>

    </div>
  );
}
