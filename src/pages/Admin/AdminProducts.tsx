import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Plus, Search, Trash2, Edit3, ExternalLink, Check, AlertTriangle } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    genericName: '',
    brand: '',
    manufacturer: 'Sun Pharma',
    category: 'fever-cold',
    strength: '500mg',
    dosageForm: 'Tablet' as const,
    packSize: '10 Tablets Strip',
    mrp: 50,
    sellingPrice: 40,
    stockCount: 50,
    prescriptionRequired: false,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  });

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this medicine from hospital inventory?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((newProd.mrp - newProd.sellingPrice) / newProd.mrp) * 100);
    const created: Product = {
      id: `prod-${Date.now()}`,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProd.name,
      genericName: newProd.genericName,
      brand: newProd.brand,
      manufacturer: newProd.manufacturer,
      category: newProd.category,
      strength: newProd.strength,
      dosageForm: newProd.dosageForm,
      packSize: newProd.packSize,
      rating: 4.8,
      ratingCount: 1,
      mrp: newProd.mrp,
      sellingPrice: newProd.sellingPrice,
      discountPercent: Math.max(0, discount),
      inStock: newProd.stockCount > 0,
      stockCount: newProd.stockCount,
      prescriptionRequired: newProd.prescriptionRequired,
      images: [newProd.imageUrl],
      description: newProd.description || 'Clinical pharmaceutical formulation.',
      overview: 'Registered pharmaceutical medicine.',
      uses: ['Clinical indication'],
      directions: 'As prescribed by physician.',
      ingredients: [newProd.genericName],
      warnings: ['Keep out of reach of children.'],
      precautions: ['Follow prescription instructions.'],
      sideEffects: ['None observed'],
      storage: 'Store below 25°C.',
      batchNumber: `BAT-${Math.floor(1000 + Math.random() * 9000)}`,
      expiryDate: '12/2028',
    };

    setProductsList([created, ...productsList]);
    setIsAddModalOpen(false);
    alert(`Medicine "${created.name}" added to hospital inventory!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase text-medical-600 tracking-wider">
            Pharmacy Inventory Catalog
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Product & Medicine Management ({productsList.length})
          </h1>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          className="flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add New Medicine
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, salt, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="text-slate-400 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl bg-white font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-2xs"
          >
            <option value="All">All Categories</option>
            <option value="fever-cold">Fever & Cold</option>
            <option value="prescription-medicines">Prescription Medicines</option>
            <option value="diabetes-care">Diabetes Care</option>
            <option value="heart-care">Heart Care</option>
            <option value="vitamins">Vitamins</option>
            <option value="medical-devices">Medical Devices</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Medicine / Device</th>
                <th className="py-3.5 px-4">Brand & Salt</th>
                <th className="py-3.5 px-4">Price / MRP</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Rx Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stockCount === 0;
                const isLowStock = p.stockCount > 0 && p.stockCount <= 5;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-[200px]">
                          <span className="font-bold text-slate-900 block truncate">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {p.packSize} • {p.strength}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800 block">{p.brand}</span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                        {p.genericName}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-extrabold text-slate-900 block">
                        {formatCurrency(p.sellingPrice)}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatCurrency(p.mrp)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          isOutOfStock
                            ? 'text-red-600'
                            : isLowStock
                            ? 'text-amber-600'
                            : 'text-slate-800'
                        }`}
                      >
                        {p.stockCount} units
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {p.prescriptionRequired ? (
                        <Badge variant="rx" size="sm">
                          Schedule H
                        </Badge>
                      ) : (
                        <Badge variant="secondary" size="sm">
                          OTC
                        </Badge>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <span className="text-red-700 bg-red-50 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="text-amber-800 bg-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          Available
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/product/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View live page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Medicine to Hospital Inventory"
        description="Register a new certified therapeutic formulation into the digital dispensary"
        maxWidth="xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Medicine Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Paracetamol 500mg"
                value={newProd.name}
                onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Generic / Salt *</label>
              <input
                type="text"
                required
                placeholder="e.g. Paracetamol IP"
                value={newProd.genericName}
                onChange={(e) => setNewProd({ ...newProd, genericName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Brand Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Crocin"
                value={newProd.brand}
                onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Strength</label>
              <input
                type="text"
                placeholder="e.g. 500mg"
                value={newProd.strength}
                onChange={(e) => setNewProd({ ...newProd, strength: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Pack Size</label>
              <input
                type="text"
                placeholder="e.g. 15 Tablets Strip"
                value={newProd.packSize}
                onChange={(e) => setNewProd({ ...newProd, packSize: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">MRP (₹) *</label>
              <input
                type="number"
                required
                value={newProd.mrp}
                onChange={(e) => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={newProd.sellingPrice}
                onChange={(e) =>
                  setNewProd({ ...newProd, sellingPrice: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Initial Stock Count *</label>
              <input
                type="number"
                required
                value={newProd.stockCount}
                onChange={(e) =>
                  setNewProd({ ...newProd, stockCount: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
              <input
                type="checkbox"
                checked={newProd.prescriptionRequired}
                onChange={(e) =>
                  setNewProd({ ...newProd, prescriptionRequired: e.target.checked })
                }
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span>Prescription Mandatory (Schedule H / H1 Drug)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Register Medicine
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
