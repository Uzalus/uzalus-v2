'use client';

import { useI18n } from '@/lib/i18n-context';
import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

const allProducts = [
  {
    id: 1,
    name: 'Satin wrap midi dress with soft drape',
    nameFr: 'Robe midi en satin drapé souple',
    category: 'women',
    price: 34.90,
    oldPrice: 58,
    rating: 4.8,
    reviews: 342,
    discount: 40,
    badge: 'Hot' as const,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 2,
    name: 'Structured mini shoulder bag',
    nameFr: 'Mini sac à main structuré',
    category: 'women',
    price: 24.50,
    oldPrice: 42,
    rating: 4.7,
    reviews: 128,
    discount: 42,
    badge: 'Sale' as const,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 3,
    name: 'Clean-cut cotton overshirt',
    nameFr: 'Chemise-surchemise en coton coup net',
    category: 'men',
    price: 39.00,
    oldPrice: 64,
    rating: 4.6,
    reviews: 256,
    discount: 39,
    badge: 'New' as const,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 4,
    name: 'Everyday low-top sneakers',
    nameFr: 'Baskets basses du quotidien',
    category: 'men',
    price: 46.80,
    oldPrice: 79,
    rating: 4.8,
    reviews: 89,
    discount: 41,
    badge: 'Deal' as const,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 5,
    name: 'Kids color-block weekend set',
    nameFr: 'Enfant ensemble color-block week-end',
    category: 'kids',
    price: 18.75,
    oldPrice: 31,
    rating: 4.9,
    reviews: 197,
    discount: 40,
    badge: 'Bundle' as const,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 6,
    name: 'Pigment-rich makeup palette',
    nameFr: 'Palette maquillage riche en pigments',
    category: 'beauty',
    price: 16.99,
    oldPrice: 28,
    rating: 4.7,
    reviews: 412,
    discount: 39,
    badge: 'Top' as const,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 7,
    name: 'Glow serum skincare trio',
    nameFr: 'Trio sérums éclat soin peau',
    category: 'beauty',
    price: 27.20,
    oldPrice: 45,
    rating: 4.8,
    reviews: 164,
    discount: 40,
    badge: 'Glow' as const,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 8,
    name: 'Wireless studio headphones',
    nameFr: 'Casque sans fil studio',
    category: 'electronics',
    price: 59.90,
    oldPrice: 98,
    rating: 4.6,
    reviews: 73,
    discount: 39,
    badge: 'Tech' as const,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 9,
    name: 'Curved ceramic vase set',
    nameFr: 'Ensemble vases en céramique courbés',
    category: 'home',
    price: 32.10,
    oldPrice: 52,
    rating: 4.7,
    reviews: 156,
    discount: 38,
    badge: 'Decor' as const,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 10,
    name: 'Amber oud eau de parfum',
    nameFr: 'Eau de parfum oud ambre',
    category: 'perfumes',
    price: 41.40,
    oldPrice: 72,
    rating: 4.9,
    reviews: 298,
    discount: 43,
    badge: 'Scent' as const,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 11,
    name: 'Floral travel fragrance duo',
    nameFr: 'Duo parfum voyage floral',
    category: 'perfumes',
    price: 25.80,
    oldPrice: 43,
    rating: 4.6,
    reviews: 134,
    discount: 40,
    badge: 'Gift' as const,
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=520&q=82',
  },
  {
    id: 12,
    name: 'Ribbed lounge co-ord set',
    nameFr: 'Ensemble coordonné côtelé loungewear',
    category: 'women',
    price: 31.50,
    oldPrice: 54,
    rating: 4.7,
    reviews: 189,
    discount: 42,
    badge: 'Soft' as const,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=520&q=82',
  },
];

const filterTabs = ['all', 'women', 'men', 'kids', 'beauty', 'electronics', 'home', 'perfumes'] as const;
type FilterTab = typeof filterTabs[number];

const tabKeys: Record<FilterTab, string> = {
  all: 'nav.shop',
  women: 'cat.women',
  men: 'cat.men',
  kids: 'cat.kids',
  beauty: 'cat.beauty',
  electronics: 'cat.electronics',
  home: 'cat.home',
  perfumes: 'cat.perfumes',
};

export function Products() {
  const { t, locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = activeFilter === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === activeFilter);

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-noir-light/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === tab
                  ? 'gold-btn'
                  : 'bg-noir-card border border-border text-foreground/70 hover:text-gold hover:border-gold/30'
              }`}
            >
              {t(tabKeys[tab])}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="product-card group bg-noir-card rounded-2xl border border-border overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-noir-lighter">
                <img
                  src={product.image}
                  alt={locale === 'fr' ? product.nameFr : product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge */}
                <span
                  className={`absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                    product.badge === 'New' || product.badge === 'Hot'
                      ? 'bg-gold text-noir'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {product.badge === 'New' ? t('products.new') : `-${product.discount}%`}
                </span>

                {/* Wishlist */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 end-3 w-9 h-9 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={16}
                    className={`transition-colors ${liked.has(product.id) ? 'text-red-400 fill-red-400' : 'text-foreground/70 hover:text-red-400'}`}
                  />
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
                <h3 className="text-sm font-semibold text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                  {locale === 'fr' ? product.nameFr : product.name}
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

      {/* AdSense placeholder */}
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
