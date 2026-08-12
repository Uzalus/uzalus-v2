'use client';

import { useI18n } from '@/lib/i18n-context';
import { Flame, ShoppingBag, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FlashProduct {
  id: number;
  nameKey: string;
  nameFallback: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  badge: string;
}

const flashProducts: FlashProduct[] = [
  {
    id: 201,
    nameKey: 'flash.product1',
    nameFallback: 'Sérum Rétinol Anti-Âge',
    price: 27.90,
    oldPrice: 49.90,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop&q=80',
    badge: 'SALE',
  },
  {
    id: 202,
    nameKey: 'flash.product2',
    nameFallback: 'Crème Hydratante Premium',
    price: 22.90,
    oldPrice: 39.90,
    discount: 43,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop&q=80',
    badge: '-43%',
  },
  {
    id: 203,
    nameKey: 'flash.product3',
    nameFallback: 'Kit Masque Points Noirs',
    price: 14.90,
    oldPrice: 24.90,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=400&h=500&fit=crop&q=80',
    badge: 'PROMO',
  },
  {
    id: 204,
    nameKey: 'flash.product4',
    nameFallback: 'Huile Vitamine C Éclat',
    price: 32.90,
    oldPrice: 54.90,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=500&fit=crop&q=80',
    badge: '-40%',
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

function TimerBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-noir-card border-2 border-gold/40 rounded-xl flex items-center justify-center relative overflow-hidden">
        <span className="font-display text-2xl sm:text-3xl font-bold text-gold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-noir-lighter/30" />
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function FlashSales() {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 24);
    target.setMinutes(0, 0, 0);

    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const getName = (p: FlashProduct) => {
    const translated = t(p.nameKey);
    return translated !== p.nameKey ? translated : p.nameFallback;
  };

  return (
    <section id="flash-deals" className="py-16 lg:py-24 bg-noir">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <Flame size={28} className="text-orange-500" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text">
              {t('flash.title')}
            </h2>
            <Flame size={28} className="text-orange-500" />
          </div>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('flash.subtitle')}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12">
          <TimerBox value={timeLeft.days} label={t('flash.days')} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <TimerBox value={timeLeft.hours} label={t('flash.hours')} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <TimerBox value={timeLeft.minutes} label={t('flash.minutes')} />
          <span className="text-2xl font-bold text-gold mt-[-20px]">:</span>
          <TimerBox value={timeLeft.seconds} label={t('flash.seconds')} />
        </div>

        {/* Products — horizontal scroll on mobile, grid on desktop */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flashProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-72 sm:w-80 snap-start group bg-noir-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              {/* Card inner layout: image area + ad placeholder side */}
              <div className="flex">
                {/* Product image */}
                <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-noir-lighter">
                  <img
                    src={product.image}
                    alt={getName(product)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <span className="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-red-500 text-white">
                    {product.badge}
                  </span>

                  {/* Quick view overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold bg-noir/70 backdrop-blur-sm text-foreground border border-border hover:border-gold/40 hover:text-gold transition-colors flex items-center justify-center gap-2">
                      <Eye size={14} />
                      {t('flash.shopNow')}
                    </button>
                  </div>
                </div>

                {/* Small ad placeholder on right side */}
                <div className="hidden sm:flex flex-col items-center justify-center w-16 bg-noir-lighter/50 border-s border-border/50">
                  <div className="ad-placeholder w-12 h-16 rounded flex items-center justify-center">
                    <span className="text-[8px] text-muted-foreground/50 uppercase tracking-wider text-center leading-tight">Ad</span>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground/90 mb-3 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                  {getName(product)}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gold">{product.price.toFixed(2)}€</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.oldPrice.toFixed(2)}€
                  </span>
                </div>

                <button className="gold-btn w-full py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2">
                  <ShoppingBag size={14} />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom AdSense Placeholder */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-12">
        <div className="border border-dashed border-gray-700 rounded-lg p-2 text-center bg-[#0a0a0a]/50 max-w-3xl mx-auto">
          <p className="text-gray-500 text-[10px] uppercase tracking-wider">Publicité &bull; 728 × 90</p>
        </div>
      </div>
    </section>
  );
}
