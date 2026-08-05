'use client';

import { useI18n } from '@/lib/i18n-context';
import { ShoppingBag, Sparkles, SprayCan, Shirt, Footprints, Cpu, Home, Watch, Car } from 'lucide-react';

const keyToSlug: Record<string, string> = {
  'shop.boutique': 'boutique',
  'shop.cosmetiques': 'cosmetiques',
  'shop.parfums': 'parfums',
  'shop.mode': 'mode',
  'shop.chaussures': 'chaussures',
  'shop.electronique': 'electronique',
  'shop.maison': 'maison',
  'shop.accessoires': 'accessoires',
  'shop.auto': 'auto',
};

const shopCategories = [
  {
    key: 'shop.boutique',
    descKey: 'shop.boutiqueDesc',
    image: '/images/shop/cat-boutique.jpg',
    icon: ShoppingBag,
  },
  {
    key: 'shop.cosmetiques',
    descKey: 'shop.cosmetiquesDesc',
    image: '/images/shop/cat-cosmetiques.jpg',
    icon: Sparkles,
  },
  {
    key: 'shop.parfums',
    descKey: 'shop.parfumsDesc',
    image: '/images/shop/cat-parfums.jpg',
    icon: SprayCan,
  },
  {
    key: 'shop.mode',
    descKey: 'shop.modeDesc',
    image: '/images/shop/cat-mode.jpg',
    icon: Shirt,
  },
  {
    key: 'shop.chaussures',
    descKey: 'shop.chaussuresDesc',
    image: '/images/shop/cat-chaussures.jpg',
    icon: Footprints,
  },
  {
    key: 'shop.electronique',
    descKey: 'shop.electroniqueDesc',
    image: '/images/shop/cat-electronique.jpg',
    icon: Cpu,
  },
  {
    key: 'shop.maison',
    descKey: 'shop.maisonDesc',
    image: '/images/shop/cat-maison.jpg',
    icon: Home,
  },
  {
    key: 'shop.accessoires',
    descKey: 'shop.accessoiresDesc',
    image: '/images/shop/cat-accessoires.jpg',
    icon: Watch,
  },
  {
    key: 'shop.auto',
    descKey: 'shop.autoDesc',
    image: '/images/shop/cat-auto.jpg',
    icon: Car,
  },
];

export function ShopCategories() {
  const { t } = useI18n();

  return (
    <section id="shop-categories" className="py-20 lg:py-28 bg-noir-light/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('shop.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('shop.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {shopCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  const slug = keyToSlug[cat.key];
                  if (slug) window.dispatchEvent(new CustomEvent('open-category', { detail: slug }));
                }}
                className="group relative rounded-2xl overflow-hidden border border-border aspect-[3/4] sm:aspect-auto sm:min-h-[240px] opacity-0 animate-fade-in-up text-start w-full"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <img
                  src={cat.image}
                  alt={t(cat.key)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/20" />

                {/* Icon badge */}
                <div className="absolute top-4 start-4 w-10 h-10 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-4 lg:p-5">
                  <h3 className="font-display text-base lg:text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors">
                    {t(cat.key)}
                  </h3>
                  <p className="text-xs text-white/60">{t(cat.descKey)}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}