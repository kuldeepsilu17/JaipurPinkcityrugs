'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Truck, ExternalLink, Printer } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const { formatPrice } = useCurrency();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.orderStatus === filterStatus;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.lastName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
            Order Fulfillment & Shipping
          </h1>
          <p className="text-xs text-sandstone-600">
            Assign tracking numbers, update manufacturing stages, and print tax invoices.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-sandstone-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-sandstone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID or customer email..."
            className="w-full pl-9 pr-3 py-2 bg-sandstone-50 border border-sandstone-300 rounded-xl text-warmbrown-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sandstone-500 font-semibold">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-sandstone-50 border border-sandstone-300 rounded-xl px-3 py-2 font-semibold text-warmbrown-900"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Quality Checked">Quality Checked</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl border border-sandstone-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-sandstone-50 text-sandstone-700 font-bold uppercase tracking-wider border-b border-sandstone-200">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer / Destination</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Carrier & Tracking</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status Stage</th>
                <th className="p-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sandstone-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-sandstone-50/50">
                  <td className="p-3.5 font-mono font-bold text-warmbrown-900">
                    <Link href={`/track-order?orderId=${encodeURIComponent(order.id)}`} className="hover:text-terracotta-600 underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-warmbrown-900">{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-sandstone-500 text-[11px]">{order.customer.city}, {order.customer.country}</div>
                  </td>
                  <td className="p-3.5 text-sandstone-500">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-warmbrown-900">{order.carrier || 'DHL Express'}</div>
                    <div className="font-mono text-sandstone-500 text-[11px]">{order.trackingNumber || 'Pending'}</div>
                  </td>
                  <td className="p-3.5 font-bold text-warmbrown-900">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="p-3.5">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-sandstone-50 border border-sandstone-300 rounded-lg px-2 py-1 text-xs font-semibold text-warmbrown-900"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Quality Checked">Quality Checked</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      target="_blank"
                      className="inline-flex items-center space-x-1 text-terracotta-600 hover:underline font-bold"
                    >
                      <span>Invoice</span>
                      <ExternalLink className="w-3 h-3" />
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
