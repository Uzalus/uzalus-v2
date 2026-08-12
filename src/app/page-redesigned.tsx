'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/uzalus/navbar';
import { HeroRedesigned } from '@/components/uzalus/hero-redesigned';
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
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';

// MarqueeBanner component not available in this project — skipped as instructed

function AdSensePlaceholder() {
  return (
    <div className="py-6">
      <div className="border border-dashed border-gray-700 rounded-lg p-2 text-center bg-[#0a0a0a]/50 max-w-3xl mx-auto">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider">
          Publicité &bull; 728 × 90
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CatSlug | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as CatSlug;
      if (detail) {
        setActiveCategory(detail);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('open-category', handler);
    return () => window.removeEventListener('open-category', handler);
  }, []);

  if (activeCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <CategoryPage
          category={activeCategory}
          onBack={() => {
            setActiveCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ChatWidget />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
      <Navbar />
      <MobileNav />
      <main className="flex-1">
        <HeroRedesigned />
        <AdSensePlaceholder />
        <ShopCategories />
        <FlashSales />
        <AdSensePlaceholder />
        <Products />
        <TrustBar />
        <WhyUs />
        <AdSensePlaceholder />
        <Promotions />
        <Newsletter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
