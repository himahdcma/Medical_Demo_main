import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { FilterSidebar } from '../../components/product/FilterSidebar';
import { ProductGrid } from '../../components/product/ProductGrid';
import { Drawer } from '../../components/common/Drawer';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { mockApi, FilterParams } from '../../services/mockApi';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/categories';

export const MedicinesPage: React.FC = () => {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterParams>({
    category: categoryParam,
    brand: undefined,
    prescriptionRequired: undefined,
    inStockOnly: false,
    rating: undefined,
    sortBy: 'popularity',
  });

  // Keep filters in sync if route categoryParam changes
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  // Fetch filtered products
  useEffect(() => {
    setIsLoading(true);
    let active = true;

    if (queryParam) {
      mockApi.searchProducts(queryParam).then((res) => {
        if (!active) return;
        let list = res.products;
        if (filters.category) {
          list = list.filter((p) => p.category === filters.category);
        }
        if (filters.prescriptionRequired !== undefined) {
          list = list.filter((p) => p.prescriptionRequired === filters.prescriptionRequired);
        }
        if (filters.inStockOnly) {
          list = list.filter((p) => p.inStock && p.stockCount > 0);
        }
        setProducts(list);
        setIsLoading(false);
      });
    } else {
      mockApi.getProducts(filters).then((data) => {
        if (!active) return;
        setProducts(data);
        setIsLoading(false);
      });
    }

    return () => {
      active = false;
    };
  }, [filters, queryParam]);

  const handleResetFilters = () => {
    setFilters({
      category: undefined,
      brand: undefined,
      prescriptionRequired: undefined,
      inStockOnly: false,
      rating: undefined,
      sortBy: 'popularity',
    });
    if (queryParam) {
      setSearchParams({});
    }
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.slug === filters.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: 'Medicines & Healthcare', href: '/medicines' },
          ...(currentCategoryObj
            ? [{ label: currentCategoryObj.name }]
            : queryParam
            ? [{ label: `Search: "${queryParam}"` }]
            : [{ label: 'All Products' }]),
        ]}
      />

      {/* Header Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentCategoryObj
              ? currentCategoryObj.name
              : queryParam
              ? `Search Results for "${queryParam}"`
              : 'Certified Medicines & Healthcare Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <span className="font-bold text-slate-800">{products.length}</span> genuine hospital-dispensed products
          </p>
        </div>

        {/* Sort Dropdown & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs"
          >
            <Filter className="w-4 h-4 text-medical-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterParams['sortBy'],
                }))
              }
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.category ||
        filters.brand ||
        filters.prescriptionRequired !== undefined ||
        filters.inStockOnly ||
        filters.rating ||
        queryParam) && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold">Active filters:</span>

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-medical-50 text-medical-800 font-medium border border-medical-200">
              Category: {currentCategoryObj?.name || filters.category}
              <button
                onClick={() => setFilters((p) => ({ ...p, category: undefined }))}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.brand && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200">
              Brand: {filters.brand}
              <button
                onClick={() => setFilters((p) => ({ ...p, brand: undefined }))}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.prescriptionRequired !== undefined && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200">
              {filters.prescriptionRequired ? 'Prescription Only (Rx)' : 'OTC Only'}
              <button
                onClick={() => setFilters((p) => ({ ...p, prescriptionRequired: undefined }))}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium border border-slate-200">
              In Stock Only
              <button
                onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {queryParam && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-medium border border-teal-200">
              Search: "{queryParam}"
              <button
                onClick={() => setSearchParams({})}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-medical-600 hover:text-medical-800 font-bold underline cursor-pointer ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main 2-Column Marketplace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-36">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onClearFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Drawer Filter Sheet */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Medicines"
        side="bottom"
      >
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />
      </Drawer>
    </div>
  );
};
