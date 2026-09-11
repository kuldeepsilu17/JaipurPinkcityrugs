'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Truck,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function AccountPage() {
  const { orders } = useStore();
  const { wishlistCount } = useWishlist();
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Demo user data
  const user = {
    name: 'Catherine Holloway',
    email: 'catherine.h@gmail.com',
    phone: '+1 (415) 555-0192',
    memberSince: 'January 2026',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Customer Area' },
          { label: 'My Account' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sandstone-200 pb-4 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Collector Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-sandstone-600 mt-1">
            Member since {user.memberSince} • {user.email}
          </p>
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="inline-flex items-center space-x-1.5 text-xs text-sandstone-500 hover:text-red-600 font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
        </button>
      </div>

      {/* Account Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav (3 cols) */}
        <div className="lg:col-span-3 bg-white p-4 sm:p-5 rounded-2xl border border-sandstone-200 shadow-subtle space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders' ? 'bg-terracotta-50 text-terracotta-700' : 'text-warmbrown-800 hover:bg-sandstone-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Package className="w-4 h-4 text-terracotta-600" />
              <span>My Orders</span>
            </div>
            <span className="text-[11px] bg-sandstone-200 text-warmbrown-900 px-2 py-0.5 rounded-full">{orders.length}</span>
          </button>

          <Link
            href="/wishlist"
            className="w-full flex items-center justify-between p-3 rounded-xl font-bold text-warmbrown-800 hover:bg-sandstone-50 transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <Heart className="w-4 h-4 text-jaipur-500" />
              <span>Saved Wishlist</span>
            </div>
            <span className="text-[11px] bg-sandstone-200 text-warmbrown-900 px-2 py-0.5 rounded-full">{wishlistCount}</span>
          </Link>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${
              activeTab === 'addresses' ? 'bg-terracotta-50 text-terracotta-700' : 'text-warmbrown-800 hover:bg-sandstone-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-ochre-600" />
              <span>Saved Addresses</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all ${
              activeTab === 'profile' ? 'bg-terracotta-50 text-terracotta-700' : 'text-warmbrown-800 hover:bg-sandstone-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Settings className="w-4 h-4 text-sandstone-600" />
              <span>Account Settings</span>
            </div>
          </button>
        </div>

        {/* Tab Content (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif font-bold text-xl text-warmbrown-900">
                Order History & Invoices
              </h3>

              {orders.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-sandstone-200 text-center text-xs text-sandstone-500">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-white border border-sandstone-200/90 shadow-subtle space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-sandstone-100 gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm font-bold text-warmbrown-900">
                            #{order.id}
                          </span>
                          <span className="bg-terracotta-50 text-terracotta-700 text-xs font-bold px-2 py-0.5 rounded-full border border-terracotta-200">
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-sandstone-500 mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/track-order?orderId=${encodeURIComponent(order.id)}`}
                          className="px-3 py-1.5 rounded-lg border border-sandstone-300 hover:bg-sandstone-50 text-xs font-semibold text-warmbrown-800 flex items-center space-x-1"
                        >
                          <Truck className="w-3.5 h-3.5 text-terracotta-600" />
                          <span>Track</span>
                        </Link>
                        <Link
                          href={`/order-confirmation/${order.id}`}
                          className="px-3 py-1.5 rounded-lg bg-warmbrown-900 hover:bg-terracotta-600 text-white text-xs font-semibold transition-colors"
                        >
                          View Invoice
                        </Link>
                      </div>
                    </div>

                    {/* Order items summary */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-sandstone-100 shrink-0">
                              <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="font-semibold text-warmbrown-900">{item.productName}</div>
                              <div className="text-sandstone-500 text-[11px]">{item.variantSize} • Qty: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="font-bold text-warmbrown-900">{formatPrice(item.totalPrice)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-sandstone-100 flex justify-between text-xs">
                      <span className="text-sandstone-600">Total Paid ({order.paymentMethod.toUpperCase()})</span>
                      <span className="font-bold text-sm text-terracotta-700">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4 animate-fade-in">
              <h3 className="font-serif font-bold text-xl text-warmbrown-900">
                Saved Shipping Address
              </h3>
              <div className="p-4 rounded-xl bg-sandstone-50 border border-sandstone-200 text-xs text-sandstone-700 space-y-1">
                <div className="font-bold text-warmbrown-900">{user.name}</div>
                <div>742 Evergreen Terrace, Apt 4B</div>
                <div>Seattle, WA 98101, United States</div>
                <div>Phone: {user.phone}</div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4 animate-fade-in">
              <h3 className="font-serif font-bold text-xl text-warmbrown-900">
                Personal Profile Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-sandstone-500 mb-1">Full Name</label>
                  <input type="text" value={user.name} readOnly className="w-full p-2.5 bg-sandstone-50 rounded-lg border border-sandstone-300 font-semibold" />
                </div>
                <div>
                  <label className="block font-bold uppercase text-sandstone-500 mb-1">Email Address</label>
                  <input type="email" value={user.email} readOnly className="w-full p-2.5 bg-sandstone-50 rounded-lg border border-sandstone-300 font-semibold" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
