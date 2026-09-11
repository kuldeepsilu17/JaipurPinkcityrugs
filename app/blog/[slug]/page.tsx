'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Sparkles, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Artisan Journal', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="space-y-8">
        {/* Article Header */}
        <div className="space-y-3">
          <span className="bg-terracotta-50 text-terracotta-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-terracotta-200">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warmbrown-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-xs text-sandstone-500 pt-2 border-b border-sandstone-200 pb-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-sandstone-200">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <span className="font-semibold text-warmbrown-900">{post.author.name}</span>
            </div>
            <span>•</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-sandstone-100 shadow-luxury border border-sandstone-200">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-sandstone max-w-none text-xs sm:text-sm text-sandstone-800 leading-relaxed space-y-4">
          <div className="p-4 rounded-xl bg-sandstone-100/70 border-l-4 border-terracotta-600 font-medium italic text-warmbrown-900">
            {post.excerpt}
          </div>

          <div className="whitespace-pre-line font-sans space-y-3">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-sandstone-200 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-sandstone-100 text-warmbrown-800 px-3 py-1 rounded-full border border-sandstone-200">
              #{tag}
            </span>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-warmbrown-800 hover:text-terracotta-600 underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
