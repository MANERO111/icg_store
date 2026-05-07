'use client';
import React from 'react';
import { useHomeProducts } from '@/hooks/useHomeProducts';

import Hero from './components/Hero';
import Divider from './components/Divider';
import ProductScroller from './components/ProductScroller';
import Categories from './components/Categories';
import PromoBanner from './components/PromoBanner';
import WhyUs from './components/WhyUs';
import BrandsMarquee from './components/BrandsMarquee';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import WeeklyHighlights from './components/WeeklyHighlights';

/* ─────────────────────────────────────────
   HOME PAGE — thin orchestrator
   All data comes from useHomeProducts()
───────────────────────────────────────── */
export default function HomePage() {
  const { featured, promo, newArrivals, categories, brands, loading } = useHomeProducts();
  const emptyBrands = brands || []
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes scrollCue {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes wordSlide {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* 1 ── HERO */}
        <Hero />

        {/* 2 ── FEATURED PRODUCTS SCROLLER */}
        <Divider />
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#e4006d] border-t-transparent animate-spin" />
          </div>
        ) : (
          <ProductScroller
            products={featured}
            title="Produits Vedettes"
            subtitle="Sélection du moment"
            href="/products"
          />
        )}

        {/* 3 ── CATEGORIES */}
        <Divider />
        <Categories categories={categories} />

        {/* 4 ── PROMO PRODUCTS SCROLLER */}
        <Divider />
        {!loading && (
          <ProductScroller
            products={promo}
            title="Meilleures Promotions"
            subtitle="Offres spéciales"
            href="/products?promotions=true"
          />
        )}

        {/* 5 ── PROMO BANNER */}
        <PromoBanner />

        {/* 6 ── WHY US */}
        <Divider />
        <WhyUs />

        {/* 7 ── BRANDS MARQUEE */}
        {/* <BrandsMarquee brands={brands} /> */}
        <BrandsMarquee brands={emptyBrands} />

        {/* 8 ── NEW ARRIVALS SCROLLER */}
        {!loading && (
          <ProductScroller
            products={newArrivals}
            title="Nouvelles Arrivées"
            subtitle="Tout juste arrivé"
            href="/products"
          />
        )}

        {/* 9 ── BRAND SPOTLIGHT */}
        <Divider />
        <WeeklyHighlights products={featured} />
        {/* 10 ── TESTIMONIALS */}
        <Divider />
        <Testimonials />

        {/* 11 ── NEWSLETTER */}
        <Newsletter />

      </div>
    </>
  );
}