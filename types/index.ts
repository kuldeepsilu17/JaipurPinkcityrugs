export type CurrencyCode = 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  format: (amount: number) => string;
}

export interface ProductVariant {
  id: string;
  size: string; // e.g. "2x3 ft", "3x5 ft", "4x6 ft", "5x7 ft", "6x9 ft", "8x10 ft", "9x12 ft", "Custom"
  price: number; // in INR (₹)
  compareAtPrice?: number;
  sku: string;
  stock: number;
  dimensionsCm?: string; // e.g. "60 x 90 cm"
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string; // e.g. 'kilim-rugs', 'kilim-runners', 'stair-runners', 'pillow-covers', 'wool-rugs', 'jute-rugs', 'hemp-rugs', 'yoga-mats', 'cotton-home-decor', 'custom-rugs'
  categoryName: string;
  subcategory?: string;
  price: number; // Base INR (₹) price
  compareAtPrice?: number;
  images: string[];
  materials: string[]; // e.g. ["80% New Zealand Wool", "20% Organic Jute"]
  primaryMaterial: string; // "Wool", "Jute", "Hemp", "Cotton", "Wool + Jute", "Cotton + Jute"
  colors: string[]; // ["Terracotta", "Indigo", "Sandstone", "Rust", "Ochre"]
  colorHexes: string[];
  styles: string[]; // ["Boho", "Vintage", "Tribal", "Moroccan", "Modern", "Traditional", "Minimal", "Southwestern", "Rustic", "Scandinavian"]
  sizes: string[]; // ["2x3", "3x5", "4x6", "5x7", "6x9", "8x10", "Custom"]
  variants: ProductVariant[];
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  customizable?: boolean;
  weaveType: string; // "Flatweave Hand-Loomed", "Hand-Knotted 60-Knots", "Braided", "Hand-Tufted"
  origin: string; // "Jaipur, Rajasthan, India"
  pileHeight?: string; // "Flat (approx 0.25 in / 6 mm)"
  leadTimeDays?: number; // 2 for in stock, 14-21 for custom woven
  careGuide?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerLocation: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  images?: string[];
  helpfulCount?: number;
}

export interface CartItem {
  id: string; // unique item uuid (product + variant id)
  product: Product;
  selectedVariant: ProductVariant;
  selectedColor?: string;
  quantity: number;
  customNotes?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // 10 for 10%, or 2000 for ₹2,000 off
  minOrderAmount?: number;
  expiryDate: string;
  usageCount: number;
  usageLimit?: number;
  description: string;
  isActive: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantSize: string;
  color?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Weaving'
  | 'Quality Checked'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export interface TrackingEvent {
  timestamp: string;
  status: OrderStatus;
  location: string;
  description: string;
}

export interface Order {
  id: string; // e.g. "JPR-2026-9482"
  createdAt: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  shippingMethod: 'standard' | 'express_dhl';
  estimatedDeliveryDate: string;
  taxAmount: number;
  totalAmount: number;
  currency: CurrencyCode;
  paymentMethod: 'stripe' | 'razorpay' | 'paypal' | 'cod' | 'demo_simulated';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  trackingEvents: TrackingEvent[];
  notes?: string;
}

export interface CustomRugQuote {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  productType: string;
  width: string; // e.g. "6 ft"
  length: string; // e.g. "9 ft"
  preferredColors: string;
  patternStyle: string;
  material: string;
  quantity: number;
  referenceImageUrl?: string;
  additionalNotes?: string;
  estimatedPriceInr?: number;
  estimatedPriceUsd?: number;
  status: 'New' | 'Reviewing' | 'Quoted' | 'In Production' | 'Completed' | 'Archived';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  materials: string[];
  colors: string[];
  styles: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'discount';
}
