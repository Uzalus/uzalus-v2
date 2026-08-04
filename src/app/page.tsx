'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/uzalus/navbar';
import { Hero } from '@/components/uzalus/hero';
import { ShopCategories } from '@/components/uzalus/shop-categories';
import { Categories } from '@/components/uzalus/categories';
import { Products } from '@/components/uzalus/products';
import { WhyUs } from '@/components/uzalus/why-us';
import { Promotions } from '@/components/uzalus/promotions';
import { Newsletter } from '@/components/uzalus/newsletter';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';

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
      <div className="min-h-screen flex flex-col bg-noir">
        <CategoryPage category={activeCategory} onBack={() => { setActiveCategory(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ShopCategories />
        <Categories />
        <Products />
        <WhyUs />
        <Promotions />
        <Newsletter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}