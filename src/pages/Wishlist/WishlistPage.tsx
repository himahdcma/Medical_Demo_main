import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { ProductCard } from '../../components/product/ProductCard';
import { useWishlistStore } from '../../store/useWishlistStore';
import { PRODUCTS } from '../../data/products';
import { EmptyState } from '../../components/common/EmptyState';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearWishlist } = useWishlistStore();

  const savedProducts = PRODUCTS.filter((p) => items.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Saved Medicines ({savedProducts.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Keep track of chronic medications, supplements, and clinical monitoring devices
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Save medicines and healthcare products for later"
          description="Click the heart icon on any product to save it to your personal medicine cabinet for easy reordering."
          actionText="Browse Medicines"
          onAction={() => navigate('/medicines')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
