'use client';

import { useI18n } from '@/lib/i18n-context';
import { Truck, Shield, RotateCcw, Award, Headset } from 'lucide-react';

const trustItems = [
  { icon: Truck, titleKey: 'trust.delivery', descKey: 'trust.deliveryDesc' },
  { icon: Shield, titleKey: 'trust.payment', descKey: 'trust.paymentDesc' },
  { icon: RotateCcw, titleKey: 'trust.returns', descKey: 'trust.returnsDesc' },
  { icon: Award, titleKey: 'trust.quality', descKey: 'trust.qualityDesc' },
  { icon: Headset, titleKey: 'trust.support', descKey: 'trust.supportDesc' },
];

export function TrustBar() {
  const { t } = useI18n();

  return (
    <section className="bg-noir">
      {/* Subtle gold line separator at top */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
        {/* Section title */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold gold-text text-center mb-8 lg:mb-10">
          {t('trust.title')}
        </h2>

        {/* Trust items — 5 columns on desktop, horizontal scroll on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titleKey}
                className="flex flex-col items-center text-center gap-3 opacity-0 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/40 transition-colors duration-300">
                  <Icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
