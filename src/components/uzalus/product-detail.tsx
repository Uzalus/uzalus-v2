'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';
import {
  ArrowLeft, Star, Heart, Share2, Truck, Shield, RotateCcw,
  Minus, Plus, ChevronRight, Loader2, AlertCircle, Maximize2,
  ChevronLeft, Package, Check
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface CJProductDetail {
  pid: string;
  productNameEn: string;
  productNameFr: string;
  productImage: string;
  images: string[];
  sellPrice: number;
  originalPrice: number;
  rating: number;
  description: string;
  weight: number;
  ePacketAvailable: boolean;
  colors: { name: string; image: string }[];
  sizes: string[];
  variants: {
    skuId: string;
    variantImg?: string;
    costPrice: number;
    sellPrice: number;
    stock: number;
    attrName?: string;
  }[];
  category: { catId: string; catName: string } | null;
}

interface ProductDetailProps {
  pid: string;
  onBack: () => void;
  productName?: string;
  productImage?: string;
  productPrice?: number;
}

/* ------------------------------------------------------------------ */
/*  Price helper                                                       */
/* ------------------------------------------------------------------ */
function calcPrice(usdPrice: number) {
  const eurToUsd = 1.08;
  const shipping = 1.99;
  const margin = 1.8;
  const costEur = (usdPrice / eurToUsd) + shipping;
  return Math.round(costEur * margin * 100) / 100;
}

/* ------------------------------------------------------------------ */
/*  Color name to approximate CSS color                                */
/* ------------------------------------------------------------------ */
function colorToCSS(name: string): string {
  const lower = name.toLowerCase();
  const map: Record<string, string> = {
    'black': '#1a1a1a', 'noir': '#1a1a1a', 'white': '#f5f5f5', 'blanc': '#f5f5f5',
    'red': '#dc2626', 'rouge': '#dc2626', 'blue': '#2563eb', 'bleu': '#2563eb',
    'green': '#16a34a', 'vert': '#16a34a', 'yellow': '#eab308', 'jaune': '#eab308',
    'pink': '#ec4899', 'rose': '#ec4899', 'purple': '#9333ea', 'violet': '#9333ea',
    'orange': '#ea580c', 'gray': '#6b7280', 'gris': '#6b7280',
    'brown': '#92400e', 'beige': '#d4b896', 'navy': '#1e3a5f',
    'gold': '#d4af37', 'silver': '#c0c0c0', 'beige': '#d4b896',
    'khaki': '#c3b091', 'burgundy': '#800020', 'maroon': '#800020',
    'army green': '#4b5320', 'camouflage': '#4b5320', 'sky blue': '#87ceeb',
    'dark blue': '#00008b', 'light blue': '#add8e6', 'dark gray': '#555555',
    'light gray': '#cccccc', 'wine red': '#722f37', 'apricot': '#fbceb1',
    'coffee': '#6f4e37', 'nude': '#e3bc9a', 'camel': '#c19a6b',
    'mint': '#98fb98', 'lavender': '#e6e6fa', 'coral': '#ff7f50',
    'turquoise': '#40e0d0', 'teal': '#008080', 'olive': '#808000',
  };
  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val;
  }
  return '#888888';
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export function ProductDetail({ pid, onBack, productName, productImage, productPrice }: ProductDetailProps) {
  const { t, locale } = useI18n();

  const [product, setProduct] = useState<CJProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'info' | 'shipping'>('description');
  const [imgFullscreen, setImgFullscreen] = useState(false);

  // Fetch product details
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/cj/product/${pid}`);
        const json = await res.json();
        if (json.success && json.product) {
          setProduct(json.product);
        } else {
          setError(json.error || t('detail.notFound'));
        }
      } catch {
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [pid]);

  // Reset selections when product loads
  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(null);
    setSelectedImage(0);
    setQuantity(1);
  }, [product?.pid]);

  const displayPrice = product ? calcPrice(product.sellPrice) : (productPrice || 0);
  const displayOldPrice = product && product.originalPrice > product.sellPrice
    ? calcPrice(product.originalPrice)
    : undefined;

  const allImages = product?.images?.length
    ? product.images
    : productImage
      ? [productImage]
      : [];

  const displayName = locale === 'fr' && product?.productNameFr
    ? product.productNameFr
    : product?.productNameEn || productName || t('detail.notFound');

  const handleAddToCart = () => {
    // Find matching variant
    const variant = product?.variants?.find(v => {
      if (!v.attrName) return false;
      const colorMatch = !product?.colors?.length ||
        v.attrName.toLowerCase().includes(product.colors[selectedColor]?.name?.toLowerCase());
      const sizeMatch = !selectedSize ||
        (product?.sizes?.[selectedSize] && v.attrName.includes(product.sizes[selectedSize]));
      return colorMatch && sizeMatch;
    });

    const item = {
      pid: product?.pid || pid,
      name: displayName,
      image: allImages[selectedImage] || '',
      price: displayPrice,
      color: product?.colors?.[selectedColor]?.name,
      size: selectedSize !== null ? product?.sizes?.[selectedSize] : undefined,
      quantity,
      skuId: variant?.skuId,
    };

    // Dispatch cart event
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: item }));
  };

  /* ---------- Loading state ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-gold animate-spin" />
          <p className="text-muted-foreground text-sm">{t('detail.loading')}</p>
        </div>
      </div>
    );
  }

  /* ---------- Error state ---------- */
  if (error || !product) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-foreground/80 text-lg mb-6">{error || t('detail.notFound')}</p>
          <button onClick={onBack} className="gold-btn px-6 py-3 rounded-xl text-sm font-bold">
            {t('detail.back')}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Main render ---------- */
  return (
    <div className="min-h-screen bg-noir">
      {/* Header bar */}
      <div className="sticky top-0 z-40 bg-noir/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden sm:inline">{t('detail.back')}</span>
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-medium text-foreground/70 truncate max-w-md">{displayName}</h1>
          </div>
          <button onClick={() => setLiked(!liked)} className="p-2 rounded-full hover:bg-noir-card transition-colors" aria-label="Favoris">
            <Heart size={20} className={liked ? 'text-red-400 fill-red-400' : 'text-foreground/60 hover:text-red-400'} />
          </button>
          <button className="p-2 rounded-full hover:bg-noir-card transition-colors" aria-label="Partager">
            <Share2 size={20} className="text-foreground/60 hover:text-gold" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ===== LEFT: Image Gallery ===== */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                      selectedImage === i
                        ? 'border-gold shadow-lg shadow-gold/20'
                        : 'border-border hover:border-gold/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayName} ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1a1a/d4af37?text='; }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-noir-card border border-border group">
              <img
                src={allImages[selectedImage] || 'https://placehold.co/600x600/1a1a1a/d4af37?text=Photo'}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/d4af37?text=Photo'; }}
              />
              {/* Navigation arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => i <= 0 ? allImages.length - 1 : i - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => i >= allImages.length - 1 ? 0 : i + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </>
              )}
              {/* Fullscreen button */}
              <button
                onClick={() => setImgFullscreen(true)}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-noir/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-noir/80"
              >
                <Maximize2 size={18} className="text-white" />
              </button>
              {/* Badge */}
              {product.originalPrice > product.sellPrice && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  -{Math.round((1 - product.sellPrice / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          </div>

          {/* ===== RIGHT: Product Info ===== */}
          <div className="flex flex-col">
            {/* Title */}
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground/95 leading-tight mb-4">
              {displayName}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating || 4) ? 'text-gold fill-gold' : 'text-foreground/20'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating || 4.0} / 5</span>
              {product.ePacketAvailable && (
                <span className="ml-2 px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                  ePacket
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-gold">{displayPrice.toFixed(2)}€</span>
              {displayOldPrice && (
                <span className="text-xl text-muted-foreground line-through mb-1">{displayOldPrice.toFixed(2)}€</span>
              )}
            </div>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-foreground/80">{t('detail.color')}</span>
                  <span className="text-sm text-gold font-medium">{product.colors[selectedColor]?.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedColor(i);
                        // Switch to color image if available
                        if (color.image) {
                          const imgIdx = allImages.indexOf(color.image);
                          if (imgIdx !== -1) setSelectedImage(imgIdx);
                        }
                      }}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        selectedColor === i
                          ? 'border-gold shadow-lg shadow-gold/30 scale-110'
                          : 'border-border hover:border-gold/40'
                      }`}
                      title={color.name}
                    >
                      {color.image ? (
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.style.backgroundColor = colorToCSS(color.name);
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: colorToCSS(color.name) }}
                        />
                      )}
                      {selectedColor === i && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check size={16} className="text-white drop-shadow-lg" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/80">{t('detail.size')}</span>
                    {selectedSize !== null && (
                      <span className="text-sm text-gold font-medium">{product.sizes[selectedSize]}</span>
                    )}
                  </div>
                  <button className="text-xs text-gold/70 hover:text-gold transition-colors underline underline-offset-2">
                    {t('detail.sizeGuide')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className={`min-w-[48px] h-10 px-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                        selectedSize === i
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border text-foreground/70 hover:border-gold/40 hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <span className="text-sm font-semibold text-foreground/80 mb-3 block">{t('detail.quantity')}</span>
              <div className="flex items-center gap-0 w-fit rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-noir-card transition-colors text-foreground/70 hover:text-gold"
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 h-11 flex items-center justify-center text-sm font-bold text-foreground border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(99, q + 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-noir-card transition-colors text-foreground/70 hover:text-gold"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="gold-btn flex-1 h-12 sm:h-14 rounded-xl text-sm sm:text-base font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Package size={18} />
                {t('detail.addToCart')}
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 sm:h-14 rounded-xl bg-foreground text-noir text-sm sm:text-base font-bold tracking-wider uppercase hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
              >
                {t('detail.buyNow')}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-noir-card border border-border">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-gold" />
                <span className="text-[11px] text-foreground/60 leading-tight">{t('detail.freeShipping')}</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield size={20} className="text-gold" />
                <span className="text-[11px] text-foreground/60 leading-tight">{t('detail.securePayment')}</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={20} className="text-gold" />
                <span className="text-[11px] text-foreground/60 leading-tight">{t('detail.return30')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS: Description / Info / Shipping ===== */}
        <div className="mt-10 border-t border-border pt-8">
          <div className="flex gap-1 border-b border-border mb-6">
            {([
              ['description', t('detail.description')],
              ['info', t('detail.info')],
              ['shipping', t('detail.shippingTab')],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === key
                    ? 'border-gold text-gold'
                    : 'border-transparent text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Description tab */}
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              {product.description ? (
                <div
                  className="text-foreground/70 text-sm leading-relaxed [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-4 [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-noir-card"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  {displayName} - {t('detail.descFallback')}
                </p>
              )}
            </div>
          )}

          {/* Info tab */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground w-40">{t('detail.reference')}</td>
                    <td className="py-3 text-foreground/80">{product.pid}</td>
                  </tr>
                  {product.category && (
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">{t('detail.categoryLabel')}</td>
                      <td className="py-3 text-foreground/80">{product.category.catName}</td>
                    </tr>
                  )}
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">{t('detail.weight')}</td>
                    <td className="py-3 text-foreground/80">{product.weight ? `${product.weight}g` : t('detail.notSpecified')}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">{t('detail.ratingLabel')}</td>
                    <td className="py-3 text-foreground/80 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating || 4) ? 'text-gold fill-gold' : 'text-foreground/20'} />
                      ))}
                      <span className="ml-1">{product.rating || 4.0}/5</span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">{t('detail.ePacket')}</td>
                    <td className="py-3 text-foreground/80">{product.ePacketAvailable ? t('detail.yes') : t('detail.no')}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-muted-foreground">{t('detail.variants')}</td>
                    <td className="py-3 text-foreground/80">{product.variants?.length || 1} {t('detail.available')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Shipping tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-noir-card border border-border">
                <Truck size={24} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-1">{t('detail.stdShip')}</h4>
                  <p className="text-sm text-muted-foreground">{t('detail.stdShipDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-noir-card border border-border">
                <Package size={24} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-1">{t('detail.expressShip')}</h4>
                  <p className="text-sm text-muted-foreground">{t('detail.expressShipDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-noir-card border border-border">
                <Shield size={24} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground/90 mb-1">{t('detail.returnPolicy')}</h4>
                  <p className="text-sm text-muted-foreground">{t('detail.returnPolicyDesc')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== Google AdSense Slot ===== */}
        <div className="my-10 rounded-xl border border-border/30 overflow-hidden bg-noir-card/50">
          <div className="p-3 text-center">
            <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              Publicité — Google AdSense
            </span>
            <div className="h-24 flex items-center justify-center text-muted-foreground/20 text-xs">
              728 x 90 Product Detail Ad
            </div>
          </div>
        </div>
      </div>

      {/* ===== Fullscreen Image Modal ===== */}
      {imgFullscreen && allImages[selectedImage] && (
        <div
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setImgFullscreen(false)}
        >
          <button
            onClick={() => setImgFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-noir/80 flex items-center justify-center text-white hover:bg-noir transition-colors z-10"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(i => i <= 0 ? allImages.length - 1 : i - 1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-noir/80 flex items-center justify-center text-white hover:bg-noir transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={allImages[selectedImage]}
            alt={displayName}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/d4af37?text=Photo'; }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(i => i >= allImages.length - 1 ? 0 : i + 1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-noir/80 flex items-center justify-center text-white hover:bg-noir transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-foreground/50">
            {selectedImage + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}