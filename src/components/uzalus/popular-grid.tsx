'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { calculateSellingPrice } from '@/lib/cj-api';
import { fallbackProducts, type FallbackProduct } from '@/lib/fallback-products';
import { Star, Heart, Loader2, Flame, ArrowRight, Sparkles } from 'lucide-react';

const ALL_SLUGS = [
  'mode-femme','mode-homme','enfant','chaussures','maison','accessoires',
  'telephones','parfums-cosmetiques','auto-moto','emballage','electronique',
  'sport','bricolage','animaux','jouets','bureau','bagagerie','alimentation',
];

interface GridProduct {
  pid: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number;
  comments: number;
  slug: string;
}

function formatEur(n: number): string {
  return n.toFixed(2).replace('.', ',') + ' \u20AC';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fallbackToGrid(p: FallbackProduct): GridProduct {
  return {
    pid: p.pid,
    name: p.name,
    image: p.image,
    price: p.price,
    oldPrice: p.oldPrice,
    discount: p.discount,
    rating: p.rating,
    comments: p.comments,
    slug: p.slug,
  };
}

function ProductCard({ p }: { p: GridProduct }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  return (
    <div
      className="group bg-noir-card rounded-xl border border-border overflow-hidden hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => router.push('/categorie/' + p.slug)}
    >
      <div className="relative aspect-square bg-noir-lighter overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {p.discount && p.discount >= 10 && (
          <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">-{p.discount}%</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-white'} />
        </button>
      </div>
      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-[10px] sm:text-[11px] text-foreground/75 leading-tight line-clamp-2 mb-1.5 flex-1 group-hover:text-gold transition-colors">
          {p.name}
        </h3>
        <div className="flex items-center gap-0.5 mb-1">
          <Star size={10} className="text-gold fill-gold" />
          <span className="text-[10px] text-muted-foreground">{p.rating}{p.comments ? ` (${p.comments})` : ''}</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-gold">{formatEur(p.price)}</span>
          {p.oldPrice && p.oldPrice > p.price && (
            <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through">{formatEur(p.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-noir-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-noir-lighter" />
      <div className="p-2 space-y-2">
        <div className="h-2.5 bg-noir-lighter rounded w-full" />
        <div className="h-2.5 bg-noir-lighter rounded w-2/3" />
        <div className="h-3 bg-noir-lighter rounded w-1/3 mt-1" />
      </div>
    </div>
  );
}

export function PopularGrid() {
  const { t } = useI18n();
  const router = useRouter();
  const [products, setProducts] = useState<GridProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const cancelledRef = useRef(false);

  const fetchBatch = useCallback(async (startSlugIdx: number, reset = false) => {
    if (reset) { setLoading(true); setProducts([]); setPage(0); }
    else setLoadingMore(true);

    const BATCH_SIZE = startSlugIdx === 0 && reset ? ALL_SLUGS.length : 6;
    const PER_CAT = 6;
    const newProducts: GridProduct[] = [];
    const seenPids = new Set<string>();
    let gotResults = false;

    for (let i = 0; i < BATCH_SIZE; i++) {
      const slugIdx = (startSlugIdx + i) % ALL_SLUGS.length;
      const slug = ALL_SLUGS[slugIdx];
      try {
        const res = await fetch(`/api/cj/products?category=${slug}&pageSize=${PER_CAT}&page=1&sortType=salesVolume`, { signal: AbortSignal.timeout(15000) });
        const data = await res.json();
        if (data.success && data.products?.length > 0 && !cancelledRef.current) {
          gotResults = true;
          for (const p of data.products) {
            const pid = String(p.pid);
            if (seenPids.has(pid)) continue; // skip duplicates
            seenPids.add(pid);
            const { price: sellEur } = calculateSellingPrice(p.sellPrice);
            const oldEur = p.originalPrice ? calculateSellingPrice(p.originalPrice).price : null;
            const disc = oldEur && oldEur > sellEur ? Math.round(((oldEur - sellEur) / oldEur) * 100) : null;
            newProducts.push({
              pid,
              name: p.productNameEn || p.productName || '',
              image: p.productImage,
              price: sellEur,
              oldPrice: oldEur,
              discount: disc,
              rating: p.rating || 0,
              comments: p.commentCount || 0,
              slug,
            });
          }
        }
      } catch { /* skip failed category */ }
    }

    if (!cancelledRef.current) {
      if (reset && newProducts.length === 0) {
        // API returned nothing — use fallback products
        setProducts(shuffle(fallbackProducts.map(fallbackToGrid)));
        setUsingFallback(true);
        setHasMore(false);
      } else {
        // Also deduplicate against existing products when loading more
        const existingPids = new Set((reset ? [] : products).map(p => p.pid));
        const unique = newProducts.filter(p => !existingPids.has(p.pid));
        setProducts(prev => reset ? shuffle(unique) : shuffle([...prev, ...unique]));
        const nextStart = startSlugIdx + BATCH_SIZE;
        setHasMore(nextStart < ALL_SLUGS.length * 3);
        setPage(nextStart);
      }
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    fetchBatch(0, true);
    return () => { cancelledRef.current = true; };
  }, [fetchBatch]);

  return (
    <section className="bg-noir py-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
              <Sparkles size={18} className="text-gold" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">{t('home.popularTitle')}</h2>
              {products.length > 0 && (
                <p className="text-[11px] text-muted-foreground">{t('home.popularCount')} {products.length}</p>
              )}
            </div>
            <Flame size={20} className="text-orange-400 ml-1 hidden sm:block" />
          </div>
          <button
            onClick={() => router.push('/categories')}
            className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
          >
            {t('home.seeAll')} <ArrowRight size={12} />
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {Array.from({ length: 30 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {products.map((p) => <ProductCard key={p.pid} p={p} />)}
            </div>

            {/* Load More — only when using CJ API (not fallback) */}
            {hasMore && !usingFallback && products.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchBatch(page, false)}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-8 py-3 border-2 border-gold/50 text-sm font-semibold text-gold rounded-xl hover:bg-gold hover:text-noir transition-colors disabled:opacity-50"
                >
                  {loadingMore && <Loader2 size={16} className="animate-spin" />}
                  {loadingMore ? t('home.loading') : t('home.loadMore')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
