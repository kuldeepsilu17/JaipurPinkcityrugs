'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Copy,
  Star,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const { formatPrice } = useCurrency();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('kilim-rugs');
  const [formPrice, setFormPrice] = useState(99);
  const [formComparePrice, setFormComparePrice] = useState(179);
  const [formStock, setFormStock] = useState(15);
  const [formMaterial, setFormMaterial] = useState('Wool');
  const [formDesc, setFormDesc] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80');

  const filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const openNewModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('kilim-rugs');
    setFormPrice(99);
    setFormComparePrice(179);
    setFormStock(15);
    setFormMaterial('Wool');
    setFormDesc('Handwoven pit-loom rug created with organic vegetable dyes in Jaipur.');
    setFormImageUrl('https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormComparePrice(p.compareAtPrice || 0);
    setFormStock(p.stock);
    setFormMaterial(p.primaryMaterial);
    setFormDesc(p.description);
    setFormImageUrl(p.images[0]);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error('Please enter product title');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.slug === formCategory);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        category: formCategory,
        categoryName: catObj?.name || 'Handmade Rugs',
        price: Number(formPrice),
        compareAtPrice: Number(formComparePrice) || undefined,
        stock: Number(formStock),
        primaryMaterial: formMaterial,
        description: formDesc,
        images: [formImageUrl, ...editingProduct.images.slice(1)],
      });
    } else {
      const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      addProduct({
        name: formName,
        slug,
        category: formCategory,
        categoryName: catObj?.name || 'Handmade Rugs',
        price: Number(formPrice),
        compareAtPrice: Number(formComparePrice) || undefined,
        description: formDesc,
        shortDescription: formDesc.slice(0, 120),
        images: [formImageUrl],
        materials: [`100% Hand-Spun ${formMaterial}`],
        primaryMaterial: formMaterial,
        colors: ['Terracotta', 'Sandstone'],
        colorHexes: ['#C85A32', '#BD9E78'],
        styles: ['Boho', 'Tribal'],
        sizes: ['3x5', '5x7', '8x10'],
        variants: [
          { id: `v-${Date.now()}-1`, size: '3x5 ft', price: Number(formPrice), sku: `JPR-${slug.slice(0, 4)}-3X5`, stock: Number(formStock) },
          { id: `v-${Date.now()}-2`, size: '5x7 ft', price: Number(formPrice) * 1.8, sku: `JPR-${slug.slice(0, 4)}-5X7`, stock: 5 },
        ],
        sku: `JPR-${slug.slice(0, 6).toUpperCase()}`,
        stock: Number(formStock),
        rating: 5.0,
        reviewCount: 1,
        tags: ['Handmade', 'Jaipur'],
        weaveType: 'Hand-Loomed Pit Loom',
        origin: 'Jaipur, Rajasthan, India',
      });
    }

    setIsModalOpen(false);
  };

  const handleDuplicate = (p: Product) => {
    addProduct({
      ...p,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy-${Date.now().toString().slice(-4)}`,
      sku: `${p.sku}-CP`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
            Catalog Management
          </h1>
          <p className="text-xs text-sandstone-600">
            Add, update inventory, manage pricing, and curate product badges.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-sandstone-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-sandstone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog products..."
            className="w-full pl-9 pr-3 py-2 bg-sandstone-50 border border-sandstone-300 rounded-xl text-xs text-warmbrown-900 focus:outline-none focus:border-terracotta-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-sandstone-500 font-medium">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-sandstone-50 border border-sandstone-300 text-xs font-semibold text-warmbrown-900 px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="all">All Categories ({products.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-sandstone-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-sandstone-50 text-sandstone-700 font-bold uppercase tracking-wider border-b border-sandstone-200">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Badges</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sandstone-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-sandstone-50/50">
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-sandstone-100 shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="font-serif font-bold text-sm text-warmbrown-900 hover:text-terracotta-600 line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <div className="text-sandstone-400 font-mono text-[10px]">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-sandstone-700">
                    {product.categoryName}
                  </td>
                  <td className="p-3.5 font-bold text-warmbrown-900">
                    {formatPrice(product.price)}
                    {product.compareAtPrice && (
                      <span className="text-sandstone-400 line-through text-[10px] ml-1">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      product.stock > 5
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-3.5 space-x-1">
                    {product.bestSeller && (
                      <span className="bg-warmbrown-900 text-ochre-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Best Seller
                      </span>
                    )}
                    {product.newArrival && (
                      <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1.5 text-warmbrown-700 hover:text-terracotta-600 hover:bg-sandstone-100 rounded"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(product)}
                      className="p-1.5 text-warmbrown-700 hover:text-ochre-600 hover:bg-sandstone-100 rounded"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 text-sandstone-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmbrown-950/70 backdrop-blur-sm">
          <div className="bg-cream-50 rounded-2xl border border-sandstone-300 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-scale">
            <div className="flex items-center justify-between pb-4 border-b border-sandstone-200">
              <h3 className="font-serif font-bold text-xl text-warmbrown-900">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Handcrafted Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-sandstone-500 hover:text-warmbrown-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-warmbrown-800 mb-1">Product Title *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Royal Bikaner Medallion Wool Kilim"
                  className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300 text-sm font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-warmbrown-800 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-warmbrown-800 mb-1">Primary Material</label>
                  <select
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                  >
                    <option value="Wool">Wool</option>
                    <option value="Jute">Jute</option>
                    <option value="Hemp">Hemp</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wool + Jute">Wool + Jute</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-warmbrown-800 mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-warmbrown-800 mb-1">Compare Price (₹ INR)</label>
                  <input
                    type="number"
                    value={formComparePrice}
                    onChange={(e) => setFormComparePrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-warmbrown-800 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-warmbrown-800 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300 font-mono text-[11px]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-warmbrown-800 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-lg border border-sandstone-300"
                />
              </div>

              <div className="pt-4 border-t border-sandstone-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-sandstone-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-2.5 rounded-xl font-bold uppercase"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
