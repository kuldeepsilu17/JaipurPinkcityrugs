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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          {/* Mobile Header View (< lg) */}
          <div className="flex lg:hidden items-center justify-between gap-2">
            {/* Left: Brand Logo */}
            <Link href="/" className="flex flex-col min-w-0 pr-2">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-warmbrown-900 uppercase truncate">
                JaipurPinkCityRugs
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-sandstone-600 truncate">
                Jaipur • Handmade Flatweaves
              </span>
            </Link>

            {/* Right: Search, Wishlist, Cart, Menu Hamburger */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-warmbrown-800 hover:text-terracotta-600 rounded-full transition-colors touch-target"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-warmbrown-800 hover:text-terracotta-600 rounded-full transition-colors relative touch-target"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-jaipur-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-warmbrown-800 hover:text-terracotta-600 rounded-full transition-colors relative touch-target"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 text-warmbrown-900" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-terracotta-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-warmbrown-900 hover:text-terracotta-600 rounded-md transition-colors touch-target"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Desktop Header View (>= lg) */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            {/* Left: Store Currency & Bespoke */}
            <div className="flex items-center space-x-3 w-1/4">
              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-warmbrown-800 bg-sandstone-100/80 px-2.5 py-1 rounded-md border border-sandstone-200">
                <span className="font-bold text-terracotta-700">₹ INR</span>
                <span className="text-[10px] text-sandstone-500">• India</span>
              </span>

              <Link
                href="/custom-rugs"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-terracotta-600 hover:text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded border border-terracotta-200 transition-colors"
              >
                Bespoke Orders
              </Link>
            </div>

            {/* Center: Brand Identity */}
            <div className="w-2/4 text-center">
              <Link href="/" className="inline-block group">
                <span className="block font-serif text-3xl xl:text-4xl font-bold tracking-wider text-warmbrown-900 group-hover:text-terracotta-700 transition-colors uppercase">
                  JaipurPinkCityRugs
                </span>
                <span className="block text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-sandstone-700">
                  Handcrafted In Rajasthan • Est. Jaipur
                </span>
              </Link>
            </div>

            {/* Right: Search, Account, Wishlist, Cart */}
            <div className="flex items-center justify-end space-x-4 w-1/4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2 text-warmbrown-800 hover:text-terracotta-600 p-2 rounded-full transition-colors group"
                aria-label="Search Products"
              >
                <Search className="w-5 h-5 text-warmbrown-700 group-hover:text-terracotta-600 transition-colors" />
                <span className="text-xs text-sandstone-600 group-hover:text-terracotta-600 font-medium">
                  Search...
                </span>
              </button>

              <Link
                href="/account"
                className="flex items-center text-warmbrown-800 hover:text-terracotta-600 p-2 transition-colors relative"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5" />
              </Link>

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

              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1.5 bg-warmbrown-900 hover:bg-terracotta-600 text-cream-50 px-4 py-2 rounded-full transition-all shadow-sm"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4 text-ochre-300" />
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
