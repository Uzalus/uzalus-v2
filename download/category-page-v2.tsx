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

function ProductCard({ product, locale, onClick }: { product: ShopProduct; locale: string; onClick: () => void }) {
  const { t } = useI18n();
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
            {product.badge === 'new' ? t('products.new') : product.badge === 'bestseller' ? t('products.bestseller') : `-${product.discount}%`}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2 end-2 w-7 h-7 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
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

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 size={40} className="text-gold animate-spin" />
      <p className="text-muted-foreground text-sm">Chargement des produits...</p>
    </div>
  );
}

export function CategoryPage({ category, onBack, onProductClick }: CategoryPageProps) {
  const { t, locale } = useI18n();
  const [cjProducts, setCjProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts]);

  const data = shopCategoriesData[category];
  if (!data) return null;

  return (
    <div className="min-h-screen bg-noir">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-noir/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-3 lg:px-6 h-14 flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">Retour</span>
          </button>
          <div className="flex-1">
            <h1 className="font-display text-base lg:text-lg font-bold gold-text truncate">{t(data.key)}</h1>
          </div>
          <span className="text-xs text-muted-foreground hidden md:block">
            {cjProducts.length} produits
          </span>
        </div>
      </div>

      {/* Products grid - compact Shein/Wish style */}
      <div className="max-w-7xl mx-auto px-3 lg:px-6 py-4">
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
    </div>
  );
}

export { catSlugs };
export type { CatSlug };