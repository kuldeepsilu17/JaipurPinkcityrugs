'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function BlogListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Artisan Journal' },
          { label: 'Rug Design & Craft Articles' },
        ]}
      />

      <div className="border-b border-sandstone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
          The Jaipur Loom Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmbrown-900 mt-1">
          Artisan Craft & Interior Styling
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-600 mt-1">
          Guides on handmade Indian kilims, architectural rug sizing, vegetable dye histories, and heirloom care.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-2xl border border-sandstone-200/90 overflow-hidden shadow-subtle hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sandstone-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-warmbrown-900/90 backdrop-blur-sm text-ochre-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {post.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-2">
                <div className="flex items-center space-x-2 text-[11px] text-sandstone-500">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readingTimeMinutes} min read</span>
                </div>

                <h2 className="font-serif font-bold text-lg text-warmbrown-900 group-hover:text-terracotta-700 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-sandstone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 border-t border-sandstone-100 mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-sandstone-200">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-warmbrown-900">{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center space-x-1 text-xs font-bold text-terracotta-600 hover:text-terracotta-700"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
