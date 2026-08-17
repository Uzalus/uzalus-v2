/* Toutes les categories — dark/gold theme, CJ real products */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n-context';
import { shopCategoriesData } from '@/lib/shop-data';
import { calculateSellingPrice } from '@/lib/cj-api';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { CartSidebar } from '@/components/uzalus/cart-sidebar';
import { Navbar } from '@/components/uzalus/navbar';
import {
  Search,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Star,
  Heart,
  Loader2,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Flame,
  Wrench,
  FileText,
  Scissors,
  ImageIcon,
  Languages,
  Music,
  QrCode,
} from 'lucide-react';

/* UZALUS Tools data */
const uzalusTools = [
  { name: 'PDF \u2192 Word', desc: 'Convertir', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Word \u2192 PDF', desc: 'Convertir', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'Compresser PDF', desc: 'R\u00e9duire la taille', icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'Fusionner PDF', desc: 'Assembler', icon: Scissors, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Diviser PDF', desc: 'Extraire des pages', icon: Scissors, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'JPG \u2192 PDF', desc: 'Images en PDF', icon: ImageIcon, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { name: 'PDF \u2192 JPG', desc: 'PDF en images', icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'Traduction', desc: 'Traduire texte', icon: Languages, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'MP4 \u2192 MP3', desc: "Extraire l'audio", icon: Music, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: "Supprimer arri\u00e8re-plan", desc: 'Images propres', icon: ImageIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { name: 'G\u00e9n\u00e9rer QR Code', desc: 'QR Code', icon: QrCode, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

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

interface CJProduct {
  pid: string;
  productName: string;
  productNameEn?: string;
  productImage: string;
  sellPrice: number;
  originalPrice?: number;
  rating?: number;
  commentCount?: number;
}

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' \u20AC';
}

/* Product card — dark theme */
function ProductCard({ product }: { product: CJProduct }) {
  const [liked, setLiked] = useState(false);
  const { price: sellEur } = calculateSellingPrice(product.sellPrice);
  const oldPriceEur = product.originalPrice
    ? calculateSellingPrice(product.originalPrice).price
    : null;
  const discountPct = oldPriceEur && oldPriceEur > sellEur
    ? Math.round(((oldPriceEur - sellEur) / oldPriceEur) * 100)
    : null;

  return (
    <div className="group bg-noir-card rounded-xl border border-border overflow-hidden hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 flex flex-col">
      <div className="relative aspect-[3/4] bg-noir-lighter overflow-hidden">
        <img
          src={product.productImage}
          alt={product.productNameEn || product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {!product.originalPrice && product.sellPrice < 15 && (
            <span className="bg-gold text-noir text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Nouveau</span>
          )}
          {discountPct && discountPct >= 10 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">-{discountPct}%</span>
          )}
        </div>
      </div>
      <div className="p-3.5 flex flex-col flex-1 relative">
        <h3 className="text-xs text-foreground/80 leading-snug line-clamp-2 mb-2 flex-1 font-medium group-hover:text-gold transition-colors">
          {product.productNameEn || product.productName}
        </h3>
        <div className="flex items-center gap-0.5 mb-2">
          <Star size={11} className="text-gold fill-gold" />
          <span className="text-[11px] text-muted-foreground">{product.rating || 0}{product.commentCount ? ' (' + product.commentCount + ')' : ''}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-gold">{formatPrice(sellEur)}</span>
          {oldPriceEur && oldPriceEur > sellEur && (
            <span className="text-[11px] text-muted-foreground line-through">{formatPrice(oldPriceEur)}</span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute bottom-3.5 right-3.5"
        >
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-foreground/30 hover:text-red-400 transition-colors'} />
        </button>
      </div>
    </div>
  );
}

/* Skeleton for products */
function ProductSkeleton() {
  return (
    <div className="bg-noir-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-noir-lighter" />
      <div className="p-3.5 space-y-2">
        <div className="h-3 bg-noir-lighter rounded w-full" />
        <div className="h-3 bg-noir-lighter rounded w-2/3" />
        <div className="h-4 bg-noir-lighter rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [catImages, setCatImages] = useState<Record<string, string>>({});
  const [catLoading, setCatLoading] = useState(true);
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const SORT_CYCLE = ['salesVolume', 'newArrival', 'priceAsc', 'priceDesc'];

  /* Helper: fetch with timeout */
  const fetchWithTimeout = async (url: string, timeoutMs = 25000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      return res;
    } finally {
      clearTimeout(id);
    }
  };

  /* Fetch category images first, then products */
  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      /* Step 1: fetch category images (batched in groups of 6) */
      setCatLoading(true);
      const images: Record<string, string> = {};
      for (let i = 0; i < ALL_CATS.length; i += 6) {
        const batch = ALL_CATS.slice(i, i + 6);
        await Promise.all(batch.map(async (cat) => {
          try {
            const res = await fetchWithTimeout('/api/cj/products?category=' + cat.slug + '&pageSize=1&page=1', 15000);
            const data = await res.json();
            if (data.success && data.products?.length > 0 && !cancelled) {
              images[cat.slug] = data.products[0].productImage;
            }
          } catch { /* fallback */ }
        }));
      }
      if (cancelled) return;
      setCatImages(images);
      setCatLoading(false);

      /* Step 2: now fetch popular products (after category images are done) */
      await fetchProductsBatch(true);
    }
    loadAll();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Fetch products with fallback pageSize */
  const fetchProductsBatch = async (resetPage = true) => {
    if (resetPage) {
      setProductsLoading(true);
      setProductsError(false);
      setProducts([]);
      pageRef.current = 1;
    } else {
      setLoadingMore(true);
    }

    const currentPage = resetPage ? 1 : pageRef.current + 1;
    const sortIndex = resetPage ? 0 : ((pageRef.current - 1) % SORT_CYCLE.length);
    const sortType = SORT_CYCLE[sortIndex];

    /* Try with pageSize=60 first, fallback to 20 if it fails */
    for (const pageSize of [60, 20]) {
      try {
        const url = '/api/cj/products?category=mode-femme&pageSize=' + pageSize + '&page=' + currentPage + '&sortType=' + sortType;
        console.log('[categories] Fetching:', { pageSize, currentPage, sortType });
        const res = await fetchWithTimeout(url, 25000);
        if (!res.ok) {
          console.error('[categories] HTTP', res.status);
          continue; // try smaller pageSize
        }
        const data = await res.json();
        if (!data.success) {
          console.error('[categories] API error:', data.error);
          continue;
        }
        const newProds: CJProduct[] = (data.products || []).map((p: Record<string, unknown>) => ({
          pid: String(p.pid || ''),
          productName: String(p.productNameEn || p.productName || ''),
          productNameEn: p.productNameEn ? String(p.productNameEn) : undefined,
          productImage: String(p.productImage || ''),
          sellPrice: Number(p.sellPrice) || 0,
          originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
          rating: p.rating ? Number(p.rating) : undefined,
          commentCount: p.commentCount ? Number(p.commentCount) : undefined,
        }));
        console.log('[categories] Got', newProds.length, 'products');

        if (resetPage) {
          setProducts(newProds);
          setHasMore(newProds.length >= 40);
          setProductsError(false);
          setProductsLoading(false);
        } else {
          setProducts(prev => {
            const ids = new Set(prev.map((p: CJProduct) => p.pid));
            const unique = newProds.filter((p: CJProduct) => !ids.has(p.pid));
            if (unique.length === 0 && prev.length > 0) setHasMore(false);
            return [...prev, ...unique];
          });
          pageRef.current = currentPage;
          setLoadingMore(false);
        }
        return; // success, exit the loop
      } catch (err) {
        console.error('[categories] Fetch error (pageSize=' + pageSize + '):', err);
        // try next smaller pageSize
      }
    }
    /* All attempts failed */
    if (resetPage) setProductsError(true);
    if (resetPage) setProductsLoading(false);
    else setLoadingMore(false);
  };


  return (
    <div className="min-h-screen flex flex-col bg-noir">

      {/* Promo bar */}
      <div className="bg-noir-lighter/80 border-b border-border text-xs text-muted-foreground hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center h-9 gap-8">
          <span className="flex items-center gap-1.5"><Truck size={13} className="text-gold" /> Livraison rapide dans toute l'Europe</span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5"><RotateCcw size={13} className="text-gold" /> Retour facile sous 14 jours</span>
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5"><Shield size={13} className="text-gold" /> Paiement 100% securise</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-6">
          <button onClick={() => router.push('/')} className="font-display text-xl lg:text-2xl font-bold gold-shimmer tracking-wider">UZALUS</button>
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

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/')} className="w-9 h-9 rounded-full border border-border bg-noir-card flex items-center justify-center hover:border-gold/30 transition-colors">
            <ArrowLeft size={16} className="text-foreground/70" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold gold-text">Toutes les categories</h1>
            <p className="text-sm text-muted-foreground mt-1">Explorez nos {ALL_CATS.length} categories et trouvez ce que vous cherchez</p>
          </div>
        </div>

        {/* Categories grid */}
        {catLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] rounded-xl bg-noir-card border border-border" />
                <div className="h-4 bg-noir-card rounded w-3/4 mt-3 mx-auto" />
              </div>
            ))}
          </div>
        )}
        {!catLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {ALL_CATS.map((cat) => {
              const imgSrc = catImages[cat.slug] || cat.fallbackImg;
              const subCount = shopCategoriesData[cat.slug]?.subCategories?.length || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={() => router.push('/categorie/' + cat.slug)}
                  className="group relative rounded-xl overflow-hidden border border-border hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(212,175,55,0.1)]"
                >
                  <div className="aspect-[3/4] bg-noir-card overflow-hidden">
                    <img src={imgSrc} alt={t(cat.key)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">{t(cat.key)}</h3>
                    {subCount > 0 && <p className="text-[11px] text-white/50">{subCount} sous-categories</p>}
                    <span className="inline-flex items-center gap-1 text-[11px] text-gold font-semibold mt-2 group-hover:gap-2 transition-all">Explorer <ChevronRight size={12} /></span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* UZALUS TOOLS */}
        <div className="mt-14 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Wrench size={24} className="text-gold" />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold gold-text">UZALUS TOOLS</h2>
                <p className="text-xs text-muted-foreground mt-1">Des outils gratuits et puissants</p>
              </div>
            </div>
            <button className="text-sm text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
              Voir tous les outils <ArrowRight size={14} />
            </button>
          </div>
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

        {/* Products section */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-8">
            <Flame size={24} className="text-gold" />
            <h2 className="font-display text-xl sm:text-2xl font-bold gold-text">Produits populaires</h2>
          </div>

          {productsLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {!productsLoading && productsError && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground mb-4">Erreur de chargement des produits</p>
              <button onClick={() => fetchProductsBatch(true)} className="px-6 py-2.5 bg-gold text-noir text-sm font-bold rounded-xl hover:bg-gold-light transition-colors">
                Reessayer
              </button>
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {products.map((p) => <ProductCard key={p.pid} product={p} />)}
              </div>
              {hasMore && products.length > 0 && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => fetchProductsBatch(false)}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-8 py-3 border-2 border-gold/50 text-sm font-semibold text-gold rounded-xl hover:bg-gold hover:text-noir transition-colors disabled:opacity-50"
                  >
                    {loadingMore && <Loader2 size={16} className="animate-spin" />}
                    {loadingMore ? 'Chargement...' : 'Charger plus'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Trust section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><Truck size={20} className="text-gold" /></div>
            <div><p className="text-sm font-bold text-foreground">Livraison Gratuite</p><p className="text-xs text-muted-foreground">Des 49 euros d'achat</p></div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><Shield size={20} className="text-gold" /></div>
            <div><p className="text-sm font-bold text-foreground">Paiement Securise</p><p className="text-xs text-muted-foreground">SSL & cryptage</p></div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><RotateCcw size={20} className="text-gold" /></div>
            <div><p className="text-sm font-bold text-foreground">Retour 14 Jours</p><p className="text-xs text-muted-foreground">Satisfait ou rembourse</p></div>
          </div>
          <div className="flex items-center gap-3 bg-noir-card border border-border rounded-xl p-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><Package size={20} className="text-gold" /></div>
            <div><p className="text-sm font-bold text-foreground">+50 000 Produits</p><p className="text-xs text-muted-foreground">Catalogue en expansion</p></div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
      <CartSidebar />
    </div>
  );
}
