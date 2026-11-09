import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import DealGrid from './components/DealGrid';
import DealModal from './components/DealModal';
import Footer from './components/Footer';
import initialDeals from './data/deals.json';

export default function App() {
  const [dealsList, setDealsList] = useState(initialDeals);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleLimit, setVisibleLimit] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Dynamic category calculations
  const categories = useMemo(() => {
    const list = [
      { name: 'All', count: dealsList.length },
      { name: 'Under $1', count: dealsList.filter(d => d.salePrice <= 1.00).length },
      { name: 'Tech', count: dealsList.filter(d => d.category === 'Tech').length },
      { name: 'Home & Kitchen', count: dealsList.filter(d => d.category === 'Home & Kitchen').length },
      { name: 'Lifestyle & Everyday', count: dealsList.filter(d => d.category === 'Lifestyle & Everyday').length },
    ];
    return list;
  }, [dealsList]);

  // Filtered and sorted deals
  const filteredDeals = useMemo(() => {
    let result = [...dealsList];

    // Filter by Category
    if (selectedCategory === 'Under $1') {
      result = result.filter(d => d.salePrice <= 1.00);
    } else if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.merchant.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        (d.tag && d.tag.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'discount-desc') {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [dealsList, selectedCategory, searchQuery, sortBy]);

  // Visible slices for "unlimited down" pagination
  const visibleDeals = useMemo(() => {
    return filteredDeals.slice(0, visibleLimit);
  }, [filteredDeals, visibleLimit]);

  const hasMore = visibleLimit < filteredDeals.length;

  // Simulate loading more items down the feed
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleLimit(prev => prev + 6);
      setIsLoadingMore(false);
    }, 400);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setVisibleLimit(12);
  };

  const dealsUnderOneDollarCount = useMemo(() => {
    return dealsList.filter(d => d.salePrice <= 1.00).length;
  }, [dealsList]);

  return (
    <div class="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        dealsCount={dealsList.length}
        dealsUnderOneDollar={dealsUnderOneDollarCount}
      />

      {/* Main Content Area */}
      <main class="flex-1 w-full">
        {/* Filters and Search Bar */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setVisibleLimit(12);
          }}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setVisibleLimit(12);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredDeals.length}
        />

        {/* The 3-Across Square Grid ("Unlimited Down") */}
        <DealGrid
          deals={visibleDeals}
          onDealClick={(deal) => setSelectedDeal(deal)}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Deal Details & Coupon Redemption Modal */}
      {selectedDeal && (
        <DealModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
