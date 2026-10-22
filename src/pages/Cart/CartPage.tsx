import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, FileUp } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { CartItem } from '../../components/cart/CartItem';
import { PriceSummary } from '../../components/cart/PriceSummary';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, requiresPrescription } = useCartStore();
  const needsRx = requiresPrescription();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your medicine cabinet is empty"
          description="You haven't added any medicines or health essentials to your cart yet. Keep your home pharmacy stocked with certified essentials."
          actionText="Browse Medicines"
          onAction={() => navigate('/medicines')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital Pharmacy Cart ({items.length} items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            All medicines are verified for genuine batch authentication before dispatch
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      {/* Prescription Notice Banner if cart contains Rx items */}
      {needsRx && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900">
                Prescription Required Items in Cart
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                One or more medications in your cart require a doctor's prescription. You can upload it during the checkout step or our pharmacist will reach out to verify.
              </p>
            </div>
          </div>
          <Link to="/prescriptions/upload" className="shrink-0 hidden sm:block">
            <Button variant="outline" size="sm" className="bg-white border-amber-300 text-amber-900 hover:bg-amber-100">
              Upload Now
            </Button>
          </Link>
        </div>
      )}

      {/* Main Grid: Cart Items (Left) + Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div className="pt-4 flex items-center justify-between">
            <Link
              to="/medicines"
              className="inline-flex items-center gap-2 text-xs font-bold text-medical-600 hover:text-medical-800"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Price Summary & Checkout Action */}
        <div className="lg:col-span-4 sticky top-36">
          <PriceSummary
            onCheckout={() => navigate('/checkout')}
            checkoutText="Proceed to Secure Checkout"
          />
        </div>
      </div>
    </div>
  );
};
