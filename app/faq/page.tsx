'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Craftsmanship',
    question: 'Are all JaipurPinkCityRugs 100% handmade?',
    answer: 'Yes! Every single rug, flatweave kilim, and runner in our collection is hand-loomed or hand-knotted by traditional master artisans in Jaipur, Rajasthan. We do not sell automated machine-printed carpets.',
  },
  {
    category: 'Materials',
    question: 'What materials and dyes are used?',
    answer: 'We use hand-spun Indian and New Zealand sheep wool, organic unbleached golden jute, Himalayan hemp, and organic cotton. All colorways are produced using traditional botanical vegetable dyes like madder root, indigofera leaves, and pomegranate rinds.',
  },
  {
    category: 'Custom Orders',
    question: 'Can I order a custom size, runner length, or specific colors?',
    answer: 'Absolutely. We specialize in bespoke pit-loom orders. You can specify exact dimensions in feet or centimeters, choose custom color harmonies, or request matching stair runner rolls. Use our Custom Rugs Studio to get a quote.',
  },
  {
    category: 'Shipping',
    question: 'Do you ship internationally and how long does it take?',
    answer: 'We ship worldwide to over 48 countries via DHL Express and FedEx Air Cargo. In-stock rugs dispatch within 24-48 hours and arrive in 4-7 business days.',
  },
  {
    category: 'Care & Cleaning',
    question: 'How should I clean and vacuum my handmade kilim rug?',
    answer: 'Vacuum weekly using a brush-free suction attachment or set your vacuum beater bar to the highest level. For minor spills, blot immediately with mild wool-safe detergent and lukewarm water. Do not dry-clean flatweaves in heavy industrial machines.',
  },
  {
    category: 'Color Accuracy',
    question: 'Are the colors exactly the same as the photos?',
    answer: 'We photograph our rugs under natural daylight to provide true color representation. Because hand-spun wool absorbs vegetable dyes with subtle organic variations (known as abrash), each rug has its own unique artisanal fingerprint.',
  },
  {
    category: 'Returns',
    question: 'Can I return my rug if it does not fit my room?',
    answer: 'Yes, we offer a 30-day hassle-free return window on all standard catalog rugs. Simply email concierge@jaipurpinkcityrugs.com to receive return authorization.',
  },
  {
    category: 'Tracking',
    question: 'How do I track my shipment?',
    answer: 'You can track your order status and view real-time carrier checkpoints anytime on our Track Order page by entering your Order ID.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const categories = ['All', 'Craftsmanship', 'Materials', 'Custom Orders', 'Shipping', 'Care & Cleaning'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Customer Care' },
          { label: 'Frequently Asked Questions' },
        ]}
      />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600">
          Everything you need to know about our Indian handmade rugs, pit looms, and worldwide delivery.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-sandstone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search question or topic..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-sandstone-300 rounded-2xl text-xs sm:text-sm text-warmbrown-900 focus:outline-none focus:border-terracotta-500 shadow-subtle"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-warmbrown-900 text-white shadow-sm'
                : 'bg-sandstone-100 hover:bg-sandstone-200 text-warmbrown-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sandstone-200 shadow-subtle overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-serif font-bold text-base sm:text-lg text-warmbrown-900 hover:text-terracotta-700 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-sandstone-400 transition-transform ${isOpen ? 'rotate-180 text-terracotta-600' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-sandstone-700 leading-relaxed border-t border-sandstone-100 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="bg-sandstone-100/80 rounded-2xl p-6 text-center space-y-3 border border-sandstone-200">
        <h4 className="font-serif font-bold text-lg text-warmbrown-900">Still have a question?</h4>
        <p className="text-xs text-sandstone-600">Our Jaipur showroom team is happy to assist with interior styling and bespoke sizing.</p>
        <Link
          href="/contact"
          className="inline-block bg-warmbrown-900 hover:bg-terracotta-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Contact Our Concierge
        </Link>
      </div>
    </div>
  );
}
