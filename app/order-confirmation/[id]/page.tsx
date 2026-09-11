'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, Package, Truck, ArrowRight, MessageCircle, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { PrintableInvoice } from '@/components/invoice/PrintableInvoice';

interface OrderConfirmationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { id } = use(params);
  const { getOrderById } = useStore();
  const { formatPrice } = useCurrency();

  const order = getOrderById(id);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#D48B7E', '#C5A059', '#2B4C7E'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    notFound();
  }

  const whatsappInquiry = encodeURIComponent(
    `Hello JaipurPinkCityRugs,\n\nI just placed order #${order.id}. Could you confirm my loom queue and tracking status? Thank you!`
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Celebration Card */}
      <div className="bg-white rounded-3xl border border-sandstone-200 p-8 sm:p-12 text-center shadow-luxury space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Payment & Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900">
          Thank you, {order.customer.firstName}!
        </h1>

        <p className="text-xs sm:text-sm text-sandstone-700 max-w-md mx-auto leading-relaxed">
          Your order has been registered under <strong className="font-mono text-warmbrown-900 font-bold">#{order.id}</strong>. A confirmation email and tax invoice receipt have been sent to <strong>{order.customer.email}</strong>.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/track-order?orderId=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.customer.email)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Timeline</span>
          </Link>

          <a
            href={`https://wa.me/919829012345?text=${whatsappInquiry}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>

      {/* Printable Invoice Section */}
      <PrintableInvoice order={order} />

      {/* Return to Store */}
      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-warmbrown-800 hover:text-terracotta-600 underline"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
