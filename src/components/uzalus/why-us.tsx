'use client';

import { useI18n } from '@/lib/i18n-context';
import { Truck, ShieldCheck, RotateCcw, Award } from 'lucide-react';

const features = [
  { key: 'why.delivery', descKey: 'why.deliveryDesc', icon: Truck },
  { key: 'why.payment', descKey: 'why.paymentDesc', icon: ShieldCheck },
  { key: 'why.returns', descKey: 'why.returnsDesc', icon: RotateCcw },
  { key: 'why.quality', descKey: 'why.qualityDesc', icon: Award },
];

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
            {t('why.title')}
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.key}
                className="group text-center p-8 rounded-2xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-500 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {t(feat.key)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(feat.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
