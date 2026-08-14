'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/uzalus/navbar';
import HeroRedesigned from '@/components/uzalus/hero-redesigned';
import { ShopCategories } from '@/components/uzalus/shop-categories';
import { FlashSales } from '@/components/uzalus/flash-sales';
import { Products } from '@/components/uzalus/products';
import { TrustBar } from '@/components/uzalus/trust-bar';
import { WhyUs } from '@/components/uzalus/why-us';
import { Promotions } from '@/components/uzalus/promotions';
import { Newsletter } from '@/components/uzalus/newsletter';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import MobileNav from '@/components/uzalus/mobile-nav';
import { MarqueeBanner } from '@/components/uzalus/marquee-banner';
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';
import { ProductDetail } from '@/components/uzalus/product-detail';

/* ------------------------------------------------------------------ */
/*  Google AdSense Block (real)                                        */
/* ------------------------------------------------------------------ */
function AdSenseBlock({ className = '' }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
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

  /* ---- Main homepage ---- */
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      <main className="flex-1 pb-20 md:pb-0">
        <HeroRedesigned />
        <MarqueeBanner />

        {/* AdSense #1 */}
        <AdSenseBlock />

        <FlashSales />
        <ShopCategories />

        {/* AdSense #2 */}
        <AdSenseBlock />

        <Products />
        <TrustBar />
        <WhyUs />
        <Promotions />
        <Newsletter />
      </main>

      <Footer />
      <ChatWidget />
      <MobileNav />
    </div>
  );
}