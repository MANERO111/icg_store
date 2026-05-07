'use client';
import React, { useRef } from 'react';
import { Star } from 'lucide-react';

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

const reviews = [
  { name: 'Fatima Z.', city: 'Casablanca', rating: 5, text: "Le sérum MagiClear a transformé ma peau en 3 semaines. Je ne m'y attendais pas du tout, résultats visibles très rapidement!", product: 'Sérum Éclat Intense' },
  { name: 'Khadija M.', city: 'Rabat', rating: 5, text: "Livraison ultra rapide et produits authentiques. L'huile d'argan Soivre est incroyable, une texture soyeuse et une odeur divine.", product: 'Huile Précieuse Argan' },
  { name: 'Leila B.', city: 'Marrakech', rating: 5, text: "J'utilise ICG Store depuis 6 mois maintenant. Excellent service client et surtout des produits vraiment efficaces et Made in Morocco.", product: 'Crème Hydratante 24h' },
  { name: 'Sara A.', city: 'Fès', rating: 4, text: 'Les prix sont imbattables pour une telle qualité. Le masque Evoluderm est mon coup de cœur absolu de cette saison.', product: 'Masque Purifiant Kaolin' },
];

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-20" style={{ background: '#faf8f8' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-12" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, #e4006d)' }} />
            <span className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#e4006d]" style={{ fontFamily: "'DM Sans',sans-serif" }}>Avis clients</span>
            <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, #e4006d, transparent)' }} />
          </div>
          {/* <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: "'Cormorant Garamond',sans-serif" }}>Ce qu'ils disent</h2> */}
          <h2
            className="text-4xl md:text-[52px] font-light text-[#1a1a2e] leading-[1.06]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ce qu&apos;ils &nbsp;
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(110deg, #e4006d 0%, #c4006d 40%, #8b1a8b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              disent
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="flex flex-col p-6 bg-white transition-all duration-500 hover:-translate-y-2"
              style={{
                border: '1px solid rgba(26,26,46,0.07)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={12} fill="#e4006d" stroke="#e4006d" />
                ))}
              </div>
              <p className="text-[12px] font-light leading-relaxed text-[#1a1a2e]/65 flex-grow mb-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>&quot;{r.text}&quot;</p>
              <div className="border-t pt-4" style={{ borderColor: 'rgba(26,26,46,0.07)' }}>
                <p className="text-[11px] font-bold text-[#1a1a2e]" style={{ fontFamily: "'Syne',sans-serif" }}>{r.name}</p>
                <p className="text-[9px] text-[#1a1a2e]/35 mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>{r.city} · {r.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
