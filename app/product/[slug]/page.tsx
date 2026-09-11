'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ProductVariant } from '@/types';
import { ProductGallery } from '@/components/product/ProductGallery';
import { WhatsAppButton } from '@/components/product/WhatsAppButton';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ReviewFormModal } from '@/components/product/ReviewFormModal';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { StickyMobileAddToCart } from '@/components/product/StickyMobileAddToCart';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { getProductBySlug, getProductReviews } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = getProductReviews(product.id);
  const isFavorited = isInWishlist(product.id);

  // States
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      size: product.sizes[0] || 'Standard',
      price: product.price,
      sku: product.sku,
      stock: product.stock,
    }
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Original');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'craft' | 'care' | 'shipping' | 'faq'>('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Track Recently Viewed in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jpr_recently_viewed');
      const list: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.id, ...list.filter((id) => id !== product.id)].slice(0, 10);
      localStorage.setItem('jpr_recently_viewed', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, [product.id]);

  const activePrice = selectedVariant.price || product.price;
  const activeComparePrice = selectedVariant.compareAtPrice || product.compareAtPrice;
  const discountPercent = activeComparePrice
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, selectedColor, quantity, undefined, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, selectedColor, quantity, undefined, false);
    router.push('/checkout');
  };

  // Review Rating Stats
  const totalReviewsCount = reviews.length || product.reviewCount || 1;
  const averageRating = product.rating || 5.0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-14">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.categoryName, href: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Stage: 2-Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-start">
        {/* Left Column: Product Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Product Details & Purchase Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* Header & Badging */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-terracotta-600 uppercase tracking-wider mb-1.5">
              <span>{product.categoryName}</span>
              <span>•</span>
              <span className="text-sandstone-500">{product.origin}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-warmbrown-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center space-x-2.5 mt-2">
              <div className="flex items-center text-ochre-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(averageRating)
                        ? 'fill-ochre-500'
                        : 'text-sandstone-300 fill-sandstone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-warmbrown-900">{averageRating}</span>
              <a
                href="#reviews-section"
                className="text-xs text-sandstone-600 hover:text-terracotta-600 underline font-medium"
              >
                ({totalReviewsCount} verified reviews)
              </a>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-sandstone-50 border border-sandstone-200 space-y-1.5">
            <div className="flex items-baseline space-x-2 sm:space-x-3 flex-wrap">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-warmbrown-900">
                {formatPrice(activePrice)}
              </span>
              {activeComparePrice && (
                <span className="text-sm sm:text-base text-sandstone-400 line-through">
                  {formatPrice(activeComparePrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-terracotta-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold pt-1">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>FREE Worldwide Express Shipping Included</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-sandstone-700 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Size Variant Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-warmbrown-900">
                Dimension: <span className="text-terracotta-600">{selectedVariant.size}</span>
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-terracotta-600 hover:underline flex items-center space-x-1 font-semibold touch-target"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Room Sizing Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all touch-target ${
                    selectedVariant.id === variant.id
                      ? 'border-terracotta-600 bg-terracotta-50/70 text-terracotta-900 font-bold ring-1 ring-terracotta-500 shadow-sm'
                      : 'border-sandstone-300 bg-white text-warmbrown-800 hover:border-sandstone-400'
                  }`}
                >
                  <div className="text-xs">{variant.size}</div>
                  <div className="text-[11px] text-sandstone-600 font-semibold mt-0.5">
                    {formatPrice(variant.price)}
                  </div>
                  {variant.dimensionsCm && (
                    <div className="text-[10px] text-sandstone-400 mt-0.5">
                      {variant.dimensionsCm}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Colorway Picker */}
          {product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-900 mb-2">
                Palette: <span className="text-terracotta-600 font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, idx) => {
                  const hex = product.colorHexes[idx] || '#C85A32';
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs transition-all touch-target ${
                        isSelected
                          ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-800 font-bold'
                          : 'border-sandstone-300 bg-white text-warmbrown-800 hover:border-sandstone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-sandstone-300 shrink-0"
                        style={{ background: hex }}
                      />
                      <span>{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-xs font-bold uppercase text-warmbrown-800">Quantity:</span>
            <div className="flex items-center border border-sandstone-300 rounded-lg bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-warmbrown-700 hover:text-terracotta-600 font-bold touch-target"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-3 sm:px-4 text-xs font-bold text-warmbrown-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-warmbrown-700 hover:text-terracotta-600 font-bold touch-target"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-[11px] sm:text-xs text-sandstone-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Made to order'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-terracotta-600 hover:bg-terracotta-700 text-white py-3.5 px-4 sm:px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all touch-target"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(activePrice * quantity)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className={`p-3.5 rounded-xl border transition-all touch-target ${
                  isFavorited
                    ? 'border-jaipur-500 bg-jaipur-50 text-jaipur-600'
                    : 'border-sandstone-300 bg-white text-warmbrown-700 hover:text-jaipur-600'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-jaipur-600' : ''}`} />
              </button>
            </div>

            {/* Buy Now (Direct Checkout) */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-warmbrown-900 hover:bg-warmbrown-800 text-cream-50 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-sm touch-target"
            >
              Instant Checkout / Buy Now
            </button>

            {/* WhatsApp Direct Order */}
            <WhatsAppButton
              productName={product.name}
              selectedSize={selectedVariant.size}
              selectedColor={selectedColor}
              quantity={quantity}
              className="w-full"
            />

            {/* Custom Rug Button */}
            <Link
              href="/custom-rugs"
              className="w-full py-2.5 px-4 rounded-xl border border-sandstone-300 hover:bg-sandstone-100 text-warmbrown-800 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors touch-target"
            >
              <Ruler className="w-4 h-4 text-terracotta-600" />
              <span>Request Custom Size / Bespoke Colorway</span>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-4 border-t border-sandstone-200 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] text-sandstone-700">
            <div className="p-2 bg-sandstone-50 rounded-lg">
              <Truck className="w-4 h-4 mx-auto mb-1 text-terracotta-600" />
              <span className="font-semibold block">DHL Express</span>
              <span>4-7 Day Arrival</span>
            </div>
            <div className="p-2 bg-sandstone-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-ochre-600" />
              <span className="font-semibold block">100% Authentic</span>
              <span>Handmade in Jaipur</span>
            </div>
            <div className="p-2 bg-sandstone-50 rounded-lg">
              <RefreshCw className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span className="font-semibold block">30-Day Easy</span>
              <span>Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add To Cart Bar */}
      <StickyMobileAddToCart
        product={product}
        selectedVariant={selectedVariant}
        selectedColor={selectedColor}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />

      {/* ========================================================================= */}
      {/* PRODUCT INFORMATION TABS                                                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-sandstone-200/90 shadow-subtle overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-sandstone-200 overflow-x-auto scrollbar-none bg-sandstone-50">
          {[
            { id: 'description', label: 'Description & Story' },
            { id: 'craft', label: 'Material & Craftsmanship' },
            { id: 'care', label: 'Care Instructions' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'faq', label: 'Product FAQ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-terracotta-600 bg-white text-terracotta-700'
                  : 'border-transparent text-sandstone-600 hover:text-warmbrown-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-10 text-xs sm:text-sm text-sandstone-700 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                About this Masterpiece
              </h3>
              <p>{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
                <div className="p-3 bg-sandstone-50 rounded-xl border border-sandstone-200">
                  <strong className="block text-warmbrown-900">Weave Foundation:</strong>
                  <span>{product.weaveType}</span>
                </div>
                <div className="p-3 bg-sandstone-50 rounded-xl border border-sandstone-200">
                  <strong className="block text-warmbrown-900">Origin / Loom Studio:</strong>
                  <span>{product.origin}</span>
                </div>
                <div className="p-3 bg-sandstone-50 rounded-xl border border-sandstone-200">
                  <strong className="block text-warmbrown-900">Primary Composition:</strong>
                  <span>{product.materials.join(', ')}</span>
                </div>
                <div className="p-3 bg-sandstone-50 rounded-xl border border-sandstone-200">
                  <strong className="block text-warmbrown-900">Pile Height / Thickness:</strong>
                  <span>{product.pileHeight || 'Flatweave (approx 6mm)'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'craft' && (
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                Ancestral Pit-Loom Weaving & Botanical Dyes
              </h3>
              <p>
                Every knot and weft thread in this rug is placed by skilled weavers in our Jaipur artisan enclave. We spin highland sheep wool on charkha wheels to retain natural lanolin, creating organic resilience against foot traffic and spills.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Madder Root & Indigo Dyes:</strong> Boiled in copper cauldrons without toxic chemicals.</li>
                <li><strong>Reversible Flatweave:</strong> Identical geometric design on both sides doubles its lifespan.</li>
                <li><strong>Washed in River Waters:</strong> Softens the yarn and brings out the luminous mineral shine.</li>
              </ul>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                Handmade Rug Maintenance Guide
              </h3>
              <div className="space-y-2">
                {product.careGuide ? (
                  product.careGuide.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <p>• Vacuum regularly using a brush-free suction attachment to prevent fiber snagging.</p>
                    <p>• Spot clean spills immediately with mild wool-safe detergent and cold water. Blot, never rub.</p>
                    <p>• Rotate rug 180 degrees twice a year for even wear under natural sunlight.</p>
                    <p>• We recommend pairing with a non-slip rug pad for enhanced cushioning and floor protection.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                Worldwide Express Shipping & Duties
              </h3>
              <p>
                We partner with <strong>DHL Express and FedEx</strong> to provide direct insured doorstep delivery worldwide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 bg-sandstone-50 rounded-lg">
                  <strong className="block text-warmbrown-900">In-Stock Dispatch:</strong>
                  <span>Ships within 24-48 hours from our Jaipur studio.</span>
                </div>
                <div className="p-3 bg-sandstone-50 rounded-lg">
                  <strong className="block text-warmbrown-900">Delivery Timeframe:</strong>
                  <span>4-7 business days to USA, UK, Canada, Australia & Europe.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4 max-w-3xl animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-warmbrown-900">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-sandstone-50 rounded-lg">
                  <strong className="block text-warmbrown-900 mb-1">Are colors true to the photos?</strong>
                  <p>We photograph all rugs under neutral daylight. Because our wool is dyed with natural plant extracts, minor tonal abrash variations are a mark of authentic handmade craftsmanship.</p>
                </div>
                <div className="p-3 bg-sandstone-50 rounded-lg">
                  <strong className="block text-warmbrown-900 mb-1">Can I order this in a custom size?</strong>
                  <p>Yes! We can loom this exact design in custom hallway runner lengths, oversized 10x14 ft, or square dimensions. Click &quot;Request Custom Size&quot; above to get started.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CUSTOMER REVIEWS SECTION                                                  */}
      {/* ========================================================================= */}
      <section id="reviews-section" className="py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-sandstone-200 pb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              Verified Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900 mt-1">
              Customer Reviews ({reviews.length})
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-warmbrown-900 hover:bg-terracotta-600 text-cream-50 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-sandstone-200">
          <div className="text-center md:border-r border-sandstone-200 md:pr-6 flex flex-col items-center justify-center">
            <span className="font-serif text-5xl font-bold text-warmbrown-900">{averageRating}</span>
            <div className="flex text-ochre-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-ochre-500" />
              ))}
            </div>
            <span className="text-xs text-sandstone-600">Based on verified customer reviews</span>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 8 },
              { stars: 3, pct: 0 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center space-x-3">
                <span className="w-12 text-sandstone-700 font-semibold">{bar.stars} Stars</span>
                <div className="flex-1 bg-sandstone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-ochre-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sandstone-500">{bar.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-sandstone-200/90 shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-ochre-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-ochre-500" />
                      ))}
                    </div>
                    {review.verifiedBuyer && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-warmbrown-900 mt-1">
                    {review.title}
                  </h4>
                </div>
                <span className="text-xs text-sandstone-400">{review.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-sandstone-700 leading-relaxed italic">
                &quot;{review.comment}&quot;
              </p>

              <div className="text-xs text-sandstone-500 font-medium">
                — {review.customerName}, <span className="text-sandstone-400">{review.customerLocation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />

      {/* Recently Viewed */}
      <RecentlyViewed currentProductId={product.id} />

      {/* Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Review Modal */}
      <ReviewFormModal
        product={product}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
