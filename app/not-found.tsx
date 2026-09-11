'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-sandstone-300 shadow-luxury animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-sandstone-100 text-terracotta-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Page Not Found
        </span>

        <h1 className="font-serif text-3xl font-bold text-warmbrown-900">
          Lost in the Artisan Enclave?
        </h1>

        <p className="text-xs sm:text-sm text-sandstone-600 leading-relaxed">
          The page or product you are seeking may have been retired, moved, or loomed into a one-of-a-kind design.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-sandstone-300 hover:bg-sandstone-50 text-warmbrown-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
