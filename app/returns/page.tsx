'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, ShieldCheck, Mail, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Customer Care' },
          { label: '30-Day Returns Policy' },
        ]}
      />

      <div className="border-b border-sandstone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Satisfaction Guarantee
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
          30-Day Hassle-Free Returns
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
          We want you to love your handmade Jaipur rug. If it doesn’t harmonize with your room, return it with ease.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-sandstone-700 leading-relaxed">
        {/* Core Guarantee */}
        <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">Return Window</h3>
          <p>
            You have <strong>30 days from the date of package delivery</strong> to inspect the rug in your home lighting and initiate a return or exchange.
          </p>
        </div>

        {/* Return Conditions */}
        <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">Return Eligibility</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Item must be unused, clean, and in original condition without pet hair, food spills, or outdoor wear.</li>
            <li>Original tags and export packaging should be retained where possible.</li>
            <li><strong>Custom Sizes:</strong> Bespoke custom-loomed rugs woven to individual client architectural dimensions are eligible for exchange or modification support.</li>
          </ul>
        </div>

        {/* Initiation Steps */}
        <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
          <h3 className="font-serif font-bold text-lg text-warmbrown-900">How to Initiate a Return</h3>
          <div className="space-y-2">
            <p>1. Email our concierge at <a href="mailto:concierge@jaipurpinkcityrugs.com" className="font-bold text-terracotta-600 underline">concierge@jaipurpinkcityrugs.com</a> with your Order ID (e.g. <code>JPR-2026-9841</code>).</p>
            <p>2. Our team will email a return authorization label and nearest return depot address in the USA, UK, or India.</p>
            <p>3. Once inspected at our return facility, your refund will be credited back to your original payment method within 3 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
