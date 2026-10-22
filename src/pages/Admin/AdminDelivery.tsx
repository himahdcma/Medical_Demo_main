import React, { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { Truck, MapPin, Phone, CheckCircle2, Clock, Navigation, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';

export const AdminDelivery: React.FC = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const [filter, setFilter] = useState<'All' | 'Out for Delivery' | 'Delivered'>('All');

  const filtered = orders.filter((o) => {
    if (filter === 'All') return true;
    return o.currentStatus === filter;
  });

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'Delivered', 'Delivered by Hospital Courier. OTP matched.');
    alert(`Order ${orderId} marked as Delivered!`);
  };

  const handleDispatch = (orderId: string) => {
    updateOrderStatus(orderId, 'Out for Delivery', 'Hospital courier partner assigned and out for delivery.');
    alert(`Order ${orderId} dispatched with courier!`);
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
          Hospital Logistics & Field Courier
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Delivery Staff & Courier Dispatch Board
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate temperature-controlled deliveries, dispatch routes, and recipient OTP verification
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Today's Total Runs</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{orders.length} Deliveries</div>
          <span className="text-[10px] text-slate-500">Hospital zone</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-medical-600 uppercase">On Route</span>
          <div className="text-2xl font-black text-medical-600 mt-1">
            {orders.filter((o) => o.currentStatus === 'Out for Delivery').length} Orders
          </div>
          <span className="text-[10px] text-medical-600 font-bold">Rider actively moving</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase">Completed</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {orders.filter((o) => o.currentStatus === 'Delivered').length} Delivered
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">OTP verified handovers</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase">Pickup Counter</span>
          <div className="text-2xl font-black text-amber-700 mt-1">2 Ready</div>
          <span className="text-[10px] text-slate-500">Hospital counter pickup</span>
        </div>
      </div>

      {/* Map & Route Placeholder View */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-md">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" /> GPS Fleet Telemetry
          </span>
          <h3 className="text-xl font-extrabold tracking-tight">
            Kakinada Hospital Catchment Live Fleet
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            3 dedicated hospital courier riders equipped with thermal temperature-monitored refrigerated backpacks currently on duty.
          </p>
        </div>

        <div className="w-full sm:w-72 h-36 bg-slate-800 rounded-2xl border border-slate-700 relative overflow-hidden flex items-center justify-center">
          {/* Mock Map Grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 text-center space-y-1">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping mx-auto" />
            <span className="text-[11px] font-mono text-teal-300 font-bold block">
              Fleet Active: Lat 16.9891° N
            </span>
            <span className="text-[10px] text-slate-400">Rider #AP-04 En Route</span>
          </div>
        </div>
      </div>

      {/* Orders List for Delivery Staff */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Assigned Delivery Parcels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                  <span className="font-mono font-bold text-slate-800">
                    Order #{order.orderNumber}
                  </span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                      order.currentStatus === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-medical-50 text-medical-700 border border-medical-200'
                    }`}
                  >
                    {order.currentStatus}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600">
                  <div className="font-bold text-slate-900">{order.shippingAddress.fullName}</div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-medical-600 shrink-0 mt-0.5" />
                    <span>
                      {order.shippingAddress.addressLine1}, {order.shippingAddress.city} -{' '}
                      {order.shippingAddress.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 text-slate-800 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${order.shippingAddress.phone}`} className="hover:underline">
                      {order.shippingAddress.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-400">Collect: {order.paymentMethod.type}</span>
                  <span className="font-extrabold text-slate-900">
                    {formatCurrency(order.pricing.total)}
                  </span>
                </div>
              </div>

              {/* Status toggles for delivery staff */}
              <div className="pt-2 flex gap-2">
                {order.currentStatus !== 'Out for Delivery' && order.currentStatus !== 'Delivered' && (
                  <Button
                    onClick={() => handleDispatch(order.id)}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    Dispatch for Delivery
                  </Button>
                )}

                {order.currentStatus === 'Out for Delivery' && (
                  <Button
                    onClick={() => handleMarkDelivered(order.id)}
                    variant="teal"
                    size="sm"
                    className="flex-1"
                  >
                    Confirm Recipient OTP & Deliver ✓
                  </Button>
                )}

                {order.currentStatus === 'Delivered' && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200 w-full text-center">
                    ✓ Handed Over & Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
