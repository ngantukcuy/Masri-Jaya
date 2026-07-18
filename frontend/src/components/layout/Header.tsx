import React, { useState } from 'react';
import { Search, MapPin, RotateCw, Bell, Menu, LogOut, Clock, Coins, Shield, X } from 'lucide-react';

interface SearchResultItem {
  id: string;
  label: string;
  sublabel: string;
  category: string;
  tab: string;
}

interface HeaderProps {
  currentTab: string;
  searchValue?: string;
  onSearch: (query: string) => void;
  searchResults?: SearchResultItem[];
  onSearchResultSelect?: (tab: string) => void;
  onTabChange: (tab: string) => void;
  searchPlaceholder?: string;
  onSync: () => void;
  currentUser?: { name: string; role: string } | null;
  onMenuToggle?: () => void;
  onLogout?: () => void;
  onUserChange?: (user: { name: string; role: string }) => void;
}

export default function Header({ 
  currentTab, 
  searchValue,
  onSearch, 
  searchResults = [],
  onSearchResultSelect,
  onTabChange, 
  searchPlaceholder, 
  onSync, 
  currentUser,
  onMenuToggle,
  onLogout,
  onUserChange
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Dynamic user based on active tab or login
  const getUserProfile = () => {
    if (currentUser) {
      return {
        name: currentUser.name,
        role: currentUser.role === 'owner' ? 'Pemilik Toko' : 'Staf Kasir',
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      };
    }
    
    switch (currentTab) {
      case 'pos':
        return {
          name: "Budi Santoso",
          role: "Kasir Toko",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
        };
      case 'products':
        return {
          name: "Hendi Pratama",
          role: "Pengelola Gudang",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
        };
      default:
        return {
          name: "Alexandra Tokku",
          role: "Pemilik Toko",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
        };
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleResultClick = (tab: string) => {
    setIsSearchFocused(false);
    onSearchResultSelect?.(tab);
  };

  const handleSyncClick = () => {
    setSyncing(true);
    onSync();
    setTimeout(() => {
      setSyncing(false);
    }, 800);
  };

  const notifications = [
    { id: 1, text: "Stok semen kritis! Tersisa hanya 3 hari.", type: "warning" },
    { id: 2, text: "Penjualan POS INV-2024-0891 selesai: +Rp 1.450.000", type: "success" },
    { id: 3, text: "Peringatan utang jatuh tempo: BuildCorp Ltd telat 15 hari", type: "error" }
  ];

  const profile = getUserProfile();
  const defaultPlaceholder = "Cari pesanan, stok bahan, atau pemasok...";
  const actualPlaceholder = searchPlaceholder || defaultPlaceholder;

  return (
    <header className="h-16 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 shadow-sm">
      {/* Menu Hamburger for mobile & Search Input */}
      <div className="flex items-center gap-2 md:gap-6 flex-1 mr-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="p-2 md:hidden hover:bg-slate-100/80 active:bg-slate-200/80 rounded-xl text-slate-700 transition-colors cursor-pointer mr-1"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        <div className="relative w-full max-w-xs md:max-w-md group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            value={searchValue || ''}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            placeholder={actualPlaceholder}
            className="w-full glass-input rounded-xl pl-11 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400"
          />

          {isSearchFocused && searchValue && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 max-h-80 overflow-y-auto">
              {searchResults.length === 0 ? (
                <p className="px-4 py-3 text-[11px] text-slate-400">Tidak ada hasil untuk "{searchValue}"</p>
              ) : (
                searchResults.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onMouseDown={() => handleResultClick(result.tab)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{result.label}</p>
                      <p className="text-[10px] text-slate-400 truncate">{result.sublabel}</p>
                    </div>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{result.category}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <nav className="hidden lg:flex items-center gap-6 ml-4">
          <button 
            onClick={() => onTabChange('pos')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              currentTab === 'pos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            KASIR POS
          </button>
          <button 
            onClick={() => onTabChange('products')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              currentTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            INVENTORI
          </button>
          <button 
            onClick={() => onTabChange('reports')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors cursor-pointer ${
              currentTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            LAPORAN
          </button>
        </nav>
      </div>

      {/* Right Tools (Branch, Sync, Notify, Profile) */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Branch */}
        <div className="hidden sm:flex flex-col items-end mr-1">
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-600" /> Cabang
          </span>
          <span className="text-xs font-extrabold text-blue-600 mt-0.5">Gudang Utama</span>
        </div>

        {/* Sync Button (Moderate Neumorphic Feel) */}
        <button 
          onClick={handleSyncClick}
          className={`p-2 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer border border-slate-200/40 text-slate-600 ${
            syncing ? 'bg-slate-100 text-blue-600' : 'bg-white'
          }`}
          title="Sinkronisasi Data ERP"
        >
          <RotateCw className={`w-4 h-4 ${syncing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer border border-slate-200/40 text-slate-600 bg-white"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Notifikasi Terbaru</span>
                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">3 Aktif</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 text-xs text-slate-600 hover:bg-slate-50/50 transition-colors flex gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-red-500 rounded-full shrink-0"></span>
                    <p className="uppercase tracking-wide text-[10px] leading-relaxed">{notif.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div 
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-slate-200 cursor-pointer hover:opacity-85 select-none transition-all active:scale-95"
          title="Buka Info Sesi"
        >
          <div className="p-0.5 rounded-full border border-slate-200">
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">{profile.name}</p>
            <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{profile.role}</p>
          </div>
        </div>
      </div>

      {/* USER PROFILE MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            onClick={() => setShowProfileModal(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 p-6 shadow-2xl max-h-[85vh] overflow-y-auto relative z-10 space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1.5 text-blue-600">
                <Shield className="w-5 h-5 animate-pulse" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-800">Sesi &amp; Informasi Akun</h3>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)} 
                className="p-1 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Profile Detail Card */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h4 className="font-bold text-gray-900 text-sm">{profile.name}</h4>
                <p className="text-[10px] text-gray-500 font-semibold">{profile.role}</p>
                <span className="inline-block mt-1 text-[8px] bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                  Status: Online
                </span>
              </div>
            </div>

            {/* System Info & Stats */}
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <h5 className="font-bold text-[10px] text-gray-400 uppercase tracking-wider text-left">Metrik Operasional Sesi</h5>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 border border-gray-100 rounded-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <span className="text-[8px] text-gray-400 block uppercase">Uptime Sesi</span>
                    <span className="font-bold text-slate-800">04:45:12</span>
                  </div>
                </div>
                <div className="p-2 border border-gray-100 rounded-lg flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <span className="text-[8px] text-gray-400 block uppercase">Kas Laci</span>
                    <span className="font-bold text-slate-800">Rp 12.840k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Switch user role simulation */}
            {onUserChange && (
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <h5 className="font-bold text-[10px] text-gray-400 uppercase tracking-wider text-left">Simulasi Alih Peran (Role Switcher)</h5>
                <div className="space-y-1.5">
                  <button 
                    onClick={() => {
                      onUserChange({ name: "Alexandra Tokku", role: "owner" });
                      setShowProfileModal(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg font-bold flex items-center justify-between border ${
                      currentUser?.role === 'owner' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white hover:bg-slate-50 border-gray-100'
                    }`}
                  >
                    <span>Alexandra Tokku (Pemilik Toko)</span>
                    <span className="text-[8px] uppercase font-black bg-slate-100 px-1 py-0.5 rounded">Owner</span>
                  </button>
                  <button 
                    onClick={() => {
                      onUserChange({ name: "Budi Santoso", role: "kasir" });
                      setShowProfileModal(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg font-bold flex items-center justify-between border ${
                      currentUser?.role === 'kasir' || (!currentUser && profile.role === 'Kasir Toko') ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white hover:bg-slate-50 border-gray-100'
                    }`}
                  >
                    <span>Budi Santoso (Kasir Utama)</span>
                    <span className="text-[8px] uppercase font-black bg-slate-100 px-1 py-0.5 rounded">Kasir</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-2 rounded-lg cursor-pointer uppercase text-center"
              >
                Tutup
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    setShowProfileModal(false);
                  }}
                  className="flex-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-black py-2 rounded-lg cursor-pointer uppercase flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
