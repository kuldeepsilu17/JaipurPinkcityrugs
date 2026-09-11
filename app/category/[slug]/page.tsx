'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { products } = useStore();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === category.slug);

  return (
    <div className="space-y-12">
      {/* Category Hero Banner */}
      <section className="relative min-h-[350px] sm:min-h-[420px] flex items-center justify-center overflow-hidden bg-sandstone-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950 via-warmbrown-900/60 to-warmbrown-950/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-cream-50 space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cream-100/10 backdrop-blur-md border border-cream-100/20 text-[11px] font-semibold uppercase tracking-widest text-ochre-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jaipur Artisan Collection</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream-50">
            {category.name}
          </h1>

          <p className="text-xs sm:text-base font-light text-sandstone-200 max-w-xl mx-auto leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 text-xs font-mono uppercase tracking-widest text-ochre-400">
            {categoryProducts.length} Handwoven Designs Available
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              { label: category.name },
            ]}
          />

          <Link
            href={`/shop?category=${category.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700 uppercase tracking-wider"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter in Catalog</span>
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-sandstone-200 p-8">
            <h3 className="font-serif text-xl font-bold text-warmbrown-900">
              New {category.name} designs currently on our pit-looms
            </h3>
            <p className="text-xs text-sandstone-600 mt-2">
              Our master artisans are weaving a fresh batch. Check back soon or request a bespoke custom design!
            </p>
            <div className="mt-4">
              <Link
                href="/custom-rugs"
                className="inline-block bg-terracotta-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Request Custom {category.name}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
