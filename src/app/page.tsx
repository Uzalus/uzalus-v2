'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import MobileNav from '@/components/uzalus/mobile-nav';
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';
import { ProductDetail } from '@/components/uzalus/product-detail';
import { useI18n } from '@/lib/i18n-context';
import {
  Search,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Flame,
  FileText,
  Image as ImageIcon,
  Music,
  Languages,
  QrCode,
  Scissors,
  ArrowRight,
  Star,
  Car,
  Wrench,
  Gift,
  Trophy,
  Smartphone,
  Globe,
  Headset,
  Sparkles,
} from 'lucide-react';

/* ================================================================== */
/*  Google AdSense Block                                                */
/* ================================================================== */
function AdSenseBlock({ className = '' }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* empty */ }
  }, []);

  return (
    <div className={`my-8 max-w-4xl mx-auto ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8206165367445755"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* ================================================================== */
/*  Data: Trending Products                                            */
/* ================================================================== */
const trendingProducts = [
  { id: 1, name: 'Montre Connectée X6', price: 39.90, oldPrice: 69.90, discount: 43, rating: 4.6, reviews: 126, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80' },
  { id: 2, name: 'Parfum Élite Intense', price: 29.90, oldPrice: 49.90, discount: 40, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80' },
  { id: 3, name: 'Écouteur Sans Fil Pro', price: 24.90, oldPrice: 38.00, discount: 34, rating: 4.6, reviews: 73, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&q=80' },
  { id: 4, name: 'Enceinte Bluetooth X8', price: 19.90, oldPrice: 29.90, discount: 33, rating: 4.4, reviews: 58, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80' },
  { id: 5, name: 'Sac à Dos Voyage', price: 34.90, oldPrice: 59.90, discount: 42, rating: 4.8, reviews: 112, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&q=80' },
  { id: 6, name: 'Friteuse à Air 6L', price: 69.90, oldPrice: 99.90, discount: 30, rating: 4.8, reviews: 91, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&h=400&fit=crop&q=80' },
];

/* ================================================================== */
/*  Data: UZALUS Tools                                                 */
/* ================================================================== */
const uzalusTools = [
  { name: 'PDF → Word', desc: 'Convertir', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Word → PDF', desc: 'Convertir', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'Compresser PDF', desc: 'Réduire la taille', icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'Fusionner PDF', desc: 'Assembler', icon: Scissors, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Diviser PDF', desc: 'Extraire des pages', icon: Scissors, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'JPG → PDF', desc: 'Images en PDF', icon: ImageIcon, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { name: 'PDF → JPG', desc: 'PDF en images', icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'Traduction', desc: 'Traduire texte', icon: Languages, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'MP4 → MP3', desc: "Extraire l'audio", icon: Music, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'Supprimer arrière-plan', desc: 'Images propres', icon: ImageIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { name: 'Générer QR Code', desc: 'QR Code', icon: QrCode, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

/* ================================================================== */
/*  Data: Homepage Categories (top 10)                                  */
/* ================================================================== */
const homeCategories = [
  { key: 'shop.modeFemme', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop&q=80', slug: 'mode-femme' },
  { key: 'shop.maison', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&q=80', slug: 'maison' },
  { key: 'shop.parfumsCosmetiques', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80', slug: 'parfums-cosmetiques' },
  { key: 'shop.telephones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&q=80', slug: 'telephones' },
  { key: 'shop.auto', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop&q=80', slug: 'auto-moto' },
  { key: 'shop.electronique', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&q=80', slug: 'electronique' },
  { key: 'shop.chaussures', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&q=80', slug: 'chaussures' },
  { key: 'shop.accessoires', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&q=80', slug: 'accessoires' },
  { key: 'shop.sport', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=200&h=200&fit=crop&q=80', slug: 'sport' },
  { key: 'shop.modeHomme', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop&q=80', slug: 'mode-homme' },
];

/* Secondary nav category links */
const navCatLinks = [
  { key: 'shop.auto', slug: 'auto-moto' },
  { key: 'shop.modeFemme', slug: 'mode-femme' },
  { key: 'shop.maison', slug: 'maison' },
  { key: 'shop.parfumsCosmetiques', slug: 'parfums-cosmetiques' },
  { key: 'shop.telephones', slug: 'telephones' },
  { key: 'shop.electronique', slug: 'electronique' },
  { key: 'shop.accessoires', slug: 'accessoires' },
  { key: 'shop.sport', slug: 'sport' },
];

/* ================================================================== */
/*  Main Page Component                                                */
/* ================================================================== */
interface ProductViewState {
  pid: string;
  name: string;
  image: string;
  price: number;
}

export default function Home() {
  const { t } = useI18n();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CatSlug | null>(null);
  const [activeProduct, setActiveProduct] = useState<ProductViewState | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* router.push used for category navigation — no more custom events */

  /* ---- Product detail view ---- */
  if (activeProduct) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => {}} />
        <ProductDetail
          pid={activeProduct.pid}
          productName={activeProduct.name}
          productImage={activeProduct.image}
          productPrice={activeProduct.price}
          onBack={() => {
            setActiveProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ChatWidget />
        <MobileNav />
      </div>
    );
  }

  /* ---- Category drill-down view ---- */
  if (activeCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => {}} />
        <CategoryPage
          category={activeCategory}
          onBack={() => {
            setActiveCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onProductClick={(pid, name, image, price) => {
            setActiveProduct({ pid, name, image, price });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ChatWidget />
        <MobileNav />
      </div>
    );
  }

  /* ---- MAIN HOMEPAGE ---- */
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      <main className="flex-1 pb-20 md:pb-0">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  SECONDARY NAVIGATION — Horizontal category links          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="bg-noir border-b border-border hidden md:block">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between h-11">
            <div className="flex items-center gap-6">
              {navCatLinks.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => router.push('/categorie/' + cat.slug)}
                  className="text-xs font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide whitespace-nowrap"
                >
                  {t(cat.key)}
                </button>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase gold-btn whitespace-nowrap"
            >
              {t('nav.deals')} 🔥
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  NOS CATÉGORIES — Category circles grid                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="categories" className="py-8 lg:py-10 bg-noir">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles size={22} className="text-gold" />
                <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold gold-text">
                  NOS CATÉGORIES
                </h2>
              </div>
              <button className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                Voir toutes les catégories <ArrowRight size={14} />
              </button>
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 lg:gap-4">
              {homeCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => router.push('/categorie/' + cat.slug)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-border group-hover:border-gold/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <img
                      src={cat.image}
                      alt={t(cat.key)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-foreground/70 group-hover:text-gold transition-colors text-center leading-tight">
                    {t(cat.key)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO SECTION                                               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-noir via-noir to-noir-light">
          {/* Subtle gold glow effects */}
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* LEFT — Text content */}
              <div className="max-w-xl">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-tight mb-2">
                  TOUT CE DONT VOUS AVEZ BESOIN,
                </h1>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold gold-text leading-tight mb-6">
                  EN UN SEUL ENDROIT.
                </h1>
                <p className="text-foreground/60 text-base sm:text-lg mb-8">
                  Achetez, créez, réparez, simplifiez.
                </p>

                {/* Search bar */}
                <div className="flex items-center bg-noir-card border border-border rounded-xl overflow-hidden mb-10 focus-within:border-gold/40 transition-colors">
                  <Search size={20} className="text-muted-foreground ml-4 shrink-0" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit, une catégorie, un outil..."
                    className="flex-1 bg-transparent px-4 py-3.5 text-sm text-foreground placeholder-muted-foreground outline-none"
                  />
                  <button className="bg-gold hover:bg-gold-light text-noir px-5 py-3.5 font-bold text-sm transition-colors shrink-0">
                    <Search size={18} />
                  </button>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-gold shrink-0" />
                    <span className="text-xs text-foreground/60">Livraison rapide dans toute l'Europe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-gold shrink-0" />
                    <span className="text-xs text-foreground/60">Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw size={18} className="text-gold shrink-0" />
                    <span className="text-xs text-foreground/60">Retour facile sous 14 jours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-gold shrink-0" />
                    <span className="text-xs text-foreground/60">+100 000 produits disponibles</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Product image montage */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-3">
                  {/* Main large image — auto & pièces détachées */}
                  <div className="col-span-2 rounded-2xl overflow-hidden h-[150px] bg-noir-card">
                    <img
                      src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=250&fit=crop&q=80"
                      alt="Auto & pièces détachées"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* iPhone */}
                  <div className="rounded-2xl overflow-hidden h-[110px] bg-noir-card">
                    <img
                      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&q=80"
                      alt="Smartphone"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Perfume */}
                  <div className="rounded-2xl overflow-hidden h-[110px] bg-noir-card">
                    <img
                      src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop&q=80"
                      alt="Parfum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Headphones */}
                  <div className="rounded-2xl overflow-hidden h-[110px] bg-noir-card">
                    <img
                      src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=200&fit=crop&q=80"
                      alt="Casque audio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Power drill */}
                  <div className="rounded-2xl overflow-hidden h-[110px] bg-noir-card">
                    <img
                      src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop&q=80"
                      alt="Perceuse"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  FEATURE CARDS — 4 columns                                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-12 lg:py-16 bg-noir">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Boutique */}
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <ShoppingBag size={22} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">BOUTIQUE</h3>
                  <p className="text-xs text-muted-foreground truncate">Des milliers de produits pour vous</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    Découvrir <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* Auto & Moto */}
              <button
                onClick={() => router.push('/categorie/auto-moto')}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Car size={22} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">AUTO & MOTO</h3>
                  <p className="text-xs text-muted-foreground truncate">Trouvez la pièce compatible</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    Rechercher <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* UZALUS Tools */}
              <button
                onClick={() => document.getElementById('uzalus-tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <Wrench size={22} className="text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">UZALUS TOOLS</h3>
                  <p className="text-xs text-muted-foreground truncate">Outils gratuits pour simplifier votre quotidien</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    Utiliser <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* Tendances */}
              <button
                onClick={() => document.getElementById('tendances')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Flame size={22} className="text-orange-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">TENDANCES</h3>
                  <p className="text-xs text-muted-foreground truncate">Les produits tendance du moment</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    Voir les tendances <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TENDANCES DU JOUR — Horizontal scrollable products          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="tendances" className="py-12 lg:py-16 bg-noir-light/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Flame size={24} className="text-orange-400" />
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gold-text">
                  TENDANCES DU JOUR
                </h2>
              </div>
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
              >
                Voir tout <ArrowRight size={14} />
              </button>
            </div>

            {/* Products horizontal scroll */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-48 sm:w-52 snap-start group bg-noir-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-noir-lighter">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded text-[10px] font-bold bg-gold text-noir">
                      -{product.discount}%
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm font-bold text-gold">{product.price.toFixed(2)} €</span>
                      <span className="text-xs text-muted-foreground line-through">
                        {product.oldPrice.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-[11px] text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AdSense #1 */}
        <AdSenseBlock />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  UZALUS TOOLS — Grid of free tools                            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="uzalus-tools" className="py-12 lg:py-16 bg-noir">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Wrench size={24} className="text-gold" />
                <div>
                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gold-text">
                    UZALUS TOOLS
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">Des outils gratuits et puissants</p>
                </div>
              </div>
              <button className="text-sm text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                Voir tous les outils <ArrowRight size={14} />
              </button>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
              {uzalusTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.name}
                    className="group flex flex-col items-center p-4 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon size={20} className={tool.color} />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90 text-center leading-tight">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {tool.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  AUTO & MOTO — Vehicle part finder banner                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#0f172a] to-noir">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          {/* Gold glow */}
          <div className="absolute top-0 start-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left — Content */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                  TROUVEZ LA PIÈCE COMPATIBLE
                  <br />
                  <span className="gold-text">AVEC VOTRE VÉHICULE</span>
                </h2>
                <p className="text-foreground/50 text-sm sm:text-base mb-8">
                  Sélectionnez votre véhicule pour voir uniquement les pièces compatibles.
                </p>

                {/* Vehicle selection form */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <select className="bg-white/10 border border-white/10 text-white/80 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold/40 transition-colors min-w-[140px]">
                    <option>Marque</option>
                    <option>BMW</option>
                    <option>Mercedes-Benz</option>
                    <option>Audi</option>
                    <option>Volkswagen</option>
                    <option>Peugeot</option>
                    <option>Renault</option>
                    <option>Toyota</option>
                  </select>
                  <select className="bg-white/10 border border-white/10 text-white/80 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold/40 transition-colors min-w-[140px]">
                    <option>Modèle</option>
                  </select>
                  <select className="bg-white/10 border border-white/10 text-white/80 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold/40 transition-colors min-w-[120px]">
                    <option>Année</option>
                  </select>
                  <select className="bg-white/10 border border-white/10 text-white/80 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold/40 transition-colors min-w-[140px]">
                    <option>Motorisation</option>
                  </select>
                  <button className="gold-btn px-6 py-3 rounded-lg text-sm font-bold tracking-wider uppercase">
                    Rechercher
                  </button>
                </div>
              </div>

              {/* Right — Car image */}
              <div className="hidden lg:flex justify-end">
                <div className="relative">
                  <div className="w-[400px] h-[300px] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80"
                      alt="Voiture"
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  {/* Gold overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  TRUST BAR — 4 features                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-12 lg:py-14 bg-noir-light/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-gold shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">LIVRAISON RAPIDE</h3>
                  <p className="text-xs text-muted-foreground">Partout en Europe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-gold shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">PAIEMENT 100% SÉCURISÉ</h3>
                  <p className="text-xs text-muted-foreground">CB, PayPal, et plus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={24} className="text-gold shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">RETOUR FACILE</h3>
                  <p className="text-xs text-muted-foreground">Sous 14 jours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Headset size={24} className="text-gold shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">SUPPORT 7/7</h3>
                  <p className="text-xs text-muted-foreground">À votre écoute</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense #2 */}
        <AdSenseBlock />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  PROMOTIONAL FOOTER BAND — 4 columns                        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="promotions" className="bg-gradient-to-br from-[#0f172a] via-noir to-noir">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Nouveautés */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone size={22} className="text-gold" />
                  <h3 className="font-display text-base font-bold text-white">NOUVEAUTÉS</h3>
                </div>
                <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
                  Découvrez les derniers produits ajoutés à notre catalogue en permanente expansion.
                </p>
                <button
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
                >
                  Voir les nouveautés <ArrowRight size={12} />
                </button>
              </div>

              {/* Offres du jour */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Gift size={22} className="text-gold" />
                  <h3 className="font-display text-base font-bold text-white">OFFRES DU JOUR</h3>
                </div>
                <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
                  Des réductions chaque jour sur des produits sélectionnés pour vous.
                </p>
                <button
                  onClick={() => document.getElementById('tendances')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
                >
                  Voir les offres <ArrowRight size={12} />
                </button>
              </div>

              {/* Meilleures ventes */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy size={22} className="text-gold" />
                  <h3 className="font-display text-base font-bold text-white">MEILLEURES VENTES</h3>
                </div>
                <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
                  Les produits les plus populaires, choisis par des milliers de clients.
                </p>
                <button
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
                >
                  Voir les meilleures ventes <ArrowRight size={12} />
                </button>
              </div>

              {/* UZALUS Essentials */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={22} className="text-gold" />
                  <h3 className="font-display text-base font-bold text-white">UZALUS ESSENTIALS</h3>
                </div>
                <p className="text-xs text-foreground/50 mb-3 leading-relaxed">
                  Des services web utiles : outils PDF, convertisseurs, et bien plus.
                </p>
                <button
                  onClick={() => document.getElementById('uzalus-tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
                >
                  Voir les services <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
      <MobileNav />
    </div>
  );
}
