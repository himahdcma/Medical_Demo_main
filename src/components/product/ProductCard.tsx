import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, FileUp, BellRing, Check, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import { Rating } from '../common/Rating';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isSaved = isInWishlist(product.id);
  const itemInCart = cartItems.find((item) => item.product.id === product.id);

  const isOutOfStock = !product.inStock || product.stockCount === 0;
  const isLowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleNotifyMe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`We will alert you as soon as ${product.name} is restocked at the hospital pharmacy.`);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-medical-300 shadow-2xs hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="flex flex-col gap-1 items-start">
          {product.prescriptionRequired && (
            <Badge variant="rx" size="sm" className="shadow-xs bg-red-50 text-red-600 border-red-200">
              Rx Required
            </Badge>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`p-2 rounded-xl transition-all shadow-2xs cursor-pointer ${
            isSaved
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-white/90 backdrop-blur-xs text-slate-400 hover:text-red-500 hover:bg-white'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        to={`/product/${product.slug}`}
        className="relative pt-[85%] bg-slate-50/50 overflow-hidden block"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Low Stock Warning Banner */}
        {isLowStock && (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-500/95 backdrop-blur-xs text-white text-[10px] font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-1 shadow-xs">
            <AlertTriangle className="w-3 h-3" />
            Only {product.stockCount} units left in hospital stock
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-white/95 text-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Strength */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span className="font-semibold text-medical-700 truncate">{product.brand}</span>
          <span className="text-slate-400 shrink-0">{product.strength}</span>
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${product.slug}`}
          className="text-sm font-bold text-slate-800 group-hover:text-medical-600 transition-colors line-clamp-2 leading-snug mb-1"
        >
          {product.name}
        </Link>

        {/* Generic Name & Pack size */}
        <div className="text-xs text-slate-500 mb-2 truncate">
          <span>{product.genericName}</span>
          <span className="mx-1 text-slate-300">•</span>
          <span>{product.packSize}</span>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <Rating value={product.rating} count={product.ratingCount} size="sm" />
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                {formatCurrency(product.sellingPrice)}
              </span>
              {product.discountPercent > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.mrp)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block font-medium">Inclusive of all taxes</span>
          </div>

          {/* Action button based on state */}
          {isOutOfStock ? (
            <button
              onClick={handleNotifyMe}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <BellRing className="w-3.5 h-3.5" />
              Notify Me
            </button>
          ) : product.prescriptionRequired ? (
            <button
              onClick={handleAddToCart}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                itemInCart
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-medical-50 text-medical-700 hover:bg-medical-600 hover:text-white border border-medical-200'
              }`}
            >
              {itemInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added ({itemInCart.quantity})
                </>
              ) : (
                <>
                  <FileUp className="w-3.5 h-3.5 text-medical-600" /> Add to Cart
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                itemInCart
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-medical-600 hover:bg-medical-700 active:bg-medical-800 text-white shadow-xs'
              }`}
            >
              {itemInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" /> ({itemInCart.quantity})
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
