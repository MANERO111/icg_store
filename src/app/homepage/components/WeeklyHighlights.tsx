'use client';
import React, { useState } from 'react';
import { HomeProduct } from '@/hooks/useHomeProducts';
import { getProductImageUrl } from '@/utils/imageHelper';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ProductModal from '@/components/products/ProductModal';
import { Product as GlobalProduct } from '@/hooks/useProducts';

interface Props {
  products: HomeProduct[];
}

const WeeklyHighlights = ({ products }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<GlobalProduct | null>(null);
  const { addToCart } = useCart();

  if (!products || products.length === 0) return null;

  // Use the first 5 products for the highlights
  const mainProduct = products[0];
  const gridProducts = products.slice(1, 5);

  const handleOpenModal = (p: HomeProduct) => {
    const modalP: GlobalProduct = {
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
    setSelectedProduct(modalP);
    setModalOpen(true);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#1a1a2e] font-bold tracking-[0.3em] uppercase text-[11px] mb-3 block">Inspiration</span>
            <h2
              className="text-4xl md:text-[52px] font-light text-[#1a1a2e] leading-[1.06]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
                
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(110deg, #e4006d 0%, #c4006d 40%, #8b1a8b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Points Forts de la Semaine
              </em>
            </h2>
            <p className="text-gray-500 max-w-xl text-lg">
              Une sélection exclusive de nos produits les plus populaires, soigneusement choisis pour sublimer votre routine beauté.
            </p>
          </div>
          <button className="group flex items-center gap-3 text-[#1a1a2e] font-bold uppercase tracking-widest text-xs border-b-2 border-[#1a1a2e] pb-1 hover:text-[#e4006d] hover:border-[#e4006d] transition-all">
            Voir Toute la Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Product */}
          <div className="lg:col-span-7 group cursor-pointer" onClick={() => handleOpenModal(mainProduct)}>
            <div className="relative h-[600px] overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-700 hover:shadow-2xl">
              <img
                src={getProductImageUrl(mainProduct.image_url)}
                alt={mainProduct.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                   <span className="bg-[#e4006d] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Premium Choice</span>
                   {mainProduct.discount > 0 && <span className="bg-white text-[#1a1a2e] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">-{mainProduct.discount}%</span>}
                </div>
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{mainProduct.name}</h3>
                <p className="text-white/70 mb-6 max-w-md line-clamp-2">{mainProduct.description}</p>
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-bold">{mainProduct.price.toFixed(2)} د.م</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(mainProduct, 1);
                    }}
                    className="bg-white text-[#1a1a2e] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#e4006d] hover:text-white transition-colors"
                  >
                    <ShoppingCart size={14} /> Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Smaller Products */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6">
            {gridProducts.map((p, idx) => (
              <div 
                key={p.id} 
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => handleOpenModal(p)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f0ede8]">
                  <img
                    src={getProductImageUrl(p.image_url)}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-[#e4006d] mb-1">{p.brand || 'Luxury'}</p>
                   <h4 className="font-bold text-[#1a1a2e] text-sm line-clamp-1 mb-2 group-hover:text-[#e4006d] transition-colors">{p.name}</h4>
                   <p className="mt-auto font-bold text-[#1a1a2e]">{p.price.toFixed(2)} د.م</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

export default WeeklyHighlights;
