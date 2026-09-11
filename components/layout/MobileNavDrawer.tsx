'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ChevronRight,
  Sparkles,
  Flame,
  Clock,
  MessageCircle,
  Home,
  ShoppingBag,
  Info,
  Phone,
  Layers,
  Heart,
  User,
} from 'lucide-react';
import { useCurrency, CURRENCIES } from '@/context/CurrencyContext';
import { CurrencyCode } from '@/types';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const { currency, setCurrency } = useCurrency();

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const NAV_ITEMS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop All', href: '/shop', icon: ShoppingBag, badge: 'Popular' },
    { label: 'Rugs (Kilims & Wool)', href: '/category/kilim-rugs' },
    { label: 'Runners (Hallways & Kitchen)', href: '/category/kilim-runners' },
    { label: 'Pillow Covers', href: '/category/pillow-covers' },
    { label: 'Stair Runners', href: '/category/stair-runners' },
    { label: 'Yoga Mats', href: '/category/yoga-mats' },
    { label: 'Jute & Hemp', href: '/category/jute-rugs' },
    { label: 'New Arrivals', href: '/shop?sort=newest', icon: Clock, badge: 'New' },
    { label: 'Best Sellers', href: '/shop?sort=popular', icon: Flame, badge: 'Top' },
    { label: 'Custom Rugs', href: '/custom-rugs', icon: Sparkles, highlight: true },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-900/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-cream-50 h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-right">
        {/* Drawer Header */}
        <div className="p-4 border-b border-sandstone-200 flex items-center justify-between bg-cream-100">
          <div>
            <span className="font-serif font-bold text-lg text-warmbrown-900 uppercase tracking-wide">
              JaipurPinkCityRugs
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-sandstone-700">
              Artisan Flatweaves & Décor
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-warmbrown-700 hover:text-terracotta-600 rounded-full hover:bg-sandstone-200/50 transition-colors touch-target"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Account Bar */}
        <div className="px-4 py-2.5 bg-sandstone-100/70 border-b border-sandstone-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-warmbrown-800 font-medium">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-cream-50 text-xs font-semibold text-warmbrown-800 border border-sandstone-300 rounded px-2 py-1 cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c}>
                  {c} ({CURRENCIES[c as CurrencyCode].symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 text-warmbrown-700">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="hover:text-terracotta-600 flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="text-[11px]">Wishlist</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="hover:text-terracotta-600 flex items-center space-x-1"
            >
              <User className="w-3.5 h-3.5" />
              <span className="text-[11px]">Account</span>
            </Link>
          </div>
        </div>

        {/* Main Links List */}
        <div className="flex-1 py-3 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  item.highlight
                    ? 'bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100 font-bold border border-terracotta-200/60'
                    : 'text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {Icon && <Icon className={`w-4 h-4 ${item.highlight ? 'text-terracotta-600' : 'text-sandstone-500'}`} />}
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-terracotta-600 text-white uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-sandstone-400" />
                </div>
              </Link>
            );
          })}

          <div className="pt-2 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-sandstone-500">
            Customer Care & Tracking
          </div>

          <Link
            href="/track-order"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Track Order Status
          </Link>
          <Link
            href="/shipping"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Worldwide Shipping & Customs
          </Link>
          <Link
            href="/returns"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            30-Day Returns Policy
          </Link>
          <Link
            href="/faq"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Frequently Asked Questions
          </Link>
          <Link
            href="/blog"
            onClick={onClose}
            className="block px-3 py-2 rounded-md text-xs font-medium text-warmbrown-800 hover:text-terracotta-600 hover:bg-sandstone-100"
          >
            Artisan Rug Journal
          </Link>
        </div>

        {/* Footer WhatsApp Button */}
        <div className="p-4 border-t border-sandstone-200 bg-sandstone-50 space-y-2 pb-safe">
          <a
            href="https://wa.me/919829012345?text=Hello%20JaipurPinkCityRugs%2C%20I%20have%20an%20inquiry%20about%20your%20handmade%20rugs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors touch-target"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-center text-[10px] text-sandstone-600">
            Jaipur, Rajasthan, India • Direct Workshop Concierge
          </p>
        </div>
      </div>
    </div>
  );
};
