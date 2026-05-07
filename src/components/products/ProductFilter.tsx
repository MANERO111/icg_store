'use client';
import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

interface ProductFilterProps {
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  searchQuery: string;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  minPrice,
  maxPrice,
  sortBy,
  searchQuery,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  isOpen = true,
  onClose,
}) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#e4006d';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(26,26,46,0.12)';
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    width: '100%',
    background: '#fff',
    border: '1px solid rgba(26,26,46,0.12)',
    borderRadius: '2px',
    color: '#1a1a2e',
    fontSize: '12px',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'rgba(26,26,46,0.45)',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 lg:w-full overflow-y-auto z-50 lg:z-0 p-6
          transition-transform duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: '#fff',
          border: '1px solid rgba(26,26,46,0.08)',
          borderRadius: '4px',
        }}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="flex items-center gap-2 font-bold text-base text-[#1a1a2e]" style={{ fontFamily: "'Syne', sans-serif" }}>
            <SlidersHorizontal size={18} style={{ color: '#e4006d' }} />
            Filtres
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[#e4006d]/08"
              style={{ border: '1px solid rgba(26,26,46,0.12)', color: '#1a1a2e' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Desktop header */}
        <div className="hidden lg:flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(26,26,46,0.08)' }}>
          <SlidersHorizontal size={14} style={{ color: '#e4006d' }} />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a2e]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Affiner
          </span>
        </div>

        {/* Search */}
        <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(26,26,46,0.07)' }}>
          <label style={labelStyle}>Rechercher</label>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Nom du produit…"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Price range */}
        <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(26,26,46,0.07)' }}>
          <label style={labelStyle}>Prix (DH)</label>
          <div className="flex flex-col gap-3">
            <div>
              <span style={{ ...labelStyle, fontSize: '9px', marginBottom: '5px' }}>Minimum</span>
              <input type="number" value={minPrice} onChange={e => onMinPriceChange(Number(e.target.value))} min="0" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div>
              <span style={{ ...labelStyle, fontSize: '9px', marginBottom: '5px' }}>Maximum</span>
              <input type="number" value={maxPrice} onChange={e => onMaxPriceChange(Number(e.target.value))} min="0" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            {/* Range bar */}
            <div className="mt-1">
              <div className="relative h-[3px] w-full rounded-full overflow-hidden" style={{ background: 'rgba(26,26,46,0.08)' }}>
                <div
                  className="absolute top-0 h-full rounded-full transition-all duration-300"
                  style={{
                    left: `${(minPrice / 10000) * 100}%`,
                    right: `${100 - (maxPrice / 10000) * 100}%`,
                    background: 'linear-gradient(90deg, #e4006d, #8b1a8b)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(26,26,46,0.35)' }}>{minPrice} DH</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(26,26,46,0.35)' }}>{maxPrice} DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <label style={labelStyle}>Trier par</label>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            style={{
              ...inputStyle,
              appearance: 'none',
              WebkitAppearance: 'none',
              cursor: 'pointer',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e4006d' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px',
              background: '#fff',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="">Par défaut</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="name_asc">Nom A → Z</option>
            <option value="name_desc">Nom Z → A</option>
          </select>
        </div>

        {/* Clear button */}
        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:opacity-80 group"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: 'rgba(228,0,109,0.06)',
            border: '1px solid rgba(228,0,109,0.2)',
            borderRadius: '2px',
            color: '#e4006d',
            cursor: 'pointer',
          }}
        >
          <X size={11} />
          Réinitialiser les filtres
        </button>
      </aside>
    </>
  );
};

export default ProductFilter;