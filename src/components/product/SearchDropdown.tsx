import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, TrendingUp, X, ChevronRight, AlertCircle } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../common/Badge';

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
}

const POPULAR_SEARCHES = [
  'Paracetamol',
  'Crocin',
  'Vitamin B12',
  'Blood Pressure',
  'Diabetes',
  'Omron BP Monitor',
];

const RECENT_SEARCHES = ['Paracetamol', 'Diabetes medicine', 'Vitamin D'];

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  onClose,
  query,
  setQuery,
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (query.trim().length > 1) {
      setLoading(true);
      mockApi.searchProducts(query).then((res) => {
        if (active) {
          setResults(res.products.slice(0, 6));
          setDidYouMean(res.didYouMean);
          setLoading(false);
        }
      });
    } else {
      setResults([]);
      setDidYouMean(undefined);
      setLoading(false);
    }
    return () => {
      active = false;
    };
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleKeywordClick = (term: string) => {
    setQuery(term);
    navigate(`/medicines?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2"
    >
      {/* If search query is short or empty, show Recent & Popular Searches */}
      {query.trim().length < 2 && (
        <div className="p-4 space-y-4">
          {/* Recent Searches */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Recent Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => handleKeywordClick(item)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-medical-50 hover:text-medical-700 text-xs text-slate-700 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-medical-600">
                <TrendingUp className="w-3.5 h-3.5" /> Popular Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  onClick={() => handleKeywordClick(item)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-medical-50 hover:text-medical-700 text-xs text-slate-700 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3 h-3 text-medical-500" />
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Did you mean suggestion */}
      {didYouMean && (
        <div className="p-3 bg-amber-50/70 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Did you mean{' '}
              <button
                onClick={() => handleKeywordClick(didYouMean)}
                className="font-bold underline text-medical-700 hover:text-medical-800 ml-1"
              >
                "{didYouMean}"
              </button>
              ?
            </span>
          </div>
        </div>
      )}

      {/* Live Results */}
      {query.trim().length >= 2 && (
        <div className="p-2">
          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Searching hospital inventory...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Matching Medicines ({results.length})
              </div>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="w-full p-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-3 text-left transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 truncate group-hover:text-medical-600 transition-colors">
                        {product.name}
                      </span>
                      {product.prescriptionRequired && (
                        <Badge variant="rx" size="sm">
                          Rx
                        </Badge>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {product.genericName} • {product.packSize}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-slate-900">
                        {formatCurrency(product.sellingPrice)}
                      </span>
                      {product.discountPercent > 0 && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatCurrency(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-medical-600 shrink-0" />
                </button>
              ))}

              <div className="p-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleKeywordClick(query)}
                  className="w-full py-2 text-center text-xs font-semibold text-medical-600 hover:text-medical-700 bg-medical-50/60 rounded-xl hover:bg-medical-50 transition-colors"
                >
                  View all results for "{query}" →
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center px-4">
              <p className="text-sm font-semibold text-slate-700">No medicines found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching by salt/generic name or check spelling.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
