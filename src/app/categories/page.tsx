/* Toutes les catégories — same dark/gold theme as homepage, CJ product images */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { shopCategoriesData } from '@/lib/shop-data';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import {
  Search,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Loader2,
  Truck,
  Shield,
  RotateCcw,
  Package,
} from 'lucide-react';

/* All 18 categories */
const ALL_CATS = [
  { key: 'shop.modeFemme', slug: 'mode-femme', fallbackImg: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.modeHomme', slug: 'mode-homme', fallbackImg: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.enfant', slug: 'enfant', fallbackImg: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.chaussures', slug: 'chaussures', fallbackImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.parfumsCosmetiques', slug: 'parfums-cosmetiques', fallbackImg: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.telephones', slug: 'telephones', fallbackImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.maison', slug: 'maison', fallbackImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.electronique', slug: 'electronique', fallbackImg: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.sport', slug: 'sport', fallbackImg: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.auto', slug: 'auto-moto', fallbackImg: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.accessoires', slug: 'accessoires', fallbackImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.emballage', slug: 'emballage', fallbackImg: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bricolage', slug: 'bricolage', fallbackImg: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.animaux', slug: 'animaux', fallbackImg: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.jouets', slug: 'jouets', fallbackImg: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bureau', slug: 'bureau', fallbackImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.bagagerie', slug: 'bagagerie', fallbackImg: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=500&fit=crop&q=80' },
  { key: 'shop.alimentation', slug: 'alimentation', fallbackImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop&q=80' },
];

interface CatImage {
  slug: string;
  image: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [catImages, setCatImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  /* Fetch one product image per category from CJ API */
  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const images: Record<string, string> = {};
      const promises = ALL_CATS.map(async (cat) => {
        try {
          const res = await fetch('/api/cj/products?category=' + cat.slug + '&pageSize=1&page=1');
          const data = await res.json();
          if (data.success && data.products && data.products.length > 0) {
            images[cat.slug] = data.products[0].productImage;
          }
        } catch {
          /* use fallback */
        }
      });
      await Promise.all(promises);
      setCatImages(images);
      setLoading(false);
    }
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-noir">

      {/* Promo bar */}
      <div className="bg-noir-lighter/80 border-b border-border text-xs text-muted-foreground hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center h-9 gap-8">
          <span className="flex items-center gap-1.5">
            <Truck size={13} className="text-gold" />
            Livraison rapide dans toute l'Europe
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <RotateCcw size={13} className="text-gold" />
            Retour facile sous 14 jours
          </span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <Shield size={13} className="text-gold" />
            Paiement 100% securise
          </span>
        </div>
      </div>

      {/* Header bar */}
      <header className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-6">
          <button onClick={() => router.push('/')} className="font-display text-xl lg:text-2xl font-bold gold-shimmer tracking-wider">
            UZALUS
          </button>
          <div className="hidden sm:flex flex-1 max-w-xl items-center bg-noir-lighter border border-border rounded-full px-5 py-2.5 gap-2 focus-within:border-gold/50 transition-colors">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un produit, une categorie..."
              className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = (e.target as HTMLInputElement).value;
                  if (q.trim()) router.push('/categorie/mode-femme?search=' + encodeURIComponent(q.trim()));
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Page title */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => router.push('/')} className="w-9 h-9 rounded-full border border-border bg-noir-card flex items-center justify-center hover:border-gold/30 transition-colors">
            <ArrowLeft size={16} className="text-foreground/70" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold gold-text">
              Toutes les categories
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Explorez nos {ALL_CATS.length} categories et trouvez ce que vous cherchez</p>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-8">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-xl bg-noir-card border border-border" />
                <div className="h-4 bg-noir-card rounded w-3/4 mt-3 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Categories grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-8">
            {ALL_CATS.map((cat) => {
              const cjImg = catImages[cat.slug];
              const imgSrc = cjImg || cat.fallbackImg;
              const subCount = shopCategoriesData[cat.slug]?.subCategories?.length || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={() => router.push('/categorie/' + cat.slug)}
                  className="group relative rounded-xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(212,175,55,0.1)]"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] bg-noir-card overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={t(cat.key)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                      {t(cat.key)}
                    </h3>
                    {subCount > 0 && (
                      <p className="text-[11px] text-white/50">{subCount} sous-categories</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] text-gold font-semibold mt-2 group-hover:gap-2 transition-all">
                      Explorer <ChevronRight size={12} />
                    </span>
                  </div>
                  {/* Gold corner accent on hover */}
                  <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Trust section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Truck size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Livraison Gratuite</p>
              <p className="text-xs text-muted-foreground">Des 49 euros d'achat</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Paiement Securise</p>
              <p className="text-xs text-muted-foreground">SSL & cryptage</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <RotateCcw size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Retour 14 Jours</p>
              <p className="text-xs text-muted-foreground">Satisfait ou rembourse</p>
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
    </div>
  );
}
