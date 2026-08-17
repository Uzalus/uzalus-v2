'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { type Locale, localeNames, localeFlags } from '@/lib/i18n';
import { shopCategoriesData } from '@/lib/shop-data';
import { useCartStore, useWishlistStore } from '@/lib/cart-store';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Globe,
  ChevronDown,
  Shirt,
  Footprints,
  Cpu,
  Home as HomeIcon,
  Watch,
  Car,
  Baby,
  Smartphone,
  Sparkles,
  Package,
  Dumbbell,
  Wrench,
  PawPrint,
  Gamepad2,
  Briefcase,
  Luggage,
  ShoppingBasket,
  Truck,
  RotateCcw,
  PackageCheck,
  Bell,
  Gift,
  Star,
  Clock,
  Grid3X3,
  ChevronRight,
} from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/categories', megaMenu: true },
  { key: 'nav.categories', href: '/categories' },
  { key: 'nav.deals', href: '#promotions' },
  { key: 'nav.tools', href: '/tools' },
];

const shopCats = [
  { key: 'shop.modeHomme', icon: Shirt, slug: 'mode-homme' },
  { key: 'shop.modeFemme', icon: Shirt, slug: 'mode-femme' },
  { key: 'shop.enfant', icon: Baby, slug: 'enfant' },
  { key: 'shop.chaussures', icon: Footprints, slug: 'chaussures' },
  { key: 'shop.maison', icon: HomeIcon, slug: 'maison' },
  { key: 'shop.accessoires', icon: Watch, slug: 'accessoires' },
  { key: 'shop.telephones', icon: Smartphone, slug: 'telephones' },
  { key: 'shop.parfumsCosmetiques', icon: Sparkles, slug: 'parfums-cosmetiques' },
  { key: 'shop.auto', icon: Car, slug: 'auto-moto' },
  { key: 'shop.emballage', icon: Package, slug: 'emballage' },
  { key: 'shop.electronique', icon: Cpu, slug: 'electronique' },
  { key: 'shop.sport', icon: Dumbbell, slug: 'sport' },
  { key: 'shop.bricolage', icon: Wrench, slug: 'bricolage' },
  { key: 'shop.animaux', icon: PawPrint, slug: 'animaux' },
  { key: 'shop.jouets', icon: Gamepad2, slug: 'jouets' },
  { key: 'shop.bureau', icon: Briefcase, slug: 'bureau' },
  { key: 'shop.bagagerie', icon: Luggage, slug: 'bagagerie' },
  { key: 'shop.alimentation', icon: ShoppingBasket, slug: 'alimentation' },
];

const keyToSlug: Record<string, string> = {
  'shop.modeHomme': 'mode-homme',
  'shop.modeFemme': 'mode-femme',
  'shop.enfant': 'enfant',
  'shop.chaussures': 'chaussures',
  'shop.maison': 'maison',
  'shop.accessoires': 'accessoires',
  'shop.telephones': 'telephones',
  'shop.parfumsCosmetiques': 'parfums-cosmetiques',
  'shop.auto': 'auto-moto',
  'shop.emballage': 'emballage',
  'shop.electronique': 'electronique',
  'shop.sport': 'sport',
  'shop.bricolage': 'bricolage',
  'shop.animaux': 'animaux',
  'shop.jouets': 'jouets',
  'shop.bureau': 'bureau',
  'shop.bagagerie': 'bagagerie',
  'shop.alimentation': 'alimentation',
};

/* Profile dropdown items */
const profileItems = [
  { key: 'profile.orders', icon: PackageCheck },
  { key: 'profile.notifications', icon: Bell },
  { key: 'profile.coupons', icon: Gift },
  { key: 'profile.points', icon: Star },
  { key: 'profile.recentlyViewed', icon: Clock },
  { key: 'profile.moreServices', icon: Grid3X3 },
];

