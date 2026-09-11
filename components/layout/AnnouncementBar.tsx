'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight, Globe, ShieldCheck } from 'lucide-react';

const MESSAGES = [
  { text: 'Handcrafted in Jaipur, India • Worldwide Express Shipping via DHL', link: '/shipping' },
  { text: 'Use code WELCOME10 for 10% Off your First Artisan Rug', link: '/shop' },
  { text: 'Custom Sizes, Shapes & Patterns Hand-Woven to Order', link: '/custom-rugs' },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeMsg = MESSAGES[currentIdx];

  return (
    <aside aria-label="Announcement" className="bg-warmbrown-900 text-cream-100 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 transition-all duration-300 border-b border-warmbrown-800 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-ochre-300 font-medium tracking-wide">
          <Globe className="w-3.5 h-3.5" />
          <span>Worldwide Express Shipping</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center space-x-1 sm:space-x-2 animate-fade-in key={currentIdx} min-w-0">
          <Sparkles className="w-3 h-3 text-ochre-400 shrink-0" />
          <Link
            href={activeMsg.link}
            className="hover:text-ochre-300 transition-colors font-medium tracking-wide flex items-center space-x-1 truncate max-w-full"
          >
            <span className="truncate">{activeMsg.text}</span>
            <ChevronRight className="w-3 h-3 inline opacity-70 shrink-0" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-sandstone-300 text-xs">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta-400" />
            <span>100% Certified Handmade</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
