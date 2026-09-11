'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight, Phone, MessageCircle, Heart, User, ShoppingBag, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';
import { CurrencyCode } from '@/types';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const { currency, setCurrency } = useCurrency();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-cream-50 h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-up">
        {/* Drawer Header */}
        <div className="p-4 border-b border-sandstone-200 flex items-center justify-between bg-cream-100">
          <div>
            <span className="font-serif font-bold text-lg text-warmbrown-900 uppercase">
              JaipurPinkCityRugs
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-sandstone-700">
              Artisan Indian Flatweaves
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-warmbrown-700 hover:text-terracotta-600 rounded-full"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Quick Actions */}
        <div className="px-4 py-3 bg-sandstone-100/50 border-b border-sandstone-200 flex items-center justify-between text-xs">
          <span className="text-warmbrown-700 font-medium">Currency:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="bg-cream-50 text-xs font-semibold text-warmbrown-800 border border-sandstone-300 rounded px-2 py-1"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>
                {c} ({CURRENCIES[c as CurrencyCode].symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Main Links List */}
        <div className="flex-1 py-3 px-2 space-y-1">
          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100"
          >
            <span>Explore All Rugs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="/custom-rugs"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-ochre-700 bg-ochre-50 hover:bg-ochre-100"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-ochre-600" />
              <span>Custom Sized Rugs</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-sandstone-500">
            Categories
          </div>

          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100 transition-colors"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-sandstone-500">{cat.itemCount}</span>
            </Link>
          ))}

          <div className="pt-3 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-sandstone-500">
            Heritage & Customer Care
          </div>

          <Link
            href="/about"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Our Story & Master Artisans
          </Link>
          <Link
            href="/track-order"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Track Order Status
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Contact & Jaipur Showroom
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Artisan Rug Journal
          </Link>
        </div>

        {/* Footer Contact */}
        <div className="p-4 border-t border-sandstone-200 bg-sandstone-50 space-y-2">
          <a
            href="https://wa.me/919829012345?text=Hello%20JaipurPinkCityRugs%2C%20I%20have%20an%20inquiry%20about%20your%20handmade%20rugs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-center text-[10px] text-sandstone-600">
            Jaipur, Rajasthan, India • Worldwide Shipping
          </p>
        </div>
      </div>
    </div>
  );
};
