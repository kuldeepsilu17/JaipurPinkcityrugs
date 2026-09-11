'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
  productUrl?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  selectedSize = 'Standard',
  selectedColor = 'Original',
  quantity = 1,
  productUrl,
  className = '',
}) => {
  const url = productUrl || (typeof window !== 'undefined' ? window.location.href : 'https://jaipurpinkcityrugs.com');
  const message = encodeURIComponent(
    `Hello JaipurPinkCityRugs,\n\nI am interested in ordering:\n- Product: ${productName}\n- Selected Size: ${selectedSize}\n- Colorway: ${selectedColor}\n- Quantity: ${quantity}\n- Product Link: ${url}\n\nPlease share availability, customization options, and final checkout price. Thank you!`
  );

  return (
    <a
      href={`https://wa.me/919829012345?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all ${className}`}
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span>ORDER ON WHATSAPP</span>
    </a>
  );
};
