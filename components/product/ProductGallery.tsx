'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIdx] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const nextImage = () => {
    setSelectedIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Stage View */}
        <div
          className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-sandstone-100 border border-sandstone-200/80 shadow-subtle group cursor-crosshair"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Main Image */}
          <Image
            src={activeImage}
            alt={`${productName} view ${selectedIdx + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover object-center transition-transform duration-200 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : undefined
            }
          />

          {/* Lightbox / Fullscreen Trigger */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white text-warmbrown-800 backdrop-blur-md shadow-md transition-all z-10"
            aria-label="Expand Fullscreen"
            title="Fullscreen View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Zoom Tip */}
          <div className="absolute bottom-3 left-3 bg-warmbrown-900/70 backdrop-blur-sm text-cream-50 text-[10px] px-2.5 py-1 rounded-full flex items-center space-x-1 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3 h-3" />
            <span>Hover to zoom weave details</span>
          </div>

          {/* Mobile Arrows */}
          {images.length > 1 && (
            <div className="md:hidden">
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-warmbrown-900 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-warmbrown-900 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Carousel */}
        {images.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedIdx === idx
                    ? 'border-terracotta-600 ring-2 ring-terracotta-200 scale-95'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:border-sandstone-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-warmbrown-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 text-cream-100 hover:text-white rounded-full bg-warmbrown-800/80 hover:bg-warmbrown-700 transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-warmbrown-800/80 hover:bg-warmbrown-700 text-cream-100 transition-colors z-20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt={`${productName} fullscreen`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-warmbrown-800/80 hover:bg-warmbrown-700 text-cream-100 transition-colors z-20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-5 text-center text-xs text-sandstone-400 font-medium">
            {selectedIdx + 1} of {images.length} — {productName}
          </div>
        </div>
      )}
    </>
  );
};
