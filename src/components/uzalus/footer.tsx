'use client';

import { useI18n } from '@/lib/i18n-context';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const quickLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/categories' },
  { key: 'nav.categories', href: '#categories' },
  { key: 'nav.deals', href: '#promotions' },
  { key: 'nav.marketplace', href: '/marketplace' },
  { key: 'nav.ai', href: '/uzalus-ia' },
];

const serviceLinks = [
  { key: 'footer.faq', href: '/categories' },
  { key: 'footer.shipping', href: '/categories' },
  { key: 'footer.returns', href: '/categories' },
  { key: 'footer.privacy', href: '/categories' },
  { key: 'footer.terms', href: '/categories' },
];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-noir-lighter border-t border-border">
      {/* AdSense placeholder before footer content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-8">
        <div className="ad-placeholder rounded-xl p-4 text-center mb-10">
          <span className="text-xs text-muted-foreground/50 uppercase tracking-widest">{t('ad.label')} — Google AdSense</span>
          <div className="h-24 flex items-center justify-center text-muted-foreground/30 text-sm">
            970 × 90 Large Leaderboard
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold gold-shimmer tracking-wider block mb-4">
              UZALUS
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="https://instagram.com/uzalus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-noir-card border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-all duration-300"
                  aria-label="Social media"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold tracking-wider uppercase mb-5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold tracking-wider uppercase mb-5">
              {t('footer.customerService')}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold tracking-wider uppercase mb-5">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">contact@uzalus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} UZALUS. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">💳 Visa</span>
            <span className="text-xs text-muted-foreground">💳 Mastercard</span>
            <span className="text-xs text-muted-foreground">💳 PayPal</span>
            <span className="text-xs text-muted-foreground">💳 Apple Pay</span>
            <span className="text-xs text-muted-foreground">💳 Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}