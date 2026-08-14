'use client';

import { useI18n } from '@/lib/i18n-context';
import { ArrowLeft, Star, Heart, Loader2 } from 'lucide-react';
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
/*  Product Card (compact Shein/Wish style)                           */
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
      className="product-card group bg-noir-card rounded-xl border border-border overflow-hidden cursor-pointer opacity-0 animate-fade-in-up hover:border-gold/30 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-noir-lighter">
        <img
          src={product.image}
          alt={getName()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/0B0B0B/d4af37?text=UZALUS'; }}
        />
        {product.badge && (
          <span className={`absolute top-2 start-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
            product.badge === 'new' ? 'bg-gold text-noir' : product.badge === 'bestseller' ? 'bg-gold text-noir' : 'bg-red-500 text-white'
          }`}>
            {product.badge === 'new' ? 'Nouveau' : product.badge === 'bestseller' ? 'BEST-SELLER' : `-${product.discount}%`}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2 end-2 w-7 h-7 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Favoris"
        >
          <Heart size={12} className={liked ? 'text-red-400 fill-red-400' : 'text-foreground/70'} />
        </button>
      </div>
      <div className="p-2.5">
        <h3 className="text-xs font-medium text-foreground/80 mb-1.5 line-clamp-2 group-hover:text-gold transition-colors leading-snug min-h-[2.5em]">
          {getName()}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gold">{product.price.toFixed(2)}€</span>
          {product.oldPrice && <span className="text-[11px] text-muted-foreground line-through">{product.oldPrice.toFixed(2)}€</span>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading Spinner                                                     */
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
/*  Main Category Page                                                  */
/* ------------------------------------------------------------------ */
export function CategoryPage({ category, onBack, onProductClick }: CategoryPageProps) {
  const { t, locale } = useI18n();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [cjProducts, setCjProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            badge: i < 3 ? 'bestseller' : undefined,
            discount: p.originalPrice ? Math.round((1 - p.sellPrice / p.originalPrice) * 100) : undefined,
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

  // When a sub-category is selected, fetch products
  useEffect(() => {
    if (selectedSub) {
      fetchProducts(category);
    } else if (!hasSubCategories) {
      // No sub-categories → fetch products directly
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
      {/* Header */}
      <div className="sticky top-0 z-40 bg-noir/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-3 lg:px-6 h-14 flex items-center gap-3">
          <button
            onClick={() => selectedSub ? setSelectedSub(null) : onBack()}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              {selectedSub ? 'Retour' : t('cat.back')}
            </span>
          </button>
          <div className="flex-1">
            <h1 className="font-display text-base lg:text-lg font-bold gold-text truncate">
              {selectedSub ? t(selectedSub) : t(data.key)}
            </h1>
          </div>
          {cjProducts.length > 0 && !selectedSub && (
            <span className="text-xs text-muted-foreground hidden md:block">
              {cjProducts.length} produits
            </span>
          )}
        </div>
      </div>

      {/* ========== VIEW 1: Sub-categories with photos ========== */}
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

          <div className="max-w-7xl mx-auto px-3 lg:px-6 py-8">
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

      {/* ========== VIEW 2: Product grid (compact) ========== */}
      {(selectedSub || !hasSubCategories) && (
        <div className="max-w-7xl mx-auto px-3 lg:px-6 py-4">
          {/* Sub-category pills (when coming from sub-categories) */}
          {selectedSub && hasSubCategories && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {data.subCategories!.map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    sub.key === selectedSub
                      ? 'gold-btn'
                      : 'bg-noir-card border border-border text-foreground/60 hover:text-gold hover:border-gold/30'
                  }`}
                >
                  {t(sub.key)}
                </button>
              ))}
            </div>
          )}

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

          {/* Products */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">{error}</p>
              <button onClick={() => fetchProducts(category)} className="gold-btn px-6 py-2.5 rounded-xl text-sm font-bold">
                Réessayer
              </button>
            </div>
          ) : cjProducts.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {cjProducts.map((product, i) => (
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
