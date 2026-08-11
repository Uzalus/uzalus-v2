'use client';

import { useI18n } from '@/lib/i18n';
import { Heart, Flame, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FlashProduct {
  id: number;
  name: string;
  nameEn: string;
  nameEs: string;
  nameAr: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

const flashProducts: FlashProduct[] = [
  {
    id: 101,
    name: 'Sérum Rétinol Anti-Âge',
    nameEn: 'Retinol Anti-Aging Serum',
    nameEs: 'Sérum Retinol Anti-Edad',
    nameAr: 'سيروم ريتينول مضاد الشيخوخة',
    price: 27.90,
    oldPrice: 49.90,
    discount: 44,
    image: '/images/beauty/product-antiaging.jpg',
  },
  {
    id: 102,
    name: 'Crème Hydratante Premium',
    nameEn: 'Premium Moisturizing Cream',
    nameEs: 'Crema Hidratante Premium',
    nameAr: 'كريم مرطب فاخر',
    price: 22.90,
    oldPrice: 39.90,
    discount: 43,
    image: '/images/beauty/product-smoothskin.jpg',
  },
  {
    id: 103,
    name: 'Kit Masque Points Noirs',
    nameEn: 'Blackhead Mask Kit',
    nameEs: 'Kit Máscara Puntos Negros',
    nameAr: 'طقم قناع الرؤوس السوداء',
    price: 14.90,
    oldPrice: 24.90,
    discount: 40,
    image: '/images/beauty/product-purify.jpg',
  },
  {
    id: 104,
    name: 'Huile Vitamine C Éclat',
    nameEn: 'Vitamin C Glow Oil',
    nameEs: 'Aceite Vitamina C Luminosidad',
    nameAr: 'زيت فيتامين سي للإشراق',
    price: 32.90,
    oldPrice: 54.90,
    discount: 40,
    image: '/images/beauty/product-glowing.jpg',
  },
  {
    id: 105,
    name: 'Crème Anti-Cernes',
    nameEn: 'Dark Circle Cream',
    nameEs: 'Crema Anti-Ojeras',
    nameAr: 'كريم مضاد للهالات السوداء',
    price: 19.90,
    oldPrice: 34.90,
    discount: 43,
    image: '/images/beauty/product-eyecream.jpg',
  },
];

function getTimeLeft(targetDate: Date) {
  const now = Date.now();
  const diff = Math.max(0, targetDate.getTime() - now);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds };
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (ref.current && value !== prevValue.current) {
      ref.current.classList.remove('animate-flip');
      void ref.current.offsetWidth;
      ref.current.classList.add('animate-flip');
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        ref={ref}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-noir-card border border-border rounded-xl flex items-center justify-center relative overflow-hidden"
      >
        <span className="font-display text-2xl sm:text-3xl font-bold text-gold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-noir-light/30" />
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function FlashSales() {
  const { t, locale } = useI18n();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59, 999);

    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const getName = (p: FlashProduct) => {
    if (locale === 'ar') return p.nameAr;
    if (locale === 'es') return p.nameEs;
    if (locale === 'en') return p.nameEn;
    return p.name;
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const dayLabel = locale === 'fr' ? 'Jours' : locale === 'es' ? 'Días' : locale === 'ar' ? 'أيام' : 'Days';
  const hourLabel = locale === 'fr' ? 'Heures' : locale === 'es' ? 'Horas' : locale === 'ar' ? 'ساعات' : 'Hours';
  const minLabel = locale === 'fr' ? 'Minutes' : locale === 'es' ? 'Minutos' : locale === 'ar' ? 'دقائق' : 'Minutes';
  const secLabel = locale === 'fr' ? 'Secondes' : locale === 'es' ? 'Segundos' : locale === 'ar' ? 'ثوان' : 'Seconds';

  return (
    <section className="py-16 lg:py-24 bg-noir">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame size={24} className="text-orange-500" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text">
              {t('flashSales.title') || 'Offres du moment'}
            </h2>
            <Flame size={24} className="text-orange-500" />
          </div>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('flashSales.subtitle') || 'Profitez de nos offres limitées avant qu\'il ne soit trop tard'}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10">
          <FlipCard value={timeLeft.days} label={dayLabel} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <FlipCard value={timeLeft.hours} label={hourLabel} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <FlipCard value={timeLeft.minutes} label={minLabel} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <FlipCard value={timeLeft.seconds} label={secLabel} />
        </div>

        {/* Horizontal Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flashProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-64 sm:w-72 snap-start group bg-noir-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-noir-lighter">
                <img
                  src={product.image}
                  alt={getName(product)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Discount Badge */}
                <span className="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-red-500 text-white">
                  -{product.discount}%
                </span>

                {/* Heart Icon */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 end-3 w-9 h-9 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center transition-opacity hover:bg-noir/80"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={16}
                    className={
                      liked.has(product.id)
                        ? 'text-red-400 fill-red-400'
                        : 'text-foreground/70 hover:text-red-400'
                    }
                  />
                </button>

                {/* Add to Cart Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="gold-btn w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold">
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground/90 mb-3 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                  {getName(product)}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gold">{product.price.toFixed(2)}€</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.oldPrice.toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* See All Button Card */}
          <div className="flex-none w-64 sm:w-72 snap-start flex items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-noir-card/50 hover:bg-gold/5 transition-colors cursor-pointer group/cta">
            <div className="text-center p-6">
              <ChevronRight
                size={32}
                className="text-gold mx-auto mb-3 group-hover/cta:translate-x-1 transition-transform"
              />
              <span className="text-gold font-semibold text-sm tracking-wider uppercase">
                {t('flashSales.viewAll') || 'Voir toutes les offres'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-12">
        <div className="border border-dashed border-gray-700 rounded-lg p-2 text-center bg-[#0a0a0a]/50 max-w-3xl mx-auto">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider">Publicité &bull; 728 × 90</p>
        </div>
      </div>
    </section>
  );
}
