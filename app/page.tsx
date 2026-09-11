'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  CheckCircle2,
  Ruler,
  Star,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Layers,
  Leaf,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CATEGORIES, STYLES } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const { products, reviews } = useStore();
  const { formatPrice } = useCurrency();

  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState<'all' | 'rugs' | 'runners' | 'pillows' | 'decor'>('all');

  const bestSellers = products.filter((p) => p.bestSeller || p.rating >= 4.9).slice(0, 8);

  const newArrivals = products.filter((p) => {
    if (activeNewArrivalTab === 'rugs') return p.category === 'kilim-rugs' || p.category === 'wool-rugs';
    if (activeNewArrivalTab === 'runners') return p.category === 'kilim-runners' || p.category === 'stair-runners';
    if (activeNewArrivalTab === 'pillows') return p.category === 'pillow-covers';
    if (activeNewArrivalTab === 'decor') return p.category === 'cotton-home-decor' || p.category === 'yoga-mats';
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-sandstone-900">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=2000&q=85"
            alt="Handcrafted Jaipur Kilim Rug Loom"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950 via-warmbrown-900/60 to-warmbrown-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-cream-50 space-y-6 animate-fade-in">
          {/* Heritage Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-100/10 backdrop-blur-md border border-cream-100/20 text-xs font-semibold uppercase tracking-[0.2em] text-ochre-300">
            <Sparkles className="w-3.5 h-3.5 text-ochre-400" />
            <span>Master Pit-Loom Weavers • Rajasthan, India</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.1] max-w-4xl mx-auto">
            Handcrafted Rugs from Jaipur
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl font-light text-sandstone-200 max-w-2xl mx-auto leading-relaxed">
            Timeless Indian craftsmanship, thoughtfully woven for modern homes. Woven with 100% natural highland wool, organic jute, and botanical vegetable dyes.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-terracotta-600 hover:bg-terracotta-500 text-white px-8 py-4 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-terracotta-600/30 flex items-center justify-center space-x-2"
            >
              <span>Shop All Rugs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/custom-rugs"
              className="w-full sm:w-auto bg-cream-50/10 hover:bg-cream-50/20 backdrop-blur-md text-cream-50 border border-cream-100/30 px-8 py-4 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
            >
              <span>Custom Size Builder</span>
              <Ruler className="w-4 h-4 text-ochre-300" />
            </Link>
          </div>

          {/* Value Chips */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium tracking-wider text-sandstone-300 uppercase">
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-ochre-400 mr-2" /> Handwoven in Jaipur</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-ochre-400 mr-2" /> 100% Organic Fibers</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-ochre-400 mr-2" /> Worldwide Express Delivery</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SHOP BY CATEGORY                                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Artisan Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-2">
            Each collection is hand-loomed using centuries-old techniques native to Rajasthan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-subtle border border-sandstone-200/80 hover:shadow-luxury-hover transition-all duration-500"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950/90 via-warmbrown-950/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 text-cream-50 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ochre-300">
                  {category.itemCount} Designs
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg group-hover:text-ochre-300 transition-colors leading-snug">
                  {category.name}
                </h3>
                <span className="inline-flex items-center text-[11px] text-sandstone-300 font-medium mt-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BEST SELLERS                                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              Collector Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
              Our most-loved handwoven kilims, runners, and plush wool rugs.
            </p>
          </div>

          <Link
            href="/shop?sort=popular"
            className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-terracotta-600 hover:text-terracotta-700 py-1"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED EDITORIAL SPOTLIGHT: THE KILIM COLLECTION                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-warmbrown-900 text-cream-50 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left: Editorial Copy */}
            <div className="p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-ochre-300">
                <Sparkles className="w-4 h-4 text-ochre-400" />
                <span>Signature Heritage Series</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-cream-50">
                The Kilim Collection
              </h2>

              <p className="text-sm sm:text-base font-light text-sandstone-200 leading-relaxed">
                &quot;Traditional patterns. Modern spaces.&quot; Reversible flatweaves featuring organic vegetable dyes, geometric tribal diamond medallions, and resilient hand-spun wool that lasts for generations.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/category/kilim-rugs"
                  className="bg-terracotta-600 hover:bg-terracotta-500 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2"
                >
                  <span>Explore Kilim Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/category/kilim-runners"
                  className="bg-cream-100/10 hover:bg-cream-100/20 text-cream-50 border border-cream-100/30 px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest transition-colors"
                >
                  <span>View Kilim Runners</span>
                </Link>
              </div>
            </div>

            {/* Right: Rich Image */}
            <div className="relative h-80 sm:h-96 lg:h-full min-h-[420px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Jaipur Kilim Tapestry Rug"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-warmbrown-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW ARRIVALS WITH CATEGORY TABS                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Fresh Off The Looms
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
            Recently completed one-of-a-kind flatweaves and artisanal home accessories.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Designs' },
            { id: 'rugs', label: 'Rugs' },
            { id: 'runners', label: 'Runners' },
            { id: 'pillows', label: 'Pillow Covers' },
            { id: 'decor', label: 'Home Décor & Mats' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveNewArrivalTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeNewArrivalTab === tab.id
                  ? 'bg-warmbrown-900 text-cream-50 shadow-sm'
                  : 'bg-sandstone-100 hover:bg-sandstone-200 text-warmbrown-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-sandstone-300 hover:border-terracotta-600 text-warmbrown-900 hover:text-terracotta-700 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SHOP BY STYLE                                                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Aesthetic Moods
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Shop by Style
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
            Find the perfect design harmony for your architectural space.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {STYLES.slice(0, 6).map((style) => (
            <Link
              key={style.id}
              href={`/shop?style=${encodeURIComponent(style.name.split(' ')[0])}`}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-subtle border border-sandstone-200"
            >
              <Image
                src={style.image}
                alt={style.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-950/80 via-warmbrown-950/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-cream-50">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ochre-300">
                  {style.count}+ Items
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl group-hover:text-ochre-300 transition-colors">
                  {style.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY JAIPURPINKCITYRUGS (VALUE PILLARS)                                 */}
      {/* ========================================================================= */}
      <section className="bg-sandstone-100/70 border-y border-sandstone-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              The Artisan Guarantee
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
              Why JaipurPinkCityRugs
            </h2>
            <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
              Pure natural fibers, ancestral loom heritage, and direct fair-trade artisan support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">100% Handcrafted</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Made by generational master weavers on traditional pit looms in Rajasthan. No automated machine shortcuts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-ochre-50 text-ochre-600 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">Natural Materials</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Hand-spun Bikaneri wool, unbleached golden jute, organic hemp, and botanical dye cauldrons.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-jaipur-50 text-jaipur-600 flex items-center justify-center">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">Custom Sizes & Shapes</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Engineered to your exact room dimensions, staircase lengths, and bespoke color preferences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">Worldwide Express Shipping</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Direct export to USA, UK, Europe, Australia, and 60+ countries via tracked DHL/FedEx Express.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-warmbrown-50 text-warmbrown-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">Artisan Support</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Supporting fair wages, safe loom environments, and education for over 200 weaver families in Jaipur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-warmbrown-900">Quality Checked</h3>
              <p className="text-xs text-sandstone-600 leading-relaxed">
                Every rug undergoes rigorous 12-point inspection, herbal wash conditioning, and warp tension testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ARTISAN STORY EDITORIAL                                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border border-sandstone-300">
            <Image
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan loom master in Jaipur, Rajasthan"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              Generational Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-warmbrown-900 leading-tight">
              Made in Jaipur. Woven with Tradition.
            </h2>
            <p className="text-xs sm:text-sm text-sandstone-700 leading-relaxed">
              Every JaipurPinkCityRugs piece carries the character of Indian craftsmanship. Our rugs are created using traditional weaving techniques and natural materials, bringing warmth, texture, and timeless character into modern homes.
            </p>
            <p className="text-xs sm:text-sm text-sandstone-700 leading-relaxed">
              From hand-carding raw highland sheep wool to dyeing yarns in bubbling madder-root cauldrons, our process honors the patience and pride of Rajasthan&apos;s living textile heritage.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 bg-warmbrown-900 hover:bg-terracotta-600 text-cream-50 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CUSTOM RUG SECTION & INTERACTIVE CTA                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sandstone-200 via-cream-100 to-sandstone-100 rounded-3xl border border-sandstone-300 p-8 sm:p-14 text-center space-y-6 shadow-luxury">
          <div className="w-14 h-14 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Ruler className="w-7 h-7" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-700 block">
            Bespoke Loom Service
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmbrown-900 max-w-2xl mx-auto">
            Looking for a Custom Rug?
          </h2>

          <p className="text-xs sm:text-base text-sandstone-700 max-w-xl mx-auto leading-relaxed">
            Choose your size, colors, and style. We&apos;ll help create a handwoven rug made precisely for your architectural space.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-rugs"
              className="w-full sm:w-auto bg-terracotta-600 hover:bg-terracotta-700 text-white px-8 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Request Custom Rug Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919829012345?text=Hello%20JaipurPinkCityRugs%2C%20I%20am%20looking%20for%20a%20custom%20rug%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CUSTOMER REVIEWS & SOCIAL PROOF                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-1 text-ochre-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-ochre-500" />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            Collector Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Loved in Homes Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
            Over 2,400+ rugs shipped to discerning homes in 48 countries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-sandstone-200 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center space-x-1 text-ochre-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ochre-500" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-warmbrown-900 mb-2">
                  &quot;{review.title}&quot;
                </h3>
                <p className="text-xs text-sandstone-700 leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-sandstone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-warmbrown-900">{review.customerName}</div>
                  <div className="text-sandstone-500 text-[11px]">{review.customerLocation}</div>
                </div>
                {review.verifiedBuyer && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. INSTAGRAM & LIFESTYLE GALLERY                                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
            @JaipurPinkCityRugs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
            Follow Our Craft Journey
          </h2>
          <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
            Tag #JaipurPinkCityRugs to be featured in our international collector showcase.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80', caption: 'Sunlit Living Room Anatolian Kilim' },
            { img: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=600&q=80', caption: 'Hallway Runner in Australian Home' },
            { img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80', caption: 'Kilim Cushions on Vintage Leather' },
            { img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', caption: 'Hand-Knotted Plush Wool Bedroom' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-subtle border border-sandstone-200"
            >
              <Image
                src={item.img}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-warmbrown-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center text-cream-50 text-xs font-semibold">
                <span>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
