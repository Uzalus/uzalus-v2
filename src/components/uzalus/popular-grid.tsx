'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { calculateSellingPrice } from '@/lib/cj-api';
import { fallbackProducts, type FallbackProduct } from '@/lib/fallback-products';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

// Category mapping based on CJ product names
function guessSlug(name: string): string {
  const n = name.toLowerCase();
  if (/women|dress|skirt|bikini|ladies|womens|jeans|blouse|camisole|top and pants|coat|hoodies|jacket|short sleeve/i.test(n)) return 'mode-femme';
  if (/men's|mens|men\s|cargo|sweatshirt|trousers|shoulder bag/i.test(n)) return 'mode-homme';
  if (/shoes|sneakers|boots|flip-flops|sandals/i.test(n)) return 'chaussures';
  if (/power bank|earbuds|bluetooth|led|electronic|phone/i.test(n)) return 'electronique';
  if (/cream|serum|toner|sunscreen|moisturiz|toothpaste|deodorant|mask|oil|balm|shampoo|nail|hair/i.test(n)) return 'parfums-cosmetiques';
  if (/necklace|bracelet|earring|jewel|pendant|ring/i.test(n)) return 'accessoires';
  if (/bag|backpack|crossbody/i.test(n)) return 'bagagerie';
  if (/sport|yoga|gym|shorts|shaper|underwear/i.test(n)) return 'sport';
  if (/toy|doll|halloween|sticker|coin/i.test(n)) return 'jouets';
  if (/dog|pet|animal/i.test(n)) return 'animaux';
  if (/car|auto|bike|vehicle/i.test(n)) return 'auto-moto';
  if (/home|wall|storage|desk|lamp|kettle|kitchen/i.test(n)) return 'maison';
  return 'mode-femme';
}

interface GridProduct {
  pid: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
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
  const [usingFallback, setUsingFallback] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function fetchTop100() {
      try {
        // Single request: top 100 products sorted by sales volume
        const res = await fetch('/api/cj/products?pageSize=100&sortType=salesVolume', {
          signal: AbortSignal.timeout(30000),
        });
        const data = await res.json();

        if (data.success && data.products?.length > 0 && !cancelledRef.current) {
          const seen = new Set<string>();
          const grid: GridProduct[] = [];

          for (const p of data.products) {
            const pid = String(p.pid);
            if (seen.has(pid)) continue;
            seen.add(pid);

            const { price: sellEur } = calculateSellingPrice(p.sellPrice);
            if (sellEur <= 0) continue;

            const oldEur = p.originalPrice ? calculateSellingPrice(p.originalPrice).price : null;
            const disc = oldEur && oldEur > sellEur ? Math.round(((oldEur - sellEur) / oldEur) * 100) : null;

            const name = p.productNameEn || p.productName || '';
            grid.push({
              pid,
              name,
              image: p.productImage,
              price: sellEur,
              oldPrice: oldEur,
              discount: disc,
              slug: guessSlug(name),
            });
          }

          if (grid.length > 0 && !cancelledRef.current) {
            setProducts(shuffle(grid));
          } else {
            // No valid products — fallback
            setProducts(shuffle(fallbackProducts.map(fallbackToGrid)));
            setUsingFallback(true);
          }
        } else if (!cancelledRef.current) {
          setProducts(shuffle(fallbackProducts.map(fallbackToGrid)));
          setUsingFallback(true);
        }
      } catch {
        if (!cancelledRef.current) {
          setProducts(shuffle(fallbackProducts.map(fallbackToGrid)));
          setUsingFallback(true);
        }
      } finally {
        if (!cancelledRef.current) setLoading(false);
      }
    }

    fetchTop100();
    return () => { cancelledRef.current = true; };
  }, []);

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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {products.map((p) => <ProductCard key={p.pid} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
