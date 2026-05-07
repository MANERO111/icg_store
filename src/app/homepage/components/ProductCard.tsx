'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { getProductImageUrl } from '@/utils/imageHelper';
import ProductModal from '@/components/products/ProductModal';
import { Product as GlobalProduct } from '@/hooks/useProducts';
import type { HomeProduct } from '@/hooks/useHomeProducts';

/* ── accent alternation — ICG palette ── */
const ACCENT = ['#e4006d', '#8b1a8b'] as const;
const ACCENT_RGB = ['228,0,109', '139,26,139'] as const;

interface Props {
  p: HomeProduct;
  index?: number;
}

/**
 * ModalPortal — renders children directly into document.body via a React portal.
 * This escapes any parent `transform` / `overflow:hidden` that would otherwise
 * break `position:fixed` inside the card.
 */
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

const ProductCard = ({ p, index = 0 }: Props) => {
  const col = ACCENT[index % 2];
  const rgb = ACCENT_RGB[index % 2];

  const [hovered, setHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.includes(p.id);

  /* ── cart ── */
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addingToCart || (p.stock_quantity ?? 1) === 0) return;

    setAddingToCart(true);
    try {
      await addToCart(p, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch (err) {
      console.error('Add to cart error:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  /* ── wishlist ── */
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(p.id);
  };

  /* ── modal ── */
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const outOfStock = (p.stock_quantity ?? 1) === 0;
  const imgSrc = getProductImageUrl(p.image_url);

  // Build the shape ProductModal expects (Product from useProducts)
  const modalProduct: GlobalProduct = {
    id: p.id,
    name: p.name,
    brand: p.brand ?? '',
    slug: p.slug,
    description: p.description ?? '',
    original_price: Number(p.original_price ?? p.price),
    discounted_price: p.discounted_price ?? null,
    price: p.price,
    image_url: p.image_url ?? '',
    stock_quantity: p.stock_quantity ?? 0,
    category_id: 0,
    active: p.active ?? true,
    created_at: p.created_at ?? '',
    updated_at: '',
  };

  return (
    <>
      {/* ── Card (no modal inside — avoids transform containment bug) ── */}
      <div
        className="flex-shrink-0 w-[230px] relative select-none cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
        draggable={false}
      >
        {/* Ghost index number */}
        <span
          className="absolute -top-6 -left-1 text-[88px] font-bold leading-none pointer-events-none select-none z-0 transition-opacity duration-500"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: `rgba(${rgb}, ${hovered ? 0.08 : 0.035})`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Card shell — has transform, so modal MUST NOT live inside here */}
        <div
          className="relative z-10 overflow-hidden bg-[#faf8f5] transition-all duration-500"
          style={{
            border: `1px solid ${hovered ? `rgba(${rgb},0.3)` : 'rgba(26,26,46,0.07)'}`,
            boxShadow: hovered
              ? `0 24px 56px rgba(${rgb},0.14), 0 4px 16px rgba(0,0,0,0.05)`
              : '0 2px 8px rgba(0,0,0,0.04)',
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 z-20 transition-opacity duration-300"
            style={{
              height: '2px',
              background: index % 2 === 0
                ? 'linear-gradient(90deg,#e4006d,transparent)'
                : 'linear-gradient(90deg,#8b1a8b,transparent)',
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Image */}
          <div className="relative h-[280px] overflow-hidden bg-[#f0ede8]">
            <img
              src={imgSrc}
              alt={p.name}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
              draggable={false}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400';
              }}
            />

            {/* Scrim */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, rgba(26,26,46,0.45) 0%, transparent 55%)',
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Discount badge */}
            {p.discount > 0 && (
              <div
                className="absolute top-3 left-3 z-30 px-2 py-1 text-[10px] font-bold tracking-wider text-white"
                style={{ background: col, fontFamily: "'DM Sans',sans-serif" }}
              >
                -{p.discount}%
              </div>
            )}

            {/* Out of stock */}
            {outOfStock && (
              <div
                className="absolute top-3 left-3 z-30 px-2 py-1 text-[9px] font-semibold tracking-[0.15em] uppercase"
                style={{
                  background: 'rgba(228,0,109,0.1)',
                  border: '1px solid rgba(228,0,109,0.35)',
                  color: '#e4006d',
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                Rupture
              </div>
            )}

            {/* Low stock */}
            {!outOfStock && (p.stock_quantity ?? 99) <= 5 && (
              <div
                className="absolute bottom-3 left-3 z-30 px-2 py-1 text-[9px] font-medium tracking-[0.1em] uppercase transition-opacity duration-300"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(228,0,109,0.3)',
                  color: '#e4006d',
                  fontFamily: "'DM Sans',sans-serif",
                  opacity: hovered ? 1 : 0,
                }}
              >
                Plus que {p.stock_quantity}
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${inWishlist ? '#e4006d' : 'rgba(26,26,46,0.1)'}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                opacity: hovered || inWishlist ? 1 : 0,
                transform: hovered || inWishlist ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.85)',
              }}
            >
              <Heart
                size={13}
                fill={inWishlist ? '#e4006d' : 'none'}
                stroke={inWishlist ? '#e4006d' : '#1a1a2e'}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-4 pb-5 flex flex-col">
            {/* Brand */}
            {p.brand ? (
              <p
                className="text-[9.5px] font-semibold tracking-[0.28em] uppercase h-[14px] overflow-hidden mb-2"
                style={{ fontFamily: "'DM Sans',sans-serif", color: col }}
              >
                {p.brand}
              </p>
            ) : (
              <div className="h-[14px] mb-2" />
            )}

            {/* Name */}
            <div className="h-[44px] mb-3 overflow-hidden">
              <p
                className="line-clamp-2 leading-tight transition-colors duration-300"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '16.5px',
                  fontWeight: 400,
                  color: hovered ? '#1a1a2e' : '#3d3530',
                }}
              >
                {p.name}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-auto mb-4">
              <span
                className="font-semibold text-[#1a1a2e]"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px' }}
              >
                {p.price.toFixed(2)}{' '}
                <span className="text-[10px] font-normal text-[#1a1a2e]/35">د.م</span>
              </span>
              {p.original_price && p.discount > 0 && (
                <span className="text-[11px] text-gray-400 line-through">
                  {Number(p.original_price).toFixed(2)} د.م
                </span>
              )}
            </div>

            {/* Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock || addingToCart}
              className="w-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white px-4 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              {added ? (
                <><Sparkles size={13} /> Ajouté !</>
              ) : addingToCart ? (
                'Ajout...'
              ) : (
                <><ShoppingCart size={13} /> Ajouter</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Modal via Portal — renders into document.body, fully escaping
           the card's transform stacking context ── */}
      <ModalPortal>
        <ProductModal
          product={modalProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </ModalPortal>
    </>
  );
};

export default ProductCard;
