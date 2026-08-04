'use client';

import { useI18n } from '@/lib/i18n-context';
import { Sparkles, Flower2, Shirt, Smartphone, Home as HomeIcon, Baby, Watch } from 'lucide-react';

const categories = [
  { key: 'cat.beauty', icon: Sparkles, gradient: 'from-rose-500/20 to-pink-500/20', accent: 'text-rose-400' },
  { key: 'cat.perfumes', icon: Flower2, gradient: 'from-purple-500/20 to-violet-500/20', accent: 'text-purple-400' },
  { key: 'cat.fashion', icon: Shirt, gradient: 'from-amber-500/20 to-yellow-500/20', accent: 'text-amber-400' },
  { key: 'cat.electronics', icon: Smartphone, gradient: 'from-blue-500/20 to-cyan-500/20', accent: 'text-blue-400' },
  { key: 'cat.home', icon: HomeIcon, gradient: 'from-emerald-500/20 to-green-500/20', accent: 'text-emerald-400' },
  { key: 'cat.kids', icon: Baby, gradient: 'from-orange-500/20 to-red-500/20', accent: 'text-orange-400' },
  { key: 'cat.watches', icon: Watch, gradient: 'from-slate-400/20 to-gray-500/20', accent: 'text-slate-300' },
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

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 lg:gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.key}
                href="#"
                className={`category-card group flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-noir-card border border-border text-center opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={cat.accent} />
                </div>
                <span className="text-sm font-semibold text-foreground/90 group-hover:text-gold transition-colors">
                  {t(cat.key)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
