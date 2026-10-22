import React from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Package, ExternalLink, CheckCircle2, Clock, Truck } from 'lucide-react';
import { OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useOrderStore();

  const handleNextStatus = (orderId: string, current: OrderStatus) => {
    const list: OrderStatus[] = [
      'Order Placed',
      'Payment Confirmed',
      'Pharmacist Approved',
      'Preparing Order',
      'Packed',
      'Out for Delivery',
      'Delivered',
    ];
    const idx = list.indexOf(current);
    if (idx < list.length - 1) {
      updateOrderStatus(orderId, list[idx + 1]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase text-medical-600 tracking-wider">
          Hospital Fulfillment & Dispensing
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Hospital Orders Master Console ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review, approve and dispatch customer hospital orders through the 7-step fulfillment workflow
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Patient / Recipient</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block text-xs">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">{order.createdAt}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-800 block">
                      {order.shippingAddress.fullName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {order.shippingAddress.city} • {order.shippingAddress.phone}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-700 block">
                      {order.items.length} Medicines / Products
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-xs block">
                      {order.items.map((i) => i.productName).join(', ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    {formatCurrency(order.pricing.total)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-medical-50 text-medical-800 border-medical-200">
                      {order.currentStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/orders/${order.orderNumber}`}
                        className="p-1.5 text-slate-400 hover:text-medical-600 rounded-lg hover:bg-slate-100"
                        title="View Live Order Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {order.currentStatus !== 'Delivered' && (
                        <button
                          onClick={() => handleNextStatus(order.id, order.currentStatus)}
                          className="px-2.5 py-1 text-[11px] font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Next Step →
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
