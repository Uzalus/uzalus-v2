"use client";

import { useState } from "react";
import Link from "next/link";
import { shopCategoriesData } from "@/lib/shop-data";
import MobileNav from "@/components/uzalus/mobile-nav";

const catEntries = Object.values(shopCategoriesData);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const handleCatClick = (slug: string) => {
    const event = new CustomEvent("open-category", { detail: { slug } });
    window.dispatchEvent(event);
    setShopOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold gold-text">UZALUS</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
                Accueil
              </Link>

              {/* Shop dropdown */}
              <div className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="px-3 py-2 text-sm font-medium text-white hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  Boutique
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {shopOpen && (
                  <div className="absolute top-full left-0 w-[600px] bg-[#111111] border border-white/10 rounded-xl shadow-2xl p-6 fadeInUp">
                    <div className="grid grid-cols-3 gap-3">
                      {catEntries.map((cat: any) => (
                        <button
                          key={cat.slug}
                          onClick={() => handleCatClick(cat.slug)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <span>{cat.icon}</span>
                          <span className="text-white text-sm hover:text-[#D4AF37]">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a href="#categories" className="px-3 py-2 text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
                Categories
              </a>

              <a href="#promotions" className="px-3 py-2 text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
                Promotions
              </a>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden sm:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 ml-2 w-40 lg:w-56"
                />
              </div>

              {/* Language */}
              <button className="hidden sm:flex items-center gap-1 text-gray-400 hover:text-white text-sm px-2">
                <span>FR</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Wishlist */}
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </button>

              {/* Cart */}
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </button>

              {/* Mobile menu btn */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={catEntries.map((c: any) => ({ slug: c.slug, name: c.name, icon: c.icon }))}
        onCategoryClick={handleCatClick}
      />
    </>
  );
}