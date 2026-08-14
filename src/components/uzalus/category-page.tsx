'use client';

import { useI18n } from '@/lib/i18n-context';
import { ArrowLeft, Star, Heart, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { shopCategoriesData, type ShopProduct } from '@/lib/shop-data';
import { calculateSellingPrice } from '@/lib/cj-api';

const catSlugs = [
  'mode-homme', 'mode-femme', 'enfant', 'chaussures', 'maison',
  'accessoires', 'telephones', 'parfums-cosmetiques', 'auto-moto',
  'emballage', 'electronique', 'sport', 'bricolage', 'animaux',
  'jouets', 'bureau', 'bagagerie', 'alimentation',
] as const;
type CatSlug = typeof catSlugs[number];

interface CategoryPageProps {
  category: CatSlug;
  onBack: () => void;
  onProductClick?: (pid: string, name: string, image: string, price: number) => void;
}

/* ------------------------------------------------------------------ */
/*  Star Rating Display                                                */
/* ------------------------------------------------------------------ */
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={12}
            className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-foreground/20'}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground">({reviews})</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card (matching reference photo style)                      */
/* ------------------------------------------------------------------ */
function ProductCard({ product, locale, onClick }: { product: ShopProduct; locale: string; onClick: () => void }) {
  const [liked, setLiked] = useState(false);
  const getName = () => {
    if (locale === 'ar') return product.nameAr;
    if (locale === 'es') return product.nameEs;
    if (locale === 'en') return product.nameEn;
    return product.name;
  };

  return (
    <div
      onClick={onClick}
      className="group bg-noir-card rounded-xl border border-border overflow-hidden cursor-pointer hover:border-gold/30 transition-all duration-300 opacity-0 animate-fade-in-up"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-noir-lighter">
        <img
          src={product.image}
          alt={getName()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x400/0B0B0B/d4af37?text=UZALUS'; }}
        />

        {/* Badge - NOUVEAU */}
        {product.badge === 'new' && (
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-white text-noir">
            NOUVEAU
          </span>
        )}

        {/* Badge - Discount */}
        {product.discount && product.discount > 0 && product.badge !== 'new' && (
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-red-500 text-white">
            -{product.discount}%
          </span>
        )}

        {/* Badge - BESTSELLER */}
        {product.badge === 'bestseller' && !product.discount && product.badge !== 'new' && (
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-gold text-noir">
            BEST-SELLER
          </span>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 end-3 w-8 h-8 rounded-full bg-noir/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-noir/70"
          aria-label="Favoris"
        >
          <Heart size={16} className={liked ? 'text-red-400 fill-red-400' : 'text-white'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-sm font-medium text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug min-h-[2.5em]">
          {getName()}
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-white">{product.price.toFixed(2)}€</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.oldPrice.toFixed(2)}€
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Dropdown Pill                                               */
/* ------------------------------------------------------------------ */
function FilterPill({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
          value
            ? 'border-gold/40 text-gold bg-gold/5'
            : 'border-border text-foreground/70 bg-noir-card hover:border-gold/30 hover:text-foreground'
        }`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-noir-card border border-border rounded-lg shadow-2xl z-50 min-w-[160px] py-1 overflow-hidden">
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className={`w-full text-start px-4 py-2 text-xs hover:bg-gold/10 transition-colors ${!value ? 'text-gold' : 'text-foreground/70'}`}
            >
              Tous
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-start px-4 py-2 text-xs hover:bg-gold/10 transition-colors ${value === opt ? 'text-gold' : 'text-foreground/70'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading Spinner                                                    */
/* ------------------------------------------------------------------ */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 size={40} className="text-gold animate-spin" />
      <p className="text-muted-foreground text-sm">Chargement des produits...</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Category Page                                                 */
/* ------------------------------------------------------------------ */
export function CategoryPage({ category, onBack, onProductClick }: CategoryPageProps) {
  const { t, locale } = useI18n();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [cjProducts, setCjProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [sortBy, setSortBy] = useState('popularite');
  const [filterOpen, setFilterOpen] = useState(false);

  const data = shopCategoriesData[category];
  if (!data) return null;

  const hasSubCategories = !!(data.subCategories && data.subCategories.length > 0);

  const fetchProducts = useCallback(async (catSlug: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cj/products?category=${encodeURIComponent(catSlug)}&pageSize=60`);
      const json = await res.json();
      if (json.success && json.products && json.products.length > 0) {
        const mapped: ShopProduct[] = json.products.map((p: any, i: number) => {
          const { price } = calculateSellingPrice(p.sellPrice || 0);
          const disc = p.originalPrice ? Math.round((1 - p.sellPrice / p.originalPrice) * 100) : 0;
          return {
            id: p.pid || `cj-${i}`,
            name: p.productNameEn || 'Produit',
            nameEn: p.productNameEn || '',
            nameEs: p.productNameEn || '',
            nameAr: p.productNameEn || '',
            image: p.productImage || '',
            price: price,
            oldPrice: p.originalPrice ? calculateSellingPrice(p.originalPrice).price : undefined,
            rating: p.rating || 4,
            reviews: Math.floor(Math.random() * 200) + 10,
            badge: i === 0 ? 'new' : i < 4 ? 'bestseller' : undefined,
            discount: disc > 0 ? disc : undefined,
          };
        });
        setCjProducts(mapped);
      } else {
        setError(json.error || 'Aucun produit trouvé');
      }
    } catch {
      setError('Erreur de chargement des produits');
    } finally {
      setLoading(false);
    }
  }, []);

  // Sort products
  const sortedProducts = [...cjProducts].sort((a, b) => {
    if (sortBy === 'prix-asc') return a.price - b.price;
    if (sortBy === 'prix-desc') return b.price - a.price;
    if (sortBy === 'note') return b.rating - a.rating;
    if (sortBy === 'nouveautes') return (a.badge === 'new' ? -1 : 1) - (b.badge === 'new' ? -1 : 1);
    // default: popularite
    return (a.badge === 'bestseller' ? -1 : 1) - (b.badge === 'bestseller' ? -1 : 1);
  });

  // When a sub-category is selected, fetch products
  useEffect(() => {
    if (selectedSub) {
      fetchProducts(category);
    } else if (!hasSubCategories) {
      fetchProducts(category);
    } else {
      setLoading(false);
    }
  }, [category, selectedSub, hasSubCategories, fetchProducts]);

  // Reset when category changes
  useEffect(() => {
    setSelectedSub(null);
    setCjProducts([]);
    setLoading(hasSubCategories ? false : true);
  }, [category]);

  return (
    <div className="min-h-screen bg-noir">
      {/* ===== TOP HEADER BAR ===== */}
      <div className="sticky top-0 z-40 bg-noir/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <button
            onClick={() => selectedSub ? setSelectedSub(null) : onBack()}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors shrink-0"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              {selectedSub ? 'Retour' : t('cat.back')}
            </span>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-base lg:text-lg font-bold gold-text truncate">
              {selectedSub ? t(selectedSub) : t(data.key)}
            </h1>
          </div>
          {cjProducts.length > 0 && (
            <span className="text-xs text-muted-foreground hidden md:block shrink-0">
              {cjProducts.length} produits
            </span>
          )}
        </div>
      </div>

      {/* ===== SUB-CATEGORIES: Horizontal scrollable tabs (like photo's category nav) ===== */}
      {hasSubCategories && (
        <div className="sticky top-14 z-30 bg-noir border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex items-center gap-1 overflow-x-auto py-3"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {data.subCategories!.map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                    sub.key === selectedSub
                      ? 'bg-gold text-noir font-bold'
                      : 'text-foreground/60 hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {t(sub.key)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== VIEW: Sub-categories photo grid (before any sub is selected) ===== */}
      {!selectedSub && hasSubCategories && (
        <>
          {/* Hero banner */}
          <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
            <img src={data.image} alt={t(data.key)} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
            <div className="absolute bottom-6 start-6 lg:bottom-10 lg:start-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{t(data.key)}</h2>
              <p className="text-white/70 text-sm sm:text-base">{t(data.key + 'Desc')}</p>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="font-display text-xl font-bold text-gold mb-6">Sous-catégories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {data.subCategories!.map((sub, i) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key)}
                  className="group relative rounded-2xl overflow-hidden border border-border aspect-[3/4] sm:aspect-[4/3] min-h-[180px] opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <img
                    src={sub.image}
                    alt={t(sub.key)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/10" />
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5">
                    <h4 className="font-display text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-gold transition-colors text-start">
                      {t(sub.key)}
                    </h4>
                    <p className="text-[11px] text-white/60 mt-1 text-start">{t(sub.key + 'Desc')}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ===== VIEW: Product grid (when sub-category selected or no subs) ===== */}
      {(selectedSub || !hasSubCategories) && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero banner for categories without sub-categories */}
          {!selectedSub && !hasSubCategories && (
            <div className="relative h-36 sm:h-48 overflow-hidden rounded-2xl mb-6">
              <img src={data.image} alt={t(data.key)} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
              <div className="absolute bottom-4 start-4 lg:bottom-6 lg:start-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{t(data.key)}</h2>
              </div>
            </div>
          )}

          {/* ===== FILTER TOOLBAR (matching reference photo) ===== */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            {/* Left: Filters */}
            <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-border text-foreground/70 bg-noir-card hover:border-gold/30 transition-all lg:hidden"
              >
                <SlidersHorizontal size={14} />
                Filtres
              </button>

              <FilterPill
                label="Catégorie"
                options={hasSubCategories ? data.subCategories!.map((s) => t(s.key)) : []}
                value={selectedSub ? t(selectedSub) : ''}
                onChange={(v) => {
                  if (!v) {
                    setSelectedSub(null);
                  } else {
                    const found = data.subCategories?.find((s) => t(s.key) === v);
                    if (found) setSelectedSub(found.key);
                  }
                }}
              />

              <FilterPill
                label="Prix"
                options={['Moins de 10€', '10€ - 25€', '25€ - 50€', 'Plus de 50€']}
                value={''}
                onChange={() => {}}
              />

              <FilterPill
                label="Note"
                options={['4★ & plus', '3★ & plus']}
                value={''}
                onChange={() => {}}
              />
            </div>

            {/* Right: Sort */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-noir-card border border-border text-foreground/70 rounded-lg pl-4 pr-10 py-2.5 text-xs font-medium outline-none focus:border-gold/40 transition-colors cursor-pointer"
              >
                <option value="popularite">Trier par : Popularité</option>
                <option value="nouveautes">Nouveautés</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="note">Meilleures notes</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* ===== PRODUCTS GRID (6 columns like reference photo) ===== */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">{error}</p>
              <button onClick={() => fetchProducts(category)} className="gold-btn px-6 py-2.5 rounded-xl text-sm font-bold">
                Réessayer
              </button>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {sortedProducts.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.03}s` }}>
                  <ProductCard
                    product={product}
                    locale={locale}
                    onClick={() => onProductClick?.(
                      String(product.id),
                      product.nameEn || product.name,
                      product.image,
                      product.price
                    )}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Bientôt disponible...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { catSlugs };
export type { CatSlug };
