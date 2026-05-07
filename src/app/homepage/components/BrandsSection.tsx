"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

const BRANDS = [
  { name: "Galby", logo: "/img/galby.png" },
  { name: "Evoluderm", logo: "/img/evoluderm_b.png" },
  { name: "MAGICLEAR", logo: "/img/magiclear.png" },
  { name: "cosmetix", logo: "/img/cosmetix_b.png" },
  { name: "Cleare", logo: "/img/cleare_b.png" },
  { name: "soivre", logo: "/img/soivre.png" },
  { name: "CAPI LIFT", logo: "/img/capilift.png" },
  { name: "pauldevartens", logo: "/img/pauldevartens.png" },


];

export default function BrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(60px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const photoIn = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.92)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const BRANDS_COL1 = BRANDS.slice(0, 4);
  const BRANDS_COL2 = BRANDS.slice(4, 8);

  return (
    <>
      <style>{`
        @keyframes brandsSectionFloatUp {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-42px); }
        }
        @keyframes brandsSectionFloatDown {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(42px); }
        }
        .brands-col-a { animation: brandsSectionFloatUp 7s ease-in-out infinite; }
        .brands-col-b { animation: brandsSectionFloatDown 7s ease-in-out infinite; }

        .brands-card img {
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .brands-card:hover img { transform: scale(1.08); }
      `}</style>
      <section ref={sectionRef} className="w-full max-h-[1200px] md:max-h-[900px] bg-[#E5E7EB] md:bg-white pb-6 md:pb-0 overflow-hidden">
      <div className="flex justify-between flex-col md:flex-row min-h-[500px]">
        {/* Left — text */}
        <div 
          className="flex-1 max-h-[900px] bg-[#6974b4] px-4 md:px-8 py-16 md:py-24 flex flex-col justify-center items-center text-white relative z-10"
          style={fadeUp(0)}
        >
          <div className="max-w-xl ml">
            <h2 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.1] mb-6">
              Des Marques Pensées
              <br />
              <span className="text-white">Pour Chaque Besoin</span>
            </h2>
            <p className="text-white/80 text-[16px] leading-[1.8] mb-10">
              ICG développe et accompagne des marques expertes sur l&apos;ensemble de la chaîne de valeur, avec une stratégie de segmentation claire, afin d&apos;offrir un positionnement cohérent et de qualité.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/nos-marques"
                className="inline-flex items-center justify-center px-3 py-3 border border-white/40 text-white hover:bg-white hover:text-[#6a739e] transition-colors rounded-sm text-[10px] font-medium tracking-wide uppercase"
              >
                Voir toutes les marques
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </a>
              <button className="inline-flex items-center justify-center gap-3 text-white font-medium text-[10px] hover:text-white/70 transition-colors uppercase" onClick={() => window.location.href = "/products"}>
                <span className="w-50 h-10 border border-white/50 rounded-full flex items-center justify-center">
                <ShoppingCart />
                Acheter en ligne
                </span>
                
              </button>
            </div>
          </div>
        </div>

        {/* Right — brand grid 2 cols x 3 rows */}
        <div className="flex-1 bg-[#e2e3ed] py-16 md:py-20 flex items-center justify-center relative z-0 overflow-hidden">
          
          {/* Top/bottom blur matching hero */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10"
            style={{ background: "linear-gradient(to bottom, rgb(249 250 251) 0%, transparent 100%)" }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
            style={{ background: "linear-gradient(to top, rgb(249 250 251) 0%, transparent 100%)" }}
          />

          <div className="flex w-full max-w-lg lg:max-w-[480px] relative px-6 md:px-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
              
              {/* Column A — floats upward */}
              <div className="brands-col-a flex flex-col gap-3 md:gap-4" style={{ marginTop: "-78px" }}>
                {BRANDS_COL1.map((brand, i) => (
                  <div
                    key={brand.name}
                    className="brands-card bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm hover:shadow-md cursor-pointer w-full"
                    style={{ ...photoIn(0.15 + i * 0.14), height: '240px' }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 md:h-12 w-full object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* Column B — floats downward */}
              <div className="brands-col-b flex flex-col gap-3 md:gap-4" style={{ marginTop: "-150px" }}>
                {BRANDS_COL2.map((brand, i) => (
                  <div
                    key={brand.name}
                    className="brands-card bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm hover:shadow-md cursor-pointer w-full"
                    style={{ ...photoIn(0.3 + i * 0.14), height: '240px' }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 md:h-12 w-full object-contain"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
