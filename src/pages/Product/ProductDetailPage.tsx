import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  FileUp,
  ShieldCheck,
  Building2,
  ChevronDown,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Badge } from '../../components/common/Badge';
import { Rating } from '../../components/common/Rating';
import { Button } from '../../components/common/Button';
import { MedicalSafetyBanner } from '../../components/common/MedicalSafetyBanner';
import { ProductCard } from '../../components/product/ProductCard';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Skeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { Pill } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'uses'
    | 'directions'
    | 'ingredients'
    | 'warnings'
    | 'precautions'
    | 'sideEffects'
    | 'storage'
    | 'manufacturer'
  >('overview');
  const [isZoomed, setIsZoomed] = useState(false);

  const { addToCart, items: cartItems } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    let active = true;

    if (slug) {
      mockApi.getProductBySlug(slug).then((p) => {
        if (!active) return;
        if (p) {
          setProduct(p);
          mockApi.getProducts({ category: p.category }).then((list) => {
            if (active) {
              setRelatedProducts(list.filter((item) => item.id !== p.id).slice(0, 4));
            }
          });
        }
        setIsLoading(false);
      });
    }

    return () => {
      active = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Skeleton className="w-64 h-6 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="w-32 h-6 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
            <Skeleton className="w-3/4 h-5 rounded-md" />
            <Skeleton className="w-48 h-10 rounded-md" />
            <Skeleton className="w-full h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={Pill}
          title="Product Not Found"
          description="The medicine you are looking for is either unavailable or has been discontinued."
          actionText="Browse All Medicines"
          onAction={() => navigate('/medicines')}
        />
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const inCart = cartItems.find((item) => item.product.id === product.id);
  const isOutOfStock = !product.inStock || product.stockCount === 0;
  const isLowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Buy genuine ${product.name} at ApexCare Hospital Pharmacy`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const tabs: {
    id: typeof activeTab;
    label: string;
  }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'uses', label: 'Uses & Indications' },
    { id: 'directions', label: 'Directions for Use' },
    { id: 'ingredients', label: 'Ingredients & Salt' },
    { id: 'warnings', label: 'Warnings & Contraindications' },
    { id: 'precautions', label: 'Clinical Precautions' },
    { id: 'sideEffects', label: 'Side Effects' },
    { id: 'storage', label: 'Storage & Cold-Chain' },
    { id: 'manufacturer', label: 'Manufacturer Info' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Medicines', href: '/medicines' },
          { label: product.brand, href: `/medicines?brand=${encodeURIComponent(product.brand)}` },
          { label: product.name },
        ]}
      />

      {/* Main Detail 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery & Zoom */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Large Image */}
          <div
            className="relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs group flex items-center justify-center p-4 cursor-crosshair min-h-[360px]"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`max-h-[380px] w-auto object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.prescriptionRequired && (
                <Badge variant="rx" size="md" className="shadow-xs">
                  Schedule H • Prescription Required
                </Badge>
              )}
              {product.discountPercent > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist & Share buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl transition-all shadow-xs ${
                  isSaved
                    ? 'bg-red-50 text-red-500'
                    : 'bg-white/90 text-slate-500 hover:text-red-500 hover:bg-white'
                }`}
                title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-white/90 text-slate-500 hover:text-slate-800 hover:bg-white transition-all shadow-xs"
                title="Share product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-18 rounded-2xl border-2 overflow-hidden bg-white p-1 transition-all ${
                    activeImageIndex === idx
                      ? 'border-medical-600 ring-2 ring-medical-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumb ${idx}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Pharmacist Seal */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-2xl flex items-center gap-3 text-xs text-teal-900">
            <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0" />
            <div>
              <span className="font-bold block">Hospital Cold-Chain Assurance</span>
              <span className="text-teal-700 text-[11px]">
                Dispatched in tamper-evident sealed packaging with temperature logs.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Information & Purchase Panel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Brand & Strength */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-medical-600">{product.brand}</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-semibold text-[11px]">
                Batch: {product.batchNumber || 'MED-2024'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500">
              Generic: <strong className="text-slate-700">{product.genericName}</strong>
            </p>
            <p className="text-xs text-slate-400">
              Pack Size: <span className="text-slate-600 font-medium">{product.packSize}</span> • Form: {product.dosageForm}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <Rating value={product.rating} count={product.ratingCount} size="md" />
            <span className="text-slate-300">|</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Verified by Hospital Pharmacists
            </span>
          </div>

          {/* Price Box */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatCurrency(product.sellingPrice)}
              </span>
              {product.discountPercent > 0 && (
                <>
                  <span className="text-sm text-slate-400 line-through font-medium">
                    MRP {formatCurrency(product.mrp)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Inclusive of all taxes & free standard delivery on orders above ₹500
            </p>
          </div>

          {/* Prescription Safety Warning if applicable */}
          {product.prescriptionRequired && (
            <MedicalSafetyBanner type="prescription-warning" />
          )}

          {/* Stock Status Indicator */}
          <div>
            {isOutOfStock ? (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Currently Out of Stock at hospital pharmacy</span>
              </div>
            ) : isLowStock ? (
              <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Hurry! Only {product.stockCount} strips left in hospital dispensary</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>In Stock — Ready for immediate hospital dispatch</span>
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  disabled={quantity <= 1 || isOutOfStock}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stockCount || 99, q + 1))
                  }
                  className="p-2 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  disabled={quantity >= (product.stockCount || 99) || isOutOfStock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              {isOutOfStock ? (
                <Button
                  onClick={() =>
                    alert(`We will notify you when ${product.name} is back in stock.`)
                  }
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Notify Me When Available
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    size="lg"
                    className="flex-1 shadow-md shadow-medical-200"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      {inCart ? `Add More (${inCart.quantity} in cart)` : 'Add to Cart'}
                    </span>
                  </Button>

                  {product.prescriptionRequired && (
                    <Link to="/prescriptions/upload" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-teal-300 text-teal-800 hover:bg-teal-50"
                      >
                        <FileUp className="w-5 h-5 text-teal-600" />
                        <span>Upload Rx</span>
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-medical-600" />
              <span>Same Day Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Medicine Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 p-2 bg-slate-50/60 scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-medical-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Clinical Overview</h3>
              <p>{product.overview}</p>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'uses' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Therapeutic Uses & Indications</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.uses.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'directions' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Dosage & Administration</h3>
              <p>{product.directions}</p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <strong>Doctor's Prescription Precedence:</strong> Always adhere to the exact dose and duration tailored by your attending physician.
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Active Salt & Composition</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                    {ing}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-red-900">Warnings & Black Box Contraindications</h3>
              <ul className="list-disc pl-5 space-y-2 text-red-800">
                {product.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'precautions' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Clinical Precautions</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.precautions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'sideEffects' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Documented Side Effects</h3>
              <p className="text-slate-500">
                Most side effects do not require medical intervention and disappear as your body adjusts to the medication:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sideEffects.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Storage Guidelines</h3>
              <p>{product.storage}</p>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 text-xs">
                Keep out of reach of children and pets. Do not flush medications down the toilet.
              </div>
            </div>
          )}

          {activeTab === 'manufacturer' && (
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900">Manufacturer Details</h3>
              <p><strong>Company:</strong> {product.manufacturer}</p>
              <p><strong>Country of Origin:</strong> India</p>
              <p><strong>Expiry Date:</strong> {product.expiryDate || '12/2028'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Statutory Medical Disclaimer */}
      <MedicalSafetyBanner type="clinical-disclaimer" />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Related Medicines in {product.category.replace('-', ' ').toUpperCase()}
            </h3>
            <Link
              to={`/medicines/${product.category}`}
              className="text-xs font-bold text-medical-600 hover:text-medical-800"
            >
              View More →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
