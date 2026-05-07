'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
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

const PromoBanner = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-6">
      <div
        className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <div
          className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8"
          style={{ background: 'linear-gradient(135deg,#e4006d 0%,#c4006d 20%,#8b1a8b 55%,#3d2080 100%)', borderRadius: '10px' }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/[0.05]" />
          <div className="absolute -bottom-8 right-20 w-32 h-32 rounded-full bg-white/[0.05]" />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/60 mb-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>Offre limitée</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
              Jusqu'à <span className="text-white/90 border-b-2 border-white/50">−30%</span> sur les promotions
            </h3>
            <p className="text-[12px] text-white/60 mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>Profitez de nos meilleures offres sur une sélection de produits.</p>
          </div>
          <Link
            href="/products"
            className="relative z-10 flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold tracking-[0.22em] uppercase flex-shrink-0 transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'DM Sans',sans-serif", background: '#fff', color: '#e4006d', borderRadius: '3px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textDecoration: 'none' }}
          >
            Voir les promos <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
