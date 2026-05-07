"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useProducts, Product } from '@/hooks/useProducts';
import { getProductImageUrl } from '@/utils/imageHelper';

import LoginModal from './login';
import ProductModal from './products/ProductModal';

import { LayoutDashboard, User, Settings, LogOut, Package, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  // { label: "NOS MARQUES", href: "/nos-marques" },
  // { label: "À PROPOS", href: "/notre-histoire" },
  { label: "INNOVATION & SCIENCE", href: "#" },
  { label: "ÉCOSYSTÈME ICG", href: "#" },
  { label: "ACTUALITÉS", href: "#" },
  { label: "BOUTIQUE", href: "/products" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Search State
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoading, isAuthenticated, login, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const loadWishlistCount = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlistItems = JSON.parse(savedWishlist);
          setWishlistCount(wishlistItems.length);
        }
      } catch (error) {
        console.error('Error loading wishlist count:', error);
      }
    };
    loadWishlistCount();
    const handleStorageChange = (e: StorageEvent) => { if (e.key === 'wishlist') loadWishlistCount(); };
    const handleWishlistUpdate = () => loadWishlistCount();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsProfileDropdownOpen(false);
    try {
      await logout();
    } catch (error: unknown) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLoginSuccess = async (userData: { name: string; [key: string]: unknown }) => { 
    await login(userData); 
    setIsLoginModalOpen(false); 
  };

  // Search Logic
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    return products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.slug && p.slug.toLowerCase().includes(query))
    ).slice(0, 4);
  };

  const searchResults = getSearchResults();

  return (
    <>
      <header className="w-full font-sans sticky top-0 z-[100] bg-white shadow-sm">
        {/* Top Banner */}
        <div className="bg-[#e0296a] text-white text-center py-2 px-4 tracking-widest text-xs font-semibold uppercase">
          Livraison gratuite sur Casablanca à partir de 200 dh
        </div>

        {/* Main Header */}
        <div className="bg-white px-6 relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/img/logo.png" alt="icg logo" height={60} width={190} loading="eager" style={{ width: "auto", height: "auto" }} />
            </Link>

            {/* Center Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
              {isLoading ? (
                <div className="w-16 h-4 bg-gray-100 animate-pulse rounded" />
              ) : isAuthenticated && user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center gap-1 hover:text-[#e05080] transition-colors">
                    <User size={16} />
                    <span>{user.name}</span>
                    <ChevronDown size={12} style={{ transition: 'transform 0.3s', transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-100 shadow-lg rounded py-2 transition-all z-[200] ${isProfileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <div className="text-sm font-semibold truncate text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    </div>
                    <Link href="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Settings size={14} /> Profil</Link>
                    <Link href="/orders" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Package size={14} /> Commandes</Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" onClick={() => setIsProfileDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><LayoutDashboard size={14} /> Dashboard</Link>
                    )}
                    <button onClick={handleLogout} disabled={isLoggingOut} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={14} /> Déconnexion</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-[#e05080] transition-colors">Se connecter</button>
              )}
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e05080] transition-colors">Centre d'aide</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e05080] transition-colors">Devenir partenaire</a>
            </nav>

            {/* Search + Icons */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={searchWrapperRef}>
                <div className="flex items-center border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50 gap-2 w-64">
                  <input
                    type="text"
                    placeholder="Recherche de +100 produits de beauté"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                        setIsSearchFocused(false);
                      }
                    }}
                    className="bg-transparent text-xs text-gray-500 placeholder:text-gray-400 outline-none w-full"
                  />
                  <button onClick={() => {
                    if (searchQuery.trim()) {
                      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      setIsSearchFocused(false);
                    }
                  }} className="text-gray-500 hover:text-[#e05080] transition-colors shrink-0">
                    <SearchIcon />
                  </button>
                </div>

                {/* Live Search Dropdown */}
                {isSearchFocused && searchQuery.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-[350px] bg-white border border-gray-100 shadow-xl z-[200] rounded-md overflow-hidden">
                    {searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <button 
                            key={product.id}
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsProductModalOpen(true);
                              setIsSearchFocused(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors text-left"
                          >
                            <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                              <img 
                                src={getProductImageUrl(product.image_url)} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.jpg'; }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] uppercase font-semibold text-[#e05080] truncate">
                                {product.brand || "Produit"}
                              </p>
                              <p className="text-xs text-gray-800 truncate font-medium">
                                {product.name}
                              </p>
                            </div>
                          </button>
                        ))}
                        <div className="p-2 border-t border-gray-100 bg-gray-50">
                          <Link 
                            href={`/products?search=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="block w-full text-center text-xs py-1.5 text-[#e0296a] hover:text-[#c4205a] transition-colors font-medium"
                          >
                            Voir tous les résultats
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-400">
                        Aucun produit trouvé.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link href="/wishlist" className="text-gray-500 hover:text-[#e05080] transition-colors p-1 relative block">
                <WishlistIcon />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e05080] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="text-gray-500 hover:text-[#e05080] transition-colors p-1 relative block">
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e05080] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-[#e05080]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="hidden md:block bg-white border-b border-gray-200 px-6 relative z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-0">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-[11px] font-semibold tracking-widest text-gray-700 uppercase hover:text-[#e05080] hover:border-b-2 hover:border-[#e05080] transition-all border-b-2 border-transparent whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-3 shadow-md absolute w-full left-0 z-50">
            <div className="flex items-center border border-gray-200 rounded-full px-3 py-2 bg-gray-50 gap-2 relative">
              <input
                type="text"
                placeholder="Recherche de produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                    setMobileMenuOpen(false);
                  }
                }}
                className="bg-transparent text-xs text-gray-500 placeholder:text-gray-400 outline-none w-full"
              />
              <button onClick={() => {
                if (searchQuery.trim()) {
                  router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                  setMobileMenuOpen(false);
                }
              }}>
                <SearchIcon />
              </button>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-500 py-1 border-b border-gray-100 pb-3">
              {isAuthenticated && user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#e05080]">Mon Profil</Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="hover:text-[#e05080] text-red-500">Déconnexion</button>
                </>
              ) : (
                <button onClick={() => { setIsLoginModalOpen(true); setMobileMenuOpen(false); }} className="hover:text-[#e05080]">Se connecter</button>
              )}
              <a href="#" className="hover:text-[#e05080]">Centre d'aide</a>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold tracking-widest text-gray-700 uppercase hover:text-[#e05080] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex gap-6 pt-3 border-t border-gray-100">
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-[#e05080] flex items-center gap-2">
                <div className="relative">
                  <WishlistIcon />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-[#e05080] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
                </div>
                <span className="text-xs">Favoris</span>
              </Link>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-[#e05080] flex items-center gap-2">
                <div className="relative">
                  <CartIcon />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#e05080] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
                </div>
                <span className="text-xs">Panier</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </>
  );
}

// ── SVG Icons ──────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}