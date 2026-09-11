'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Check, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Coupon } from '@/types';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCouponActive, deleteCoupon } = useStore();

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minSpend, setMinSpend] = useState(50);
  const [desc, setDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minSpend) || undefined,
      expiryDate: '2026-12-31',
      description: desc || `${discountValue}% off on order`,
      isActive: true,
    });

    setCode('');
    setDesc('');
    toast.success(`Coupon ${code.toUpperCase()} created!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
          Coupons & Promotional Codes
        </h1>
        <p className="text-xs text-sandstone-600">
          Create marketing discounts, seasonal sales, and free shipping vouchers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Create Coupon Form */}
        <div className="bg-white p-6 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4 text-xs">
          <h3 className="font-serif font-bold text-base text-warmbrown-900 pb-2 border-b border-sandstone-200">
            Create New Coupon
          </h3>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block font-bold uppercase text-warmbrown-800 mb-1">Coupon Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. FESTIVE25"
                className="w-full p-2.5 bg-sandstone-50 border border-sandstone-300 rounded-lg uppercase font-mono font-bold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-warmbrown-800 mb-1">Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full p-2.5 bg-sandstone-50 border border-sandstone-300 rounded-lg"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-warmbrown-800 mb-1">Value</label>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full p-2.5 bg-sandstone-50 border border-sandstone-300 rounded-lg font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-warmbrown-800 mb-1">Min Order Amount ($)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                className="w-full p-2.5 bg-sandstone-50 border border-sandstone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-warmbrown-800 mb-1">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g. 25% discount for Diwali"
                className="w-full p-2.5 bg-sandstone-50 border border-sandstone-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-3 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Create Coupon
            </button>
          </form>
        </div>

        {/* Coupons List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sandstone-200 shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-sandstone-200 bg-sandstone-50 font-serif font-bold text-warmbrown-900 text-sm">
            Active Store Promo Codes
          </div>

          <div className="divide-y divide-sandstone-100">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-4 flex items-center justify-between text-xs hover:bg-sandstone-50/50">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-sm text-warmbrown-900 bg-sandstone-100 px-2 py-0.5 rounded border border-sandstone-300">
                      {coupon.code}
                    </span>
                    <span className="font-bold text-terracotta-700">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`}
                    </span>
                  </div>
                  <p className="text-sandstone-600 text-[11px] mt-1">{coupon.description}</p>
                  <div className="text-sandstone-400 text-[10px] mt-0.5">
                    Used {coupon.usageCount} times • Min Spend: ${coupon.minOrderAmount || 0}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCouponActive(coupon.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-sandstone-200 text-sandstone-600'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => deleteCoupon(coupon.id)}
                    className="p-1.5 text-sandstone-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
