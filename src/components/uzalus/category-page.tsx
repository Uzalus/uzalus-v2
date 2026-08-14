'use client';

import { useI18n } from '@/lib/i18n-context';
import { ArrowLeft, Star, Heart, Loader2, SlidersHorizontal, ChevronDown, Truck, MessageCircle } from 'lucide-react';
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
/*  Star Rating                                                        */
/* ------------------------------------------------------------------ */
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-px">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={13} className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
        ))}
      </div>
      <span className="text-xs text-gray-500">({reviews})</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card (white theme, matching reference photo)                */
/* ------------------------------------------------------------------ */
function ProductCard({ product, onClick }: { product: ShopProduct; onClick: () => void }) {
  const [liked, setLiked] = useState(false);
  const getName = () => {
    if (product.nameEn) return product.nameEn;
    return product.name;
  };
  const heartClass = liked ? 'text-red-500 fill-red-500' : 'text-gray-700';

  return (
    <div onClick={onClick} className="group bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={getName()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x400/f5f5f5/999?text=UZALUS'; }}
        />
        {product.badge === 'new' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-black text-white">NOUVEAU</span>
        )}
        {product.discount && product.discount > 0 && product.badge !== 'new' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-red-500 text-white">-{product.discount}%</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm"
          aria-label="Favoris"
        >
          <Heart size={16} className={heartClass} />
        </button>
      </div>
      <div className="p-3 sm:p-3.5">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors leading-snug min-h-[2.5em]">{getName()}</h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-black">{product.price.toFixed(2).replace('.', ',')} €</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">{product.oldPrice.toFixed(2).replace('.', ',')} €</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Dropdown                                                    */
/* ------------------------------------------------------------------ */
function FilterPill({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnClass = value
    ? 'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-gray-900 text-gray-900 bg-gray-50 transition-all duration-200 whitespace-nowrap'
    : 'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-600 bg-white hover:border-gray-400 hover:text-gray-900 transition-all duration-200 whitespace-nowrap';
  const chevClass = open ? 'transition-transform duration-200 rotate-180' : 'transition-transform duration-200';

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={btnClass}>
        {label}
        <ChevronDown size={14} className={chevClass} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[160px] py-1">
            <button onClick={() => { onChange(''); setOpen(false); }} className={"w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors " + (!value ? 'text-gray-900 font-medium' : 'text-gray-600')}>Tous</button>
            {options.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} className={"w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors " + (value === opt ? 'text-gray-900 font-medium' : 'text-gray-600')}>{opt}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading                                                            */
/* ------------------------------------------------------------------ */
function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
          <div className="h-5 bg-gray-200 rounded w-2/5" />
        </div>
      ))}
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
  const [sortBy, setSortBy] = useState('popularite');

  const data = shopCategoriesData[category];
  if (!data) return null;
  const hasSubCategories = !!(data.subCategories && data.subCategories.length > 0);

  const fetchProducts = useCallback(async (catSlug: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/cj/products?category=' + encodeURIComponent(catSlug) + '&pageSize=60');
      const json = await res.json();
      if (json.success && json.products && json.products.length > 0) {
        const mapped: ShopProduct[] = json.products.map((p: any, i: number) => {
          const priceResult = calculateSellingPrice(p.sellPrice || 0);
          const disc = p.originalPrice ? Math.round((1 - p.sellPrice / p.originalPrice) * 100) : 0;
          return {
            id: Number(p.pid) || i,
            name: p.productNameEn || 'Produit',
            nameEn: p.productNameEn || '',
            nameEs: p.productNameEn || '',
            nameAr: p.productNameEn || '',
            image: p.productImage || '',
            price: priceResult.price,
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

  useEffect(() => {
    if (selectedSub) {
      fetchProducts(category);
    } else if (!hasSubCategories) {
      fetchProducts(category);
    } else {
      setLoading(false);
    }
  }, [category, selectedSub, hasSubCategories, fetchProducts]);

  useEffect(() => {
    setSelectedSub(null);
    setCjProducts([]);
    setLoading(hasSubCategories ? false : true);
  }, [category]);

  const sortedProducts = [...cjProducts].sort((a, b) => {
    if (sortBy === 'prix-asc') return a.price - b.price;
    if (sortBy === 'prix-desc') return b.price - a.price;
    if (sortBy === 'note') return b.rating - a.rating;
    if (sortBy === 'nouveautes') return (a.badge === 'new' ? -1 : 1) - (b.badge === 'new' ? -1 : 1);
    return (a.badge === 'bestseller' ? -1 : 1) - (b.badge === 'bestseller' ? -1 : 1);
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Announcement Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs text-gray-600">
          <div className="hidden sm:flex items-center gap-2">
            <Truck size={14} />
            <span>Livraison gratuite dès 49€ d&apos;achat</span>
          </div>
          <span className="font-medium">-10% sur votre première commande | Code : <span className="font-bold text-gray-900">UZALUS10</span></span>
          <div className="hidden sm:flex items-center gap-2">
            <MessageCircle size={14} />
            <span>Service client 24/7</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <button onClick={() => selectedSub ? setSelectedSub(null) : onBack()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">{selectedSub ? 'Retour' : 'Accueil'}</span>
          </button>
          <div className="flex-1">
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{selectedSub ? t(selectedSub) : t(data.key)}</h1>
          </div>
          {cjProducts.length > 0 && (
            <span className="text-xs text-gray-500 hidden md:block">{cjProducts.length} produits</span>
          )}
        </div>

        {/* Sub-category tabs */}
        {hasSubCategories && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto pb-3 -mb-px" style={{ scrollbarWidth: 'none' }}>
              {data.subCategories!.map((sub) => {
                const isActive = sub.key === selectedSub;
                const tabClass = isActive
                  ? 'flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 whitespace-nowrap bg-gray-900 text-white'
                  : 'flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap text-gray-600 hover:text-gray-900 hover:bg-gray-100';
                return (
                  <button key={sub.key} onClick={() => setSelectedSub(sub.key)} className={tabClass}>
                    {t(sub.key)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: Sub-categories hero grid */}
      {selectedSub === null && hasSubCategories && (
        <div className="bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {data.subCategories!.map((sub, i) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key)}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] opacity-0 animate-fade-in-up"
                  style={{ animationDelay: (i * 0.05) + 's' }}
                >
                  <img src={sub.image} alt={t(sub.key)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-3 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">{t(sub.key)}</h4>
                    <p className="text-[11px] text-white/70 mt-1">Voir plus</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Product grid with filters */}
      {(selectedSub || !hasSubCategories) && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Filter Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-600 bg-white hover:border-gray-400 transition-all whitespace-nowrap">
                <SlidersHorizontal size={14} />
                Filtres
              </button>
              <FilterPill label="Prix" options={['Moins de 10€', '10€ - 25€', '25€ - 50€', 'Plus de 50€']} value={''} onChange={() => {}} />
              <FilterPill label="Note" options={['4 étoiles et plus', '3 étoiles et plus']} value={''} onChange={() => {}} />
            </div>
            <div className="relative shrink-0">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white border border-gray-300 text-gray-600 rounded-lg pl-4 pr-10 py-2.5 text-xs font-medium outline-none focus:border-gray-400 transition-colors cursor-pointer">
                <option value="popularite">Trier par : Popularité</option>
                <option value="nouveautes">Nouveautés</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="note">Meilleures notes</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <LoadingGrid />
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg mb-4">{error}</p>
              <button onClick={() => fetchProducts(category)} className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Réessayer</button>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {sortedProducts.map((product, i) => (
                <div key={product.id} style={{ animationDelay: (i * 0.03) + 's' }}>
                  <ProductCard
                    product={product}
                    onClick={() => onProductClick?.(String(product.id), product.nameEn || product.name, product.image, product.price)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-400">Bientôt disponible...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { catSlugs };
export type { CatSlug };
