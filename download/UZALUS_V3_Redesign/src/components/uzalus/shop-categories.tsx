'use client';

import { useI18n } from '@/lib/i18n-context';
import {
  Shirt,
  Baby,
  Footprints,
  Home,
  Watch,
  Smartphone,
  Sparkles,
  Car,
  Package,
  Cpu,
  Dumbbell,
  Wrench,
  PawPrint,
  Gamepad2,
  Briefcase,
  Luggage,
  ShoppingBasket,
} from 'lucide-react';

const shopCategories = [
  { key: 'shop.modeHomme', descKey: 'shop.modeHommeDesc', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=400&fit=crop&q=80', icon: Shirt, slug: 'mode-homme' },
  { key: 'shop.modeFemme', descKey: 'shop.modeFemmeDesc', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&q=80', icon: Shirt, slug: 'mode-femme' },
  { key: 'shop.enfant', descKey: 'shop.enfantDesc', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=400&fit=crop&q=80', icon: Baby, slug: 'enfant' },
  { key: 'shop.chaussures', descKey: 'shop.chaussuresDesc', image: '/images/shop/cat-chaussures.jpg', icon: Footprints, slug: 'chaussures' },
  { key: 'shop.maison', descKey: 'shop.maisonDesc', image: '/images/shop/cat-maison.jpg', icon: Home, slug: 'maison' },
  { key: 'shop.accessoires', descKey: 'shop.accessoiresDesc', image: '/images/shop/cat-accessoires.jpg', icon: Watch, slug: 'accessoires' },
  { key: 'shop.telephones', descKey: 'shop.telephonesDesc', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80', icon: Smartphone, slug: 'telephones' },
  { key: 'shop.parfumsCosmetiques', descKey: 'shop.parfumsCosmetiquesDesc', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80', icon: Sparkles, slug: 'parfums-cosmetiques' },
  { key: 'shop.auto', descKey: 'shop.autoDesc', image: '/images/shop/cat-auto.jpg', icon: Car, slug: 'auto-moto' },
  { key: 'shop.emballage', descKey: 'shop.emballageDesc', image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80', icon: Package, slug: 'emballage' },
  { key: 'shop.electronique', descKey: 'shop.electroniqueDesc', image: '/images/shop/cat-electronique.jpg', icon: Cpu, slug: 'electronique' },
  { key: 'shop.sport', descKey: 'shop.sportDesc', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop&q=80', icon: Dumbbell, slug: 'sport' },
  { key: 'shop.bricolage', descKey: 'shop.bricolageDesc', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80', icon: Wrench, slug: 'bricolage' },
  { key: 'shop.animaux', descKey: 'shop.animauxDesc', image: 'https://images.unsplash.com/photo-1450778869180-e12d8520f945?w=600&h=400&fit=crop&q=80', icon: PawPrint, slug: 'animaux' },
  { key: 'shop.jouets', descKey: 'shop.jouetsDesc', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80', icon: Gamepad2, slug: 'jouets' },
  { key: 'shop.bureau', descKey: 'shop.bureauDesc', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80', icon: Briefcase, slug: 'bureau' },
  { key: 'shop.bagagerie', descKey: 'shop.bagagerieDesc', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80', icon: Luggage, slug: 'bagagerie' },
  { key: 'shop.alimentation', descKey: 'shop.alimentationDesc', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80', icon: ShoppingBasket, slug: 'alimentation' },
];

export function ShopCategories() {
  const { t } = useI18n();

  const handleClick = (slug: string) => {
    window.dispatchEvent(new CustomEvent('open-category', { detail: slug }));
  };

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('shop.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t('shop.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {shopCategories.map((cat, index) => {
            const Icon = cat.icon;
            const delay = Math.min(index * 60, 600);

            return (
              <button
                key={cat.slug}
                onClick={() => handleClick(cat.slug)}
                className={`group relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer gold-glow-hover
                  aspect-[4/5] sm:aspect-square opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${delay}ms` }}
                aria-label={t(cat.key)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={t(cat.key)}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Dark Gradient Overlay from Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Icon Badge - Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/20">
                    <Icon size={18} className="text-gold" />
                  </div>
                </div>

                {/* Text Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-tight transition-colors duration-300 group-hover:text-gold">
                    {t(cat.key)}
                  </h3>
                  <p className="text-white/60 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {t(cat.descKey)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
