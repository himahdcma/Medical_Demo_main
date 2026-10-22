import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, Heart, AlertCircle } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Badge } from '../common/Badge';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const product = item.product;
  const isSaved = isInWishlist(product.id);

  const handleSaveForLater = () => {
    if (!isSaved) {
      toggleWishlist(product.id);
    }
    removeFromCart(product.id);
  };

  return (
    <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Thumbnail */}
      <Link
        to={`/product/${product.slug}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-medical-600">{product.brand}</span>
          {product.prescriptionRequired && (
            <Badge variant="rx" size="sm">
              Prescription Required
            </Badge>
          )}
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="text-sm font-bold text-slate-800 hover:text-medical-600 transition-colors block truncate"
        >
          {product.name}
        </Link>

        <p className="text-xs text-slate-500">
          {product.genericName} • {product.packSize}
        </p>

        {product.prescriptionRequired && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/70 px-2 py-0.5 rounded-md w-fit">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Prescription will be verified by pharmacist before dispatch</span>
          </div>
        )}
      </div>

      {/* Price & Quantity Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
          <button
            onClick={() => updateQuantity(product.id, item.quantity - 1)}
            className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(product.id, item.quantity + 1)}
            disabled={item.quantity >= (product.stockCount || 99)}
            className="p-1.5 hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors cursor-pointer"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pricing */}
        <div className="text-right min-w-[90px]">
          <div className="text-sm font-extrabold text-slate-900">
            {formatCurrency(product.sellingPrice * item.quantity)}
          </div>
          {product.discountPercent > 0 && (
            <div className="text-xs text-slate-400 line-through">
              {formatCurrency(product.mrp * item.quantity)}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleSaveForLater}
            className="p-2 text-slate-400 hover:text-medical-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title="Save for Later"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeFromCart(product.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Remove from Cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
