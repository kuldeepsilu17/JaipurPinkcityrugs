'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from './ProductCard';

interface RecentlyViewedProps {
  currentProductId?: string;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ currentProductId }) => {
  const { products } = useStore();
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jpr_recently_viewed');
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const filtered = ids
          .filter((id) => id !== currentProductId)
          .map((id) => products.find((p) => p.id === id))
          .filter((p): p is Product => p !== undefined)
          .slice(0, 4);

        setRecentProducts(filtered);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentProductId, products]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-12 border-t border-sandstone-200">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Your Browsing History
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900 mt-1">
          Recently Viewed Rugs
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
