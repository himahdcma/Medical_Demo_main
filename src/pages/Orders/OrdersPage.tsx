import React, { useState } from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { OrderCard } from '../../components/orders/OrderCard';
import { useOrderStore } from '../../store/useOrderStore';
import { EmptyState } from '../../components/common/EmptyState';
import { Package, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Processing' | 'Delivered' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Delivered'
        ? o.currentStatus === 'Delivered'
        : activeFilter === 'Processing'
        ? o.currentStatus !== 'Delivered' && o.currentStatus !== 'Cancelled'
        : o.currentStatus === 'Cancelled';

    const matchesSearch =
      searchQuery.trim() === '' ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'My Orders & Tracking' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Medicine Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track real-time clinical verification, packing, and courier delivery
          </p>
        </div>

        {/* Search Order Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by Order ID or Medicine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {(['All', 'Processing', 'Delivered', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-medical-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders found"
          description="You don't have any orders matching the selected filter criteria."
          actionText="Browse Medicines"
          onAction={() => navigate('/medicines')}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
