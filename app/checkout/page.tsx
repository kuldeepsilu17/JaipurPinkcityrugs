'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useStore } from '@/context/StoreContext';
import { ShippingAddress, OrderItem } from '@/types';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shipping, total, appliedCoupon, clearCart, shippingMethod } = useCart();
  const { formatPrice, currency } = useCurrency();
  const { createOrder } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay' | 'paypal' | 'cod' | 'demo_simulated'>('demo_simulated');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      toast.error('Please complete all required shipping fields.');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setIsProcessing(true);

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      variantSize: item.selectedVariant.size,
      color: item.selectedColor,
      unitPrice: item.selectedVariant.price,
      quantity: item.quantity,
      totalPrice: item.selectedVariant.price * item.quantity,
    }));

    // Calculate delivery date (approx 7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (shippingMethod === 'express_dhl' ? 5 : 8));
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    setTimeout(() => {
      const newOrder = createOrder({
        customer: formData,
        items: orderItems,
        subtotal,
        discountAmount: discount,
        couponCode: appliedCoupon?.code,
        shippingFee: shipping,
        shippingMethod,
        estimatedDeliveryDate: formattedDelivery,
        taxAmount: 0,
        totalAmount: total,
        currency,
        paymentMethod,
        paymentStatus: 'Paid',
        orderStatus: 'Confirmed',
        carrier: shippingMethod === 'express_dhl' ? 'DHL Express Worldwide' : 'India Post Air Courier',
        trackingNumber: `DHL-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
        notes: orderNotes,
      });

      clearCart();
      setIsProcessing(false);
      toast.success(`Order #${newOrder.id} placed successfully!`);
      router.push(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-warmbrown-900">Your bag is empty</h2>
        <p className="text-xs text-sandstone-600">Please add products to your bag before checking out.</p>
        <Link
          href="/shop"
          className="inline-block bg-terracotta-600 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sandstone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-8 border-b border-sandstone-200">
          <div>
            <Link href="/" className="font-serif text-2xl font-bold uppercase tracking-wider text-warmbrown-900">
              JaipurPinkCityRugs
            </Link>
            <span className="block text-[10px] uppercase tracking-widest text-sandstone-600">
              Secure 256-Bit SSL Checkout
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Payment Gateway</span>
          </div>
        </div>

        {/* Main Checkout Form & Summary Grid */}
        <form onSubmit={handlePlaceOrder} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left: Multi-Step Forms (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-white p-4 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-warmbrown-900 pb-2 border-b border-sandstone-100">
                <span className="w-5 h-5 rounded-full bg-terracotta-600 text-white text-xs flex items-center justify-center">1</span>
                <span>Customer Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Catherine"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Vance"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="catherine.vance@example.com"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (415) 555-0192"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white p-4 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-warmbrown-900 pb-2 border-b border-sandstone-100">
                <span className="w-5 h-5 rounded-full bg-terracotta-600 text-white text-xs flex items-center justify-center">2</span>
                <span>Shipping Address</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Country / Region *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px] cursor-pointer"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="742 Evergreen Terrace"
                  className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apt 4B"
                  className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Seattle"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="WA"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="98101"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-3 rounded-xl focus:outline-none focus:border-terracotta-500 min-h-[44px]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200 shadow-subtle space-y-4">
              <div className="flex items-center space-x-2 text-sm font-bold uppercase tracking-wider text-warmbrown-900 pb-2 border-b border-sandstone-100">
                <span className="w-5 h-5 rounded-full bg-terracotta-600 text-white text-xs flex items-center justify-center">3</span>
                <span>Payment Method</span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Instant Simulator / Demo Mode */}
                <label
                  onClick={() => setPaymentMethod('demo_simulated')}
                  className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'demo_simulated'
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-sandstone-300 hover:border-sandstone-400 bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input type="radio" checked={paymentMethod === 'demo_simulated'} readOnly className="mt-0.5" />
                    <div>
                      <div className="font-bold text-warmbrown-900 flex items-center space-x-2">
                        <span>Instant Verified Payment Simulation (Demo Mode)</span>
                        <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">READY</span>
                      </div>
                      <p className="text-sandstone-600 mt-1">
                        Processes order instantly, generates verified invoice, and attaches live tracking events without charging real funds.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Stripe Credit Card */}
                <label
                  onClick={() => setPaymentMethod('stripe')}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'stripe' ? 'border-terracotta-600 bg-terracotta-50/50 font-semibold' : 'border-sandstone-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input type="radio" checked={paymentMethod === 'stripe'} readOnly className="mt-0.5" />
                    <div>
                      <div className="font-bold text-warmbrown-900">Stripe Secure (Visa, Mastercard, Amex, Apple Pay)</div>
                      <p className="text-sandstone-500 text-[11px] mt-0.5">Global credit and debit card processing.</p>
                    </div>
                  </div>
                </label>

                {/* Razorpay */}
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'razorpay' ? 'border-terracotta-600 bg-terracotta-50/50 font-semibold' : 'border-sandstone-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input type="radio" checked={paymentMethod === 'razorpay'} readOnly className="mt-0.5" />
                    <div>
                      <div className="font-bold text-warmbrown-900">Razorpay (India UPI, Netbanking, GooglePay)</div>
                      <p className="text-sandstone-500 text-[11px] mt-0.5">Optimized for domestic Indian payments.</p>
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'paypal' ? 'border-terracotta-600 bg-terracotta-50/50 font-semibold' : 'border-sandstone-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input type="radio" checked={paymentMethod === 'paypal'} readOnly className="mt-0.5" />
                    <div>
                      <div className="font-bold text-warmbrown-900">PayPal Express Checkout</div>
                      <p className="text-sandstone-500 text-[11px] mt-0.5">Pay safely with your PayPal balance or linked bank.</p>
                    </div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Delivery Notes / Gate Code (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please leave package under covered porch."
                  className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2 rounded-lg focus:outline-none focus:border-terracotta-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sticky Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-sandstone-200/90 shadow-subtle space-y-6 self-start sticky top-24">
            <h3 className="font-serif font-bold text-xl text-warmbrown-900 pb-3 border-b border-sandstone-200">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Thumbnail preview list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-sandstone-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-sandstone-100 shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-warmbrown-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-warmbrown-900 truncate max-w-[170px]">{item.product.name}</div>
                      <div className="text-sandstone-500 text-[11px]">{item.selectedVariant.size}</div>
                    </div>
                  </div>
                  <div className="font-bold text-warmbrown-900">
                    {formatPrice(item.selectedVariant.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs text-sandstone-700 pt-3 border-t border-sandstone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-warmbrown-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Worldwide Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-warmbrown-900 pt-3 border-t border-sandstone-300">
                <span>Total Amount Due</span>
                <span className="text-xl font-serif text-terracotta-700">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Order Action */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Securing Order on Jaipur Loom...</span>
                ) : (
                  <>
                    <span>Place Order & Verify • {formatPrice(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-sandstone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Risk • 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
