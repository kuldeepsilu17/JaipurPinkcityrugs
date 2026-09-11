'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useWishlist();
  const { products } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: `Saved Wishlist (${wishlistCount})` },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-sandstone-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Curated Favorites
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            My Saved Wishlist ({wishlistCount})
          </h1>
        </div>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-sandstone-200 p-8 space-y-4 max-w-2xl mx-auto shadow-subtle">
          <div className="w-20 h-20 rounded-full bg-sandstone-100 flex items-center justify-center mx-auto text-sandstone-400">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-warmbrown-900">
            Your wishlist is empty
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 max-w-md mx-auto">
            Save your favorite Jaipur kilims, hallway runners, and block-print accents while browsing.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>Explore All Rugs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
