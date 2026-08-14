/* Category page — loads CJ products */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { shopCategoriesData } from '@/lib/shop-data';
import { calculateSellingPrice } from '@/lib/cj-api';
import {
  Search,
  ChevronDown,
  Star,
  Heart,
  SlidersHorizontal,
  Truck,
  Clock,
  ShieldCheck,
  User,
  ShoppingBag,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

/* ================================================================== */
/*  Category label map                                                   */
/* ================================================================== */
const CATEGORY_LABELS: Record<string, string> = {
  'mode-homme': 'Mode Homme',
  'mode-femme': 'Mode Femme',
  'enfant': 'Enfants',
  'chaussures': 'Chaussures',
  'maison': 'Maison & Déco',
  'accessoires': 'Accessoires',
  'telephones': 'Téléphones',
  'parfums-cosmetiques': 'Parfums & Cosmétiques',
  'auto-moto': 'Auto & Moto',
  'emballage': 'Emballage',
  'electronique': 'Électronique',
  'sport': 'Sport & Loisirs',
  'bricolage': 'Bricolage',
  'animaux': 'Animaux',
  'jouets': 'Jouets & Enfants',
  'bureau': 'Bureau',
  'bagagerie': 'Bagagerie',
  'alimentation': 'Alimentation',
};

const NAV_CATEGORIES = [
  { slug: 'mode-femme', label: 'MODE FEMME' },
  { slug: 'mode-homme', label: 'MODE HOMME' },
  { slug: 'enfant', label: 'ENFANTS' },
  { slug: 'parfums-cosmetiques', label: 'PARFUM' },
  { slug: 'parfums-cosmetiques', label: 'COSMÉTIQUE' },
  { slug: 'accessoires', label: 'ACCESSOIRES' },
  { slug: 'electronique', label: 'AUTRES' },
];

/* ================================================================== */
/*  Types                                                               */
/* ================================================================== */
interface CJProduct {
  pid: string;
  productName: string;
  productNameEn?: string;
  productImage: string;
  sellPrice: number;
  originalPrice?: number;
  rating?: number;
  commentCount?: number;
  discount?: number;
}

/* ================================================================== */
/*  Format price: 29,99 €                                              */
/* ================================================================== */
function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

/* ================================================================== */
/*  Star Rating                                                         */
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
        <Star key={'e' + i} size={12} className="text-gray-300" />
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

  return (
    <div className="group bg-white rounded-lg border border-[#eee] overflow-hidden hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img
          src={product.productImage || ''}
          alt={product.productNameEn || product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {!product.originalPrice && product.sellPrice < 15 && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Nouveau
            </span>
          )}
          {discountPct && discountPct >= 10 && (
            <span className="bg-[#E63946] text-white text-[10px] font-bold px-2 py-1 rounded">
              -{discountPct}%
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 relative">
        <h3 className="text-sm text-gray-900 leading-snug line-clamp-2 mb-2 flex-1 font-normal">
          {product.productNameEn || product.productName}
        </h3>
        <Stars rating={product.rating || 0} count={product.commentCount} />
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-black">
            {formatPrice(sellEur)}
          </span>
          {oldPriceEur && oldPriceEur > sellEur && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(oldPriceEur)}
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute bottom-4 right-4"
        >
          <Heart
            size={18}
            className={liked
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400 hover:text-red-400 transition-colors'
            }
          />
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Skeleton Loader                                                     */
/* ================================================================== */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-[#eee] overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-gray-100" />
          <div className="p-4 space-y-2.5">
            <div className="h-3.5 bg-gray-100 rounded w-full" />
            <div className="h-3.5 bg-gray-100 rounded w-3/4" />
            <div className="flex gap-1 mt-2">
              <div className="w-3 h-3 rounded-full bg-gray-100" />
              <div className="w-3 h-3 rounded-full bg-gray-100" />
              <div className="w-3 h-3 rounded-full bg-gray-100" />
            </div>
            <div className="h-5 bg-gray-100 rounded w-1/3 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Filter Dropdown                                                     */
/* ================================================================== */
function FilterDropdown({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  const base = 'flex items-center gap-2 px-4 py-2.5 rounded border text-xs cursor-pointer select-none transition-colors ';
  const cls = open
    ? base + 'border-gray-900 bg-gray-50 text-gray-700'
    : base + 'border-[#ddd] bg-white text-gray-700 hover:border-gray-400';
  const chev = 'w-3.5 h-3.5 transition-transform duration-200' + (open ? ' rotate-180' : '');

  return (
    <button className={cls} onClick={onToggle}>
      <span>{label}</span>
      <ChevronDown size={14} className={chev} />
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

  const [products, setProducts] = useState<CJProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setProducts([]);
    setPage(1);
    setError(null);
    try {
      let url = '/api/cj/products?category=' + slug + '&pageSize=60&page=1';
      if (activeSub) {
        const kw = activeSub.split('.').pop() || activeSub;
        url = url + '&keyword=' + encodeURIComponent(kw);
      }
      if (searchQuery) {
        url = url + '&keyword=' + encodeURIComponent(searchQuery);
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
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }, [slug, activeSub, searchQuery]);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      let url = '/api/cj/products?category=' + slug + '&pageSize=60&page=' + nextPage;
      if (activeSub) {
        const kw = activeSub.split('.').pop() || activeSub;
        url = url + '&keyword=' + encodeURIComponent(kw);
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        const newProducts = data.products || [];
        setProducts(prev => [...prev, ...newProducts]);
        setTotal(data.total || 0);
        setPage(nextPage);
      }
    } catch {
      /* silent */
    } finally {
      setLoadingMore(false);
    }
  }, [slug, activeSub, page]);

  useEffect(() => {
    if (slug) fetchProducts();
  }, [slug, fetchProducts]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.sellPrice - b.sellPrice;
    if (sortBy === 'price-desc') return b.sellPrice - a.sellPrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const sortOptions = [
    { value: 'popular', label: 'Popularité' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' },
  ];
  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || 'Popularité';

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#F9F9F9] border-b border-[#E5E5E5] py-2.5 text-center">
        <span className="inline-flex items-center gap-4 flex-wrap justify-center text-xs text-gray-600">
          <span className="flex items-center gap-1.5"><Truck size={14} /> Livraison gratuite dès 49€ d’achat</span>
          <span className="text-[#ccc]">|</span>
          <span><b>-10%</b> sur votre première commande | Code : <b>UZALUS10</b></span>
          <span className="text-[#ccc]">|</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> Service client 24/7</span>
        </span>
      </div>

      {/* HEADER */}
      <header className="border-b border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-5 flex items-center justify-between gap-6">
          <button onClick={() => router.push('/')} className="text-3xl font-bold text-black tracking-tight lowercase shrink-0">
            uzalus
          </button>
          <div className="hidden sm:flex flex-1 max-w-xl items-center">
            <div className="flex w-full items-center bg-[#F2F2F2] rounded">
              <input
                type="text"
                placeholder="Rechercher un produit, une marque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') fetchProducts(); }}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none rounded-l"
              />
              <button onClick={fetchProducts} className="bg-black text-white px-4 py-3 rounded-r hover:bg-gray-800 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <button className="relative text-gray-700 hover:text-black transition-colors"><User size={20} strokeWidth={1.5} /></button>
            <button className="relative text-gray-700 hover:text-black transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="relative text-gray-700 hover:text-black transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION BAR */}
      <nav className="border-b border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex items-center gap-6 h-11 overflow-x-auto no-scrollbar">
          {NAV_CATEGORIES.map((cat) => {
            const isActive = cat.slug === slug;
            const navBase = 'text-[13px] font-bold uppercase tracking-wider whitespace-nowrap pb-0.5 transition-colors ';
            const navCls = isActive
              ? navBase + 'text-black border-b-[3px] border-black'
              : navBase + 'text-gray-600 hover:text-black border-b-[3px] border-transparent';
            return (
              <button key={cat.label + cat.slug} onClick={() => router.push('/categorie/' + cat.slug)} className={navCls}>
                {cat.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-5 lg:px-8 py-6">

        {/* Sub-category hero grid */}
        {subs.length > 0 && !activeSub && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-black mb-5">{catLabel}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {subs.slice(0, 6).map((sub) => {
                const raw = sub.key.split('.').pop() || sub.key;
                const subName = raw.replace(/-/g, ' ');
                const capName = subName.charAt(0).toUpperCase() + subName.slice(1);
                return (
                  <button key={sub.key} onClick={() => setActiveSub(sub.key)} className="group relative aspect-[4/3] rounded-lg overflow-hidden">
                    <img src={sub.image} alt={capName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <p className="text-white text-xs font-bold uppercase tracking-wider">{capName}</p>
                      <p className="text-white/70 text-[11px] mt-0.5">Voir plus</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Back + title when sub active */}
        {activeSub && (
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => { setActiveSub(null); setPage(1); }} className="w-8 h-8 rounded-full border border-[#ddd] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ArrowLeft size={16} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-black">{(activeSub.split('.').pop() || '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
              {!loading && !error && <p className="text-xs text-gray-400 mt-0.5">{total} produit{total !== 1 ? 's' : ''}</p>}
            </div>
          </div>
        )}

        {/* Title when no subs */}
        {subs.length === 0 && (
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-black">{catLabel}</h1>
            {!loading && !error && <p className="text-xs text-gray-400 mt-1">{total} produit{total !== 1 ? 's' : ''}</p>}
          </div>
        )}

        {/* Filter toolbar */}
        <div className="flex items-center justify-between mb-7 gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded border border-[#ddd] bg-white text-xs font-medium text-gray-700 hover:border-gray-400 transition-colors">
              <SlidersHorizontal size={14} /> Filtres
            </button>
            <FilterDropdown label="Catégorie" open={filterOpen === 'cat'} onToggle={() => setFilterOpen(filterOpen === 'cat' ? null : 'cat')} />
            <FilterDropdown label="Marque" open={filterOpen === 'brand'} onToggle={() => setFilterOpen(filterOpen === 'brand' ? null : 'brand')} />
            <FilterDropdown label="Prix" open={filterOpen === 'price'} onToggle={() => setFilterOpen(filterOpen === 'price' ? null : 'price')} />
            <FilterDropdown label="Taille" open={filterOpen === 'size'} onToggle={() => setFilterOpen(filterOpen === 'size' ? null : 'size')} />
            <FilterDropdown label="Couleur" open={filterOpen === 'color'} onToggle={() => setFilterOpen(filterOpen === 'color' ? null : 'color')} />
          </div>
          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 px-4 py-2.5 rounded border border-[#ddd] bg-white text-xs text-gray-700 hover:border-gray-400 transition-colors">
              Trier par : <span className="font-semibold text-black">{currentSortLabel}</span>
              <ChevronDown size={14} className={'w-3.5 h-3.5 transition-transform duration-200' + (sortOpen ? ' rotate-180' : '')} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-lg border border-[#eee] shadow-xl py-1 z-30">
                {sortOptions.map((opt) => {
                  const itemBase = 'w-full text-left px-4 py-2.5 text-xs transition-colors ';
                  const itemCls = sortBy === opt.value
                    ? itemBase + 'bg-gray-50 font-semibold text-black'
                    : itemBase + 'text-gray-600 hover:bg-gray-50';
                  return (
                    <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false); }} className={itemCls}>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading && <SkeletonGrid />}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-1">Aucun produit disponible pour le moment</p>
            <p className="text-gray-400 text-xs mb-4">Les produits seront bientôt ajoutés</p>
            <button onClick={() => fetchProducts(false)} className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400">Aucun produit trouvé</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {sorted.map((p) => (
                <ProductCard key={p.pid} product={p} />
              ))}
            </div>
            {products.length < total && (
              <div className="flex justify-center mt-10">
                <button onClick={loadMore} disabled={loadingMore || loading} className="flex items-center gap-2 px-8 py-3 border-2 border-black text-sm font-semibold text-black rounded hover:bg-black hover:text-white transition-colors disabled:opacity-50">
                  {loadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
                  Charger plus
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* TRUST BAR */}
      <div className="bg-white border-t border-[#E5E5E5] py-10 mt-8">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><Truck size={22} className="text-blue-600" /></div>
            <div><p className="text-sm font-bold text-black">Livraison Gratuite</p><p className="text-xs text-gray-400">Dès 49€ d’achat</p></div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center"><ShieldCheck size={22} className="text-emerald-600" /></div>
            <div><p className="text-sm font-bold text-black">Paiement Sécurisé</p><p className="text-xs text-gray-400">SSL & cryptage</p></div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-end">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center"><Clock size={22} className="text-orange-600" /></div>
            <div><p className="text-sm font-bold text-black">Service Client 24/7</p><p className="text-xs text-gray-400">Toujours disponible</p></div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
