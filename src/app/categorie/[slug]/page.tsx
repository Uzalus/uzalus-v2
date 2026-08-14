'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { shopCategoriesData } from '@/lib/shop-data';
import { calculateSellingPrice, UZALUS_TO_CJ_CATEGORIES } from '@/lib/cj-api';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Heart,
  SlidersHorizontal,
  Truck,
  ShieldCheck,
  RotateCcw,
  X,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

/* ================================================================== */
/*  Category label map (slug -> display name)                           */
/* ================================================================== */
const CATEGORY_LABELS: Record<string, string> = {
  'mode-homme': 'Mode Homme',
  'mode-femme': 'Mode Femme',
  'enfant': 'Enfant',
  'chaussures': 'Chaussures',
  'maison': 'Maison & D\u00e9co',
  'accessoires': 'Accessoires',
  'telephones': 'T\u00e9l\u00e9phones & Accessoires',
  'parfums-cosmetiques': 'Parfums & Cosm\u00e9tiques',
  'auto-moto': 'Auto & Moto',
  'emballage': 'Emballage',
  'electronique': '\u00c9lectronique',
  'sport': 'Sport & Loisirs',
  'bricolage': 'Bricolage',
  'animaux': 'Animaux',
  'jouets': 'Jouets & Enfants',
  'bureau': 'Bureau & Fournitures',
  'bagagerie': 'Bagagerie',
  'alimentation': 'Alimentation',
};

/* ================================================================== */
/*  Types                                                               */
/* ================================================================== */
interface CJProduct {
  pid: string;
  productName: string;
  productImage: string;
  sellPrice: number;
  originalPrice?: number;
  rating?: number;
  commentCount?: number;
  discount?: number;
  variate?: string;
}

