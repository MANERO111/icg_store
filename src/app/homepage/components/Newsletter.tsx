'use client';
import React, { useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

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

const Newsletter = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10">
        <div
          className="relative overflow-hidden text-center px-8 py-14"
          style={{
            background: 'linear-gradient(135deg,#e4006d 0%,#c4006d 20%,#8b1a8b 55%,#3d2080 100%)',
            borderRadius: '12px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04]" />

          <div className="relative z-10">
            <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-white/60 mb-3" style={{ fontFamily: "'DM Sans',sans-serif" }}>Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>Restez dans la beauté</h2>
            <p className="text-[13px] text-white/60 max-w-md mx-auto mb-8" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Recevez nos dernières offres, nouveautés et conseils beauté directement dans votre boîte mail.
            </p>

            {sent ? (
              <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
                <Sparkles size={16} className="text-white" />
                <span className="text-[12px] font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Merci de votre inscription !</span>
              </div>
            ) : (
              <div className="flex max-w-md mx-auto gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail…"
                  className="flex-1 px-5 py-3.5 text-[12px] font-light outline-none placeholder-white/40 text-white"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '3px', fontFamily: "'DM Sans',sans-serif" }}
                  onKeyDown={e => { if (e.key === 'Enter' && email.trim()) setSent(true); }}
                />
                <button
                  onClick={() => email.trim() && setSent(true)}
                  className="flex items-center gap-2 px-6 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#e4006d] transition-all duration-300 hover:scale-105 flex-shrink-0"
                  style={{ background: '#fff', borderRadius: '3px', fontFamily: "'DM Sans',sans-serif" }}
                >
                  S'inscrire <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
