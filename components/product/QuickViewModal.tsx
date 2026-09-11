'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      size: product.sizes[0] || 'Standard',
      price: product.price,
      sku: product.sku,
      stock: product.stock,
    }
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Original');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const isFavorited = isInWishlist(product.id);
  const activePrice = selectedVariant.price || product.price;
  const activeComparePrice = selectedVariant.compareAtPrice || product.compareAtPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, selectedColor, quantity, undefined, true);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello JaipurPinkCityRugs,\nI am interested in:\n${product.name}\nSize: ${selectedVariant.size}\nColor: ${selectedColor}\nQuantity: ${quantity}\nLink: https://jaipurpinkcityrugs.com/product/${product.slug}\n\nPlease share availability and final price.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-cream-50 rounded-2xl shadow-2xl border border-sandstone-300 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-scale">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-warmbrown-800 hover:text-terracotta-600 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-sandstone-100/50 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-subtle border border-sandstone-200">
            <Image
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIdx === idx ? 'border-terracotta-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="md:w-1/2 p-5 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider mb-1">
              {product.categoryName} • {product.origin.split(',')[0]}
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-warmbrown-900 leading-tight">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-ochre-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-ochre-500' : 'text-sandstone-300 fill-sandstone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-warmbrown-900">{product.rating}</span>
              <span className="text-xs text-sandstone-500">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-2xl font-serif font-bold text-warmbrown-900">
                {formatPrice(activePrice)}
              </span>
              {activeComparePrice && (
                <span className="text-sm text-sandstone-400 line-through">
                  {formatPrice(activeComparePrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Free Worldwide Shipping
              </span>
            </div>

            <p className="text-xs text-sandstone-700 mt-3 leading-relaxed line-clamp-3">
              {product.shortDescription || product.description}
            </p>

            {/* Variant Size Picker */}
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
                Select Rug Size: <span className="font-semibold text-terracotta-600">{selectedVariant.size}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-2 px-2.5 text-xs rounded-lg border text-center transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 font-bold shadow-sm'
                        : 'border-sandstone-300 bg-white text-warmbrown-800 hover:border-sandstone-400'
                    }`}
                  >
                    <div>{variant.size}</div>
                    <div className="text-[10px] text-sandstone-500 font-normal">{formatPrice(variant.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center space-x-3">
              <span className="text-xs font-bold uppercase text-warmbrown-800">Quantity:</span>
              <div className="flex items-center border border-sandstone-300 rounded-lg bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-warmbrown-700 hover:text-terracotta-600 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-warmbrown-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-warmbrown-700 hover:text-terracotta-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-sandstone-200">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-terracotta-600 hover:bg-terracotta-700 text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • {formatPrice(activePrice * quantity)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorited
                    ? 'border-jaipur-500 bg-jaipur-50 text-jaipur-600'
                    : 'border-sandstone-300 bg-white text-warmbrown-700 hover:text-jaipur-600'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-jaipur-600' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/919829012345?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Order on WhatsApp (Instant Concierge)</span>
            </a>

            {/* View Full Product Details Link */}
            <div className="text-center pt-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center space-x-1 text-xs font-bold text-warmbrown-800 hover:text-terracotta-600 underline"
              >
                <span>View Full Product Details & Weaving Craft</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
