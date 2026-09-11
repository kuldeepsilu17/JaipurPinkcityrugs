'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Globe, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Customer Care' },
          { label: 'Shipping & Delivery Policy' },
        ]}
      />

      <div className="border-b border-sandstone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Worldwide Express Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
          Shipping & International Delivery
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
          Direct tracked delivery from our Jaipur artisan atelier to your doorstep in 48+ countries.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-sandstone-700 leading-relaxed">
        {/* Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-2">
            <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider block">Express Air Courier</span>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900">DHL / FedEx Express</h3>
            <p className="text-xs text-sandstone-600">Estimated delivery: <strong>4 to 7 business days</strong> worldwide. Real-time GPS tracking and signature on delivery.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Free Shipping Perk</span>
            <h3 className="font-serif font-bold text-lg text-warmbrown-900">Free Worldwide Over $150</h3>
            <p className="text-xs text-sandstone-600">All orders exceeding $150 (₹12,000) automatically receive complimentary insured international express shipping.</p>
          </div>
        </div>

        {/* Dispatch Timelines */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">1. Processing & Loom Dispatch</h3>
          <p>
            <strong>In-Stock Products:</strong> All catalog rugs marked &quot;In Stock&quot; undergo our final herbal wash conditioning, edge inspection, and are dispatched within <strong>24 to 48 hours</strong> from our Jaipur export hub.
          </p>
          <p>
            <strong>Custom Woven Orders:</strong> Custom size orders and bespoke flatweaves take <strong>14 to 21 business days</strong> on the pit-loom before undergoing finishing and dispatch.
          </p>
        </div>

        {/* Customs & Duties */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">2. Customs, Import Taxes & Duties</h3>
          <p>
            For customers in the <strong>USA and Australia</strong>, handmade Indian textile goods under $800 / $1,000 AUD enter completely free of import duties under standard de minimis exemptions.
          </p>
          <p>
            For customers in the <strong>UK & European Union</strong>, local VAT/customs may be assessed upon arrival by your local postal/customs authority.
          </p>
        </div>

        {/* Export Packaging */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">3. Protective Export Packaging</h3>
          <p>
            Every rug is rolled around a heavy core tube, wrapped in breathable unbleached cotton casing, and sealed inside heavy-gauge, water-tight export sheeting to guarantee zero moisture damage during transit.
          </p>
        </div>
      </div>
    </div>
  );
}
