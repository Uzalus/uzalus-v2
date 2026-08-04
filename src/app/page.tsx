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

export default function Home() {
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