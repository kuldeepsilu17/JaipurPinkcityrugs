'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, X, Plus, ShoppingBag, CheckCircle2, Ruler } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ComparePage() {
  const { products } = useStore();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    products[0]?.id || '',
    products[1]?.id || '',
    products[2]?.id || '',
  ].filter(Boolean));

  const compareProducts = selectedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is typeof products[0] => p !== undefined);

  const removeProduct = (id: string) => {
    setSelectedProductIds((prev) => prev.filter((item) => item !== id));
  };

  const addProductToCompare = (id: string) => {
    if (selectedProductIds.length >= 3) return;
    if (!selectedProductIds.includes(id)) {
      setSelectedProductIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: 'Rug Comparison Tool' },
        ]}
      />

      <div className="border-b border-sandstone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          Side-By-Side Evaluation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
          Compare Handcrafted Rugs ({compareProducts.length} / 3)
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
          Compare weave techniques, materials, pile heights, and pricing to find the right fit for your home.
        </p>
      </div>

      {compareProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-sandstone-200 p-8 space-y-4">
          <p className="text-xs text-sandstone-600">No products currently selected for comparison.</p>
          <Link
            href="/shop"
            className="inline-block bg-terracotta-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl border border-sandstone-200 shadow-luxury">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-sandstone-200 bg-sandstone-50">
                <th className="p-4 w-48 font-bold text-warmbrown-900 uppercase tracking-wider">Features</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="p-4 text-center w-64 relative">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 text-sandstone-400 hover:text-red-500 rounded-full"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative w-36 h-44 mx-auto rounded-xl overflow-hidden bg-sandstone-100 mb-2 border border-sandstone-200">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif font-bold text-sm text-warmbrown-900 hover:text-terracotta-700 line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <div className="text-sm font-bold text-terracotta-700 mt-1">
                      {formatPrice(product.price)}
                    </div>
                    <button
                      onClick={() => addToCart(product, product.variants[0], product.colors[0], 1, undefined, true)}
                      className="mt-2 w-full py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg shadow-sm"
                    >
                      Add to Bag
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sandstone-200">
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Category</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center font-semibold text-warmbrown-900">{p.categoryName}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Weave Craft</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sandstone-700">{p.weaveType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Fiber Composition</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sandstone-700">{p.materials.join(', ')}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Pile Height</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sandstone-700">{p.pileHeight || 'Flatweave'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Origin</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sandstone-700">{p.origin}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Available Sizes</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sandstone-700">{p.sizes.join(', ')}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-warmbrown-900 bg-sandstone-50">Rating</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center font-bold text-ochre-600">★ {p.rating} ({p.reviewCount} reviews)</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
