'use client';
import React, { useRef } from 'react';
import { Shield, Truck, RotateCcw, Phone } from 'lucide-react';

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

const items = [
  { icon: <Shield size={22} />, title: 'Qualité Certifiée', desc: 'Tous nos produits sont testés dermatologiquement et certifiés conformes.' },
  { icon: <Truck size={22} />, title: 'Livraison Rapide', desc: 'Livraison partout au Maroc sous 24 à 48 heures ouvrables.' },
  { icon: <RotateCcw size={22} />, title: 'Retour Facile', desc: "30 jours pour changer d'avis. Retours gratuits et sans question." },
  { icon: <Phone size={22} />, title: 'Support 7j/7', desc: 'Notre équipe est disponible tous les jours de 9h à 20h.' },
];

const WhyUs = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 p-6 transition-all duration-500 hover:-translate-y-2"
              style={{
                border: '1px solid rgba(26,26,46,0.08)',
                borderRadius: '8px',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(228,0,109,0.08)', color: '#e4006d' }}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>{item.title}</h4>
                <p className="text-[11px] font-light leading-relaxed text-[#1a1a2e]/45" style={{ fontFamily: "'DM Sans',sans-serif" }}>{item.desc}</p>
              </div>
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg,#e4006d,#8b1a8b)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