/* ================================================================== */
/*  Star Rating Component                                               */
/* ================================================================== */
function Stars({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={'f' + i} size={12} className="fill-amber-400 text-amber-400" />
      ))}
      {half === 1 && <Star size={12} className="fill-amber-400/50 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={'e' + i} size={12} className="text-gray-200" />
      ))}
      {count !== undefined && count > 0 && (
        <span className="text-[11px] text-gray-400 ml-1">({count})</span>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Product Card                                                        */
/* ================================================================== */
function ProductCard({ product }: { product: CJProduct }) {
  const [liked, setLiked] = useState(false);
  const { price: sellEur } = calculateSellingPrice(product.sellPrice);
  const oldPriceEur = product.originalPrice
    ? calculateSellingPrice(product.originalPrice).price
    : null;
  const discountPct = oldPriceEur && oldPriceEur > sellEur
    ? Math.round(((oldPriceEur - sellEur) / oldPriceEur) * 100)
    : null;

  const imgSrc = product.productImage || '';

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPct && discountPct >= 10 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              -{discountPct}%
            </span>
          )}
          {!product.originalPrice && product.sellPrice < 15 && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              NOUVEAU
            </span>
          )}
        </div>
        {/* Heart button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>
      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs text-gray-700 leading-tight line-clamp-2 mb-2 flex-1">
          {product.productName}
        </h3>
        <Stars rating={product.rating || 0} count={product.commentCount} />
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">
            {sellEur.toFixed(2)} &euro;
          </span>
          {oldPriceEur && oldPriceEur > sellEur && (
            <span className="text-[11px] text-gray-400 line-through">
              {oldPriceEur.toFixed(2)} &euro;
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Skeleton Loader                                                     */
/* ================================================================== */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-gray-100" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-1/2 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Filter Pill (no template literals in JSX attrs — Turbopack safe)    */
/* ================================================================== */
function FilterPill({
  label,
  icon: Icon,
  open,
  onToggle,
}: {
  label: string;
  icon: React.ElementType;
  open: boolean;
  onToggle: () => void;
}) {
  const baseClass = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer select-none';
  const chevClass = 'w-3.5 h-3.5 transition-transform duration-200';
  const btnClass = open
    ? baseClass + ' bg-gray-900 text-white border-gray-900'
    : baseClass + ' bg-white text-gray-700 border-gray-200 hover:border-gray-300';
  const rotatedChev = open ? chevClass + ' rotate-180' : chevClass;

  return (
    <button className={btnClass} onClick={onToggle}>
      <Icon size={14} />
      <span>{label}</span>
      <ChevronDown size={12} className={rotatedChev} />
    </button>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                           */
/* ================================================================== */
export default function CategoriePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || '';

  const catLabel = CATEGORY_LABELS[slug] || slug.replace(/-/g, ' ');
  const catData = shopCategoriesData[slug];
  const subs = catData?.subCategories || [];

  /* ---- State ---- */
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  /* ---- Fetch products ---- */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/cj/products?category=' + slug + '&pageSize=60&page=' + page;
      if (activeSub) {
        const subKey = activeSub;
        url = url + '&keyword=' + encodeURIComponent(subKey.split('.').pop() || subKey);
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } else {
        setError(data.error || 'Erreur de chargement');
      }
    } catch {
      setError('Erreur r\u00e9seau');
    } finally {
      setLoading(false);
    }
  }, [slug, activeSub, page]);

  useEffect(() => {
    if (slug) fetchProducts();
  }, [slug, fetchProducts]);

  /* ---- Sort products client-side ---- */
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.sellPrice - b.sellPrice;
    if (sortBy === 'price-desc') return b.sellPrice - a.sellPrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // popular = default order from API
  });

  /* ---- Sort options ---- */
  const sortOptions = [
    { value: 'popular', label: 'Populaires' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix d\u00e9croissant' },
    { value: 'rating', label: 'Meilleures notes' },
  ];
  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || 'Populaires';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      {/* ---- Announcement bar ---- */}
      <div className="bg-gray-900 text-white text-center py-2 text-xs tracking-wide">
        <span className="inline-flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1"><Truck size={13} /> Livraison gratuite d\u00e8s 49&euro;</span>
          <span className="text-gray-400">|</span>
          <span className="font-semibold text-amber-400">UZALUS10</span> pour -10% suppl\u00e9mentaire
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1"><ShieldCheck size={13} /> Service client 7j/7</span>
        </span>
      </div>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ---- Header: Back + Title + Count ---- */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{catLabel}</h1>
            {!loading && !error && (
              <p className="text-xs text-gray-400 mt-0.5">{total} produit{total !== 1 ? 's' : ''} trouv\u00e9{total !== 1 ? 's' : ''}</p>
            )}
          </div>
        </div>

        {/* ---- Sub-category tabs (horizontal scroll) ---- */}
        {subs.length > 0 && (
          <div className="mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => setActiveSub(null)}
                className={
                  'shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ' +
                  (!activeSub
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300')
                }
              >
                Tout
              </button>
              {subs.map((sub) => {
                const subName = sub.key.split('.').pop()?.replace(/-/g, ' ') || sub.key;
                const isActive = activeSub === sub.key;
                const tabClass =
                  'shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ' +
                  (isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300');
                return (
                  <button key={sub.key} onClick={() => setActiveSub(isActive ? null : sub.key)} className={tabClass}>
                    {subName}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---- Sub-category image grid (when no sub selected) ---- */
        {subs.length > 0 && !activeSub && !loading && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Sous-cat\u00e9gories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {subs.slice(0, 6).map((sub) => {
                const subName = sub.key.split('.').pop()?.replace(/-/g, ' ') || sub.key;
                return (
                  <button
                    key={sub.key}
                    onClick={() => setActiveSub(sub.key)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
                  >
                    <img
                      src={sub.image}
                      alt={subName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-xs font-semibold text-white truncate">
                      {subName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---- Filter toolbar ---- */}
        <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filtres button */}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <SlidersHorizontal size={14} />
              Filtres
            </button>

            <FilterPill
              label="Cat\u00e9gorie"
              icon={ChevronDown}
              open={filterOpen === 'cat'}
              onToggle={() => setFilterOpen(filterOpen === 'cat' ? null : 'cat')}
            />
            <FilterPill
              label="Prix"
              icon={ChevronDown}
              open={filterOpen === 'price'}
              onToggle={() => setFilterOpen(filterOpen === 'price' ? null : 'price')}
            />
            <FilterPill
              label="Taille"
              icon={ChevronDown}
              open={filterOpen === 'size'}
              onToggle={() => setFilterOpen(filterOpen === 'size' ? null : 'size')}
            />
            <FilterPill
              label="Couleur"
              icon={ChevronDown}
              open={filterOpen === 'color'}
              onToggle={() => setFilterOpen(filterOpen === 'color' ? null : 'color')}
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 hover:border-gray-300 transition-colors"
            >
              Trier: <span className="font-semibold">{currentSortLabel}</span>
              <ChevronDown size={14} className={'transition-transform duration-200' + (sortOpen ? ' rotate-180' : '')} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-xl py-1 z-30">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={'w-full text-left px-4 py-2 text-xs transition-colors ' +
                      (sortBy === opt.value ? 'bg-gray-50 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50')}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---- Content area ---- */}
        {loading && <SkeletonGrid />}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-red-300 mb-4" />
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              R\u00e9essayer
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400">Aucun produit trouv\u00e9 dans cette cat\u00e9gorie</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            {/* ---- Product grid (6 columns) ---- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sorted.map((p) => (
                <ProductCard key={p.pid} product={p} />
              ))}
            </div>

            {/* ---- Load more ---- */}
            {products.length < total && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  Charger plus de produits
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ---- Trust bar ---- */}
      <div className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Truck size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Livraison Gratuite</p>
              <p className="text-[11px] text-gray-400">D\u00e8s 49&euro; d&rsquo;achat</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <ShieldCheck size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Paiement S\u00e9curis\u00e9</p>
              <p className="text-[11px] text-gray-400">SSL & cryptage</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-end">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
              <RotateCcw size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Retours Faciles</p>
              <p className="text-[11px] text-gray-400">30 jours pour changer d&rsquo;avis</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
