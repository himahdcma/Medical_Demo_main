import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { FilterParams } from '../../services/mockApi';
import { RotateCcw, Check, Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
  onReset: () => void;
}

const BRANDS = [
  'Crocin',
  'Micro Labs',
  'Augmentin',
  'Glycomet',
  'Telma',
  'Atorva',
  'Uprise-D3',
  'Omron',
  'Accu-Chek',
  'Cetzine',
  'Pan-D',
  'Volini',
  'Limcee',
  'Dettol',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">Filters</h3>
        <button
          onClick={onReset}
          className="text-xs text-medical-600 hover:text-medical-800 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      {/* Prescription Requirement Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Prescription Type
        </h4>
        <div className="space-y-1.5 text-xs">
          <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900">
            <input
              type="radio"
              name="rxFilter"
              checked={filters.prescriptionRequired === undefined}
              onChange={() =>
                setFilters((prev) => ({ ...prev, prescriptionRequired: undefined }))
              }
              className="text-medical-600 focus:ring-medical-500 rounded"
            />
            <span>All Products</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900">
            <input
              type="radio"
              name="rxFilter"
              checked={filters.prescriptionRequired === false}
              onChange={() =>
                setFilters((prev) => ({ ...prev, prescriptionRequired: false }))
              }
              className="text-medical-600 focus:ring-medical-500 rounded"
            />
            <span>OTC / Wellness (No Rx needed)</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900">
            <input
              type="radio"
              name="rxFilter"
              checked={filters.prescriptionRequired === true}
              onChange={() =>
                setFilters((prev) => ({ ...prev, prescriptionRequired: true }))
              }
              className="text-medical-600 focus:ring-medical-500 rounded"
            />
            <span className="text-red-700 font-medium">Prescription Required (Rx)</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: undefined }))}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
              !filters.category
                ? 'bg-medical-50 text-medical-800 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: isSelected ? undefined : cat.slug,
                  }))
                }
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-medical-50 text-medical-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-medical-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability / In Stock only */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Availability
        </h4>
        <label className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 text-medical-600 rounded border-slate-300 focus:ring-medical-500"
          />
          <span className="font-medium">Exclude Out of Stock</span>
        </label>
      </div>

      {/* Brands Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Brand / Manufacturer
        </h4>
        <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
          {BRANDS.map((brand) => {
            const isSelected = filters.brand === brand;
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 py-1 px-1 rounded hover:bg-slate-50 cursor-pointer text-slate-600 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      brand: isSelected ? undefined : brand,
                    }))
                  }
                  className="w-4 h-4 text-medical-600 rounded border-slate-300 focus:ring-medical-500"
                />
                <span className="truncate">{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Minimum Rating
        </h4>
        <div className="space-y-1.5 text-xs">
          {[4.5, 4.0, 3.5].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900"
            >
              <input
                type="radio"
                name="ratingFilter"
                checked={filters.rating === rating}
                onChange={() => setFilters((prev) => ({ ...prev, rating }))}
                className="text-medical-600 focus:ring-medical-500 rounded"
              />
              <span className="flex items-center gap-1 font-medium">
                {rating}★ & above
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
