'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Ruler,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { OrderStatus } from '@/types';

export default function AdminDashboardPage() {
  const { products, orders, customQuotes, updateOrderStatus, resetToDefaults } = useStore();
  const { formatPrice } = useCurrency();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.totalAmount : 0), 0);
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const pendingQuotes = customQuotes.filter((q) => q.status === 'New' || q.status === 'Reviewing');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
            Executive Loom Overview
          </h1>
          <p className="text-xs text-sandstone-600">
            Real-time analytics for JaipurPinkCityRugs production & dispatch operations.
          </p>
        </div>

        <button
          onClick={resetToDefaults}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-sandstone-300 hover:bg-sandstone-50 text-xs font-semibold text-warmbrown-800 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sandstone-500" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-sandstone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-sandstone-500 font-semibold uppercase tracking-wider">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-warmbrown-900">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> All-Time Verified
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sandstone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-sandstone-500 font-semibold uppercase tracking-wider">
            <span>Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-terracotta-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-warmbrown-900">
            {orders.length}
          </div>
          <div className="text-[11px] text-sandstone-500">
            {orders.filter((o) => o.orderStatus !== 'Delivered').length} in active pipeline
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sandstone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-sandstone-500 font-semibold uppercase tracking-wider">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-ochre-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-warmbrown-900">
            {products.length}
          </div>
          <div className="text-[11px] text-sandstone-500">
            Across 10 categories
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sandstone-200 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-xs text-sandstone-500 font-semibold uppercase tracking-wider">
            <span>Custom Quotes</span>
            <Ruler className="w-4 h-4 text-jaipur-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-warmbrown-900">
            {customQuotes.length}
          </div>
          <div className="text-[11px] text-terracotta-700 font-semibold">
            {pendingQuotes.length} pending review
          </div>
        </div>
      </div>

      {/* Low Stock Alert if any */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Low Inventory Warning:</strong> {lowStockProducts.length} items have 5 or fewer rugs in stock.
            </span>
          </div>
          <Link href="/admin/products" className="font-bold underline text-amber-900 hover:text-amber-950">
            Manage Stock →
          </Link>
        </div>
      )}

      {/* Recent Orders Management Table */}
      <div className="bg-white rounded-2xl border border-sandstone-200/90 shadow-subtle overflow-hidden space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 border-b border-sandstone-100">
          <div>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900">
              Recent Order Shipments
            </h3>
            <p className="text-xs text-sandstone-500">Manage order fulfillment status & carrier tracking.</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-terracotta-600 hover:underline font-bold"
          >
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-sandstone-50 text-sandstone-700 font-bold uppercase tracking-wider">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sandstone-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-sandstone-50/50">
                  <td className="p-3 font-mono font-bold text-warmbrown-900">
                    {order.id}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-warmbrown-900">{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-[11px] text-sandstone-500">{order.customer.country}</div>
                  </td>
                  <td className="p-3 text-sandstone-700">
                    {order.items.length} {order.items.length === 1 ? 'rug' : 'rugs'}
                  </td>
                  <td className="p-3 font-bold text-warmbrown-900">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-sandstone-50 border border-sandstone-300 rounded px-2 py-1 text-xs font-semibold text-warmbrown-900"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Quality Checked">Quality Checked</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="text-terracotta-600 hover:underline font-semibold"
                    >
                      Invoice
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
