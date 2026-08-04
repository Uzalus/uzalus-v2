'use client';

import { useI18n } from '@/lib/i18n-context';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { shopCategoriesData, type ShopProduct } from '@/lib/shop-data';

const catSlugs = ['boutique', 'cosmetiques', 'parfums', 'mode', 'chaussures', 'electronique', 'maison', 'accessoires'] as const;
type CatSlug = typeof catSlugs[number];

interface CategoryPageProps {
  category: CatSlug;
  onBack: () => void;
}

function ProductCard({ product, locale }: { product: ShopProduct; locale: string }) {
  const { t } = useI18n();
  const [liked, setLiked] = useState(false);
  const getName = () => {
    if (locale === 'ar') return product.nameAr;
    if (locale === 'es') return product.nameEs;
    if (locale === 'en') return product.nameEn;
    return product.name;
  };

  return (
    <div className="product-card group bg-noir-card rounded-2xl border border-border overflow-hidden opacity-0 animate-fade-in-up">
      <div className="relative aspect-square overflow-hidden bg-noir-lighter">
        <img src={product.image} alt={getName()} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
            product.badge === 'new' ? 'bg-gold text-noir' : product.badge === 'bestseller' ? 'bg-gold text-noir' : 'bg-red-500 text-white'
          }`}>
            {product.badge === 'new' ? t('products.new') : product.badge === 'bestseller' ? t('products.bestseller') : `-${product.discount}%`}
          </span>
        )}
        <button onClick={() => setLiked(!liked)} className="absolute top-3 end-3 w-9 h-9 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80" aria-label="Wishlist">
          <Heart size={16} className={`transition-colors ${liked ? 'text-red-400 fill-red-400' : 'text-foreground/70 hover:text-red-400'}`} />
        </button>
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="gold-btn w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold">{t('products.addToCart')}</button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug">{getName()}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={12} className={j < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-foreground/20'} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gold">{product.price.toFixed(2)}€</span>
          {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{product.oldPrice.toFixed(2)}€</span>}
        </div>
      </div>
    </div>
  );
}

export function CategoryPage({ category, onBack }: CategoryPageProps) {
  const { t, locale } = useI18n();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const data = shopCategoriesData[category];
  if (!data) return null;

  const hasSubCategories = data.subCategories && data.subCategories.length > 0;
  const currentProducts = selectedSub
    ? data.subCategories?.find(s => s.key === selectedSub)?.products || []
    : data.products;

  return (
    <div className="min-h-screen bg-noir">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-noir/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-4">
          <button onClick={selectedSub ? () => setSelectedSub(null) : onBack} className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">{t('cat.back')}</span>
          </button>
          <div className="flex-1">
            <h1 className="font-display text-lg lg:text-xl font-bold gold-text">{t(data.key)}</h1>
          </div>
          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span>UZALUS</span>
            <span>/</span>
            <span className="text-gold">{t(data.key)}</span>
            {selectedSub && <><span>/</span><span className="text-gold">{t(selectedSub)}</span></>}
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
        <img src={data.image} alt={t(data.key)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="absolute bottom-6 start-6 lg:bottom-10 lg:start-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{t(data.key)}</h2>
          <p className="text-white/70 text-sm sm:text-base">{t(data.key + 'Desc')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        {/* Sub-categories (Mode) */}
        {hasSubCategories && !selectedSub && (
          <div className="mb-12">
            <h3 className="font-display text-xl font-bold text-gold mb-6">{t('cat.subCategories')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {data.subCategories!.map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key)}
                  className="group relative rounded-2xl overflow-hidden border border-border aspect-[3/4] sm:aspect-[4/3] min-h-[200px] opacity-0 animate-fade-in-up"
                >
                  <img src={sub.image} alt={t(sub.key)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/10" />
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-5">
                    <h4 className="font-display text-lg lg:text-xl font-bold text-white group-hover:text-gold transition-colors">{t(sub.key)}</h4>
                    <p className="text-xs text-white/60 mt-1">{sub.products.length} articles</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back to sub-categories when in sub-view */}
        {hasSubCategories && selectedSub && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold text-gold mb-4">{t(selectedSub)}</h3>
            <div className="flex flex-wrap gap-2">
              {data.subCategories!.map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSub(sub.key === selectedSub ? null : sub.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    sub.key === selectedSub ? 'gold-btn' : 'bg-noir-card border border-border text-foreground/70 hover:text-gold hover:border-gold/30'
                  }`}
                >
                  {t(sub.key)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {currentProducts.length > 0 ? (
          <>
            {!hasSubCategories && <h3 className="font-display text-xl font-bold text-gold mb-6">{t('cat.allProducts')}</h3>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {currentProducts.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  <ProductCard product={product} locale={locale} />
                </div>
              ))}
            </div>
          </>
        ) : (
          !hasSubCategories && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Bientôt disponible...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export { catSlugs };
export type { CatSlug };
