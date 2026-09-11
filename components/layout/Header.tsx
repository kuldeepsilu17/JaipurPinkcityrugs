'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu, Phone, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';
import { CurrencyCode } from '@/types';
import { MobileNavDrawer } from './MobileNavDrawer';
import { LiveSearchModal } from '@/components/search/LiveSearchModal';

export const Header: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency } = useCurrency();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-cream-50/95 backdrop-blur-md sticky top-0 z-40 border-b border-sandstone-200 transition-all">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Trigger & Currency */}
            <div className="flex items-center space-x-3 lg:w-1/4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-warmbrown-800 hover:text-terracotta-600 rounded-md focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden sm:flex items-center space-x-2">
                <label htmlFor="currency-select" className="sr-only">Select Currency</label>
                <select
                  id="currency-select"
                  aria-label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-semibold text-warmbrown-800 hover:text-terracotta-600 border border-sandstone-300 rounded px-2 py-1 focus:border-terracotta-500 cursor-pointer"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c} className="bg-white text-warmbrown-900">
                      {c} ({CURRENCIES[c as CurrencyCode].symbol})
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href="/custom-rugs"
                className="hidden xl:inline-flex items-center text-xs font-semibold uppercase tracking-wider text-terracotta-600 hover:text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded border border-terracotta-200 transition-colors"
              >
                Bespoke Orders
              </Link>
            </div>

            {/* Center: Brand Identity */}
            <div className="flex-1 text-center lg:w-2/4">
              <Link href="/" className="inline-block group">
                <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-warmbrown-900 group-hover:text-terracotta-700 transition-colors uppercase">
                  JaipurPinkCityRugs
                </span>
                <span className="block text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-sandstone-700">
                  Handcrafted In Rajasthan • Est. Jaipur
                </span>
              </Link>
            </div>

            {/* Right: Search, Account, Wishlist, Cart */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-5 lg:w-1/4">
              {/* Search Bar / Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 text-warmbrown-800 hover:text-terracotta-600 p-2 rounded-full transition-colors group"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5 text-warmbrown-700 group-hover:text-terracotta-600 transition-colors" />
                <span className="hidden md:inline text-xs text-sandstone-600 group-hover:text-terracotta-600 font-medium">
                  Search...
                </span>
              </button>

              {/* Account Link */}
              <Link
                href="/account"
                className="hidden sm:flex items-center text-warmbrown-800 hover:text-terracotta-600 p-2 transition-colors relative"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist Link with Badge */}
              <Link
                href="/wishlist"
                className="flex items-center text-warmbrown-800 hover:text-terracotta-600 p-2 transition-colors relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-jaipur-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button with Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1.5 bg-warmbrown-900 hover:bg-terracotta-600 text-cream-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-sm"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-ochre-300" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Below Logo */}
        <nav aria-label="Main Navigation" className="hidden lg:block border-t border-sandstone-200/80 bg-cream-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center space-x-6 xl:space-x-8 py-2.5 text-xs font-semibold uppercase tracking-wider text-warmbrown-800">
              <li>
                <Link href="/" className="hover:text-terracotta-600 py-1 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-terracotta-600 py-1 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/category/kilim-rugs" className="hover:text-terracotta-600 py-1 transition-colors">
                  Kilim Rugs
                </Link>
              </li>
              <li>
                <Link href="/category/kilim-runners" className="hover:text-terracotta-600 py-1 transition-colors">
                  Runners
                </Link>
              </li>
              <li>
                <Link href="/category/stair-runners" className="hover:text-terracotta-600 py-1 transition-colors">
                  Stair Runners
                </Link>
              </li>
              <li>
                <Link href="/category/pillow-covers" className="hover:text-terracotta-600 py-1 transition-colors">
                  Pillow Covers
                </Link>
              </li>
              <li>
                <Link href="/category/wool-rugs" className="hover:text-terracotta-600 py-1 transition-colors">
                  Wool Rugs
                </Link>
              </li>
              <li>
                <Link href="/category/jute-rugs" className="hover:text-terracotta-600 py-1 transition-colors">
                  Jute & Hemp
                </Link>
              </li>
              <li>
                <Link href="/category/yoga-mats" className="hover:text-terracotta-600 py-1 transition-colors">
                  Yoga Mats
                </Link>
              </li>
              <li>
                <Link href="/custom-rugs" className="text-terracotta-600 hover:text-terracotta-700 py-1 font-bold transition-colors">
                  Custom Rugs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta-600 py-1 transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Real-time Search Modal */}
      <LiveSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
