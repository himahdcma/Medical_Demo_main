import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { AlertTriangle, CheckCircle2, Clock, Boxes, ShieldAlert } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'LowStock' | 'OutOfStock'>('All');

  const totalProducts = PRODUCTS.length;
  const inStock = PRODUCTS.filter((p) => p.stockCount > 5).length;
  const lowStock = PRODUCTS.filter((p) => p.stockCount > 0 && p.stockCount <= 5).length;
  const outOfStock = PRODUCTS.filter((p) => p.stockCount === 0).length;

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'LowStock') return p.stockCount > 0 && p.stockCount <= 5;
    if (filter === 'OutOfStock') return p.stockCount === 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
          Warehouse & Cold-Chain Tracking
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Hospital Dispensary Inventory & Batch Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor pharmaceutical stock levels, manufacturing batch lot numbers, and shelf-life expiries
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setFilter('All')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer ${
            filter === 'All' ? 'border-medical-500 bg-white shadow-xs' : 'border-slate-200 bg-white'
          }`}
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Catalog</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalProducts}</div>
          <span className="text-[10px] text-slate-500">Tracked items</span>
        </div>

        <div className="p-4 rounded-3xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase">Sufficient Stock</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{inStock}</div>
          <span className="text-[10px] text-emerald-600">Optimal reorder level</span>
        </div>

        <div
          onClick={() => setFilter('LowStock')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer ${
            filter === 'LowStock'
              ? 'border-amber-500 bg-amber-50/50 shadow-xs'
              : 'border-amber-200 bg-amber-50/20'
          }`}
        >
          <span className="text-[11px] font-bold text-amber-700 uppercase">Low Stock Alerts</span>
          <div className="text-2xl font-black text-amber-800 mt-1">{lowStock}</div>
          <span className="text-[10px] text-amber-700 font-bold">≤ 5 units remaining</span>
        </div>

        <div
          onClick={() => setFilter('OutOfStock')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer ${
            filter === 'OutOfStock'
              ? 'border-red-500 bg-red-50/50 shadow-xs'
              : 'border-red-200 bg-red-50/20'
          }`}
        >
          <span className="text-[11px] font-bold text-red-700 uppercase">Out of Stock</span>
          <div className="text-2xl font-black text-red-800 mt-1">{outOfStock}</div>
          <span className="text-[10px] text-red-700 font-bold">Immediate replenishment needed</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Medicine & Formulation</th>
                <th className="py-3.5 px-4">Lot Batch No.</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Cold-Chain Status</th>
                <th className="py-3.5 px-4 text-right">Inventory State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const isOut = item.stockCount === 0;
                const isLow = item.stockCount > 0 && item.stockCount <= 5;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.genericName} • {item.packSize}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {item.batchNumber || 'CR-88291A'}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`font-black ${
                          isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-slate-800'
                        }`}
                      >
                        {item.stockCount} Units
                      </span>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-700">
                      {item.expiryDate || '11/2028'}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        ✓ 2°C - 25°C Verified
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isOut ? (
                        <span className="text-red-700 bg-red-50 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-200">
                          Depleted (0)
                        </span>
                      ) : isLow ? (
                        <span className="text-amber-800 bg-amber-50 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                          Low Stock ({item.stockCount})
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                          Optimal ({item.stockCount})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
