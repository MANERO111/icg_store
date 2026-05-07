import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export interface HomeProduct {
  id: number;
  name: string;
  brand?: string | null;
  slug: string;
  description?: string;
  /** The effective display price (discounted if available, otherwise original) */
  price: number;
  original_price?: number | null;
  discounted_price?: number | null;
  image_url?: string | null;
  stock_quantity?: number;
  active?: boolean;
  created_at?: string;
  // computed on the client
  discount: number;
  tag?: string | null;
  rating: number;
  reviews: number;
}

export interface HomeCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  subcategories?: unknown[];
}

interface UseHomeProductsReturn {
  featured: HomeProduct[];
  promo: HomeProduct[];
  newArrivals: HomeProduct[];
  categories: HomeCategory[];
  brands: string[];
  loading: boolean;
}

/** Stable pseudo-rating derived from product id so it never flickers */
function pseudoRating(id: number): number {
  return 4.3 + (id % 7) * 0.1;
}
function pseudoReviews(id: number): number {
  return 20 + (id % 200);
}

function parseNum(val: unknown): number | null {
  if (val === null || val === undefined || val === '') return null;
  const n = typeof val === 'string' ? parseFloat(val) : Number(val);
  return isNaN(n) ? null : n;
}

function mapProduct(raw: Record<string, unknown>): HomeProduct {
  const originalPrice = parseNum(raw.original_price);
  const discountedPrice = parseNum(raw.discounted_price);
  // `price` column may exist as a shorthand but original_price is the canonical source
  const rawPrice = parseNum(raw.price);

  // Effective base price: prefer original_price, fall back to price column
  const basePrice = originalPrice ?? rawPrice ?? 0;

  // Discounted price is valid only when it is strictly less than the base price and > 0
  const validDiscount =
    discountedPrice !== null &&
    discountedPrice > 0 &&
    discountedPrice < basePrice
      ? discountedPrice
      : null;

  const displayPrice = validDiscount ?? basePrice;

  let discount = 0;
  if (validDiscount !== null && basePrice > 0) {
    discount = Math.round(((basePrice - validDiscount) / basePrice) * 100);
  }

  const id = raw.id as number;

  return {
    id,
    name: (raw.name as string) ?? '',
    brand: (raw.brand as string) ?? null,
    slug: (raw.slug as string) ?? String(id),
    description: (raw.description as string) ?? '',
    price: displayPrice,
    original_price: basePrice,
    discounted_price: validDiscount,
    image_url: (raw.image_url as string) ?? null,
    stock_quantity: (raw.stock_quantity as number) ?? 0,
    active: (raw.active as boolean) ?? true,
    created_at: (raw.created_at as string) ?? '',
    discount,
    tag: discount > 0 ? `−${discount}%` : null,
    rating: pseudoRating(id),
    reviews: pseudoReviews(id),
  };
}

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80';

export const useHomeProducts = (): UseHomeProductsReturn => {
  const [featured, setFeatured] = useState<HomeProduct[]>([]);
  const [promo, setPromo] = useState<HomeProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<HomeProduct[]>([]);
  const [categories, setCategories] = useState<HomeCategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [prodRes, catRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories'),
        ]);

        const rawProducts: Record<string, unknown>[] =
          prodRes.data?.data ?? prodRes.data ?? [];

        const rawCategories: HomeCategory[] =
          catRes.data?.data ?? catRes.data ?? [];

        const mapped = rawProducts
          .filter((p) => p.active !== false)
          .map((p) => ({
            ...mapProduct(p),
            image_url:
              (p.image_url as string) || PLACEHOLDER_IMAGE,
          }));

        // Featured: first 6 products
        setFeatured(mapped.slice(0, 6));

        // Promo: products with a discount, up to 6
        const promoItems = mapped.filter((p) => p.discount > 0).slice(0, 6);
        setPromo(promoItems.length ? promoItems : mapped.slice(6, 12));

        // New arrivals: last 6 by created_at
        const sorted = [...mapped].sort(
          (a, b) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime(),
        );
        setNewArrivals(sorted.slice(0, 6));

        // Categories from API (add static-style extras if empty)
        setCategories(rawCategories);

        // Unique brand names from loaded products
        const uniqueBrands = [
          ...new Set(mapped.map((p) => p.brand).filter(Boolean) as string[]),
        ];
        setBrands(uniqueBrands);
      } catch (err) {
        console.error('useHomeProducts: fetch failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { featured, promo, newArrivals, categories, brands, loading };
};
