'use client';

import React from 'react';
import Image from 'next/image';
import { Ruler, Sparkles, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CustomRugWizard } from '@/components/custom-rugs/CustomRugWizard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function CustomRugsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative min-h-[350px] sm:min-h-[420px] flex items-center justify-center overflow-hidden bg-sandstone-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85"
            alt="Custom Rug Pit Loom in Jaipur"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950 via-warmbrown-900/60 to-warmbrown-950/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-cream-50 space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-100/10 backdrop-blur-md border border-cream-100/20 text-xs font-semibold uppercase tracking-[0.2em] text-ochre-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Handwoven Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50">
            Custom Rugs Made for Your Space
          </h1>

          <p className="text-sm sm:text-base font-light text-sandstone-200 max-w-2xl mx-auto leading-relaxed">
            Collaborate directly with our master loom weavers in Jaipur. Choose your custom dimensions, natural fibers, vegetable dye palette, and geometric motifs.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: 'Custom Rugs Studio' },
          ]}
        />

        {/* 4-Step Loom Process Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-sandstone-200 shadow-subtle space-y-1.5">
            <span className="w-7 h-7 rounded-full bg-terracotta-100 text-terracotta-700 font-bold text-xs flex items-center justify-center mx-auto">1</span>
            <h4 className="font-serif font-bold text-sm text-warmbrown-900">Configure Specs</h4>
            <p className="text-[11px] text-sandstone-600">Enter your dimensions, shape & style preferences.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-sandstone-200 shadow-subtle space-y-1.5">
            <span className="w-7 h-7 rounded-full bg-terracotta-100 text-terracotta-700 font-bold text-xs flex items-center justify-center mx-auto">2</span>
            <h4 className="font-serif font-bold text-sm text-warmbrown-900">CAD & Swatches</h4>
            <p className="text-[11px] text-sandstone-600">Receive digital room layout and dye color match.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-sandstone-200 shadow-subtle space-y-1.5">
            <span className="w-7 h-7 rounded-full bg-terracotta-100 text-terracotta-700 font-bold text-xs flex items-center justify-center mx-auto">3</span>
            <h4 className="font-serif font-bold text-sm text-warmbrown-900">Pit-Loom Weave</h4>
            <p className="text-[11px] text-sandstone-600">Master weavers hand-craft your bespoke piece.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-sandstone-200 shadow-subtle space-y-1.5">
            <span className="w-7 h-7 rounded-full bg-terracotta-100 text-terracotta-700 font-bold text-xs flex items-center justify-center mx-auto">4</span>
            <h4 className="font-serif font-bold text-sm text-warmbrown-900">Express Delivery</h4>
            <p className="text-[11px] text-sandstone-600">Quality checked, washed, and DHL air freighted.</p>
          </div>
        </div>

        {/* The Wizard Component */}
        <CustomRugWizard />

        {/* Custom Order FAQ */}
        <div className="bg-white rounded-2xl border border-sandstone-200 p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-2xl font-bold text-warmbrown-900 mt-1">
              Custom Order Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-sandstone-700">
            <div className="space-y-1.5 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200">
              <strong className="text-warmbrown-900 text-sm block">How long does a custom rug take to weave?</strong>
              <p>Standard custom flatweave kilims take <strong>14 to 21 days</strong> on the loom. Hand-knotted high-pile rugs require 4 to 8 weeks depending on knot density.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200">
              <strong className="text-warmbrown-900 text-sm block">Can I send a custom photo or fabric swatch?</strong>
              <p>Yes! You can share any interior design moodboard, paint swatch code, or wallpaper reference directly with us on WhatsApp or email.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200">
              <strong className="text-warmbrown-900 text-sm block">Is there a minimum or maximum size?</strong>
              <p>We can weave from small 2x3 ft entry mats up to continuous 40 ft stair runners and oversized 14x20 ft palace centerpieces.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200">
              <strong className="text-warmbrown-900 text-sm block">What is the payment procedure for bespoke rugs?</strong>
              <p>We require a 50% deposit to cast the dyed yarn lot and reserve loom space, with the balance due upon photographic completion approval prior to dispatch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
