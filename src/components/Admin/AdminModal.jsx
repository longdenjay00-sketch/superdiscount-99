import React, { useState } from 'react';
import { 
  X, Lock, KeyRound, BarChart3, Wand2, Package, Download, 
  Upload, RotateCcw, Plus, Edit3, Trash2, Star, CheckCircle, AlertTriangle 
} from 'lucide-react';
import { useDeals } from '../../context/DealsContext';
import AnalyticsSummary from './AnalyticsSummary';
import QuickScrapeTool from './QuickScrapeTool';
import DealEditorModal from './DealEditorModal';

export default function AdminModal() {
  const { 
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
    defaultPin 
  } = useDeals();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'scraper' | 'inventory' | 'sync'
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState('');

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (verifyPin(pinInput)) {
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSaveDeal = (dealData) => {
    if (editingDeal) {
      updateDeal(editingDeal.id, dealData);
      setEditingDeal(null);
    } else if (isCreatingNew) {
      addDeal(dealData);
      setIsCreatingNew(false);
    }
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const res = importDealsJSON(importText);
    if (res.success) {
      setImportStatus(`Successfully imported ${res.count} deals!`);
      setImportText('');
    } else {
      setImportStatus(`Import Error: ${res.error}`);
    }
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div class="relative w-full max-w-4xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#0B0F19]">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center text-white">
              <Lock size={15} />
            </div>
            <div>
              <h2 class="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                SuperDiscount.99 Admin Studio
              </h2>
              <div class="text-[10px] text-slate-400">Storefront & Catalog Management</div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                class="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20"
              >
                Lock Studio
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div class="p-8 sm:p-12 flex flex-col items-center text-center max-w-sm mx-auto">
            <div class="w-14 h-14 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-pink-400 mb-4">
              <KeyRound size={26} />
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Operator Authentication</h3>
            <p class="text-xs text-slate-400 mb-6">
              Enter the master PIN to manage the 3-across catalog and deal scrapers.
            </p>

            <form onSubmit={handlePinSubmit} class="w-full space-y-3">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN..."
                class="w-full text-center text-xl tracking-widest font-mono py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-pink-500"
                autoFocus
              />
              {pinError && (
                <div class="text-[11px] text-rose-400 font-medium">
                  Invalid PIN. Default system PIN is <code class="bg-slate-800 px-1 py-0.5 rounded">{defaultPin}</code>
                </div>
              )}
              <button
                type="submit"
                class="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg active:scale-95 transition-all"
              >
                Unlock Studio
              </button>
            </form>
          </div>
        ) : (
          /* Admin Studio Tabs & Workspace */
          <div class="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab Navigation */}
            <div class="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 border-b border-slate-800 bg-slate-900/60 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                class={`flex items-center gap-1.5 py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-pink-500 text-pink-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 size={15} />
                <span>Overview & KPIs</span>
              </button>

              <button
                onClick={() => setActiveTab('scraper')}
                class={`flex items-center gap-1.5 py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'scraper'
                    ? 'border-pink-500 text-pink-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wand2 size={15} />
                <span>Deal Scraper & Ingest</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                class={`flex items-center gap-1.5 py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'inventory'
                    ? 'border-pink-500 text-pink-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Package size={15} />
                <span>Catalog Inventory ({deals.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('sync')}
                class={`flex items-center gap-1.5 py-3 px-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'sync'
                    ? 'border-pink-500 text-pink-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download size={15} />
                <span>Data Sync & Export</span>
              </button>
            </div>

            {/* Tab Body */}
            <div class="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <AnalyticsSummary deals={deals} />
              )}

              {/* TAB 2: SCRAPER */}
              {activeTab === 'scraper' && (
                <QuickScrapeTool onAddDeal={(newDeal) => addDeal(newDeal)} />
              )}

              {/* TAB 3: INVENTORY TABLE */}
              {activeTab === 'inventory' && (
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400">
                      Total drops in grid: <strong class="text-white">{deals.length}</strong>
                    </span>
                    <button
                      onClick={() => setIsCreatingNew(true)}
                      class="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Plus size={14} />
                      <span>Add Deal Drop</span>
                    </button>
                  </div>

                  <div class="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
                    <div class="divide-y divide-slate-800 max-h-[50vh] overflow-y-auto">
                      {deals.map((deal) => (
                        <div key={deal.id} class="p-3 flex items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                          <div class="flex items-center gap-3 min-w-0">
                            <img
                              src={deal.imageUrl}
                              alt=""
                              class="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0"
                            />
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5">
                                <h4 class="text-xs font-bold text-white truncate max-w-xs">{deal.title}</h4>
                                {deal.featured && (
                                  <Star size={11} class="text-amber-400 fill-current flex-shrink-0" />
                                )}
                              </div>
                              <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                <span class="text-emerald-400 font-bold">${deal.salePrice.toFixed(2)}</span>
                                <span class="line-through text-slate-500">${deal.originalPrice.toFixed(2)}</span>
                                <span>• {deal.merchant}</span>
                                <span class="font-mono text-yellow-300/80">[{deal.couponCode}]</span>
                              </div>
                            </div>
                          </div>

                          <div class="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => toggleFeatured(deal.id)}
                              title="Toggle Featured"
                              class={`p-1.5 rounded-lg transition-colors ${deal.featured ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                              <Star size={15} class={deal.featured ? 'fill-current' : ''} />
                            </button>
                            <button
                              onClick={() => setEditingDeal(deal)}
                              title="Edit Deal"
                              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${deal.title}"?`)) {
                                  deleteDeal(deal.id);
                                }
                              }}
                              title="Delete Deal"
                              class="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DATA SYNC */}
              {activeTab === 'sync' && (
                <div class="space-y-4 text-xs">
                  <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <h4 class="font-bold text-white mb-1 flex items-center gap-1.5">
                      <Download size={15} class="text-pink-400" />
                      <span>Export Catalog to JSON</span>
                    </h4>
                    <p class="text-slate-400 mb-3">
                      Download the entire live catalog as a cleanly formatted <code class="bg-slate-800 px-1 py-0.5 rounded text-pink-300">deals.json</code> file to commit back to GitHub.
                    </p>
                    <button
                      onClick={exportDealsJSON}
                      class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center gap-2 border border-slate-700 transition-all active:scale-95"
                    >
                      <Download size={14} />
                      <span>Download deals.json</span>
                    </button>
                  </div>

                  <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <h4 class="font-bold text-white mb-1 flex items-center gap-1.5">
                      <Upload size={15} class="text-indigo-400" />
                      <span>Import JSON Deals Array</span>
                    </h4>
                    <p class="text-slate-400 mb-2">
                      Paste a raw JSON array of deals to bulk replace or update the active catalog.
                    </p>
                    <form onSubmit={handleImportSubmit} class="space-y-2">
                      <textarea
                        rows={3}
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        placeholder='[ { "title": "...", "salePrice": 0.99, ... } ]'
                        class="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                      {importStatus && (
                        <div class="text-[11px] text-emerald-400 font-semibold">{importStatus}</div>
                      )}
                      <button
                        type="submit"
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
                      >
                        Apply JSON Import
                      </button>
                    </form>
                  </div>

                  <div class="bg-slate-900/50 border border-rose-500/20 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 class="font-bold text-rose-300 mb-0.5 flex items-center gap-1.5">
                        <RotateCcw size={14} />
                        <span>Reset to Factory Defaults</span>
                      </h4>
                      <p class="text-slate-400 text-[11px]">
                        Clears local browser cache and restores initial 18 seed deals.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Reset all catalog modifications to factory defaults?')) {
                          resetToDefault();
                        }
                      }}
                      class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold"
                    >
                      Reset Catalog
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Modal for Creating or Editing Deals */}
      {(editingDeal || isCreatingNew) && (
        <DealEditorModal
          deal={editingDeal}
          onSave={handleSaveDeal}
          onClose={() => {
            setEditingDeal(null);
            setIsCreatingNew(false);
          }}
        />
      )}
    </div>
  );
}
