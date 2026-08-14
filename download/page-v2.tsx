'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { Navbar } from '@/components/uzalus/navbar';
import { HeroRedesigned } from '@/components/uzalus/hero-redesigned';
import { CategoryCircles } from '@/components/uzalus/category-circles';
import { ShopCategories } from '@/components/uzalus/shop-categories';
import { FlashSales } from '@/components/uzalus/flash-sales';
import { Products } from '@/components/uzalus/products';
import { TrustBar } from '@/components/uzalus/trust-bar';
import { WhyUs } from '@/components/uzalus/why-us';
import { Promotions } from '@/components/uzalus/promotions';
import { Newsletter } from '@/components/uzalus/newsletter';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { MobileNav } from '@/components/uzalus/mobile-nav';
import { EmptyCartModal } from '@/components/uzalus/empty-cart-modal';
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';
import { ProductDetail } from '@/components/uzalus/product-detail';

/* ------------------------------------------------------------------ */
/*  Inline MarqueeBanner                                              */
/* ------------------------------------------------------------------ */
const BRANDS = [
  'NIKE', 'SAMSUNG', 'GUCCI', 'ADIDAS', 'APPLE', 'SONY', 'PUMA', 'H&M',
  'ZARA', 'LOUIS VUITTON', 'DIOR', 'HERMÈS', 'CHANEL', 'PRADA', 'VERSACE',
];

function MarqueeBanner() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <section className="relative overflow-hidden py-3 bg-noir-lighter/60 border-y border-border/30">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track flex whitespace-nowrap w-max">
        {items.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="inline-flex items-center gap-3 mx-8 text-sm tracking-[0.35em] uppercase text-foreground/25 font-medium select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold/40 inline-block" />
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline AdSense placeholder                                         */
/* ------------------------------------------------------------------ */
function AdSenseBlock({ size = '728x90', className = '' }: { size?: string; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={`ad-placeholder rounded-xl p-3 text-center my-8 max-w-4xl mx-auto ${className}`}>
      <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
        {t('ad.label')} — Google AdSense
      </span>
      <div className="h-20 flex items-center justify-center text-muted-foreground/20 text-xs">
        {size} Leaderboard
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
interface ProductViewState {
  pid: string;
  name: string;
  image: string;
  price: number;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CatSlug | null>(null);
  const [activeProduct, setActiveProduct] = useState<ProductViewState | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as CatSlug;
      if (detail) {
        setActiveCategory(detail);
        setActiveProduct(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('open-category', handler);
    return () => window.removeEventListener('open-category', handler);
  }, []);

  /* ---- Product detail view ---- */
  if (activeProduct) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => setCartOpen(true)} />
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
        <EmptyCartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    );
  }

  /* ---- Category drill-down view ---- */
  if (activeCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => setCartOpen(true)} />
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
        <EmptyCartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    );
  }

  /* ---- Main homepage (SHEIN-style layout) ---- */
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onProfileClick={() => setCartOpen(false)}
      />

      <main className="flex-1 pb-20 md:pb-0">
        {/* 1. Hero — SHEIN-style 3-column (side banners + carousel + brand cards) */}
        <HeroRedesigned />

        {/* 2. Circular category quick-links (SHEIN-style) */}
        <CategoryCircles />

        {/* 3. Marquee banner of brand names */}
        <MarqueeBanner />

        {/* 4. AdSense Block #1 — leaderboard */}
        <AdSenseBlock size="728x90" />

        {/* 5. Flash sales / deals section */}
        <FlashSales />

        {/* 6. Shop categories grid */}
        <ShopCategories />

        {/* 7. AdSense Block #2 */}
        <AdSenseBlock size="970x90" />

        {/* 8. Bestsellers / featured products */}
        <Products />

        {/* 9. Trust indicators */}
        <TrustBar />

        {/* 10. Why shop with UZALUS */}
        <WhyUs />

        {/* 11. Promotional banners */}
        <Promotions />

        {/* 12. Newsletter signup */}
        <Newsletter />
      </main>

      <Footer />

      {/* Floating widgets */}
      <ChatWidget />
      <MobileNav />

      {/* Modals */}
      <EmptyCartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}