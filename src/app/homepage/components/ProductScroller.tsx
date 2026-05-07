'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { HomeProduct } from '@/hooks/useHomeProducts';

const SCROLL_AMOUNT = 300;

interface Props {
  products: HomeProduct[];
  title: string;
  subtitle: string;
  href: string;
}

function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const ProductScroller = ({ products, title, subtitle, href }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const inView = useInView(sectionRef);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progressPct, setProgressPct] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  /* ── scroll tracking ── */
  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < max - 8);
    setProgressPct(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => el.removeEventListener('scroll', updateScroll);
  }, [updateScroll, products]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  /* ── drag scroll ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragStartX(e.pageX - scrollRef.current.offsetLeft);
    setDragScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft - (x - dragStartX);
  };
  const stopDrag = () => setIsDragging(false);

  if (!products.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20"
    >
      {/* ── Subtle background accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #e4006d 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-48 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #8b1a8b 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #1a1a2e 0px, #1a1a2e 1px, transparent 0px, transparent 8px)',
            backgroundSize: '12px 12px',
          }}
        />
      </div>

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(228,0,109,0.35) 35%, rgba(139,26,139,0.35) 65%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto">

        {/* ── Header ── */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-6 md:px-10 mb-12 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-px bg-gradient-to-r from-[#e4006d] to-transparent" />
              <span
                className="text-[10px] font-semibold tracking-[0.38em] uppercase text-[#e4006d]"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                {subtitle}
              </span>
              <div className="w-9 h-px bg-gradient-to-l from-[#8b1a8b] to-transparent" />
            </div>

            <h2
              className="text-4xl md:text-[52px] font-light text-[#1a1a2e] leading-[1.06]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(110deg, #e4006d 0%, #c4006d 40%, #8b1a8b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title.split(' ').slice(-1)[0]}
              </em>
            </h2>

            <p
              className="mt-3 text-[12.5px] font-light tracking-[0.04em] text-[#1a1a2e]/40 leading-[1.8]"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {products.length} produits disponibles
            </p>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            <Link
              href={href}
              className="hidden md:flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] uppercase text-[#1a1a2e]/40 hover:text-[#e4006d] transition-colors duration-300 border-b border-transparent hover:border-[#e4006d] pb-px"
              style={{ fontFamily: "'DM Sans',sans-serif", textDecoration: 'none' }}
            >
              Voir tout <ArrowRight size={12} />
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canLeft}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  borderColor: canLeft ? 'rgba(228,0,109,0.5)' : 'rgba(26,26,46,0.1)',
                  color: canLeft ? '#e4006d' : 'rgba(26,26,46,0.2)',
                  background: canLeft ? 'rgba(228,0,109,0.06)' : 'transparent',
                }}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canRight}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  borderColor: canRight ? 'rgba(139,26,139,0.5)' : 'rgba(26,26,46,0.1)',
                  color: canRight ? '#8b1a8b' : 'rgba(26,26,46,0.2)',
                  background: canRight ? 'rgba(139,26,139,0.06)' : 'transparent',
                }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Products track ── */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className="flex gap-5 px-6 md:px-10 pb-10 overflow-x-auto"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {products.map((p, i) => (
            <div
              key={p.id}
              className="transition-all duration-500"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${i * 60 + 150}ms`,
              }}
            >
              <ProductCard p={p} index={i} />
            </div>
          ))}

          {/* End "Voir tout" card */}
          <Link
            href={href}
            className="flex-shrink-0 w-[150px] flex flex-col items-center justify-center gap-4 group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                border: '1px solid rgba(228,0,109,0.3)',
                background: 'rgba(228,0,109,0.05)',
              }}
            >
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: '#e4006d' }}
              />
            </div>
            <span
              className="text-[9.5px] font-medium tracking-[0.24em] uppercase text-[#1a1a2e]/32 group-hover:text-[#e4006d] transition-colors duration-300 text-center leading-relaxed"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              Voir tous<br />les produits
            </span>
          </Link>
        </div>

        {/* ── Progress bar ── */}
        <div className="px-6 md:px-10 mt-1">
          <div
            className="relative h-px overflow-hidden"
            style={{ background: 'rgba(26,26,46,0.07)' }}
          >
            <div
              className="absolute left-0 top-0 h-full transition-all duration-150 ease-out"
              style={{
                width: `${Math.max(progressPct, 4)}%`,
                background: 'linear-gradient(90deg, #e4006d, #8b1a8b)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(228,0,109,0.22) 35%, rgba(139,26,139,0.22) 65%, transparent 100%)',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default ProductScroller;
