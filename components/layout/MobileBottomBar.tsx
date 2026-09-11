'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Don't show bottom bar inside admin portal or checkout to avoid distraction
  if (pathname.startsWith('/admin') || pathname === '/checkout') {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-cream-50/95 backdrop-blur-md border-t border-sandstone-200 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] px-3 shadow-lg"
    >
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-w-[50px] py-1 text-[10px] font-medium transition-colors ${
            isActive('/') ? 'text-terracotta-600 font-bold' : 'text-warmbrown-700 hover:text-terracotta-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center min-w-[50px] py-1 text-[10px] font-medium transition-colors ${
            isActive('/shop') ? 'text-terracotta-600 font-bold' : 'text-warmbrown-700 hover:text-terracotta-600'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Shop</span>
        </Link>

        <Link
          href="/custom-rugs"
          className={`flex flex-col items-center justify-center min-w-[50px] py-1 text-[10px] font-medium transition-colors ${
            isActive('/custom-rugs') ? 'text-terracotta-600 font-bold' : 'text-warmbrown-700 hover:text-terracotta-600'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-ochre-500" />
          <span>Custom</span>
        </Link>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center min-w-[50px] py-1 text-[10px] font-medium transition-colors relative ${
            isActive('/wishlist') ? 'text-terracotta-600 font-bold' : 'text-warmbrown-700 hover:text-terracotta-600'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-jaipur-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center min-w-[50px] py-1 text-[10px] font-medium text-warmbrown-700 hover:text-terracotta-600 relative"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-terracotta-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
};
