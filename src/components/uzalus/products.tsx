'use client';

import { useI18n } from '@/lib/i18n-context';
import { Star, Heart, ShoppingBag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Parfum Luxe Noir',
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.8,
    reviews: 342,
    discount: 31,
    badge: 'sale' as const,
    color: 'from-amber-900/40 to-stone-900/40',
  },
  {
    id: 2,
    name: 'Sérum Visage Éclat',
    price: 49.99,
    oldPrice: null,
    rating: 4.9,
    reviews: 128,
    discount: 0,
    badge: 'new' as const,
    color: 'from-rose-900/40 to-pink-900/40',
  },
  {
    id: 3,
    name: 'Montre Premium Or',
    price: 199.99,
    oldPrice: 299.99,
    rating: 4.7,
    reviews: 256,
    discount: 33,
    badge: 'sale' as const,
    color: 'from-yellow-900/40 to-amber-900/40',
  },
  {
    id: 4,
    name: 'Écouteurs Sans Fil',
    price: 69.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 89,
    discount: 0,
    badge: 'new' as const,
    color: 'from-slate-800/40 to-gray-900/40',
  },
  {
    id: 5,
    name: 'Robe Élégante Soie',
    price: 119.99,
    oldPrice: 179.99,
    rating: 4.8,
    reviews: 197,
    discount: 33,
    badge: 'sale' as const,
    color: 'from-red-900/30 to-rose-900/30',
  },
  {
    id: 6,
    name: 'Coffret Beauté Complet',
    price: 59.99,
    oldPrice: 89.99,
    rating: 4.9,
    reviews: 412,
    discount: 33,
    badge: 'sale' as const,
    color: 'from-purple-900/30 to-violet-900/30',
  },
  {
    id: 7,
    name: 'Lampe Design LED',
    price: 44.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 73,
    discount: 0,
    badge: 'new' as const,
    color: 'from-emerald-900/30 to-teal-900/30',
  },
  {
    id: 8,
    name: 'Sac Cuir Artisanal',
    price: 149.99,
    oldPrice: 219.99,
    rating: 4.7,
    reviews: 164,
    discount: 32,
    badge: 'sale' as const,
    color: 'from-orange-900/30 to-amber-900/30',
  },
];

export function Products() {
  const { t } = useI18n();

  return (
    <section id="products" className="py-20 lg:py-28 bg-noir-light/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="product-card group bg-noir-card rounded-2xl border border-border overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Image placeholder */}
              <div className={`relative aspect-square bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}>
                <ShoppingBag size={40} className="text-foreground/10 group-hover:scale-110 transition-transform duration-500" />

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                      product.badge === 'new'
                        ? 'bg-gold text-noir'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {product.badge === 'new' ? t('products.new') : `-${product.discount}%`}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  className="absolute top-3 end-3 w-9 h-9 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} className="text-foreground/70 hover:text-red-400 transition-colors" />
                </button>

                {/* Quick add */}
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="gold-btn w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold">
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground/90 mb-2 truncate group-hover:text-gold transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-foreground/20'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gold">{product.price.toFixed(2)}€</span>
                  {product.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.oldPrice.toFixed(2)}€
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense placeholder - after products */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-12">
        <div className="ad-placeholder rounded-xl p-6 text-center">
          <span className="text-xs text-muted-foreground/50 uppercase tracking-widest">{t('ad.label')} — Google AdSense</span>
          <div className="h-20 flex items-center justify-center text-muted-foreground/30 text-sm">
            728 × 90 Leaderboard
          </div>
        </div>
      </div>
    </section>
  );
}
