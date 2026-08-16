'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { calculateSellingPrice } from '@/lib/cj-api';
import { fallbackProducts, type FallbackProduct } from '@/lib/fallback-products';
import { Loader2, Flame, ArrowRight, Sparkles } from 'lucide-react';

// Each slug fetches with UNIQUE trending keywords to get different popular products
const SEARCH_QUERIES = [
  { slug: 'mode-femme', kw: 'women cargo pants summer dress' },
  { slug: 'mode-femme', kw: 'women trendy tops blouse' },
  { slug: 'mode-homme', kw: 'men cargo pants streetwear' },
  { slug: 'mode-homme', kw: 'men casual shirt oversized' },
  { slug: 'chaussures', kw: 'sneakers casual shoes' },
  { slug: 'chaussures', kw: 'boots ankle women' },
  { slug: 'telephones', kw: 'wireless earbuds bluetooth' },
  { slug: 'telephones', kw: 'phone case iphone magnetic' },
  { slug: 'electronique', kw: 'led strip lights smart' },
  { slug: 'electronique', kw: 'portable blender usb' },
  { slug: 'parfums-cosmetiques', kw: 'perfume men luxury' },
  { slug: 'parfums-cosmetiques', kw: 'skincare serum vitamin c' },
  { slug: 'maison', kw: 'led night light sunset lamp' },
  { slug: 'maison', kw: 'storage organizer desk' },
  { slug: 'accessoires', kw: 'sunglasses men women' },
  { slug: 'accessoires', kw: 'watch smart band fitness' },
  { slug: 'sport', kw: 'resistance bands yoga mat' },
  { slug: 'sport', kw: 'water bottle gym shaker' },
  { slug: 'enfant', kw: 'kids toys educational' },
  { slug: 'enfant', kw: 'baby clothes cute' },
  { slug: 'auto-moto', kw: 'car phone holder wireless charger' },
  { slug: 'auto-moto', kw: 'car led interior lights' },
  { slug: 'bagagerie', kw: 'crossbody bag women fashion' },
  { slug: 'bagagerie', kw: 'backpack travel laptop' },
  { slug: 'jouets', kw: 'fidget toys stress relief' },
  { slug: 'animaux', kw: 'pet automatic feeder water' },
  { slug: 'bricolage', kw: 'electric screwdriver set' },
  { slug: 'bureau', kw: 'desk lamp wireless charger' },
  { slug: 'alimentation', kw: 'electric kettle kitchen' },
  { slug: 'emballage', kw: 'gift box packaging' },
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
      className="group bg-noir-card rounded-lg border border-border overflow-hidden hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(212,175,55,0.06)] transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => router.push('/categorie/' + p.slug)}
    >
      <div className="relative aspect-[3/4] bg-noir-lighter overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {p.discount && p.discount >= 10 && (
          <span className="absolute top-1 left-1 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">-{p.discount}%</span>
        )}
      </div>
      <div className="p-1.5 flex flex-col flex-1">
        <h3 className="text-[9px] sm:text-[10px] text-foreground/70 leading-tight line-clamp-2 mb-1 flex-1 group-hover:text-gold transition-colors">
          {p.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] sm:text-xs font-bold text-gold">{formatEur(p.price)}</span>
          {p.oldPrice && p.oldPrice > p.price && (
            <span className="text-[8px] sm:text-[9px] text-muted-foreground line-through">{formatEur(p.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-noir-card rounded-lg border border-border overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-noir-lighter" />
      <div className="p-1.5 space-y-1.5">
        <div className="h-2 bg-noir-lighter rounded w-full" />
        <div className="h-2 bg-noir-lighter rounded w-2/3" />
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

    const BATCH_SIZE = startSlugIdx === 0 && reset ? SEARCH_QUERIES.length : 10;
    const PER_CAT = 8;
    const newProducts: GridProduct[] = [];
    const seenPids = new Set<string>();
    let gotResults = false;

    for (let i = 0; i < BATCH_SIZE; i++) {
      const qIdx = (startSlugIdx + i) % SEARCH_QUERIES.length;
      const q = SEARCH_QUERIES[qIdx];
      const pageNum = Math.floor((startSlugIdx + i) / SEARCH_QUERIES.length) + 1;
      try {
        const res = await fetch(`/api/cj/products?category=${q.slug}&keyword=${encodeURIComponent(q.kw)}&pageSize=${PER_CAT}&page=${pageNum}&sortType=salesVolume`, { signal: AbortSignal.timeout(15000) });
        const data = await res.json();
        if (data.success && data.products?.length > 0 && !cancelledRef.current) {
          gotResults = true;
          for (const p of data.products) {
            const pid = String(p.pid);
            if (seenPids.has(pid)) continue; // skip duplicates
            seenPids.add(pid);
            const { price: sellEur } = calculateSellingPrice(p.sellPrice);
            if (sellEur <= 0) continue; // skip products with unparseable price
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
              slug: q.slug,
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
        // Final dedup — ensure absolutely no duplicates
        const existingPids = new Set((reset ? [] : products).map(p => p.pid));
        const unique = newProducts.filter(p => !existingPids.has(p.pid));
        // Extra safety: remove any duplicates within unique itself
        const finalUnique = unique.filter((p, i, arr) => arr.findIndex(x => x.pid === p.pid) === i);
        setProducts(prev => reset ? shuffle(finalUnique) : shuffle([...prev, ...finalUnique]));
        const nextStart = startSlugIdx + BATCH_SIZE;
        setHasMore(nextStart < SEARCH_QUERIES.length * 4);
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {Array.from({ length: 48 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
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
