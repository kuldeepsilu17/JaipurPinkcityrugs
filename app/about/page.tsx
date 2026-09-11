'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, HeartHandshake, Leaf, ArrowRight, Ruler } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-warmbrown-950 text-cream-50">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85"
            alt="Jaipur master weavers"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950 via-warmbrown-950/60 to-warmbrown-950/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-100/10 backdrop-blur-md border border-cream-100/20 text-xs font-semibold uppercase tracking-widest text-ochre-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Heritage of Rajasthan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50">
            Made in Jaipur. Woven with Tradition.
          </h1>

          <p className="text-sm sm:text-base font-light text-sandstone-200 max-w-2xl mx-auto leading-relaxed">
            Every JaipurPinkCityRugs piece carries the soul and generational mastery of Indian craftsmanship, thoughtfully woven for modern living spaces.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'About Us' },
            { label: 'Our Heritage Story' },
          ]}
        />

        {/* Chapter 1: The Loom & The City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-sandstone-700 leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 block">
              Chapter One
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
              The Pink City Heritage
            </h2>
            <p>
              Founded under the patronage of Maharaja Sawai Jai Singh II in the 18th century, Jaipur became the epicenter of India’s royal carpet-weaving ateliers. Master weavers were granted land, water, and royal commissions to translate architectural geometry into woven floor tapestries.
            </p>
            <p>
              At <strong>JaipurPinkCityRugs</strong>, we continue this uninterrupted lineage. We work directly with third- and fourth-generation weaving families in the artisan villages encircling Jaipur, eliminating middle-tier brokers so our craftsmen receive dignified, above-market wages.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-sandstone-200">
            <Image
              src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
              alt="Jaipur Handloom Weaving"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Chapter 2: The Raw Materials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-sandstone-200 order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1000&q=80"
              alt="Natural Dye Cauldrons"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-sandstone-700 leading-relaxed order-1 md:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 block">
              Chapter Two
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
              Pure Natural Alchemy
            </h2>
            <p>
              True luxury begins with the raw fiber. We use 100% natural, biodegradable highland sheep wool from Bikaner and New Zealand, known for long staple fibers and exceptional tensile resilience.
            </p>
            <p>
              Our yarns are hand-spun on wooden charkhas and colored in organic botanical dye baths — madder roots for glowing terracottas, pomegranate rinds for saffron ochres, and fermented indigo leaves for midnight blues.
            </p>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="bg-sandstone-100/70 rounded-3xl p-8 sm:p-12 border border-sandstone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-white text-terracotta-600 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-warmbrown-900">Zero Child Labor</h4>
            <p className="text-xs text-sandstone-600">Ethically certified weaving collectives with verified adult artisans.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-white text-ochre-600 flex items-center justify-center mx-auto shadow-sm">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-warmbrown-900">100% Sustainable</h4>
            <p className="text-xs text-sandstone-600">Zero synthetic microplastics. Fully biodegradable natural fibers.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-warmbrown-900">Direct Fair Trade</h4>
            <p className="text-xs text-sandstone-600">Empowering 200+ Rajasthani rural weaver households with healthcare & education.</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
            Bring Indian Craftsmanship Home
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Explore Collections
            </Link>
            <Link
              href="/custom-rugs"
              className="border-2 border-sandstone-300 hover:border-warmbrown-900 text-warmbrown-900 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Request Custom Size
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
