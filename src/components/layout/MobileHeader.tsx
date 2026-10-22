import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cross, Search, Bell, ShoppingBag, MapPin } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { SearchDropdown } from '../product/SearchDropdown';
import { LocationSelectorModal } from './LocationSelectorModal';
import { NotificationDrawer } from './NotificationDrawer';

export const MobileHeader: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const cartCount = useCartStore((state) => state.getItemCount());
  const unreadNotifCount = useNotificationStore((state) => state.getUnreadCount());
  const { selectedLocation } = useAuthStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-100 shadow-2xs px-4 py-2.5">
      {/* Top Bar with Logo & Actions */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-medical-600 flex items-center justify-center text-white">
            <Cross className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              ApexCare
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-tight">
              Hospital Pharmacy
            </span>
          </div>
        </Link>

        {/* Location badge */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100/80 px-2 py-1 rounded-lg truncate max-w-[120px]"
        >
          <MapPin className="w-3 h-3 text-medical-600 shrink-0" />
          <span className="truncate">{selectedLocation.city}</span>
        </button>

        {/* Right quick actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="p-2 text-slate-600 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 bg-medical-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>
          <Link to="/cart" className="p-2 text-slate-600 relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-medical-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Search medicines, salts, medical essentials..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100/80 focus:bg-white border border-transparent focus:border-medical-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-200 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </form>

        <SearchDropdown
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      {/* Modals */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};
