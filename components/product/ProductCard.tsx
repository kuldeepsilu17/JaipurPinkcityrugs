'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80';
  const hoverImage = product.images[1] || primaryImage;

  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-xl border border-sandstone-200/90 overflow-hidden shadow-subtle hover:shadow-luxury-hover transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-sandstone-100">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            {/* Primary Image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-opacity duration-500 md:group-hover:opacity-0"
            />
            {/* Secondary Lifestyle Image on Desktop Hover */}
            <Image
              src={hoverImage}
              alt={`${product.name} styled room`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="hidden md:block object-cover object-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          </Link>

          {/* Badges / Chips */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {discountPercent > 0 && (
              <span className="bg-terracotta-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-warmbrown-900 text-ochre-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
                Top Pick
              </span>
            )}
            {product.newArrival && (
              <span className="bg-emerald-700 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
                New
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Toggle & Mobile Quick View */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            <button
              onClick={() => toggleWishlist(product.id, product.name)}
              className={`p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all touch-target ${
                isFavorited
                  ? 'bg-jaipur-50 text-jaipur-600 shadow-md scale-105'
                  : 'bg-white/85 hover:bg-white text-warmbrown-700 hover:text-jaipur-600 shadow-sm'
              }`}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-jaipur-600' : ''}`} />
            </button>

            {/* Mobile-visible Quick View button */}
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="md:hidden p-1.5 rounded-full bg-white/85 hover:bg-white text-warmbrown-700 hover:text-terracotta-600 shadow-sm transition-colors touch-target"
              aria-label={`Quick view ${product.name}`}
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Hover Quick View Action */}
          <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full bg-cream-50/95 hover:bg-white text-warmbrown-900 font-semibold text-xs py-2.5 px-3 rounded-lg shadow-luxury flex items-center justify-center space-x-1.5 transition-colors border border-sandstone-300"
            >
              <Eye className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Origin & Material */}
            <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-medium text-sandstone-600 uppercase tracking-wider mb-1">
              <span className="truncate max-w-[65%]">{product.primaryMaterial}</span>
              <span className="text-sandstone-400">•</span>
              <span className="truncate">{product.origin.split(',')[0]}</span>
            </div>

            {/* Product Title */}
            <h3 className="font-serif font-bold text-xs sm:text-base text-warmbrown-900 group-hover:text-terracotta-700 transition-colors line-clamp-2 leading-snug">
              <Link href={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>

            {/* Star Rating & Reviews */}
            <div className="flex items-center space-x-1 mt-1 sm:mt-1.5">
              <div className="flex items-center text-ochre-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-ochre-500'
                        : 'text-sandstone-300 fill-sandstone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-warmbrown-800">
                {product.rating}
              </span>
              <span className="text-[9px] sm:text-[10px] text-sandstone-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="mt-2.5 pt-2 border-t border-sandstone-100 flex items-center justify-between gap-1">
            <div className="min-w-0">
              <div className="flex items-baseline space-x-1 sm:space-x-1.5 flex-wrap">
                <span className="text-xs sm:text-base font-bold text-warmbrown-900">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-[10px] sm:text-xs text-sandstone-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-medium block truncate">
                Free Express Ship
              </span>
            </div>

            {/* Quick Add Button */}
            <button
              onClick={() => addToCart(product, product.variants[0], product.colors[0], 1, undefined, true)}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-terracotta-50 hover:bg-terracotta-600 text-terracotta-700 hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1 border border-terracotta-200 hover:border-terracotta-600 transition-all shadow-subtle shrink-0 touch-target"
              aria-label={`Add ${product.name} to bag`}
              title="Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};
