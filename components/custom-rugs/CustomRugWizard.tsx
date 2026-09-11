'use client';

import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, CheckCircle2, Ruler, Palette, FileText, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { toast } from 'sonner';

const WEAVE_TYPES = [
  { id: 'kilim', name: 'Hand-Loomed Flatweave Kilim', material: '85% Indian Wool / 15% Cotton', pricePerSqFt: 850, image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=400&q=80' },
  { id: 'wool-knotted', name: 'Hand-Knotted 60-Knot Wool', material: '100% New Zealand & Bikaneri Wool', pricePerSqFt: 1800, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80' },
  { id: 'jute-hemp', name: 'Organic Braided Golden Jute / Hemp', material: '100% Natural Golden Jute', pricePerSqFt: 650, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
  { id: 'stair-runner', name: 'Reinforced Heavy-Duty Stair Runner', material: 'Triple-Density Wool-Jute Blend', pricePerSqFt: 1100, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80' },
];

const SHAPES = ['Rectangular', 'Runner (Long & Narrow)', 'Round / Circular', 'Oval', 'Square', 'Custom Stair Tread'];

const COLOR_PREFERENCES = [
  'Terracotta, Rust & Warm Ochre',
  'Indigo Blue, Ivory & Sandstone',
  'Desert Sage Green & Soft Blush',
  'Monochrome Charcoal & Cream',
  'Natural Bleached Sand & Jute',
  'Multi-Color Bohemian Vintage',
];

export const CustomRugWizard: React.FC = () => {
  const { submitCustomQuote } = useStore();
  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1);
  const [selectedWeave, setSelectedWeave] = useState(WEAVE_TYPES[0]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [widthFeet, setWidthFeet] = useState('6');
  const [lengthFeet, setLengthFeet] = useState('9');
  const [selectedColors, setSelectedColors] = useState(COLOR_PREFERENCES[0]);
  const [patternStyle, setPatternStyle] = useState('Tribal Diamond Geometry with Medallion Center');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [notes, setNotes] = useState('');
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  // Dynamic Price Calculation in INR
  const widthNum = parseFloat(widthFeet) || 6;
  const lengthNum = parseFloat(lengthFeet) || 9;
  const sqFt = widthNum * lengthNum;
  const estimatedBasePrice = Math.round(sqFt * selectedWeave.pricePerSqFt * quantity);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Please fill in your contact information.');
      return;
    }

    const newQuote = submitCustomQuote({
      name,
      email,
      phone,
      country,
      productType: `${selectedWeave.name} (${selectedShape})`,
      width: `${widthFeet} ft`,
      length: `${lengthFeet} ft`,
      preferredColors: selectedColors,
      patternStyle,
      material: selectedWeave.material,
      quantity,
      additionalNotes: notes,
      estimatedPriceInr: estimatedBasePrice,
    });

    setSubmittedQuoteId(newQuote.id);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello JaipurPinkCityRugs Studio,\n\nI would like to request a Custom Rug Quote:\n- Type: ${selectedWeave.name}\n- Shape: ${selectedShape}\n- Dimensions: ${widthFeet} ft x ${lengthFeet} ft (${sqFt} sq. ft)\n- Colors: ${selectedColors}\n- Style: ${patternStyle}\n- Quantity: ${quantity}\n- Estimated Quote: ${formatPrice(estimatedBasePrice)}\n- Customer: ${name || 'Prospective Client'} (${country})\n- Notes: ${notes || 'None'}\n\nPlease share yarn color swatches, loom lead time, and confirmation.`
  );

  if (submittedQuoteId) {
    return (
      <div className="bg-white rounded-2xl border border-sandstone-300 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-luxury animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Request Received
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warmbrown-900 mt-1">
          Thank You, {name}!
        </h3>
        <p className="text-xs sm:text-sm text-sandstone-700 mt-3 leading-relaxed">
          Your custom rug request <strong className="font-mono text-warmbrown-900">#{submittedQuoteId}</strong> has been assigned to our senior master weaver in Jaipur. We will email your formal digital sketch and wool yarn swatches within <strong>24 hours</strong>.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-sandstone-50 border border-sandstone-200 text-left text-xs space-y-1.5 text-sandstone-800">
          <div><strong>Configured Weave:</strong> {selectedWeave.name}</div>
          <div><strong>Dimensions:</strong> {widthFeet} ft × {lengthFeet} ft ({sqFt} sq. ft)</div>
          <div><strong>Color Palette:</strong> {selectedColors}</div>
          <div><strong>Estimated Value:</strong> {formatPrice(estimatedBasePrice)} (Includes Express Worldwide Delivery)</div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/919829012345?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp Directly</span>
          </a>

          <button
            onClick={() => {
              setSubmittedQuoteId(null);
              setStep(1);
            }}
            className="w-full sm:w-auto py-3 px-6 rounded-xl border border-sandstone-300 hover:bg-sandstone-100 text-warmbrown-800 text-xs font-semibold transition-colors"
          >
            Configure Another Rug
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-sandstone-200 shadow-luxury overflow-hidden">
      {/* Wizard Progress Steps */}
      <div className="bg-sandstone-100/70 border-b border-sandstone-200 p-4 sm:p-5">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs font-semibold">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center space-x-1.5 transition-colors ${
              step >= 1 ? 'text-terracotta-700 font-bold' : 'text-sandstone-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 1 ? 'bg-terracotta-600 text-white' : 'bg-sandstone-300 text-sandstone-700'
            }`}>1</span>
            <span className="hidden sm:inline">Weave & Shape</span>
          </button>
          <div className="flex-1 h-0.5 bg-sandstone-300 mx-2" />
          <button
            onClick={() => setStep(2)}
            className={`flex items-center space-x-1.5 transition-colors ${
              step >= 2 ? 'text-terracotta-700 font-bold' : 'text-sandstone-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2 ? 'bg-terracotta-600 text-white' : 'bg-sandstone-300 text-sandstone-700'
            }`}>2</span>
            <span className="hidden sm:inline">Dimensions</span>
          </button>
          <div className="flex-1 h-0.5 bg-sandstone-300 mx-2" />
          <button
            onClick={() => setStep(3)}
            className={`flex items-center space-x-1.5 transition-colors ${
              step >= 3 ? 'text-terracotta-700 font-bold' : 'text-sandstone-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 3 ? 'bg-terracotta-600 text-white' : 'bg-sandstone-300 text-sandstone-700'
            }`}>3</span>
            <span className="hidden sm:inline">Colors & Pattern</span>
          </button>
          <div className="flex-1 h-0.5 bg-sandstone-300 mx-2" />
          <button
            onClick={() => setStep(4)}
            className={`flex items-center space-x-1.5 transition-colors ${
              step >= 4 ? 'text-terracotta-700 font-bold' : 'text-sandstone-500'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 4 ? 'bg-terracotta-600 text-white' : 'bg-sandstone-300 text-sandstone-700'
            }`}>4</span>
            <span className="hidden sm:inline">Quote Summary</span>
          </button>
        </div>
      </div>

      {/* Main Wizard Form */}
      <div className="p-6 sm:p-10">
        {/* STEP 1: Weave Type & Shape */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-warmbrown-900">
                1. Select Your Weaving Craft
              </h3>
              <p className="text-xs text-sandstone-600 mt-1">
                Choose the foundation craft technique handwoven by our artisans in Jaipur.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WEAVE_TYPES.map((weave) => (
                <div
                  key={weave.id}
                  onClick={() => setSelectedWeave(weave)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start space-x-3.5 ${
                    selectedWeave.id === weave.id
                      ? 'border-terracotta-600 bg-terracotta-50/50 shadow-sm'
                      : 'border-sandstone-200 hover:border-sandstone-300 bg-white'
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-sandstone-200">
                    <img src={weave.image} alt={weave.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-warmbrown-900 leading-tight">
                      {weave.name}
                    </h4>
                    <p className="text-[11px] text-sandstone-600 mt-0.5">{weave.material}</p>
                    <div className="text-xs font-bold text-terracotta-700 mt-1">
                      From {formatPrice(weave.pricePerSqFt)} / sq. ft
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
                Rug Shape
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHAPES.map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setSelectedShape(shape)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                      selectedShape === shape
                        ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 font-bold'
                        : 'border-sandstone-300 bg-white text-warmbrown-800 hover:border-sandstone-400'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-sandstone-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-colors"
              >
                <span>Continue to Dimensions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Dimensions */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-warmbrown-900">
                2. Enter Precise Custom Dimensions
              </h3>
              <p className="text-xs text-sandstone-600 mt-1">
                We loom rugs to your exact architectural specifications (Feet or Metric).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-sandstone-50 rounded-xl border border-sandstone-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1.5">
                  Width (Feet)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="30"
                  value={widthFeet}
                  onChange={(e) => setWidthFeet(e.target.value)}
                  className="w-full bg-white border border-sandstone-300 text-sm font-semibold text-warmbrown-900 p-3 rounded-lg focus:outline-none focus:border-terracotta-500"
                />
                <span className="text-[11px] text-sandstone-500 mt-1 block">
                  Approx. {Math.round(widthNum * 30.48)} cm
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1.5">
                  Length (Feet)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="50"
                  value={lengthFeet}
                  onChange={(e) => setLengthFeet(e.target.value)}
                  className="w-full bg-white border border-sandstone-300 text-sm font-semibold text-warmbrown-900 p-3 rounded-lg focus:outline-none focus:border-terracotta-500"
                />
                <span className="text-[11px] text-sandstone-500 mt-1 block">
                  Approx. {Math.round(lengthNum * 30.48)} cm
                </span>
              </div>
            </div>

            {/* Live Size & Estimate Calculation Card */}
            <div className="p-4 rounded-xl bg-terracotta-50/60 border border-terracotta-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-warmbrown-900">
                  Total Surface Area: <span className="text-terracotta-700">{sqFt} sq. ft</span>
                </div>
                <div className="text-sandstone-600">
                  Based on {selectedWeave.name} ({formatPrice(selectedWeave.pricePerSqFt)}/sq.ft)
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-sandstone-500 font-bold block">Estimated Value:</span>
                <span className="font-serif text-xl font-bold text-terracotta-700">{formatPrice(estimatedBasePrice)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-sandstone-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-warmbrown-700 hover:text-warmbrown-900"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-colors"
              >
                <span>Continue to Colors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Colors & Pattern Preference */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-warmbrown-900">
                3. Choose Colorway & Pattern Preference
              </h3>
              <p className="text-xs text-sandstone-600 mt-1">
                Select your desired aesthetic palette and geometric design style.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-2">
                Color Palette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COLOR_PREFERENCES.map((colorway) => (
                  <button
                    key={colorway}
                    type="button"
                    onClick={() => setSelectedColors(colorway)}
                    className={`p-3 rounded-lg text-xs font-medium border text-left transition-all ${
                      selectedColors === colorway
                        ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-800 font-bold shadow-sm'
                        : 'border-sandstone-300 bg-white text-warmbrown-800 hover:border-sandstone-400'
                    }`}
                  >
                    {colorway}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1.5">
                Pattern & Design Notes
              </label>
              <textarea
                rows={3}
                value={patternStyle}
                onChange={(e) => setPatternStyle(e.target.value)}
                placeholder="e.g. Traditional Anatolian tribal diamonds, solid field with delicate border, minimal Scandinavian pinstripe..."
                className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-sandstone-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-warmbrown-700 hover:text-warmbrown-900"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-colors"
              >
                <span>Review & Contact Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review, Contact & Submit */}
        {step === 4 && (
          <form onSubmit={handleSubmitQuote} className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-warmbrown-900">
                4. Review Custom Rug & Receive Quote
              </h3>
              <p className="text-xs text-sandstone-600 mt-1">
                Enter your contact info to receive detailed yarn samples, CAD layout, and exact shipping quote.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-sandstone-100 border border-sandstone-200 text-xs space-y-1.5 text-sandstone-800">
              <div className="flex justify-between">
                <span>Weave Craft:</span>
                <strong>{selectedWeave.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Dimensions & Shape:</span>
                <strong>{widthFeet} ft × {lengthFeet} ft ({selectedShape})</strong>
              </div>
              <div className="flex justify-between">
                <span>Palette:</span>
                <strong>{selectedColors}</strong>
              </div>
              <div className="flex justify-between text-sm font-bold text-terracotta-700 pt-2 border-t border-sandstone-200">
                <span>Estimated Price:</span>
                <span>{formatPrice(estimatedBasePrice)}</span>
              </div>
            </div>

            {/* Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
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
                  className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States, UK, Australia, India..."
                  className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmbrown-800 mb-1">
                Additional Room Notes or Architecture Constraints
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need matching hallway runner, specific fireplace hearth cutout..."
                className="w-full bg-white border border-sandstone-300 text-xs sm:text-sm text-warmbrown-900 p-2.5 rounded-lg focus:outline-none focus:border-terracotta-500"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-sandstone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-semibold text-warmbrown-700 hover:text-warmbrown-900 order-2 sm:order-1"
              >
                Back
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
                <a
                  href={`https://wa.me/919829012345?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-terracotta-600 hover:bg-terracotta-700 text-white py-3 px-6 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quote Request</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
