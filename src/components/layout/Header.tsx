import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Bell,
  MapPin,
  Search,
  FileUp,
  User as UserIcon,
  ChevronDown,
  ShieldCheck,
  Stethoscope,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Cross
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { SearchDropdown } from '../product/SearchDropdown';
import { LocationSelectorModal } from './LocationSelectorModal';
import { NotificationDrawer } from './NotificationDrawer';
import { formatCurrency } from '../../utils/formatters';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const cartCount = useCartStore((state) => state.getItemCount());
  const cartSubtotal = useCartStore((state) => state.getSubtotal());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const unreadNotifCount = useNotificationStore((state) => state.getUnreadCount());
  const { user, isAuthenticated, selectedLocation, switchRole, logout } = useAuthStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-2xs">
      {/* Top Clinical & Trust Announcement Bar */}
      <div className="bg-medical-900 text-slate-100 text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-medical-200">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              100% Genuine Hospital Sourced Medicines & 24/7 Clinical Pharmacist Verification
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Emergency Hospital Helpline: <span className="text-white font-bold tracking-wide">1800-419-8800</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {/* Interactive Demo Role Switcher */}
            <div className="flex items-center gap-1 bg-medical-800/80 px-2 py-0.5 rounded-full border border-medical-700">
              <span className="text-[10px] text-medical-300 font-semibold mr-1">DEMO ROLE:</span>
              <button
                onClick={() => switchRole('patient')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  user?.role === 'patient' ? 'bg-medical-500 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => switchRole('pharmacist')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  user?.role === 'pharmacist' ? 'bg-medical-500 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Pharmacist
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  user?.role === 'admin' ? 'bg-medical-500 text-white font-bold' : 'hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <Link to="/hospital" className="hover:text-white transition-colors">
              Hospital Campus
            </Link>
            <Link to="/support" className="hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main Desktop Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Hospital Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-medical-200 group-hover:scale-105 transition-transform">
              <Cross className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-medical-600 transition-colors">
                  ApexCare
                </span>
                <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded border border-teal-200">
                  HOSPITAL
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                Pharmacy & Medical E-Commerce
              </p>
            </div>
          </Link>

          {/* Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-colors cursor-pointer shrink-0"
          >
            <MapPin className="w-4 h-4 text-medical-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Deliver to</div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                {selectedLocation.city} - {selectedLocation.pincode}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </button>

          {/* Search Bar with autocomplete and dropdown */}
          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search medicines, salts (e.g. Paracetamol, Metformin), medical devices..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 px-3 py-1.5 bg-medical-600 hover:bg-medical-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            <SearchDropdown
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              query={searchQuery}
              setQuery={setSearchQuery}
            />
          </div>

          {/* Right Header CTAs & Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Upload Prescription Button */}
            <Link
              to="/prescriptions/upload"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs group"
            >
              <FileUp className="w-4 h-4 text-emerald-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>Upload Prescription</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-red-500 transition-colors relative"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-medical-600 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-medical-50 hover:bg-medical-100 text-medical-800 border border-medical-200 transition-all relative group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-medical-600 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-medical-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-[10px] text-medical-600/90 font-semibold leading-tight">My Cart</div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {formatCurrency(cartSubtotal)}
                </div>
              </div>
            </Link>

            {/* User Profile / Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-medical-400"
                    />
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                        {user?.name.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-medical-600 font-semibold uppercase leading-tight">
                        {user?.role}
                      </div>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
                        <div className="mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-medical-50 text-medical-700 uppercase">
                            Role: {user?.role}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-0.5 text-xs">
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-medical-700 bg-medical-50/50 hover:bg-medical-50 font-bold"
                          >
                            <LayoutDashboard className="w-4 h-4 text-medical-600" />
                            Admin Console
                          </Link>
                        )}
                        {user?.role === 'pharmacist' && (
                          <Link
                            to="/admin/prescriptions"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-teal-700 bg-teal-50/50 hover:bg-teal-50 font-bold"
                          >
                            <ClipboardList className="w-4 h-4 text-teal-600" />
                            Pharmacist Audit Panel
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          My Profile & Dashboard
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <ClipboardList className="w-4 h-4 text-slate-400" />
                          Order History & Tracking
                        </Link>
                        <Link
                          to="/prescriptions"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <FileUp className="w-4 h-4 text-slate-400" />
                          My Prescriptions
                        </Link>
                        <Link
                          to="/appointments"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <Stethoscope className="w-4 h-4 text-slate-400" />
                          Doctor Appointments
                        </Link>
                      </div>

                      <div className="pt-1 mt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-medical-600 hover:bg-medical-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-50/90 border-t border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 lg:space-x-6 text-xs font-semibold text-slate-700 py-2.5 overflow-x-auto">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/medicines"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Medicines
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/medicines/medical-devices"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Healthcare Devices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                    isActive ? 'text-amber-600 bg-white shadow-2xs font-bold' : 'text-amber-700 hover:text-amber-800'
                  }`
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hospital"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                Hospital Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? 'text-medical-600 bg-white shadow-2xs font-bold' : 'hover:text-medical-600'
                  }`
                }
              >
                24/7 Support
              </NavLink>
            </li>
            {user?.role === 'admin' && (
              <li className="ml-auto">
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-lg bg-medical-100 text-medical-800 hover:bg-medical-200 transition-colors font-bold text-[11px] flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Modals & Drawers */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
};
