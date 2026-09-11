'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles, Tag, ArrowUpRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Product } from '@/types';

interface LiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Kilim Rugs', 'Hallway Runner', 'Vintage Indigo', 'Wool Cushion', 'Organic Jute', 'Custom Size'];

export const LiveSearchModal: React.FC<LiveSearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useStore();
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const searchResults = cleanQuery.length > 0
    ? products.filter((p) => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.categoryName.toLowerCase().includes(cleanQuery) ||
          p.primaryMaterial.toLowerCase().includes(cleanQuery) ||
          p.styles.some((s) => s.toLowerCase().includes(cleanQuery)) ||
          p.colors.some((c) => c.toLowerCase().includes(cleanQuery)) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
          p.description.toLowerCase().includes(cleanQuery)
        );
      }).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-2xl shadow-2xl border border-sandstone-300 overflow-hidden z-10 animate-scale">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-sandstone-200 flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-terracotta-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rugs, runners, materials, pillow covers..."
            className="w-full text-base sm:text-lg bg-transparent border-none text-warmbrown-900 placeholder-sandstone-400 focus:outline-none focus:ring-0"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-sandstone-400 hover:text-warmbrown-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1.5 text-sandstone-400 hover:text-warmbrown-800 rounded-full text-xs font-mono border border-sandstone-200"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {cleanQuery.length === 0 ? (
            /* Default Suggestions */
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sandstone-500 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="text-xs bg-sandstone-100 hover:bg-terracotta-50 hover:text-terracotta-700 text-warmbrown-800 px-3 py-1.5 rounded-full border border-sandstone-200 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sandstone-500 mb-3">
                  <Tag className="w-3.5 h-3.5 text-jaipur-500" />
                  <span>Featured Collections</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/category/kilim-rugs"
                    onClick={onClose}
                    className="p-2.5 rounded-lg bg-white border border-sandstone-200 hover:border-terracotta-400 text-warmbrown-800 flex items-center justify-between transition-colors"
                  >
                    <span>Kilim Rugs Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sandstone-400" />
                  </Link>
                  <Link
                    href="/category/kilim-runners"
                    onClick={onClose}
                    className="p-2.5 rounded-lg bg-white border border-sandstone-200 hover:border-terracotta-400 text-warmbrown-800 flex items-center justify-between transition-colors"
                  >
                    <span>Hallway & Stair Runners</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sandstone-400" />
                  </Link>
                  <Link
                    href="/category/wool-rugs"
                    onClick={onClose}
                    className="p-2.5 rounded-lg bg-white border border-sandstone-200 hover:border-terracotta-400 text-warmbrown-800 flex items-center justify-between transition-colors"
                  >
                    <span>Pure Wool Hand-Knotted</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sandstone-400" />
                  </Link>
                  <Link
                    href="/custom-rugs"
                    onClick={onClose}
                    className="p-2.5 rounded-lg bg-white border border-sandstone-200 hover:border-terracotta-400 text-warmbrown-800 flex items-center justify-between transition-colors"
                  >
                    <span>Custom Bespoke Sizing</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sandstone-400" />
                  </Link>
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            /* Live Results */
            <div className="space-y-3">
              <div className="text-xs font-semibold text-sandstone-600 mb-2">
                Found {searchResults.length} {searchResults.length === 1 ? 'rug' : 'rugs & items'} for &quot;{query}&quot;
              </div>

              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-2.5 rounded-xl hover:bg-sandstone-100/70 border border-transparent hover:border-sandstone-300 transition-all group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-sandstone-200 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-terracotta-600 uppercase tracking-wider">
                      {product.categoryName}
                    </div>
                    <h4 className="text-sm font-semibold text-warmbrown-900 truncate group-hover:text-terracotta-700">
                      {product.name}
                    </h4>
                    <div className="text-xs text-sandstone-600 truncate">
                      {product.primaryMaterial} • {product.origin}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-warmbrown-900">
                      {formatPrice(product.price)}
                    </div>
                    {product.compareAtPrice && (
                      <div className="text-[11px] text-sandstone-400 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}

              <div className="pt-3 border-t border-sandstone-200 text-center">
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 py-1"
                >
                  <span>View All Results in Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* No Results Found */
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-sandstone-100 flex items-center justify-center mx-auto text-sandstone-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-warmbrown-900">
                No rugs found matching &quot;{query}&quot;
              </h4>
              <p className="text-xs text-sandstone-600 max-w-sm mx-auto">
                We craft bespoke rugs in any dimension, style, or color palette. Request a custom artisan quote for your space!
              </p>
              <div className="pt-2">
                <Link
                  href="/custom-rugs"
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-terracotta-600 hover:bg-terracotta-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Request Custom Rug</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
