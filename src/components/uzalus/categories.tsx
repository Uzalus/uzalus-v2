'use client';

import { useI18n } from '@/lib/i18n-context';

const categories = [
  {
    key: 'cat.antiaging',
    descKey: 'cat.antiagingDesc',
    image: '/images/beauty/product-antiaging.jpg',
  },
  {
    key: 'cat.acne',
    descKey: 'cat.acneDesc',
    image: '/images/beauty/product-acne.jpg',
  },
  {
    key: 'cat.blackheads',
    descKey: 'cat.blackheadsDesc',
    image: '/images/beauty/product-purify.jpg',
  },
  {
    key: 'cat.smooth',
    descKey: 'cat.smoothDesc',
    image: '/images/beauty/product-smoothskin.jpg',
  },
  {
    key: 'cat.burns',
    descKey: 'cat.burnsDesc',
    image: '/images/beauty/product-handcare.jpg',
  },
  {
    key: 'cat.eyes',
    descKey: 'cat.eyesDesc',
    image: '/images/beauty/product-eyecream.jpg',
  },
  {
    key: 'cat.bright',
    descKey: 'cat.brightDesc',
    image: '/images/beauty/product-glowing.jpg',
  },
];

export function Categories() {
  const { t } = useI18n();

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('categories.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <a
              key={cat.key}
              href="#products"
              className={`category-card group relative rounded-2xl overflow-hidden border border-border aspect-[3/4] sm:aspect-auto sm:min-h-[260px] opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={cat.image}
                alt={t(cat.key)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/10" />
              <div className="relative z-10 h-full flex flex-col justify-end p-5 lg:p-6">
                <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                  {t(cat.key)}
                </h3>
                <p className="text-xs text-white/70">{t(cat.descKey)}</p>
              </div>
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
