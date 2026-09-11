'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    toast.success('Welcome to the JaipurPinkCityRugs Family!', {
      description: 'Use coupon code WELCOME10 at checkout for 10% off your first order.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-warmbrown-900 text-cream-100 border-t border-warmbrown-800 transition-all">
      {/* Brand Value Pillars Banner */}
      <div className="border-b border-warmbrown-800 py-10 bg-warmbrown-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-terracotta-900/60 text-terracotta-400 border border-terracotta-700/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-cream-50">100% Handcrafted</h4>
                <p className="text-xs text-sandstone-300">Woven on pit looms in Jaipur</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-ochre-900/60 text-ochre-400 border border-ochre-700/50">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-cream-50">Worldwide Express</h4>
                <p className="text-xs text-sandstone-300">Doorstep DHL delivery in 4-7 days</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-jaipur-900/60 text-jaipur-400 border border-jaipur-700/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-cream-50">Ethical Fair Trade</h4>
                <p className="text-xs text-sandstone-300">Supporting Rajasthan weaver families</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="p-2.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-cream-50">30-Day Easy Returns</h4>
                <p className="text-xs text-sandstone-300">Hassle-free international returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-cream-50 uppercase">
              JaipurPinkCityRugs
            </span>
            <p className="text-xs text-sandstone-300 leading-relaxed max-w-sm">
              Authentic Indian handmade rugs, tribal kilims, and heirloom textiles woven with generational mastery in Jaipur, Rajasthan.
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <h4 className="font-serif font-semibold text-sm text-cream-100 mb-1">
                Receive 10% Off Your First Order
              </h4>
              <p className="text-xs text-sandstone-300 mb-3">
                Join our artisan journal for collector previews and secret seasonal discounts.
              </p>

              {isSubscribed ? (
                <div className="p-3 bg-terracotta-900/50 border border-terracotta-600/60 rounded-lg text-xs text-cream-100 flex items-center justify-between">
                  <span>🎉 Use code <strong className="text-ochre-300 font-mono">WELCOME10</strong> at checkout!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="bg-warmbrown-800/80 border border-warmbrown-700 text-xs text-cream-100 px-3.5 py-2.5 rounded-l-md focus:outline-none focus:border-terracotta-500 w-full placeholder-sandstone-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-terracotta-600 hover:bg-terracotta-500 text-white px-4 py-2.5 rounded-r-md text-xs font-semibold tracking-wider transition-colors shrink-0 flex items-center space-x-1"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Shop Catalog */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider text-cream-50 uppercase">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-sandstone-300">
              <li><Link href="/shop" className="hover:text-ochre-300 transition-colors">All Handcrafted Rugs</Link></li>
              <li><Link href="/category/kilim-rugs" className="hover:text-ochre-300 transition-colors">Kilim Flatweaves</Link></li>
              <li><Link href="/category/kilim-runners" className="hover:text-ochre-300 transition-colors">Hallway & Kitchen Runners</Link></li>
              <li><Link href="/category/stair-runners" className="hover:text-ochre-300 transition-colors">Stair Runners</Link></li>
              <li><Link href="/category/pillow-covers" className="hover:text-ochre-300 transition-colors">Kilim Pillow Covers</Link></li>
              <li><Link href="/category/wool-rugs" className="hover:text-ochre-300 transition-colors">Hand-Knotted Wool Rugs</Link></li>
              <li><Link href="/category/jute-rugs" className="hover:text-ochre-300 transition-colors">Organic Jute & Hemp</Link></li>
              <li><Link href="/category/yoga-mats" className="hover:text-ochre-300 transition-colors">Herbal Dyed Yoga Mats</Link></li>
              <li><Link href="/custom-rugs" className="text-ochre-300 font-semibold hover:underline">Custom Sized Rugs</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider text-cream-50 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-sandstone-300">
              <li><Link href="/track-order" className="hover:text-ochre-300 transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-ochre-300 transition-colors">Shipping & Worldwide Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-ochre-300 transition-colors">30-Day Return Policy</Link></li>
              <li><Link href="/faq" className="hover:text-ochre-300 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-ochre-300 transition-colors">Contact Our Studio</Link></li>
              <li><Link href="/blog" className="hover:text-ochre-300 transition-colors">Rug Care & Sizing Guide</Link></li>
              <li><Link href="/compare" className="hover:text-ochre-300 transition-colors">Rug Comparison Tool</Link></li>
            </ul>
          </div>

          {/* Col 4: Studio & Admin */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider text-cream-50 uppercase">
              Artisan Studio
            </h4>
            <ul className="space-y-2 text-xs text-sandstone-300">
              <li><Link href="/about" className="hover:text-ochre-300 transition-colors">The Jaipur Heritage Story</Link></li>
              <li><Link href="/account" className="hover:text-ochre-300 transition-colors">My Customer Account</Link></li>
              <li><Link href="/wishlist" className="hover:text-ochre-300 transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-ochre-300 transition-colors">Shopping Bag</Link></li>
              <li>
                <a
                  href="https://wa.me/919829012345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 inline" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-block text-[11px] text-ochre-400/80 hover:text-ochre-300 bg-warmbrown-800/80 px-2 py-1 rounded border border-warmbrown-700 transition-colors"
                >
                  Admin Management Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright, Policies & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-warmbrown-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sandstone-400">
          <div className="flex items-center space-x-2">
            <span>© 2026 JaipurPinkCityRugs. All rights reserved. Handcrafted in Rajasthan, India.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sandstone-400">
            <Link href="/shipping" className="hover:text-cream-100">Shipping Policy</Link>
            <span>•</span>
            <Link href="/returns" className="hover:text-cream-100">Return Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-cream-100">Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
