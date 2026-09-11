'use client';

import React from 'react';
import { Ruler, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CustomRugQuote } from '@/types';

export default function AdminCustomQuotesPage() {
  const { customQuotes, updateQuoteStatus } = useStore();
  const { formatPrice } = useCurrency();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900">
          Custom Rug Quote Inquiries
        </h1>
        <p className="text-xs text-sandstone-600">
          Review customer bespoke dimensions, yarn color preferences, and reply via WhatsApp or email.
        </p>
      </div>

      <div className="space-y-4">
        {customQuotes.map((quote) => {
          const whatsappMsg = encodeURIComponent(
            `Hello ${quote.name},\n\nRegarding your custom rug quote #${quote.id} (${quote.productType}, ${quote.width} x ${quote.length}): Our Jaipur studio has prepared the CAD layout and yarn color swatches. Let us know when you'd like to review!`
          );

          return (
            <div
              key={quote.id}
              className="p-6 rounded-2xl bg-white border border-sandstone-200 shadow-subtle space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-sandstone-100 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-sm text-warmbrown-900">
                      #{quote.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      quote.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  <div className="text-sandstone-500 text-[11px] mt-0.5">
                    Requested on {new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={quote.status}
                    onChange={(e) => updateQuoteStatus(quote.id, e.target.value as any)}
                    className="bg-sandstone-50 border border-sandstone-300 rounded px-2.5 py-1 text-xs font-semibold"
                  >
                    <option value="New">New</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Quoted">Quoted</option>
                    <option value="In Production">In Production</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <a
                    href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Reply</span>
                  </a>
                </div>
              </div>

              {/* Grid specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-sandstone-50 rounded-xl border border-sandstone-200">
                <div>
                  <span className="text-sandstone-500 block">Customer:</span>
                  <strong className="text-warmbrown-900">{quote.name}</strong> ({quote.country})<br />
                  <span>{quote.email}</span> • <span>{quote.phone}</span>
                </div>

                <div>
                  <span className="text-sandstone-500 block">Specs:</span>
                  <strong className="text-warmbrown-900">{quote.productType}</strong><br />
                  <span>Size: {quote.width} × {quote.length}</span><br />
                  <span>Material: {quote.material}</span>
                </div>

                <div>
                  <span className="text-sandstone-500 block">Colors & Style:</span>
                  <span>{quote.preferredColors}</span><br />
                  <span className="text-sandstone-600">{quote.patternStyle}</span>
                </div>
              </div>

              {quote.additionalNotes && (
                <div className="text-sandstone-700 italic">
                  <strong>Notes:</strong> &quot;{quote.additionalNotes}&quot;
                </div>
              )}

              {quote.estimatedPriceUsd && (
                <div className="text-right font-semibold text-warmbrown-900">
                  Estimated Base Quote: <span className="text-sm font-bold text-terracotta-700">{formatPrice(quote.estimatedPriceUsd)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
