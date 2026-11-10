import React, { createContext, useContext, useState, useEffect } from 'react';
import initialDeals from '../data/deals.json';

const DealsContext = createContext(null);
const STORAGE_KEY = 'superdiscount99_deals_catalog_v1';
const AUTH_KEY = 'superdiscount99_admin_auth';
const DEFAULT_PIN = '9999';

export function DealsProvider({ children }) {
  const [deals, setDeals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load deals from localStorage:', e);
    }
    return initialDeals;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
    } catch (e) {
      console.error('Failed to sync deals to localStorage:', e);
    }
  }, [deals]);

  // Authenticate PIN
  const verifyPin = (pin) => {
    if (pin === DEFAULT_PIN) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdminOpen(false);
  };

  // CRUD Operations
  const addDeal = (newDeal) => {
    const formattedDeal = {
      ...newDeal,
      id: newDeal.id || `deal-${Date.now()}`,
      salePrice: parseFloat(newDeal.salePrice) || 0.99,
      originalPrice: parseFloat(newDeal.originalPrice) || 19.99,
      discountPercent: Math.round(((parseFloat(newDeal.originalPrice) - parseFloat(newDeal.salePrice)) / parseFloat(newDeal.originalPrice)) * 100) || 95,
      rating: parseFloat(newDeal.rating) || 4.8,
      reviewsCount: parseInt(newDeal.reviewsCount) || 1200,
      expiresInHours: parseInt(newDeal.expiresInHours) || 6,
      verified: true
    };
    setDeals(prev => [formattedDeal, ...prev]);
    return formattedDeal;
  };

  const updateDeal = (id, updatedFields) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === id) {
        const updated = { ...deal, ...updatedFields };
        if (updatedFields.originalPrice || updatedFields.salePrice) {
          const orig = parseFloat(updated.originalPrice) || 19.99;
          const sale = parseFloat(updated.salePrice) || 0.99;
          updated.discountPercent = Math.round(((orig - sale) / orig) * 100);
        }
        return updated;
      }
      return deal;
    }));
  };

  const deleteDeal = (id) => {
    setDeals(prev => prev.filter(deal => deal.id !== id));
  };

  const toggleFeatured = (id) => {
    setDeals(prev => prev.map(deal => 
      deal.id === id ? { ...deal, featured: !deal.featured } : deal
    ));
  };

  const resetToDefault = () => {
    setDeals(initialDeals);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDealsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deals, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `superdiscount99_deals_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDealsJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setDeals(parsed);
        return { success: true, count: parsed.length };
      }
      return { success: false, error: 'JSON must be an array of deal items.' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <DealsContext.Provider
      value={{
        deals,
        addDeal,
        updateDeal,
        deleteDeal,
        toggleFeatured,
        resetToDefault,
        exportDealsJSON,
        importDealsJSON,
        isAdminAuthenticated,
        isAdminOpen,
        setIsAdminOpen,
        verifyPin,
        logoutAdmin,
        defaultPin: DEFAULT_PIN
      }}
    >
      {children}
    </DealsContext.Provider>
  );
}

export function useDeals() {
  const context = useContext(DealsContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealsProvider');
  }
  return context;
}
