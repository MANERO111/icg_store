'use client';
import React from 'react';
import Link from 'next/link';
import type { HomeCategory } from '@/hooks/useHomeProducts';

const STYLES = [
  { gradient: 'from-[#e4006d] to-[#8b1a8b]' },
  { gradient: 'from-[#8b1a8b] to-[#3d2080]' },
  { gradient: 'from-[#3d2080] to-[#5b2d8e]' },
  { gradient: 'from-[#c4006d] to-[#e4006d]' },
  { gradient: 'from-[#5b2d8e] to-[#8b1a8b]' },
  { gradient: 'from-[#e4006d] to-[#c4006d]' },
];

interface Props {
  categories: HomeCategory[];
}

const Categories = ({ categories }: Props) => {
  const staticFallback: HomeCategory[] = [
    { id: 1, name: 'Visage', slug: 'visage' },
    { id: 2, name: 'Corps', slug: 'corps' },
    { id: 3, name: 'Solaire', slug: 'solaire' },
    { id: 4, name: 'Cheveux', slug: 'cheveux' },
    { id: 5, name: 'Bébé', slug: 'bebe' },
    { id: 6, name: 'Promotions', slug: 'promotions' },
    { id: 1, name: 'Visage', slug: 'visage' },
    { id: 2, name: 'Corps', slug: 'corps' },
    { id: 3, name: 'Solaire', slug: 'solaire' },
    { id: 4, name: 'Cheveux', slug: 'cheveux' },
    { id: 5, name: 'Bébé', slug: 'bebe' },
    { id: 6, name: 'Promotions', slug: 'promotions' },
  ];

  const items = categories.length ? categories : staticFallback;
  // Duplicate items for a seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 mb-10">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#e4006d] mb-2">
            ICG Collections
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-syne">
            Nos Univers
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Soft edge fades for luxury look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-infinite-scroll">
          {duplicatedItems.map((cat, i) => {
            const style = STYLES[i % STYLES.length];
            const href = cat.slug === 'promotions'
              ? '/products?promotions=true'
              : `/products?category=${cat.slug}`;

            return (
              <Link
                key={`${cat.id}-${i}`}
                href={href}
                className="group relative inline-flex items-center justify-center px-10 py-6 mx-2 min-w-[200px]"
              >
                {/* Background Shadow Effect */}
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl scale-95 group-hover:scale-100" />
                
                <div className="relative flex flex-col items-center">
                  <span className="text-sm md:text-base font-bold text-slate-800 tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-[#e4006d]">
                    {cat.name}
                  </span>
                  
                  {/* The Animated Line */}
                  <div className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${style.gradient} mt-1`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;