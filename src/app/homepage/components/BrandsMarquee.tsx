'use client';

import React from 'react';

interface BrandsMarqueeProps {
  brands: string[];
}

const LOGO_MAPPING: Record<string, string> = {
  'Galby': '/img/galby.png',
  'Evoluderm': '/img/evoluderm_b.png',
  'MAGICLEAR': '/img/magiclear.png',
  'cosmetix': '/img/cosmetix_b.png',
  'Cleare': '/img/cleare_b.png',
  'soivre': '/img/soivre.png',
  'CAPI LIFT': '/img/capilift.png',
  'pauldevartens': '/img/pauldevartens.png',
  'Aifa': '/img/aifa.png',
  'Alfa': '/img/alfa_logo.png',
  'Biomed': '/img/biomed.png',
  'Cipollino': '/img/cipollino.png',
  'Davaj': '/img/davaj.png',
  'Dentyucral': '/img/dentyucral.png',
  'Mira': '/img/mira.png',
  'Reistill': '/img/reistill.png',
  'Volumax': '/img/volumax.png',
};

const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({ brands }) => {
  // If no brands from API, use keys from LOGO_MAPPING as fallback for demo
  const displayBrands = brands.length > 0 ? brands : Object.keys(LOGO_MAPPING);

  // Triple the list to ensure seamless looping
  const marqueeItems = [...displayBrands, ...displayBrands, ...displayBrands];

  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <style>{`
        .marquee-container {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .brand-item {
          flex: 0 0 auto;
          width: 200px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 40px;
          transition: transform 0.3s ease;
        }
        .brand-item:hover {
          transform: scale(1.1);
        }
        .brand-logo {
          max-width: 100%;
          max-height: 50px;
          object-fit: contain;
          filter: grayscale(100%) opacity(0.6);
          transition: all 0.3s ease;
        }
        .brand-item:hover .brand-logo {
          filter: grayscale(0%) opacity(1);
        }
        .brand-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>

      <div className="relative">
        {/* Faded edges for premium feel */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-container">
          {marqueeItems.map((brand, index) => {
            const logoPath = LOGO_MAPPING[brand] || LOGO_MAPPING[Object.keys(LOGO_MAPPING).find(k => k.toLowerCase() === brand.toLowerCase()) || ''];
            
            return (
              <div key={`${brand}-${index}`} className="brand-item">
                {logoPath ? (
                  <img src={logoPath} alt={brand} className="brand-logo" />
                ) : (
                  <span className="brand-text">{brand}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandsMarquee;
