'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';

interface StickyMobileAddToCartProps {
  product: Product;
  selectedVariant: ProductVariant;
  selectedColor: string;
  quantity: number;
  onAddToCart: () => void;
}

export const StickyMobileAddToCart: React.FC<StickyMobileAddToCartProps> = ({
  product,
  selectedVariant,
  selectedColor,
  quantity,
  onAddToCart,
}) => {
  const { formatPrice } = useCurrency();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const activePrice = selectedVariant.price || product.price;

  return (
    <aside
      aria-label="Quick purchase bar"
      className="lg:hidden fixed bottom-[calc(env(safe-area-inset-bottom,0px)+3.8rem)] left-0 right-0 z-20 px-3 transition-transform duration-300 transform translate-y-0"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-sandstone-300 shadow-2xl p-2.5 flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Left: Product Info & Variant */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-sandstone-100 shrink-0 border border-sandstone-200">
            <Image
              src={product.images[0] || 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=400&q=80'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-serif font-bold text-xs text-warmbrown-900 truncate">
              {product.name}
            </div>
            <div className="text-[10px] text-sandstone-600 flex items-center space-x-1 truncate">
              <span className="font-semibold text-terracotta-700">{selectedVariant.size}</span>
              <span>•</span>
              <span className="font-bold text-warmbrown-900 font-mono">{formatPrice(activePrice)}</span>
            </div>
          </div>
        </div>

        {/* Right: Add to Bag Action */}
        <button
          onClick={onAddToCart}
          className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center space-x-1.5 shrink-0 touch-target"
          aria-label={`Add ${product.name} (${selectedVariant.size}) to bag`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </aside>
  );
};
