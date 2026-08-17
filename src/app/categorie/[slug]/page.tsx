'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { TrustBar } from '@/components/uzalus/trust-bar';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import MobileNav from '@/components/uzalus/mobile-nav';
import { shopCategoriesData } from '@/lib/shop-data';
import { useI18n } from '@/lib/i18n-context';
import {
  Search, Star, Heart, SlidersHorizontal, ChevronDown,
  ArrowLeft, Flame, Eye, CheckCircle, ChevronRight,
} from 'lucide-react';

interface CJProduct {
  pid: string;
  productName: string;
  productNameEn?: string;
  productImage: string;
  sellPrice: number;
  originalPrice?: number;
  rating?: number;
  commentCount?: number;
  discount?: number;
}

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' \u20ac';
}

function Stars({ rating, count }: { rating: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map(function(_, i) {
        return <Star key={'f' + i} size={12} className="fill-amber-400 text-amber-400" />;
      })}
      {half === 1 && <Star size={12} className="fill-amber-400/50 text-amber-400" />}
      {Array.from({ length: empty }).map(function(_, i) {
        return <Star key={'e' + i} size={12} className="text-gray-600" />;
      })}
      {count !== undefined && count > 0 && (
        <span className="text-[11px] text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: CJProduct }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="group bg-noir-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-noir-lighter">
        <img
          src={product.productImage || ''}
          alt={product.productNameEn || product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={function(e) { (e.target as HTMLImageElement).src = 'https://placehold.co/300x400/1a1a1a/333?text=UZALUS'; }}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.discount && product.discount >= 10 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              -{product.discount}%
            </span>
          )}
        </div>
        <button
          onClick={function(e) { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
        >
          <Heart size={15} className={liked ? 'fill-red-500 text-red-500' : 'text-white/70'} />
        </button>
      </div>
      <div className="p-3.5">
        <h3 className="text-sm text-foreground/90 leading-snug line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-300">
          {product.productNameEn || product.productName}
        </h3>
        <Stars rating={product.rating || 0} count={product.commentCount} />
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-base font-bold text-gold">
            {formatPrice(product.sellPrice)}
          </span>
          {product.originalPrice && product.originalPrice > product.sellPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map(function(_, i) {
        return (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-noir-lighter rounded-xl mb-3" />
            <div className="h-4 bg-noir-lighter rounded w-3/4 mb-2" />
            <div className="h-3 bg-noir-lighter rounded w-1/2 mb-2" />
            <div className="h-5 bg-noir-lighter rounded w-2/5" />
          </div>
        );
      })}
    </div>
  );
}

function CategoriePageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const slug = (params.slug as string) || '';
  const initialSub = searchParams.get('sub') || null;

  const catData = shopCategoriesData[slug];
  const subs = catData?.subCategories || [];
  const catLabel = catData ? t(catData.key) : slug.replace(/-/g, ' ');
  const heroImage = subs.length > 0 ? subs[0].image : 'https://placehold.co/1400x400/1a1a1a/333?text=UZALUS';

  const [products, setProducts] = useState<CJProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(initialSub);
  const [sortBy, setSortBy] = useState('popular');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  function doFetch(resetPage: boolean) {
    if (resetPage) {
      setLoading(true);
      setProducts([]);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    const sortTypes = ['salesVolume', 'newArrival', 'priceAsc', 'priceDesc'];
    const sortIndex = resetPage ? 0 : Math.floor(Math.random() * sortTypes.length);
    const cjSortType = sortTypes[sortIndex];

    let url = '/api/cj/products?category=' + slug + '&pageSize=100&page=1&sortType=' + cjSortType;
    if (activeSub) {
      const kw = activeSub.split('.').pop() || activeSub;
      url += '&keyword=' + encodeURIComponent(kw);
    }
    if (searchQuery) {
      url += '&keyword=' + encodeURIComponent(searchQuery);
    }

    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          const newProducts: CJProduct[] = (data.products || []).map(function(p: any) {
            return {
              pid: String(p.pid || ''),
              productName: String(p.productName || ''),
              productNameEn: p.productNameEn ? String(p.productNameEn) : undefined,
              productImage: String(p.productImage || ''),
              sellPrice: Number(p.sellPrice || 0),
              originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
              rating: p.rating ? Number(p.rating) : undefined,
              commentCount: p.commentCount ? Number(p.commentCount) : undefined,
              discount: p.discount ? Number(p.discount) : undefined,
            };
          });
          if (resetPage) {
            setProducts(newProducts);
          } else {
            setProducts(function(prev) {
              const existingIds = new Set(prev.map(function(p) { return p.pid; }));
              const unique = newProducts.filter(function(p) { return !existingIds.has(p.pid); });
              if (unique.length === 0 && prev.length > 0) setHasMore(false);
              return prev.concat(unique);
            });
          }
          setTotal(data.total || 0);
        } else {
          setError(data.error || 'Erreur de chargement');
        }
      })
      .catch(function() {
        setError('Erreur r\u00e9seau');
      })
      .finally(function() {
        if (resetPage) setLoading(false);
        else setLoadingMore(false);
      });
  }

  useEffect(function() {
    if (slug) doFetch(true);
  }, [slug, activeSub]);

  useEffect(function() {
    if (!slug) return;
    const timer = setTimeout(function() { doFetch(true); }, 400);
    return function() { clearTimeout(timer); };
  }, [searchQuery]);

  const sorted = products.slice().sort(function(a, b) {
    if (sortBy === 'price-asc') return a.sellPrice - b.sellPrice;
    if (sortBy === 'price-desc') return b.sellPrice - a.sellPrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const sortOptions = [
    { value: 'popular', label: t('sort.popularity') || 'Populaires' },
    { value: 'price-asc', label: t('sort.priceAsc') || 'Prix croissant' },
    { value: 'price-desc', label: t('sort.priceDesc') || 'Prix d\u00e9croissant' },
    { value: 'rating', label: t('sort.rating') || 'Meilleures notes' },
  ];
  const currentSortLabel = (sortOptions.find(function(o) { return o.value === sortBy; }) || {}).label || 'Populaires';

  const sidebarBtnBase = 'w-full text-start px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ';
  const sidebarBtnActive = 'bg-gold/15 text-gold border border-gold/20 font-medium';
  const sidebarBtnInactive = 'text-foreground/60 hover:text-foreground hover:bg-noir-lighter';

  return (
    <div className="min-h-screen bg-noir text-foreground">
      <Navbar />

      {/* HERO */}
      <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] overflow-hidden">
        <img src={heroImage} alt={catLabel} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="flex items-center gap-2 text-gold text-xs font-bold tracking-[3px] uppercase mb-3">
            <Flame size={14} className="text-orange-400" />
            COLLECTION 2025
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
            {catLabel.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Découvrez notre sélection premium
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-noir border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 flex items-center justify-center gap-6 sm:gap-12 text-sm">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-orange-400" />
            <span className="font-bold text-foreground">2 847</span>
            <span className="text-muted-foreground hidden sm:inline">clients cette semaine</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-yellow-400" />
            <span className="font-bold text-foreground">12 540</span>
            <span className="text-muted-foreground hidden sm:inline">vues aujourd&apos;hui</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            <span className="font-bold text-foreground">98%</span>
            <span className="text-muted-foreground hidden sm:inline">satisfaits</span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="flex gap-6 lg:gap-8">

          {/* SIDEBAR */}
          <aside className={
            (sidebarOpen
              ? 'fixed inset-0 z-50 bg-noir/95 pt-20 px-6 overflow-y-auto '
              : 'hidden '
            ) + 'lg:block lg:static lg:w-[250px] lg:shrink-0 lg:bg-transparent lg:pt-0 lg:px-0'
          }>
            {sidebarOpen && (
              <button
                onClick={function() { setSidebarOpen(false); }}
                className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors text-2xl"
              >
                ✕
              </button>
            )}
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] text-gold font-bold tracking-[3px] uppercase mb-4 flex items-center justify-between">
                CATÉGORIES
                <span className="text-muted-foreground font-normal">({subs.length})</span>
              </p>
              <div className="space-y-1">
                <button
                  onClick={function() { setActiveSub(null); setSidebarOpen(false); }}
                  className={sidebarBtnBase + 'font-medium ' + (!activeSub ? sidebarBtnActive : sidebarBtnInactive)}
                >
                  <span>Tout voir</span>
                  {products.length > 0 && !activeSub && (
                    <span className="text-xs opacity-60">({products.length})</span>
                  )}
                </button>
                {subs.map(function(sub) {
                  const isActive = sub.key === activeSub;
                  const subName = t(sub.key) || (sub.key.split('.').pop() || '').replace(/-/g, ' ');
                  return (
                    <button
                      key={sub.key}
                      onClick={function() { setActiveSub(sub.key); setSidebarOpen(false); }}
                      className={sidebarBtnBase + (isActive ? sidebarBtnActive : sidebarBtnInactive)}
                    >
                      <span className="truncate">{subName}</span>
                      <ChevronRight size={14} className={isActive ? 'shrink-0 text-gold' : 'shrink-0 text-foreground/20'} />
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <button
                onClick={function() { setSidebarOpen(true); }}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-noir-card border border-border text-xs text-foreground/80 hover:border-gold/30 transition-colors"
              >
                <SlidersHorizontal size={14} className="text-gold" />
                Filtres
              </button>
              <div className="hidden sm:flex flex-1 max-w-md items-center bg-noir-lighter border border-border rounded-full px-5 py-2.5 gap-2 focus-within:border-gold/30 transition-colors">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder={'Rechercher dans ' + catLabel + '...'}
                  value={searchQuery}
                  onChange={function(e) { setSearchQuery(e.target.value); }}
                  onKeyDown={function(e) { if (e.key === 'Enter') doFetch(true); }}
                  className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                {!loading && (
                  <span className="text-xs text-muted-foreground">{products.length} articles</span>
                )}
                <div className="relative">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-foreground/70 hover:text-foreground transition-colors">
                    <span>Trier par:</span>
                    <span className="text-gold font-semibold">{currentSortLabel}</span>
                    <ChevronDown size={14} className="text-gold" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-noir-card border border-border rounded-xl shadow-2xl shadow-black/50 py-1 z-30">
                    {sortOptions.map(function(opt) {
                      return (
                        <button
                          key={opt.value}
                          onClick={function() { setSortBy(opt.value); }}
                          className={
                            'w-full text-start px-4 py-2.5 text-xs transition-colors ' +
                            (sortBy === opt.value
                              ? 'text-gold font-semibold bg-gold/5'
                              : 'text-foreground/60 hover:text-foreground hover:bg-noir-lighter')
                          }
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {activeSub && (
              <button
                onClick={function() { setActiveSub(null); }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-5"
              >
                <ArrowLeft size={16} />
                <span>Retour {catLabel}</span>
              </button>
            )}

            {loading && <SkeletonGrid />}

            {error && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-5">
                  <Search size={32} className="text-muted-foreground/50" />
                </div>
                <p className="text-foreground/60 text-lg mb-2">Aucun produit disponible</p>
                <p className="text-muted-foreground text-sm mb-6">Essayez de modifier vos filtres ou votre recherche</p>
                <button
                  onClick={function() { doFetch(true); }}
                  className="px-8 py-3 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors"
                >
                  Réessayer
                </button>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-5">
                  <Search size={32} className="text-muted-foreground/50" />
                </div>
                <p className="text-foreground/60 text-lg">Produits bient\u00f4t disponibles</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sorted.map(function(p) {
                    return <ProductCard key={p.pid} product={p} />;
                  })}
                </div>
                {hasMore && products.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={function() { doFetch(false); }}
                      disabled={loadingMore || loading}
                      className="flex items-center gap-2 px-8 py-3 border-2 border-gold text-sm font-semibold text-gold rounded-full hover:bg-gold hover:text-noir transition-colors disabled:opacity-50"
                    >
                      {loadingMore && <span className="animate-spin w-4 h-4 border-2 border-gold border-t-transparent rounded-full" />}
                      {loadingMore ? 'Chargement...' : 'Charger plus'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <TrustBar />
      <Footer />
      <ChatWidget />
      <MobileNav />
    </div>
  );
}

export default function CategoriePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
      </div>
    }>
      <CategoriePageContent />
    </Suspense>
  );
}
