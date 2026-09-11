'use client';

import React from 'react';
import Image from 'next/image';
import { Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Order } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';

interface PrintableInvoiceProps {
  order: Order;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ order }) => {
  const { formatPrice } = useCurrency();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-sandstone-300 p-6 sm:p-10 shadow-luxury max-w-3xl mx-auto">
      {/* Action Bar (Hidden on print) */}
      <div className="flex items-center justify-between pb-6 border-b border-sandstone-200 print:hidden">
        <div className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Official Verified Tax Invoice</span>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 bg-warmbrown-900 hover:bg-terracotta-600 text-cream-50 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Invoice Document Body */}
      <div id="printable-invoice" className="pt-6 space-y-8">
        {/* Header with Letterhead */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-wider text-warmbrown-900 uppercase">
              JaipurPinkCityRugs
            </h1>
            <p className="text-xs text-sandstone-600">
              Master Artisan Looms & Export House<br />
              Amber Fort Road, Jaipur, Rajasthan 302002, India<br />
              Email: concierge@jaipurpinkcityrugs.com • GSTIN: 08AAACJ1928K1Z5
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-sandstone-700">
            <div className="font-mono text-base font-bold text-terracotta-700">
              INVOICE #{order.id}
            </div>
            <div>Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div>Payment Method: <span className="uppercase font-semibold text-warmbrown-900">{order.paymentMethod}</span></div>
            <div>Payment Status: <span className="text-emerald-700 font-bold">{order.paymentStatus}</span></div>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200 text-xs">
          <div>
            <h4 className="font-bold text-warmbrown-900 uppercase tracking-wider mb-1.5">
              Billed & Shipped To:
            </h4>
            <p className="font-semibold text-warmbrown-900">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="text-sandstone-700">
              {order.customer.addressLine1}
              {order.customer.addressLine2 ? `, ${order.customer.addressLine2}` : ''}<br />
              {order.customer.city}, {order.customer.state} {order.customer.postalCode}<br />
              {order.customer.country}
            </p>
            <p className="text-sandstone-600 mt-1">
              Email: {order.customer.email} • Phone: {order.customer.phone}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-warmbrown-900 uppercase tracking-wider mb-1.5">
              Shipping & Tracking:
            </h4>
            <p className="text-sandstone-700">
              <strong>Carrier:</strong> {order.carrier || 'BlueDart Express'}<br />
              <strong>Tracking Number:</strong> <span className="font-mono">{order.trackingNumber || 'Processing Assignment'}</span><br />
              <strong>Estimated Arrival:</strong> {order.estimatedDeliveryDate}<br />
              <strong>Current Status:</strong> <span className="font-semibold text-terracotta-700">{order.orderStatus}</span>
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-sandstone-200">
            <thead>
              <tr className="bg-sandstone-100 text-warmbrown-900 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3 border border-sandstone-200">Item Description</th>
                <th className="p-3 border border-sandstone-200 text-center">Size / Color</th>
                <th className="p-3 border border-sandstone-200 text-center">Qty</th>
                <th className="p-3 border border-sandstone-200 text-right">Unit Price</th>
                <th className="p-3 border border-sandstone-200 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sandstone-200">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-sandstone-50/50">
                  <td className="p-3 font-semibold text-warmbrown-900">
                    {item.productName}
                  </td>
                  <td className="p-3 text-center text-sandstone-700">
                    {item.variantSize} {item.color ? `(${item.color})` : ''}
                  </td>
                  <td className="p-3 text-center font-bold text-warmbrown-900">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right text-sandstone-700">
                    {formatPrice(item.unitPrice)}
                  </td>
                  <td className="p-3 text-right font-bold text-warmbrown-900">
                    {formatPrice(item.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-2 text-xs text-sandstone-700">
            <div className="flex justify-between">
              <span>Subtotal (Incl. 12% GST)</span>
              <span className="font-semibold text-warmbrown-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Discount ({order.couponCode || 'Promo'})</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Shipping</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-warmbrown-900 pt-2 border-t border-sandstone-300">
              <span>Grand Total</span>
              <span className="text-base text-terracotta-700">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Certificate / Footer Note */}
        <div className="pt-6 border-t border-sandstone-200 text-center text-xs text-sandstone-500 space-y-1">
          <p className="font-semibold text-warmbrown-900">
            Certified Authentic Handcrafted Rajasthani Textile • GST Registered • Zero Child Labor Guarantee
          </p>
          <p>
            For care instructions, warranty, or custom weaving inquiries, email concierge@jaipurpinkcityrugs.com
          </p>
        </div>
      </div>
    </div>
  );
};
