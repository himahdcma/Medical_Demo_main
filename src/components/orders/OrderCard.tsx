import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Order } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Package, ChevronRight, RotateCcw, Clock, CheckCircle2, Truck } from 'lucide-react';
import { Button } from '../common/Button';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../data/products';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const getStatusBadge = () => {
    switch (order.currentStatus) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-medical-50 text-medical-700 border border-medical-200">
            <Truck className="w-3.5 h-3.5" /> Out for Delivery
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> {order.currentStatus}
          </span>
        );
    }
  };

  const handleReorder = () => {
    order.items.forEach((item) => {
      const match = PRODUCTS.find((p) => p.id === item.productId);
      if (match) {
        addToCart(match, item.quantity);
      }
    });
    navigate('/cart');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs transition-all">
      {/* Header bar */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <span className="text-slate-400 block text-[11px]">Order Number</span>
            <span className="font-mono font-bold text-slate-800 text-sm">
              #{order.orderNumber}
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-400 block text-[11px]">Placed On</span>
            <span className="font-semibold text-slate-700">{order.createdAt}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-400 block text-[11px]">Total Amount</span>
            <span className="font-extrabold text-slate-900 text-sm">
              {formatCurrency(order.pricing.total)}
            </span>
          </div>
        </div>

        <div>{getStatusBadge()}</div>
      </div>

      {/* Item Previews */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-bold text-slate-800 truncate">{item.productName}</h5>
                  <p className="text-slate-400 text-[11px]">
                    Qty: {item.quantity} • {formatCurrency(item.price)} each
                  </p>
                </div>
              </div>
              <span className="font-bold text-slate-900 shrink-0">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Delivery to: <span className="font-semibold text-slate-700">{order.shippingAddress.fullName}</span>, {order.shippingAddress.city}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleReorder}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reorder
            </Button>
            <Link to={`/orders/${order.orderNumber}`}>
              <Button variant="primary" size="sm" className="flex items-center gap-1.5">
                Track Order <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
