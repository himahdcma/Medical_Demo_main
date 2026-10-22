import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { OrderCard } from '../../components/orders/OrderCard';
import { AddressCard } from '../../components/checkout/AddressCard';
import { AddressModal } from '../../components/checkout/AddressModal';
import { Button } from '../../components/common/Button';
import {
  User,
  ShoppingBag,
  FileText,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Package,
  Clock,
  ShieldCheck,
  Plus,
  CreditCard
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addresses, addAddress, deleteAddress, logout, switchRole } = useAuthStore();
  const { orders } = useOrderStore();
  const { prescriptions } = usePrescriptionStore();
  const wishlistItems = useWishlistStore((state) => state.items);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'prescriptions' | 'addresses' | 'settings'>('dashboard');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Edit profile state
  const [nameInput, setNameInput] = useState(user?.name || 'Prabhas Gorusu');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+91 98765 43210');
  const [emailInput, setEmailInput] = useState(user?.email || 'prabhasgorusu001@gmail.com');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) => o.currentStatus !== 'Delivered' && o.currentStatus !== 'Cancelled'
  ).length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'User Dashboard & Profile' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-6">
          {/* User Mini Card */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-medical-100"
            />
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 truncate">{user?.name}</h3>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              <span className="text-[10px] font-bold uppercase text-medical-700 bg-medical-50 px-2 py-0.5 rounded mt-1 inline-block">
                Role: {user?.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-medical-50 text-medical-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-medical-600" />
              <span>Overview Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-medical-50 text-medical-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-medical-600" />
                <span>My Orders</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === 'prescriptions'
                  ? 'bg-medical-50 text-medical-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Prescriptions</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {prescriptions.length}
              </span>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Saved Wishlist</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {wishlistItems.length}
              </span>
            </Link>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-medical-50 text-medical-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all text-left cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-medical-50 text-medical-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Account Settings</span>
            </button>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Total Orders</span>
                  <div className="text-2xl font-black text-slate-900">{orders.length}</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Lifetime purchases</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Active Orders</span>
                  <div className="text-2xl font-black text-medical-600">{activeOrdersCount}</div>
                  <span className="text-[10px] text-medical-600 font-semibold">In transit / audit</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Prescriptions</span>
                  <div className="text-2xl font-black text-teal-600">{prescriptions.length}</div>
                  <span className="text-[10px] text-teal-600 font-semibold">Verified on file</span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Wishlist</span>
                  <div className="text-2xl font-black text-red-600">{wishlistItems.length}</div>
                  <span className="text-[10px] text-slate-400 font-semibold">Saved medicines</span>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">Recent Medical Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-medical-600 hover:text-medical-800"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-4">
                  {orders.slice(0, 2).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Order History</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">My Prescriptions</h3>
                <Link to="/prescriptions/upload">
                  <Button variant="primary" size="sm">
                    Upload New Rx
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{rx.fileName}</div>
                      <div className="text-[11px] text-slate-500">
                        {rx.patientName} • {rx.doctorName}
                      </div>
                    </div>
                    <span className="font-bold text-xs bg-white px-3 py-1 rounded-full border shadow-2xs">
                      {rx.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Saved Delivery Addresses</h3>
                  <p className="text-xs text-slate-500">Manage multiple addresses for family prescriptions</p>
                </div>
                <Button
                  onClick={() => setIsAddressModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    isSelected={addr.isDefault}
                    onSelect={() => {}}
                    onDelete={addresses.length > 1 ? () => deleteAddress(addr.id) : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Personal & Account Settings</h3>
                <p className="text-xs text-slate-500">Update your patient contact and communication details</p>
              </div>

              {isSavedAlert && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold animate-in fade-in">
                  Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs max-w-lg">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={(newAddr) => addAddress(newAddr)}
      />
    </div>
  );
};
