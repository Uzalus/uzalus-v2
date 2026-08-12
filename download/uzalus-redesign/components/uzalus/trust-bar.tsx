'use client';

import { useI18n } from '@/lib/i18n';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: Truck,
    titleKey: 'trust.delivery',
    titleFr: 'Livraison rapide',
    titleEn: 'Fast Delivery',
    titleEs: 'Envío rápido',
    titleAr: 'شحن سريع',
    subtitleKey: 'trust.deliverySub',
    subtitleFr: 'Mondial',
    subtitleEn: 'Worldwide',
    subtitleEs: 'Mundial',
    subtitleAr: 'عالمي',
  },
  {
    icon: ShieldCheck,
    titleKey: 'trust.payment',
    titleFr: 'Paiement sécurisé',
    titleEn: 'Secure Payment',
    titleEs: 'Pago seguro',
    titleAr: 'دفع آمن',
    subtitleKey: 'trust.paymentSub',
    subtitleFr: '100% sécurisé',
    subtitleEn: '100% Secure',
    subtitleEs: '100% seguro',
    subtitleAr: 'آمن 100%',
  },
  {
    icon: RotateCcw,
    titleKey: 'trust.returns',
    titleFr: 'Satisfait ou remboursé',
    titleEn: 'Satisfied or Refunded',
    titleEs: 'Satisfacción o reembolso',
    titleAr: 'راضٍ أو مسترد',
    subtitleKey: 'trust.returnsSub',
    subtitleFr: '14 jours',
    subtitleEn: '14 days',
    subtitleEs: '14 días',
    subtitleAr: '14 يومًا',
  },
  {
    icon: Headphones,
    titleKey: 'trust.support',
    titleFr: 'Support 24/7',
    titleEn: 'Support 24/7',
    titleEs: 'Soporte 24/7',
    titleAr: 'الدعم 24/7',
    subtitleKey: 'trust.supportSub',
    subtitleFr: 'À votre écoute',
    subtitleEn: 'We are here for you',
    subtitleEs: 'Estamos aquí para ti',
    subtitleAr: 'نحن هنا لمساعدتك',
  },
];

export function TrustBar() {
  const { t, locale } = useI18n();

  const getTitle = (item: (typeof trustItems)[0]) => {
    const translated = t(item.titleKey);
    if (translated !== item.titleKey) return translated;
    if (locale === 'en') return item.titleEn;
    if (locale === 'es') return item.titleEs;
    if (locale === 'ar') return item.titleAr;
    return item.titleFr;
  };

  const getSubtitle = (item: (typeof trustItems)[0]) => {
    const translated = t(item.subtitleKey);
    if (translated !== item.subtitleKey) return translated;
    if (locale === 'en') return item.subtitleEn;
    if (locale === 'es') return item.subtitleEs;
    if (locale === 'ar') return item.subtitleAr;
    return item.subtitleFr;
  };

  return (
    <section className="bg-noir border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titleKey}
                className="flex flex-col items-center text-center gap-3 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <Icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    {getTitle(item)}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {getSubtitle(item)}
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
