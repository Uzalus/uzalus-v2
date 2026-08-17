'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { shopCategoriesData } from '@/lib/shop-data';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { CartSidebar } from '@/components/uzalus/cart-sidebar';
import { useCartStore } from '@/lib/cart-store';
import cjProductsFr from '@/lib/cj-products-fr.json';
import {
  Search,
  ChevronRight,
  ArrowRight,
  Star,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Flame,
  Sparkles,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react';

/* ================================================================== */
/*  Types                                                               */
/* ================================================================== */
interface LocalProduct {
  pid: string;
  name: string;
  image: string;
  price: number;
  slug: string;
}

/* ================================================================== */
/*  Helpers                                                             */
/* ================================================================== */
function formatEur(n: number): string {
  return n.toFixed(2).replace('.', ',') + ' €';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* All 18 categories */
const ALL_CATS = [
  { key: 'shop.modeFemme', slug: 'mode-femme', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.modeHomme', slug: 'mode-homme', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.enfant', slug: 'enfant', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.chaussures', slug: 'chaussures', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.parfumsCosmetiques', slug: 'parfums-cosmetiques', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.telephones', slug: 'telephones', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.maison', slug: 'maison', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.electronique', slug: 'electronique', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.sport', slug: 'sport', img: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.auto', slug: 'auto-moto', img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.accessoires', slug: 'accessoires', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.emballage', slug: 'emballage', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bricolage', slug: 'bricolage', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.animaux', slug: 'animaux', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.jouets', slug: 'jouets', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bureau', slug: 'bureau', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bagagerie', slug: 'bagagerie', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.alimentation', slug: 'alimentation', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop&q=80' },
];

/* ================================================================== */
/*  Product Card — same hover as homepage                               */
/* ================================================================== */
function ProductCard({ p }: { p: LocalProduct }) {
  const addItemCart = useCartStore(function(state) { return state.addItem; });
  const openCart = useCartStore(function(state) { return state.open; });
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group bg-noir-card rounded-xl border border-border overflow-hidden hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 flex flex-col cursor-pointer"
      onClick={function() { /* future: product detail page */ }}
    >
      <div className="relative aspect-[3/4] bg-noir-lighter overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay — slide up from bottom */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 bg-gradient-to-t from-black/80 to-transparent pt-6">
          <button
            onClick={function(e) {
              e.stopPropagation();
              addItemCart({ pid: p.pid, name: p.name, image: p.image, price: p.price });
              openCart();
            }}
            className="gold-btn w-full py-2 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase"
          >
            Ajouter au panier
          </button>
        </div>
        {/* Wishlist button */}
        <button
          onClick={function(e) { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-white/80'} />
        </button>
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="text-[10px] sm:text-xs text-foreground/80 leading-tight line-clamp-2 mb-2 flex-1 font-medium group-hover:text-gold transition-colors">
          {p.name}
        </h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-gold">{formatEur(p.price)}</span>
        </div>
        <span className="flex items-center gap-0.5 text-[8px] sm:text-[10px] text-emerald-400/80 mt-1">
          <Truck size={8} /> Livraison gratuite
        </span>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Categories Page                                                     */
/* ================================================================== */
export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  /* Load all local products once */
  const allProducts: LocalProduct[] = useMemo(function() {
    return (cjProductsFr as Array<{pid:string;nameFr:string;image:string;priceEur:number;slug:string}>).map(function(p) {
      return { pid: p.pid, name: p.nameFr, image: p.image, price: p.priceEur, slug: p.slug };
    });
  }, []);

  /* Filter by category or search */
  const filteredProducts = useMemo(function() {
    let prods = allProducts;
    if (activeSlug) {
      prods = prods.filter(function(p) { return p.slug === activeSlug; });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      prods = prods.filter(function(p) { return p.name.toLowerCase().includes(q); });
    }
    return shuffle(prods);
  }, [allProducts, activeSlug, searchQuery]);

  /* Category stats */
  const catCounts = useMemo(function() {
    const counts: Record<string, number> = {};
    for (const p of allProducts) {
      counts[p.slug] = (counts[p.slug] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Sparkles size={20} className="text-gold" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold gold-text">Boutique</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Explorez tous nos produits</p>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={16} className="text-gold" />
            <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Catégories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={function() { setActiveSlug(null); }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                !activeSlug
                  ? 'bg-gold text-noir border-gold'
                  : 'bg-noir-card text-foreground/70 border-border hover:border-gold/40 hover:text-gold'
              }`}
            >
              Toutes
            </button>
            {ALL_CATS.map(function(cat) {
              const count = catCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={function() { setActiveSlug(activeSlug === cat.slug ? null : cat.slug); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    activeSlug === cat.slug
                      ? 'bg-gold text-noir border-gold'
                      : 'bg-noir-card text-foreground/70 border-border hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  {t(cat.key)}
                  {count > 0 && (
                    <span className={`ml-1.5 text-[10px] ${activeSlug === cat.slug ? 'text-noir/60' : 'text-muted-foreground'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-8 flex items-center gap-3 max-w-md">
          <div className="flex-1 flex items-center bg-noir-card border border-border rounded-xl px-4 py-2.5 gap-2 focus-within:border-gold/50 transition-colors">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={function(e) { setSearchQuery(e.target.value); }}
              className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
            />
            {searchQuery && (
              <button onClick={function() { setSearchQuery(''); }} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
          {activeSlug && (
            <button
              onClick={function() { setActiveSlug(null); setSearchQuery(''); }}
              className="text-xs text-gold hover:text-gold-light font-semibold transition-colors whitespace-nowrap"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Active category title */}
        {activeSlug && (
          <div className="flex items-center gap-2 mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
              {t(ALL_CATS.find(function(c) { return c.slug === activeSlug; })?.key || 'shop.all')}
            </h2>
            <span className="text-sm text-muted-foreground">({filteredProducts.length} produits)</span>
            <button
              onClick={function() { router.push('/categorie/' + activeSlug); }}
              className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 ml-auto transition-colors"
            >
              Voir tout <ArrowRight size={12} />
            </button>
          </div>
        )}

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredProducts.map(function(p) {
              return <ProductCard key={p.pid} p={p} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-noir-card border border-border flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <p className="text-foreground/70 font-medium mb-1">Aucun produit trouvé</p>
            <p className="text-sm text-muted-foreground mb-4">Essayez une autre catégorie ou recherche</p>
            <button
              onClick={function() { setActiveSlug(null); setSearchQuery(''); }}
              className="px-6 py-2.5 bg-gold text-noir text-sm font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              Voir tous les produits
            </button>
          </div>
        )}

        {/* Categories section — browse by category */}
        {!activeSlug && !searchQuery && (
          <div className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Flame size={22} className="text-gold" />
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold gold-text">Nos catégories</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Trouvez ce que vous cherchez par catégorie</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ALL_CATS.map(function(cat) {
                const subCount = shopCategoriesData[cat.slug]?.subCategories?.length || 0;
                return (
                  <button
                    key={cat.slug}
                    onClick={function() { router.push('/categorie/' + cat.slug); }}
                    className="group relative rounded-xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(212,175,55,0.1)]"
                  >
                    <div className="aspect-[3/4] bg-noir-card overflow-hidden">
                      <img src={cat.img} alt={t(cat.key)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1">{t(cat.key)}</h3>
                      {subCount > 0 && <p className="text-[10px] sm:text-[11px] text-white/50">{subCount} sous-catégories</p>}
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-gold font-semibold mt-2 group-hover:gap-2 transition-all">
                        Explorer <ChevronRight size={12} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Trust section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Truck size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Livraison Gratuite</p>
              <p className="text-xs text-muted-foreground">Dès 39€ d'achat</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Paiement Sécurisé</p>
              <p className="text-xs text-muted-foreground">SSL & cryptage</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <RotateCcw size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Retour 14 Jours</p>
              <p className="text-xs text-muted-foreground">Satisfait ou remboursé</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Package size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">+50 000 Produits</p>
              <p className="text-xs text-muted-foreground">Catalogue en expansion</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
      <CartSidebar />
    </div>
  );
}
