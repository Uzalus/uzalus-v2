'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { type Locale, localeNames, localeFlags } from '@/lib/i18n';
import { Search, User, Heart, ShoppingBag, Menu, X, Globe, ChevronDown } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '#' },
  { key: 'nav.shop', href: '#products' },
  { key: 'nav.categories', href: '#categories' },
  { key: 'nav.deals', href: '#promotions' },
  { key: 'nav.blog', href: '#' },
];

export function Navbar() {
  const { t, locale, setLocale, dir } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locales: Locale[] = ['fr', 'en', 'es', 'ar'];

  return (
    <>
      {/* Top bar */}
      <div className="bg-noir-lighter border-b border-border text-xs text-muted-foreground hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9">
          <span>{t('hero.tagline')}</span>
          <div className="flex items-center gap-4">
            <span>🚚 Livraison gratuite dès 50€</span>
            <span>🔒 Paiement 100% sécurisé</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-noir/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-border'
            : 'bg-transparent'
        }`}
        dir={dir}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className="font-display text-2xl lg:text-3xl font-bold gold-shimmer tracking-wider">
                UZALUS
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <div className="hidden sm:flex items-center bg-noir-lighter border border-border rounded-full px-4 py-2 gap-2 w-48 lg:w-64 focus-within:border-gold/50 transition-colors">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
                />
              </div>

              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-2 py-2 text-sm text-foreground/80 hover:text-gold transition-colors rounded-lg hover:bg-noir-lighter"
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">{localeFlags[locale]}</span>
                  <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute top-full end-0 mt-2 bg-noir-lighter border border-border rounded-xl shadow-2xl shadow-black/50 py-2 z-50 min-w-[160px]">
                      {locales.map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setLocale(l);
                            setLangOpen(false);
                          }}
                          className={`w-full text-start px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-noir-card transition-colors ${
                            locale === l ? 'text-gold bg-gold/5' : 'text-foreground/80'
                          }`}
                        >
                          <span>{localeFlags[l]}</span>
                          <span>{localeNames[l]}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist */}
              <button className="p-2 text-foreground/80 hover:text-gold transition-colors relative" aria-label={t('nav.wishlist')}>
                <Heart size={20} />
                <span className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
              </button>

              {/* Cart */}
              <button className="p-2 text-foreground/80 hover:text-gold transition-colors relative" aria-label={t('nav.cart')}>
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>

              {/* Account */}
              <button className="p-2 text-foreground/80 hover:text-gold transition-colors hidden sm:block" aria-label={t('nav.account')}>
                <User size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-noir/98 backdrop-blur-xl border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <div className="flex items-center bg-noir-lighter border border-border rounded-full px-4 py-2.5 gap-2">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
                />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-foreground/80 hover:text-gold transition-colors font-medium tracking-wide uppercase text-sm"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="pt-3 border-t border-border flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-foreground/80 hover:text-gold transition-colors">
                  <User size={18} /> {t('nav.account')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
