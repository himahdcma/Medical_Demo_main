import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle, Package, ArrowRight, ShieldCheck, Printer, Home, PhoneCall } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useOrderStore } from '../../store/useOrderStore';
import { formatCurrency } from '../../utils/formatters';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || 'MED-20260924-001';

  const order = useOrderStore((state) => state.getOrderById(orderId));

  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#0d9488', '#10b981', '#38bdf8'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 animate-in fade-in zoom-in-95">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6 relative overflow-hidden">
        {/* Animated Green Circle */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle className="w-12 h-12 stroke-[2.2]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment & Order Verified
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order Placed Successfully ✓
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Thank you! Your hospital medicine order has been dispatched to our chief clinical pharmacist for batch allocation.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 text-left text-xs space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-semibold">Order ID:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              #{order?.orderNumber || orderId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Estimated Delivery:</span>
            <span className="font-bold text-slate-800">
              {order?.deliveryMethod.estimatedDays || 'Today by 7:00 PM'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Total Paid:</span>
            <span className="font-extrabold text-emerald-700 text-sm">
              {order ? formatCurrency(order.pricing.total) : '₹649'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Delivery Speed:</span>
            <span className="font-semibold text-slate-700">
              {order?.deliveryMethod.title || 'Express Hospital Dispatch'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Recipient:</span>
            <span className="font-semibold text-slate-700">
              {order?.shippingAddress.fullName || 'Prabhas Gorusu'} ({order?.shippingAddress.city || 'Kakinada'})
            </span>
          </div>
        </div>

        {/* Pharmacist Guarantee Alert */}
        <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl max-w-md mx-auto text-xs text-teal-900 flex items-center gap-3 text-left">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
          <p className="leading-relaxed">
            Our clinical team will attach temperature log certificates with this package. Keep your phone reachable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={`/orders/${order?.orderNumber || orderId}`} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 shadow-md">
              <Package className="w-4 h-4" />
              <span>Track Order Live</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/medicines" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Button>
          </Link>
        </div>

        <div className="pt-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-medical-600" />
          <span>Need immediate assistance? Call Hospital Pharmacy Desk at 1800-419-8800</span>
        </div>
      </div>
    </div>
  );
};
