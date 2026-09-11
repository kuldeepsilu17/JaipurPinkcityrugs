'use client';

import React, { useState } from 'react';
import { X, Star, Upload, Check, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { toast } from 'sonner';

interface ReviewFormModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ product, isOpen, onClose }) => {
  const { addReview } = useStore();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !title || !comment) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        productId: product.id,
        customerName,
        customerLocation: customerLocation || 'Verified Customer',
        rating,
        title,
        comment,
        verifiedBuyer: true,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-warmbrown-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-cream-50 rounded-2xl shadow-2xl border border-sandstone-300 overflow-hidden z-10 p-6 sm:p-8 animate-scale">
        <div className="flex items-center justify-between pb-4 border-b border-sandstone-200">
          <div>
            <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider">
              Share Your Experience
            </span>
            <h3 className="font-serif font-bold text-xl text-warmbrown-900">
              Write a Review for {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sandstone-500 hover:text-warmbrown-900 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Star Rating Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1.5">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'text-ochre-500 fill-ochre-500'
                        : 'text-sandstone-300 fill-sandstone-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-warmbrown-800 ml-2">
                {rating === 5 ? '5 Stars — Flawless Heirloom Quality' : `${rating} Stars`}
              </span>
            </div>
          </div>

          {/* Headline / Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
              Review Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stunning craftsmanship and fast international delivery!"
              className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
              Detailed Review *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the wool quality, colors in room lighting, tactile texture, or how it styled your room..."
              className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
              required
            />
          </div>

          {/* Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rachel Jenkins"
                className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                City / Country (Optional)
              </label>
              <input
                type="text"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
                placeholder="e.g. Chicago, IL, USA"
                className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-sandstone-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-warmbrown-700 hover:text-warmbrown-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Publish Verified Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
