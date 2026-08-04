'use client';

import { useI18n } from '@/lib/i18n-context';
import { ArrowRight } from 'lucide-react';

export function Promotions() {
  const { t } = useI18n();

  return (
    <section id="promotions" className="py-20 lg:py-28 bg-noir-light/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('promo.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('promo.subtitle')}
          </p>
        </div>

        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Big promo */}
          <div className="group relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-gold/10 via-noir-card to-noir-card p-8 lg:p-12 min-h-[320px] flex flex-col justify-between gold-glow hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-all duration-500">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold tracking-wider uppercase mb-4">
                {t('products.sale')}
              </span>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('cat.beauty')} & {t('cat.perfumes')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('cat.fashion')}, {t('cat.watches')}, {t('cat.electronics')}
              </p>
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <span className="text-gold text-lg font-bold">{t('promo.upTo')}</span>
                <span className="font-display text-5xl lg:text-6xl font-bold gold-text ms-2">50%</span>
              </div>
              <a
                href="#"
                className="gold-btn px-6 py-3 rounded-full text-xs tracking-wider uppercase inline-flex items-center gap-2"
              >
                {t('promo.shopNow')}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Two stacked promos */}
          <div className="grid grid-rows-2 gap-6">
            <div className="group relative rounded-2xl overflow-hidden border border-border bg-noir-card p-6 lg:p-8 flex items-center gap-6 hover:border-gold/30 transition-all duration-500">
              <div className="flex-1">
                <span className="text-xs text-gold font-bold tracking-wider uppercase">{t('cat.electronics')}</span>
                <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-1">
                  {t('promo.upTo')} 40% {t('products.sale').toLowerCase()}
                </h3>
                <a
                  href="#"
                  className="text-sm text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1 mt-2"
                >
                  {t('promo.shopNow')} <ArrowRight size={14} />
                </a>
              </div>
              <div className="font-display text-5xl lg:text-6xl font-bold gold-text opacity-30">40%</div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-border bg-noir-card p-6 lg:p-8 flex items-center gap-6 hover:border-gold/30 transition-all duration-500">
              <div className="flex-1">
                <span className="text-xs text-gold font-bold tracking-wider uppercase">{t('cat.fashion')}</span>
                <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-1">
                  {t('products.new')} Collection
                </h3>
                <a
                  href="#"
                  className="text-sm text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1 mt-2"
                >
                  {t('promo.shopNow')} <ArrowRight size={14} />
                </a>
              </div>
              <div className="font-display text-4xl lg:text-5xl font-bold gold-text opacity-30">NEW</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}