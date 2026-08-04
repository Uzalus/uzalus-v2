'use client';

import { useI18n } from '@/lib/i18n-context';
import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

const allProducts = [
  {
    id: 1,
    name: 'Sérum Anti-Âge Premium au Rétinol',
    nameEn: 'Premium Retinol Anti-Aging Serum',
    nameEs: 'Sérum Anti-Edad Premium con Retinol',
    nameAr: 'سيروم مضاد الشيخوخة بالريتينول',
    category: 'antiaging',
    price: 49.90,
    oldPrice: 79.90,
    rating: 4.9,
    reviews: 1247,
    discount: 38,
    badge: 'bestseller' as const,
    image: '/images/beauty/product-antiaging.jpg',
  },
  {
    id: 2,
    name: 'Crème Peau Lisse Hydratante 24h',
    nameEn: '24h Smooth Skin Moisturizing Cream',
    nameEs: 'Crema Piel Lisa Hidratante 24h',
    nameAr: 'كريم بشرة ناعمة مرطب 24 ساعة',
    category: 'smooth',
    price: 39.90,
    oldPrice: 59.90,
    rating: 4.8,
    reviews: 892,
    discount: 33,
    badge: 'bestseller' as const,
    image: '/images/beauty/product-smoothskin.jpg',
  },
  {
    id: 3,
    name: 'Traitement Anti-Boutons & Acné',
    nameEn: 'Anti-Pimple & Acne Treatment',
    nameEs: 'Tratamiento Anti-Acné y Granos',
    nameAr: 'علاج حب الشباب والبثور',
    category: 'acne',
    price: 29.90,
    oldPrice: 49.90,
    rating: 4.7,
    reviews: 634,
    discount: 40,
    badge: 'sale' as const,
    image: '/images/beauty/product-acne.jpg',
  },
  {
    id: 4,
    name: 'Masque Purifiant Points Noirs',
    nameEn: 'Blackhead Purifying Mask',
    nameEs: 'Máscara Purificadora Puntos Negros',
    nameAr: 'قناع منظف للرؤوس السوداء',
    category: 'blackheads',
    price: 24.90,
    oldPrice: 39.90,
    rating: 4.8,
    reviews: 521,
    discount: 38,
    badge: 'new' as const,
    image: '/images/beauty/product-purify.jpg',
  },
  {
    id: 5,
    name: 'Crème Réparatrice Brûlures Mains & Visage',
    nameEn: 'Burn Repair Cream for Hands & Face',
    nameEs: 'Crema Reparadora Quemaduras Manos y Rostro',
    nameAr: 'كريم إصلاح الحروق لليدين والوجه',
    category: 'burns',
    price: 34.90,
    oldPrice: 54.90,
    rating: 4.6,
    reviews: 312,
    discount: 36,
    badge: 'new' as const,
    image: '/images/beauty/product-handcare.jpg',
  },
  {
    id: 6,
    name: 'Sérum Éclat & Jeunesse Vitamine C',
    nameEn: 'Vitamin C Glow & Youth Serum',
    nameEs: 'Sérum Luminosidad Vitamina C',
    nameAr: 'سيروم إشراق وفيتامين سي',
    category: 'bright',
    price: 44.90,
    oldPrice: 69.90,
    rating: 4.9,
    reviews: 756,
    discount: 36,
    badge: 'bestseller' as const,
    image: '/images/beauty/product-glowing.jpg',
  },
  {
    id: 7,
    name: 'Coffret Cadeau Beauté Premium',
    nameEn: 'Premium Beauty Gift Set',
    nameEs: 'Set Regalo Belleza Premium',
    nameAr: 'مجموعة هدايا الجمال الفاخرة',
    category: 'smooth',
    price: 89.90,
    oldPrice: 149.90,
    rating: 4.9,
    reviews: 445,
    discount: 40,
    badge: 'sale' as const,
    image: '/images/beauty/product-giftset.jpg',
  },
  {
    id: 8,
    name: 'Crème Contour des Yeux Anti-Cernes',
    nameEn: 'Dark Circle Eye Cream',
    nameEs: 'Crema Contorno de Ojos Anti-Ojeras',
    nameAr: 'كريم حول العين مضاد للهالات السوداء',
    category: 'eyes',
    price: 36.90,
    oldPrice: 59.90,
    rating: 4.7,
    reviews: 389,
    discount: 38,
    badge: 'new' as const,
    image: '/images/beauty/product-eyecream.jpg',
  },
];

const filterTabs = ['all', 'antiaging', 'acne', 'blackheads', 'smooth', 'burns', 'eyes', 'bright'] as const;
type FilterTab = typeof filterTabs[number];

const tabKeys: Record<FilterTab, string> = {
  all: 'nav.shop',
  antiaging: 'cat.antiaging',
  acne: 'cat.acne',
  blackheads: 'cat.blackheads',
  smooth: 'cat.smooth',
  burns: 'cat.burns',
  eyes: 'cat.eyes',
  bright: 'cat.bright',
};

export function Products() {
  const { t, locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const getName = (p: typeof allProducts[0]) => {
    if (locale === 'ar') return p.nameAr;
    if (locale === 'es') return p.nameEs;
    if (locale === 'en') return p.nameEn;
    return p.name;
  };

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
              <div className="relative aspect-square overflow-hidden bg-noir-lighter">
                <img
                  src={product.image}
                  alt={getName(product)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <span
                  className={`absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                    product.badge === 'new'
                      ? 'bg-gold text-noir'
                      : product.badge === 'bestseller'
                      ? 'bg-gold text-noir'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {product.badge === 'new'
                    ? t('products.new')
                    : product.badge === 'bestseller'
                    ? t('products.bestseller')
                    : `-${product.discount}%`}
                </span>

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

                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="gold-btn w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold">
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                  {getName(product)}
                </h3>

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

      {/* AdSense */}
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
