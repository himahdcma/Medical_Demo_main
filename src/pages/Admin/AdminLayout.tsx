import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  ClipboardCheck,
  Truck,
  ArrowLeft,
  Cross,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const AdminLayout: React.FC = () => {
  const { user, switchRole } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        {/* Hospital Branding */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-medical-500 flex items-center justify-center text-white">
              <Cross className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                ApexCare
              </span>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">
                Hospital Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* User Mini Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/40 flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
            alt="Admin User"
            className="w-9 h-9 rounded-xl object-cover ring-1 ring-medical-400"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
            <span className="text-[10px] text-teal-300 font-semibold uppercase">
              Role: {user?.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1 text-xs">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Product Catalog</span>
          </NavLink>

          <NavLink
            to="/admin/prescriptions"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <ClipboardCheck className="w-4 h-4 text-teal-400" />
            <span>Prescription Audit Panel</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Package className="w-4 h-4" />
            <span>Hospital Orders</span>
          </NavLink>

          <NavLink
            to="/admin/inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>Inventory & Batches</span>
          </NavLink>

          <NavLink
            to="/admin/delivery"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Delivery Dispatch</span>
          </NavLink>
        </nav>

        {/* Back to Customer Storefront */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white p-2.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
