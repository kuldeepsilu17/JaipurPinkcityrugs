'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Ruler,
  Tag,
  Store,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Catalog', href: '/admin/products', icon: Package },
    { label: 'Order Dispatch', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Custom Rug Quotes', href: '/admin/custom-quotes', icon: Ruler },
    { label: 'Coupons & Promos', href: '/admin/coupons', icon: Tag },
  ];

  return (
    <div className="bg-sandstone-100 min-h-screen">
      {/* Top Admin Bar */}
      <header className="bg-warmbrown-950 text-cream-50 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-warmbrown-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/admin" className="font-serif text-lg font-bold uppercase tracking-wider text-ochre-300">
            JaipurPinkCityRugs Admin
          </Link>
          <span className="bg-terracotta-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Loom Command
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-sandstone-300 hover:text-cream-50 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>View Public Storefront →</span>
          </Link>
        </div>
      </header>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar Navigation (3 cols) */}
          <nav aria-label="Admin Navigation" className="lg:col-span-3 bg-white rounded-2xl border border-sandstone-200/90 shadow-subtle p-4 space-y-1 text-xs font-semibold self-start sticky top-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-terracotta-50 text-terracotta-700 font-bold border border-terracotta-200 shadow-sm'
                      : 'text-warmbrown-800 hover:bg-sandstone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta-600' : 'text-sandstone-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-sandstone-100 text-[11px] text-sandstone-500 space-y-1 px-3">
              <div className="flex items-center space-x-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Demo Mode Active</span>
              </div>
              <p>CRUD changes update dynamic store state in real-time.</p>
            </div>
          </nav>

          {/* Admin Main Stage (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
