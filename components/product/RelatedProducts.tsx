'use client';

import React from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const { products } = useStore();

  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.primaryMaterial === currentProduct.primaryMaterial ||
          p.styles.some((s) => currentProduct.styles.includes(s)))
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-sandstone-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Handpicked Complements
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900 mt-1">
            You May Also Like
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
