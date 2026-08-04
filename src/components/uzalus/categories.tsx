'use client';

import { useI18n } from '@/lib/i18n-context';
import { Heart } from 'lucide-react';

const categories = [
  {
    key: 'cat.women',
    descKey: 'cat.womenDesc',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.men',
    descKey: 'cat.menDesc',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.beauty',
    descKey: 'cat.beautyDesc',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.perfumes',
    descKey: 'cat.perfumesDesc',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.electronics',
    descKey: 'cat.electronicsDesc',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.kids',
    descKey: 'cat.kidsDesc',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'cat.home',
    descKey: 'cat.homeDesc',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
  },
];

export function Categories() {
  const { t } = useI18n();

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('categories.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Category grid - visual cards with real photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <a
              key={cat.key}
              href="#products"
              className={`category-card group relative rounded-2xl overflow-hidden border border-border aspect-[3/4] sm:aspect-auto sm:min-h-[280px] opacity-0 animate-fade-in-up ${i === 0 || i === 1 ? 'sm:col-span-1 sm:row-span-1' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={t(cat.key)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 lg:p-6">
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                  {t(cat.key)}
                </h3>
                <p className="text-xs text-white/70">
                  {t(cat.descKey)}
                </p>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
