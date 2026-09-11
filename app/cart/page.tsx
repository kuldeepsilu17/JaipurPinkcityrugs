'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  Heart,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    itemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    shippingMethod,
    setShippingMethod,
  } = useCart();

  const { formatPrice } = useCurrency();
  const { toggleWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode('');
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: `Shopping Bag (${itemCount})` },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-sandstone-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Review Your Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-sandstone-500 hover:text-red-600 font-semibold underline"
          >
            Clear All Items
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-sandstone-200 p-8 space-y-4 max-w-2xl mx-auto shadow-subtle">
          <div className="w-20 h-20 rounded-full bg-sandstone-100 flex items-center justify-center mx-auto text-sandstone-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-warmbrown-900">
            Your shopping bag is currently empty
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 max-w-md mx-auto">
            Discover our collection of authentic Indian kilim rugs, hallway runners, and block-printed pillow covers handwoven in Jaipur.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert Bar */}
            <div className="p-4 rounded-2xl bg-sandstone-100 border border-sandstone-200 text-xs">
              {amountToFreeShipping > 0 ? (
                <div>
                  <div className="flex justify-between font-medium text-warmbrown-900 mb-1.5">
                    <span>Add <strong className="text-terracotta-700">{formatPrice(amountToFreeShipping)}</strong> more to get <strong>FREE Worldwide Express Shipping</strong>!</span>
                    <span className="font-bold">{freeShippingPct}%</span>
                  </div>
                  <div className="w-full bg-sandstone-300 h-2 rounded-full overflow-hidden">
                    <div className="bg-terracotta-500 h-full rounded-full transition-all duration-500" style={{ width: `${freeShippingPct}%` }} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>🎉 Your order qualifies for FREE Doorstep Worldwide Express Delivery!</span>
                </div>
              )}
            </div>

            {/* Cart Items Cards */}
            <div className="bg-white rounded-2xl border border-sandstone-200/90 shadow-subtle divide-y divide-sandstone-200 overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-start space-x-3.5 sm:space-x-4 w-full sm:w-auto">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-sandstone-100 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-terracotta-600 uppercase tracking-wider">
                        {item.product.categoryName} • {item.product.origin.split(',')[0]}
                      </div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif font-bold text-sm sm:text-lg text-warmbrown-900 hover:text-terracotta-700 leading-snug line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-sandstone-600 mt-1">
                        Dimension: <span className="font-semibold text-warmbrown-800">{item.selectedVariant.size}</span>
                        {item.selectedColor && (
                          <span> • Color: <span className="font-semibold text-warmbrown-800">{item.selectedColor}</span></span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-warmbrown-900 mt-1 sm:hidden">
                        {formatPrice(item.selectedVariant.price)} each
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-sandstone-100">
                    <div className="hidden sm:block text-right">
                      <div className="font-serif text-lg font-bold text-warmbrown-900">
                        {formatPrice(item.selectedVariant.price * item.quantity)}
                      </div>
                      <div className="text-xs text-sandstone-500">
                        {formatPrice(item.selectedVariant.price)} each
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Stepper */}
                      <div className="flex items-center border border-sandstone-300 rounded-lg bg-sandstone-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-warmbrown-700 hover:text-terracotta-600 touch-target font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-warmbrown-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-warmbrown-700 hover:text-terracotta-600 touch-target font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total (mobile) & Remove */}
                      <div className="flex items-center space-x-2">
                        <span className="sm:hidden font-serif font-bold text-sm text-warmbrown-900">
                          {formatPrice(item.selectedVariant.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sandstone-400 hover:text-red-500 p-2 transition-colors touch-target"
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-1.5 text-warmbrown-800 hover:text-terracotta-600 font-semibold touch-target"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary & Checkout Box (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200/90 shadow-subtle space-y-6 self-start sticky top-24">
            <h3 className="font-serif font-bold text-xl text-warmbrown-900 pb-3 border-b border-sandstone-200">
              Order Summary
            </h3>

            {/* Coupon Box */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1.5">
                Discount / Promo Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{appliedCoupon.code} ({appliedCoupon.discountValue}% OFF)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-red-600 hover:underline font-bold text-xs">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. WELCOME10"
                    className="bg-sandstone-50 border border-sandstone-300 text-xs text-warmbrown-900 px-3 py-2.5 rounded-l-xl focus:outline-none focus:border-terracotta-500 w-full uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-warmbrown-900 hover:bg-warmbrown-800 text-white px-4 py-2.5 rounded-r-xl text-xs font-bold tracking-wider uppercase transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Shipping Speed Selection */}
            <div className="space-y-2 pt-2 border-t border-sandstone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800">
                Shipping Method
              </label>
              <div className="space-y-1.5 text-xs">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard' ? 'border-terracotta-600 bg-terracotta-50/50 font-bold' : 'border-sandstone-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input type="radio" checked={shippingMethod === 'standard'} readOnly />
                    <span>Standard Air Courier (7-10 Days)</span>
                  </div>
                  <span>{subtotal >= freeShippingThreshold ? 'FREE' : formatPrice(15)}</span>
                </label>

                <label
                  onClick={() => setShippingMethod('express_dhl')}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express_dhl' ? 'border-terracotta-600 bg-terracotta-50/50 font-bold' : 'border-sandstone-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input type="radio" checked={shippingMethod === 'express_dhl'} readOnly />
                    <span>DHL Express (4-7 Days)</span>
                  </div>
                  <span>{subtotal >= freeShippingThreshold ? 'FREE' : formatPrice(25)}</span>
                </label>
              </div>
            </div>

            {/* Calculation Rows */}
            <div className="space-y-2 text-xs text-sandstone-700 pt-3 border-t border-sandstone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-warmbrown-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-warmbrown-900 pt-3 border-t border-sandstone-300">
                <span>Total Amount</span>
                <span className="text-xl font-serif text-terracotta-700">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-center flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-sandstone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
