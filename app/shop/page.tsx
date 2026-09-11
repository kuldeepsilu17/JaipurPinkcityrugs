'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Star,
  Check,
  LayoutGrid,
  Grid,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CATEGORIES, STYLES, SIZE_OPTIONS, MATERIAL_OPTIONS, COLOR_OPTIONS } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

function ShopContent() {
  const { products } = useStore();
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();

  // URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';
  const initialStyle = searchParams.get('style') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialStyle ? [initialStyle] : []);
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.primaryMaterial.toLowerCase().includes(q) ||
          p.styles.some((s) => s.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Price Max
      if (p.price > priceRange) return false;

      // Sizes
      if (selectedSizes.length > 0) {
        const matchesSize = selectedSizes.some((size) =>
          p.sizes.some((ps) => ps.toLowerCase().includes(size.toLowerCase())) ||
          p.variants.some((pv) => pv.size.toLowerCase().includes(size.toLowerCase()))
        );
        if (!matchesSize) return false;
      }

      // Materials
      if (selectedMaterials.length > 0) {
        const matchesMat = selectedMaterials.some((mat) =>
          p.primaryMaterial.toLowerCase().includes(mat.toLowerCase()) ||
          p.materials.some((m) => m.toLowerCase().includes(mat.toLowerCase()))
        );
        if (!matchesMat) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some((col) =>
          p.colors.some((c) => c.toLowerCase().includes(col.toLowerCase()))
        );
        if (!matchesColor) return false;
      }

      // Styles
      if (selectedStyles.length > 0) {
        const matchesStyle = selectedStyles.some((st) =>
          p.styles.some((s) => s.toLowerCase().includes(st.toLowerCase()))
        );
        if (!matchesStyle) return false;
      }

      // In Stock
      if (inStockOnly && p.stock <= 0) return false;

      // On Sale
      if (onSaleOnly && !p.onSale && !p.compareAtPrice) return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      return true;
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    selectedSizes,
    selectedMaterials,
    selectedColors,
    selectedStyles,
    inStockOnly,
    onSaleOnly,
    minRating,
  ]);

  // Sort Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'discount':
        return list.sort((a, b) => {
          const discA = a.compareAtPrice ? a.compareAtPrice - a.price : 0;
          const discB = b.compareAtPrice ? b.compareAtPrice - b.price : 0;
          return discB - discA;
        });
      default:
        return list; // Featured
    }
  }, [filteredProducts, sortBy]);

  // Helpers
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setPriceRange(1500);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMinRating(0);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSizes.length > 0 ||
    selectedMaterials.length > 0 ||
    selectedColors.length > 0 ||
    selectedStyles.length > 0 ||
    priceRange < 1500 ||
    inStockOnly ||
    onSaleOnly ||
    minRating > 0 ||
    searchQuery.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          ...(selectedCategory !== 'all'
            ? [{ label: CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory }]
            : []),
        ]}
      />

      {/* Catalog Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-sandstone-200 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Artisan Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            {selectedCategory === 'all'
              ? 'Handcrafted Rugs & Home Décor'
              : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
            Showing {sortedProducts.length} authentic handwoven pieces loomed in Jaipur, Rajasthan.
          </p>
        </div>

        {/* Sort & Mobile Filter Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-sandstone-300 text-xs font-bold uppercase tracking-wider text-warmbrown-800 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-terracotta-600" />
            <span>Filters ({selectedSizes.length + selectedMaterials.length + selectedColors.length + (selectedCategory !== 'all' ? 1 : 0)})</span>
          </button>

          <div className="flex items-center space-x-2 bg-white border border-sandstone-300 rounded-xl px-3 py-2 text-xs">
            <span className="text-sandstone-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-warmbrown-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pill Tags */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2 pt-1 pb-2">
          <span className="text-xs font-semibold text-sandstone-600">Active Filters:</span>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center space-x-1 text-xs bg-terracotta-50 text-terracotta-700 px-3 py-1 rounded-full border border-terracotta-200"
            >
              <span>Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center space-x-1 text-xs bg-sandstone-200 text-warmbrown-900 px-3 py-1 rounded-full"
            >
              <span>Search: &quot;{searchQuery}&quot;</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {selectedSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="inline-flex items-center space-x-1 text-xs bg-sandstone-200 text-warmbrown-900 px-3 py-1 rounded-full"
            >
              <span>Size: {size}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {selectedMaterials.map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className="inline-flex items-center space-x-1 text-xs bg-sandstone-200 text-warmbrown-900 px-3 py-1 rounded-full"
            >
              <span>Material: {mat}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {selectedColors.map((col) => (
            <button
              key={col}
              onClick={() => toggleColor(col)}
              className="inline-flex items-center space-x-1 text-xs bg-sandstone-200 text-warmbrown-900 px-3 py-1 rounded-full"
            >
              <span>Color: {col.split('&')[0]}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {selectedStyles.map((st) => (
            <button
              key={st}
              onClick={() => toggleStyle(st)}
              className="inline-flex items-center space-x-1 text-xs bg-sandstone-200 text-warmbrown-900 px-3 py-1 rounded-full"
            >
              <span>Style: {st}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {onSaleOnly && (
            <button
              onClick={() => setOnSaleOnly(false)}
              className="inline-flex items-center space-x-1 text-xs bg-terracotta-100 text-terracotta-800 px-3 py-1 rounded-full"
            >
              <span>On Sale Only</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={resetAllFilters}
            className="inline-flex items-center space-x-1 text-xs text-red-600 hover:underline font-semibold ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ========================================================================= */}
        {/* DESKTOP FILTER SIDEBAR                                                    */}
        {/* ========================================================================= */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-sandstone-200/90 shadow-subtle self-start sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-sandstone-200">
            <h3 className="font-serif font-bold text-base text-warmbrown-900 uppercase tracking-wider">
              Filter Catalog
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-terracotta-600 hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
              Category
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-terracotta-50 text-terracotta-700 font-bold'
                    : 'text-warmbrown-800 hover:bg-sandstone-100'
                }`}
              >
                <span>All Collections</span>
                <span className="text-sandstone-400">{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-terracotta-50 text-terracotta-700 font-bold'
                      : 'text-warmbrown-800 hover:bg-sandstone-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-sandstone-400">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-sandstone-200">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
              <span>Max Price</span>
              <span className="text-terracotta-600 font-mono text-sm">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="30"
              max="1500"
              step="20"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-terracotta-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-sandstone-500 mt-1">
              <span>{formatPrice(30)}</span>
              <span>{formatPrice(1500)}</span>
            </div>
          </div>

          {/* Size Options */}
          <div className="pt-4 border-t border-sandstone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2.5">
              Rug Size
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {SIZE_OPTIONS.map((size) => {
                const isSelected = selectedSizes.includes(size.value);
                return (
                  <button
                    key={size.value}
                    onClick={() => toggleSize(size.value)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 font-bold'
                        : 'border-sandstone-300 text-warmbrown-800 hover:border-sandstone-400'
                    }`}
                  >
                    {size.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material Options */}
          <div className="pt-4 border-t border-sandstone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
              Fiber & Material
            </h4>
            <div className="space-y-1 text-xs">
              {MATERIAL_OPTIONS.map((mat) => {
                const isSelected = selectedMaterials.includes(mat.value);
                return (
                  <label
                    key={mat.value}
                    className="flex items-center space-x-2 py-1 cursor-pointer text-warmbrown-800 hover:text-terracotta-600"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMaterial(mat.value)}
                      className="rounded border-sandstone-300 text-terracotta-600 focus:ring-terracotta-500"
                    />
                    <span>{mat.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="pt-4 border-t border-sandstone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
              Color Palette
            </h4>
            <div className="space-y-1.5 text-xs">
              {COLOR_OPTIONS.map((col) => {
                const isSelected = selectedColors.includes(col.name);
                return (
                  <button
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className={`w-full flex items-center justify-between p-1.5 rounded-lg transition-colors ${
                      isSelected ? 'bg-sandstone-100 font-bold' : 'hover:bg-sandstone-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-sandstone-300"
                        style={{ background: col.hex }}
                      />
                      <span>{col.name}</span>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-terracotta-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Moods */}
          <div className="pt-4 border-t border-sandstone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
              Aesthetic Style
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {STYLES.map((st) => {
                const isSelected = selectedStyles.includes(st.name.split(' ')[0]);
                return (
                  <button
                    key={st.id}
                    onClick={() => toggleStyle(st.name.split(' ')[0])}
                    className={`px-2.5 py-1 rounded-full border transition-all ${
                      isSelected
                        ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 font-bold'
                        : 'border-sandstone-300 text-warmbrown-800 hover:border-sandstone-400'
                    }`}
                  >
                    {st.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Toggles: On Sale, In Stock */}
          <div className="pt-4 border-t border-sandstone-200 space-y-2 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-warmbrown-800">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded border-sandstone-300 text-terracotta-600 focus:ring-terracotta-500"
              />
              <span className="font-semibold text-terracotta-700">On Sale Discounts Only</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer text-warmbrown-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-sandstone-300 text-terracotta-600 focus:ring-terracotta-500"
              />
              <span>In-Stock Ready to Ship (2-Day Dispatch)</span>
            </label>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* PRODUCT GRID                                                              */}
        {/* ========================================================================= */}
        <main className="lg:col-span-3 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-sandstone-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sandstone-100 flex items-center justify-center mx-auto text-sandstone-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-warmbrown-900">
                No rugs match your current filters
              </h3>
              <p className="text-xs sm:text-sm text-sandstone-600 max-w-md mx-auto">
                Try loosening your filters or request a bespoke custom rug handwoven to your specific color and dimension requirements.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl border border-sandstone-300 text-xs font-semibold text-warmbrown-800 hover:bg-sandstone-100"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FILTER BOTTOM SHEET DRAWER                                         */}
      {/* ========================================================================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden justify-end">
          <div
            className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-cream-50 h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left">
            <div className="p-4 border-b border-sandstone-200 flex items-center justify-between bg-cream-100">
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-warmbrown-700 hover:text-terracotta-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg ${selectedCategory === 'all' ? 'bg-terracotta-50 text-terracotta-700 font-bold' : ''}`}
                  >
                    All Collections
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg ${selectedCategory === cat.slug ? 'bg-terracotta-50 text-terracotta-700 font-bold' : ''}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-sandstone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">Sizes</h4>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => toggleSize(size.value)}
                      className={`py-1.5 px-2 rounded-lg border text-center ${selectedSizes.includes(size.value) ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 font-bold' : 'border-sandstone-300'}`}
                    >
                      {size.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="pt-4 border-t border-sandstone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">Materials</h4>
                <div className="space-y-1 text-xs">
                  {MATERIAL_OPTIONS.map((mat) => (
                    <label key={mat.value} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat.value)}
                        onChange={() => toggleMaterial(mat.value)}
                        className="rounded border-sandstone-300 text-terracotta-600"
                      />
                      <span>{mat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-sandstone-200 bg-white flex space-x-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-3 border border-sandstone-300 text-xs font-bold uppercase rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-terracotta-600 text-white text-xs font-bold uppercase rounded-xl shadow-md"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-sandstone-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