export function Navbar({ onProfileClick }: { onCartClick?: () => void; onProfileClick?: () => void }) {
  const router = useRouter();
  const { t, locale, setLocale } = useI18n();
  const cartOpen = useCartStore(function(s) { return s.open; });
  const cartTotalItems = useCartStore(function(s) { return s.totalItems; });
  const wishlistCount = useWishlistStore(function(s) { return s.count; });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMega = function() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = function() {
    megaTimeout.current = setTimeout(function() { setMegaOpen(false); }, 200);
  };

  const openCategory = function(key: string) {
    const slug = keyToSlug[key];
    if (slug) {
      router.push('/categorie/' + slug);
      setMegaOpen(false);
      setMobileOpen(false);
    }
  };

  const locales: Locale[] = ['fr', 'en', 'es', 'ar'];

  return (
    <>
      {/* ---- Promo bar (SHEIN-style: free shipping + 30-day returns) ---- */}
      <div className="bg-noir-lighter/80 border-b border-border text-xs text-muted-foreground hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center h-9 gap-8">
          <span className="flex items-center gap-1.5">
            <Truck size={13} className="text-gold" />
            {t('promo.freeShipping')}
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <RotateCcw size={13} className="text-gold" />
            {t('promo.returns30')}
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <PackageCheck size={13} className="text-gold" />
            {t('promo.securePayment')}
          </span>
        </div>
      </div>

      {/* ---- Main navbar ---- */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-noir/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-border' : 'bg-noir border-b border-border'}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
              onClick={function() { setMobileOpen(!mobileOpen); }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="font-display text-xl lg:text-2xl font-bold gold-shimmer tracking-wider">
                UZALUS
              </span>
            </a>

            {/* Center search bar (SHEIN-style: prominent search in the middle) */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-6 items-center bg-noir-lighter border border-border rounded-full px-5 py-2.5 gap-2 focus-within:border-gold/50 transition-colors">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder={t('nav.search')}
                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
              />
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={link.megaMenu ? openMega : undefined}
                  onMouseLeave={link.megaMenu ? closeMega : undefined}
                >
                  <a
                    href={link.href}
                    className="text-xs font-semibold text-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase flex items-center gap-1"
                  >
                    {t(link.key)}
                    {link.megaMenu && <ChevronDown size={12} className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />}
                  </a>
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={function() { setProfileOpen(!profileOpen); setLangOpen(false); }}
                  className="p-2 text-foreground/80 hover:text-gold transition-colors relative"
                  aria-label={t('nav.account')}
                >
                  <User size={20} />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute top-full end-0 mt-2 bg-noir-lighter border border-border rounded-xl shadow-2xl shadow-black/50 py-2 z-50 min-w-[220px] animate-fade-in-up">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-bold text-foreground">{t('profile.personalCenter')}</p>
                      </div>
                      {profileItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.key}
                            onClick={function() { setProfileOpen(false); }}
                            className="w-full text-start px-4 py-3 text-sm flex items-center gap-3 hover:bg-noir-card transition-colors text-foreground/80 hover:text-gold"
                          >
                            <Icon size={16} className="text-muted-foreground" />
                            {t(item.key)}
                          </button>
                        );
                      })}
                      <div className="border-t border-border mt-1 pt-1">
                        <button
                          onClick={function() { setProfileOpen(false); }}
                          className="w-full text-start px-4 py-3 text-sm font-bold text-gold hover:bg-gold/5 transition-colors flex items-center gap-3"
                        >
                          {t('profile.signIn')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={function() { setLangOpen(!langOpen); setProfileOpen(false); }}
                  className="flex items-center gap-1 px-2 py-2 text-sm text-foreground/80 hover:text-gold transition-colors rounded-lg hover:bg-noir-lighter"
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline text-xs">{locale.toUpperCase()}</span>
                  <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute top-full end-0 mt-2 bg-noir-lighter border border-border rounded-xl shadow-2xl shadow-black/50 py-2 z-50 min-w-[160px] animate-fade-in-up">
                      {locales.map((l) => (
                        <button
                          key={l}
                          onClick={function() { setLocale(l); setLangOpen(false); }}
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
                {wishlistCount() > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount()}</span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={cartOpen}
                className="p-2 text-foreground/80 hover:text-gold transition-colors relative"
                aria-label={t('nav.cart')}
              >
                <ShoppingBag size={20} />
                {cartTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 w-4 h-4 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">{cartTotalItems()}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu — Wish-style: left categories + right subcategories */}
        {megaOpen && (
          <div
            className="hidden lg:block absolute start-0 end-0 bg-noir-card/98 backdrop-blur-2xl border-b border-border shadow-2xl shadow-black/50"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="max-w-[1400px] mx-auto flex">
              {/* Left panel — 18 categories list */}
              <div className="w-[260px] shrink-0 border-e border-border py-4 px-2 max-h-[480px] overflow-y-auto">
                <p className="text-[10px] text-gold font-bold tracking-widest uppercase px-3 mb-3">{t('nav.allCategories')}</p>
                {shopCats.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = hoveredSlug === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onMouseEnter={function() { setHoveredSlug(cat.slug); }}
                      onClick={function() { openCategory(cat.key); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-start transition-colors duration-150 ${isActive ? 'bg-gold/10 text-gold' : 'text-foreground/70 hover:text-foreground hover:bg-noir-lighter'}`}
                    >
                      <Icon size={16} className={isActive ? 'text-gold' : 'text-muted-foreground'} />
                      <span className="text-sm font-medium truncate">{t(cat.key)}</span>
                      <ChevronRight size={14} className={`ms-auto shrink-0 transition-colors ${isActive ? 'text-gold' : 'text-foreground/20'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right panel — subcategories of hovered category */}
              <div className="flex-1 py-6 px-6 max-h-[480px] overflow-y-auto">
                {hoveredSlug && shopCategoriesData[hoveredSlug] ? (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-display text-lg font-bold text-foreground">{t(shopCategoriesData[hoveredSlug].key)}</h3>
                      <button
                        onClick={function() { openCategory(shopCats.find(function(c) { return c.slug === hoveredSlug; })?.key || ''); }}
                        className="text-xs text-gold hover:text-gold-light font-semibold tracking-wide uppercase"
                      >
                        {t('cat.seeAll')} →
                      </button>
                    </div>

                    {/* Brands column for auto-moto */}
                    {hoveredSlug === 'auto-moto' && shopCategoriesData[hoveredSlug].brands && (
                      <div className="mb-5">
                        <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-3">{t('auto.brands')}</p>
                        <div className="flex flex-wrap gap-2">
                          {shopCategoriesData[hoveredSlug].brands!.slice(0, 8).map((brand) => (
                            <span
                              key={brand.slug}
                              className="px-3 py-1.5 rounded-full bg-noir-lighter border border-border text-xs text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors cursor-pointer"
                            >
                              {locale === 'ar' ? brand.nameAr : locale === 'es' ? brand.nameEs : locale === 'en' ? brand.nameEn : brand.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subcategories in columns */}
                    {shopCategoriesData[hoveredSlug].subCategories && shopCategoriesData[hoveredSlug].subCategories!.length > 0 ? (
                      <div className={`grid gap-x-8 gap-y-1 ${shopCategoriesData[hoveredSlug].subCategories!.length > 14 ? 'grid-cols-4' : shopCategoriesData[hoveredSlug].subCategories!.length > 8 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {shopCategoriesData[hoveredSlug].subCategories!.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={function() {
                              router.push('/categorie/' + hoveredSlug + '?sub=' + encodeURIComponent(sub.key));
                              setMegaOpen(false);
                            }}
                            className="text-start py-1.5 text-sm text-foreground/60 hover:text-gold transition-colors duration-150 truncate"
                          >
                            {t(sub.key)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{t('cat.seeAll')} →</p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm">{t('nav.allCategories')}</p>
                  </div>
                )}
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
                  onClick={function() { setMobileOpen(false); }}
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
                        onClick={function() { openCategory(cat.key); }}
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