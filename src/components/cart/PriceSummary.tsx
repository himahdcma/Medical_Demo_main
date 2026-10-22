import React, { useState } from 'react';
import { Tag, ShieldCheck, Truck, Check, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';

interface PriceSummaryProps {
  onCheckout?: () => void;
  checkoutText?: string;
  isCheckoutDisabled?: boolean;
  deliveryType?: 'standard' | 'express' | 'hospital_pickup';
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  onCheckout,
  checkoutText = 'Proceed to Checkout',
  isCheckoutDisabled = false,
  deliveryType = 'standard',
}) => {
  const {
    getSubtotal,
    getMrpTotal,
    getProductDiscount,
    getCouponDiscount,
    getDeliveryFee,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    requiresPrescription,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  const subtotal = getSubtotal();
  const mrpTotal = getMrpTotal();
  const productDiscount = getProductDiscount();
  const couponDiscount = getCouponDiscount();
  const deliveryFee = getDeliveryFee(deliveryType);
  const total = getTotal(deliveryType);
  const needsRx = requiresPrescription();

  // Free delivery progress threshold (₹500)
  const freeDeliveryThreshold = 500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-5">
      <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
        Order Price Summary
      </h3>

      {/* Free Delivery Bar */}
      {deliveryType !== 'hospital_pickup' && (
        <div className="bg-medical-50/60 border border-medical-100 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-medical-800">
              <Truck className="w-3.5 h-3.5 text-medical-600" />
              {amountNeededForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-bold">You unlocked Free Delivery! 🎉</span>
              ) : (
                <span>Add {formatCurrency(amountNeededForFreeDelivery)} more for Free Delivery</span>
              )}
            </span>
            <span className="text-medical-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-medical-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Coupon Application */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1.5">
          Have a Hospital Coupon?
        </label>
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{appliedCoupon} APPLIED</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="e.g. FIRSTMED25, CARE20"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="w-full pl-9 pr-3 py-2 text-xs uppercase border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500"
              />
            </div>
            <Button type="submit" variant="outline" size="sm">
              Apply
            </Button>
          </form>
        )}

        {couponMessage && (
          <p
            className={`text-xs mt-1.5 font-medium ${
              couponMessage.isError ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            {couponMessage.text}
          </p>
        )}

        {/* Quick Suggestion Pills */}
        {!appliedCoupon && (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[10px]">
            <span className="text-slate-400">Try:</span>
            <button
              onClick={() => handleQuickCoupon('FIRSTMED25')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              FIRSTMED25
            </button>
            <button
              onClick={() => handleQuickCoupon('CARE20')}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              CARE20
            </button>
          </div>
        )}
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
        <div className="flex justify-between text-slate-600">
          <span>Items MRP Total</span>
          <span className="text-slate-400 line-through">{formatCurrency(mrpTotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Pharmacy Product Discount</span>
          <span className="text-emerald-600 font-semibold">
            - {formatCurrency(productDiscount)}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Coupon Savings ({appliedCoupon})</span>
            <span>- {formatCurrency(couponDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Hospital Delivery Fee</span>
          {deliveryFee === 0 ? (
            <span className="text-emerald-600 font-bold">FREE</span>
          ) : (
            <span className="text-slate-800 font-medium">{formatCurrency(deliveryFee)}</span>
          )}
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <div>
            <span className="text-sm font-extrabold text-slate-900 block">Total Payable</span>
            <span className="text-[10px] text-slate-400">Includes all applicable healthcare taxes</span>
          </div>
          <span className="text-xl font-extrabold text-slate-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Prescription Notice if cart contains Rx item */}
      {needsRx && (
        <div className="p-3 bg-red-50/70 border border-red-200/60 rounded-xl text-[11px] text-red-800 leading-snug">
          <strong className="block text-red-950 font-bold mb-0.5">⚠️ Prescription Order</strong>
          Prescription upload will be requested during checkout.
        </div>
      )}

      {/* CTA Button */}
      {onCheckout && (
        <Button
          onClick={onCheckout}
          disabled={isCheckoutDisabled || subtotal === 0}
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center gap-2 text-sm shadow-md shadow-medical-200"
        >
          <span>{checkoutText}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}

      {/* Safety assurance */}
      <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Safe & Encrypted 256-bit Healthcare Checkout</span>
      </div>
    </div>
  );
};
