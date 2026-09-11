'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Order, OrderStatus } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const TIMELINE_STEPS: OrderStatus[] = [
  'Order Placed',
  'Processing',
  'Quality Checked',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

function TrackOrderContent() {
  const { getOrderByTrackingOrEmail } = useStore();
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();

  const urlOrderId = searchParams.get('orderId') || '';
  const urlEmail = searchParams.get('email') || '';

  const [orderIdInput, setOrderIdInput] = useState(urlOrderId);
  const [contactInput, setContactInput] = useState(urlEmail);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (urlOrderId) {
      const match = getOrderByTrackingOrEmail(urlOrderId, urlEmail);
      if (match) {
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [urlOrderId, urlEmail, getOrderByTrackingOrEmail]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    const result = getOrderByTrackingOrEmail(orderIdInput, contactInput);
    setSearchedOrder(result || null);
    setHasSearched(true);
  };

  const getStepIndex = (status: OrderStatus) => {
    return TIMELINE_STEPS.indexOf(status);
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Customer Care', href: '/faq' },
          { label: 'Track Order' },
        ]}
      />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Real-Time Shipment Dispatch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900">
          Track Your Handcrafted Order
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600">
          Enter your Order Number (e.g. <strong className="font-mono text-warmbrown-900">JPR-2026-9841</strong>) and email to track your artisan loom and international delivery status.
        </p>
      </div>

      {/* Search Lookup Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-300 shadow-luxury">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
              Order ID / Tracking # *
            </label>
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="e.g. JPR-2026-9841"
              className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 uppercase font-mono"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
              Email Address / Phone
            </label>
            <input
              type="text"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              placeholder="e.g. catherine.h@gmail.com"
              className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500"
            />
          </div>

          <div className="sm:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results View */}
      {hasSearched && (
        <>
          {searchedOrder ? (
            <div className="bg-white rounded-3xl border border-sandstone-200 shadow-luxury p-6 sm:p-10 space-y-8 animate-fade-in">
              {/* Order Status Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-sandstone-200 gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-base sm:text-lg font-bold text-warmbrown-900">
                      #{searchedOrder.id}
                    </span>
                    <span className="bg-terracotta-50 text-terracotta-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-terracotta-200 uppercase">
                      {searchedOrder.orderStatus}
                    </span>
                  </div>
                  <div className="text-xs text-sandstone-500 mt-1">
                    Carrier: <strong>{searchedOrder.carrier || 'DHL Express'}</strong> • Tracking: <span className="font-mono font-semibold text-warmbrown-900">{searchedOrder.trackingNumber || 'Pending'}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <div className="text-sandstone-500">Estimated Delivery:</div>
                  <div className="text-sm font-bold text-emerald-700 font-serif">
                    {searchedOrder.estimatedDeliveryDate}
                  </div>
                </div>
              </div>

              {/* Visual Stepper Timeline */}
              <div className="py-4">
                <div className="relative">
                  {/* Desktop Horizontal Bar */}
                  <div className="hidden sm:block absolute top-4 left-0 right-0 h-1 bg-sandstone-200 -translate-y-1/2 z-0" />
                  <div
                    className="hidden sm:block absolute top-4 left-0 h-1 bg-terracotta-600 -translate-y-1/2 z-0 transition-all duration-700"
                    style={{
                      width: `${(Math.max(0, currentStepIdx) / (TIMELINE_STEPS.length - 1)) * 100}%`,
                    }}
                  />

                  {/* Mobile Vertical Bar */}
                  <div className="sm:hidden absolute top-4 bottom-4 left-4 w-0.5 bg-sandstone-200 -translate-x-1/2 z-0" />

                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 relative z-10">
                    {TIMELINE_STEPS.map((step, idx) => {
                      const isCompleted = currentStepIdx >= idx;
                      const isCurrent = currentStepIdx === idx;
                      return (
                        <div key={step} className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                              isCompleted
                                ? 'bg-terracotta-600 text-white shadow-md'
                                : 'bg-sandstone-200 text-sandstone-600'
                            } ${isCurrent ? 'ring-4 ring-terracotta-200' : ''}`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-xs sm:text-[11px] font-semibold sm:mt-1.5 ${isCurrent ? 'text-terracotta-700 font-bold' : 'text-warmbrown-800'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Event Logs */}
              <div className="bg-sandstone-50 p-5 rounded-2xl border border-sandstone-200 space-y-3">
                <h4 className="font-serif font-bold text-sm text-warmbrown-900 uppercase tracking-wider">
                  Shipment Event History
                </h4>
                <div className="space-y-2 text-xs divide-y divide-sandstone-200">
                  {searchedOrder.trackingEvents.map((ev, idx) => (
                    <div key={idx} className="pt-2 flex flex-col sm:flex-row justify-between gap-1">
                      <div>
                        <span className="font-bold text-warmbrown-900">{ev.status}</span> — <span className="text-sandstone-700">{ev.description}</span>
                        <div className="text-[11px] text-sandstone-500">{ev.location}</div>
                      </div>
                      <div className="text-[11px] text-sandstone-400 shrink-0 font-mono">
                        {new Date(ev.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Package */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-sm text-warmbrown-900 uppercase tracking-wider">
                  Package Contents
                </h4>
                <div className="divide-y divide-sandstone-200 bg-white rounded-xl border border-sandstone-200 overflow-hidden">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-sandstone-100 shrink-0">
                          <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-warmbrown-900">{item.productName}</h5>
                          <div className="text-sandstone-500 text-[11px]">Size: {item.variantSize} • Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold text-warmbrown-900">{formatPrice(item.totalPrice)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-sandstone-200 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-sandstone-100 text-sandstone-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                Order not found
              </h3>
              <p className="text-xs text-sandstone-600 max-w-sm mx-auto">
                Please double-check your Order ID or email. Try entering <code className="font-bold text-warmbrown-900">JPR-2026-9841</code> to test the tracking simulation.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-sandstone-500">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
