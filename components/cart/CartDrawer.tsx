'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    itemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [couponInput, setCouponInput] = useState('');

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-cream-50 h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-right overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-sandstone-200 flex items-center justify-between bg-cream-100">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-terracotta-600" />
            <h3 className="font-serif font-bold text-lg text-warmbrown-900">
              Shopping Bag ({itemCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-warmbrown-700 hover:text-terracotta-600 rounded-full hover:bg-sandstone-200/50 touch-target"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-sandstone-100/70 p-3 px-5 border-b border-sandstone-200 text-xs">
          {amountToFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between font-medium text-warmbrown-800 mb-1.5">
                <span>Add <strong className="text-terracotta-600">{formatPrice(amountToFreeShipping)}</strong> more for <strong>FREE Worldwide Express Shipping</strong></span>
                <span className="text-[10px] text-sandstone-500 font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-sandstone-300 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-terracotta-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>🎉 Congratulations! You have qualified for <strong>FREE Express Shipping</strong>!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sandstone-100 flex items-center justify-center mx-auto text-sandstone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-warmbrown-900">
                Your shopping bag is empty
              </h4>
              <p className="text-xs text-sandstone-600 max-w-xs mx-auto">
                Explore our handwoven kilim rugs, hallway runners, and artisan pillow covers crafted in Jaipur.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center space-x-2 text-xs font-semibold bg-terracotta-600 hover:bg-terracotta-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  <Link href="/shop" onClick={() => setIsCartOpen(false)}>
                    Browse Collections
                  </Link>
                </button>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3.5 p-3 rounded-xl bg-white border border-sandstone-200/80 shadow-subtle"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-sandstone-100 shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs sm:text-sm font-semibold text-warmbrown-900 hover:text-terracotta-600 line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-[11px] text-sandstone-600 mt-0.5">
                    Size: <span className="font-medium text-warmbrown-800">{item.selectedVariant.size}</span>
                    {item.selectedColor && (
                      <span> • Color: <span className="font-medium text-warmbrown-800">{item.selectedColor}</span></span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-warmbrown-900 mt-1">
                    {formatPrice(item.selectedVariant.price)}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-sandstone-300 rounded-lg bg-sandstone-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-warmbrown-700 hover:text-terracotta-600 touch-target font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-warmbrown-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-warmbrown-700 hover:text-terracotta-600 touch-target font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sandstone-400 hover:text-red-500 p-2 transition-colors touch-target"
                      aria-label="Remove item"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-sandstone-200 bg-white space-y-3.5 pb-safe">
            {/* Coupon Code Input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountValue}% OFF)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. WELCOME10)"
                  className="bg-sandstone-50 border border-sandstone-300 text-xs text-warmbrown-900 px-3 py-2 rounded-l-md focus:outline-none focus:border-terracotta-500 w-full uppercase"
                />
                <button
                  type="submit"
                  className="bg-warmbrown-800 hover:bg-warmbrown-900 text-white px-3.5 py-2 rounded-r-md text-xs font-semibold tracking-wider transition-colors shrink-0 touch-target"
                >
                  APPLY
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-sandstone-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-warmbrown-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping (Worldwide)</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-emerald-600 uppercase">FREE</strong>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-warmbrown-900 pt-2 border-t border-sandstone-200">
                <span>Estimated Total</span>
                <span className="text-base text-terracotta-700">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-center flex items-center justify-center space-x-2 shadow-md transition-all touch-target"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-sandstone-100 hover:bg-sandstone-200 text-warmbrown-900 py-3 rounded-xl text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center transition-colors touch-target"
              >
                <span>View Full Shopping Bag</span>
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-sandstone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL Checkout Protection</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
