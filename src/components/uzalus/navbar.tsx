'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { type Locale, localeNames, localeFlags } from '@/lib/i18n';
import { Search, User, Heart, ShoppingBag, Menu, X, Globe, ChevronDown, Sparkles, SprayCan, Shirt, Footprints, Cpu, Home as HomeIcon, Watch, ShoppingBag as BoutiqueIcon } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '#' },
  { key: 'nav.shop', href: '#shop-categories', megaMenu: true },
  { key: 'nav.categories', href: '#categories' },
  { key: 'nav.deals', href: '#promotions' },
  { key: 'nav.blog', href: '#' },
];

const shopCats = [
  { key: 'shop.boutique', icon: BoutiqueIcon, slug: 'boutique' },
  { key: 'shop.cosmetiques', icon: Sparkles, slug: 'cosmetiques' },
  { key: 'shop.parfums', icon: SprayCan, slug: 'parfums' },
  { key: 'shop.mode', icon: Shirt, slug: 'mode' },
  { key: 'shop.chaussures', icon: Footprints, slug: 'chaussures' },
  { key: 'shop.electronique', icon: Cpu, slug: 'electronique' },
  { key: 'shop.maison', icon: HomeIcon, slug: 'maison' },
  { key: 'shop.accessoires', icon: Watch, slug: 'accessoires' },
];

const keyToSlug: Record<string, string> = {
  'shop.boutique': 'boutique',
  'shop.cosmetiques': 'cosmetiques',
  'shop.parfums': 'parfums',
  'shop.mode': 'mode',
  'shop.chaussures': 'chaussures',
  'shop.electronique': 'electronique',
  'shop.maison': 'maison',
  'shop.accessoires': 'accessoires',
};

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const openCategory = (key: string) => {
    const slug = keyToSlug[key];
    if (slug) {
      window.dispatchEvent(new CustomEvent('open-category', { detail: slug }));
      setMegaOpen(false);
      setMobileOpen(false);
    }
  };

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
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-noir/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-border' : 'bg-transparent'}`}>
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
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={link.megaMenu ? openMega : undefined}
                  onMouseLeave={link.megaMenu ? closeMega : undefined}
                >
                  <a
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase flex items-center gap-1"
                  >
                    {t(link.key)}
                    {link.megaMenu && <ChevronDown size={14} className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />}
                  </a>
                </div>
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
                          onClick={() => { setLocale(l); setLangOpen(false); }}
                          className={`w-full text-start px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-noir-card transition-colors ${locale === l ? 'text-gold bg-gold/5' : 'text-foreground/80'}`}
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

        {/* Desktop Mega Menu */}
        {megaOpen && (
          <div
            className="hidden lg:block absolute start-0 end-0 bg-noir-card/98 backdrop-blur-2xl border-b border-border shadow-2xl shadow-black/50"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
              <p className="text-xs text-gold font-bold tracking-widest uppercase mb-5">{t('nav.allCategories')}</p>
              <div className="grid grid-cols-4 gap-4">
                {shopCats.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => openCategory(cat.key)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-noir-lighter transition-colors group w-full text-start"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-gold transition-colors">
                        {t(cat.key)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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
              {/* Mobile shop categories sub-links */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-gold font-bold tracking-widest uppercase mb-2">{t('nav.allCategories')}</p>
                <div className="grid grid-cols-2 gap-1">
                  {shopCats.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => openCategory(cat.key)}
                        className="flex items-center gap-2 py-1.5 text-foreground/70 hover:text-gold transition-colors text-xs w-full text-start"
                      >
                        <Icon size={14} className="text-gold/60" />
                        {t(cat.key)}
                      </button>
                    );
                  })}
                </div>
              </div>
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