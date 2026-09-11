'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please complete all required fields.');
      return;
    }
    setIsSubmitted(true);
    toast.success('Thank you! Your message has been sent to our Jaipur concierge.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Customer Care' },
          { label: 'Contact & Showroom' },
        ]}
      />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          We&apos;re Here to Help
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900">
          Contact Our Jaipur Studio
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600">
          Have a question about rug sizing, custom orders, or international shipping? Speak directly with our master loom concierge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Location (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-sandstone-200 shadow-subtle space-y-6">
          <h3 className="font-serif font-bold text-xl text-warmbrown-900 pb-3 border-b border-sandstone-200">
            Studio Headquarters
          </h3>

          <div className="space-y-4 text-xs text-sandstone-700">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-terracotta-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-warmbrown-900 text-sm">Jaipur Weaving Showroom</strong>
                <span>Amber Fort Road, Heritage Weavers Enclave<br />Jaipur, Rajasthan 302002, India</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-ochre-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-warmbrown-900 text-sm">Email Inquiries</strong>
                <a href="mailto:concierge@jaipurpinkcityrugs.com" className="hover:text-terracotta-600">
                  concierge@jaipurpinkcityrugs.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-jaipur-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-warmbrown-900 text-sm">Phone & WhatsApp</strong>
                <span>+91 98290 12345 (International Hotline)</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-warmbrown-900 text-sm">Working Hours</strong>
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST (GMT+5:30)</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919829012345?text=Hello%20JaipurPinkCityRugs%20Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sandstone-200 shadow-subtle">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-warmbrown-900">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-sandstone-600 max-w-sm mx-auto">
                Thank you, {name}. Our Jaipur artisan concierge will reply to <strong>{email}</strong> within 12 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-terracotta-600 hover:underline font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-warmbrown-900 pb-2 border-b border-sandstone-200">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  >
                    <option value="Product Inquiry">Product Inquiry / Stock</option>
                    <option value="Custom Order">Custom Size / Bespoke Looming</option>
                    <option value="Shipping Status">Order Tracking & Delivery</option>
                    <option value="Wholesale & Trade">Trade & Interior Design Program</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our handcrafted Indian rugs?"
                  className="w-full bg-sandstone-50 border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Concierge</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
