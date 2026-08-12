"use client";

import { shopCategoriesData } from "@/lib/shop-data";

const AUTO_SLUG = "auto-moto";
const AUTO_LABEL = "Auto · Accessoires · Pieces Detachees";

export function ShopCategories() {
  const categories = shopCategoriesData;
  const catEntries = Object.values(categories) as any[];
  const autoCat = categories[AUTO_SLUG];

  const handleCategoryClick = (slug: string) => {
    const event = new CustomEvent("open-category", { detail: { slug } });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="categories">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Nos <span className="gold-text">Categories</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explorez notre catalogue de plus de 50 000 produits repartis dans 18 categories
        </p>
      </div>

      {/* AUTO BANNER */}
      {autoCat && (
        <div
          onClick={() => handleCategoryClick(AUTO_SLUG)}
          className="mb-10 relative group cursor-pointer rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        >
          <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-white">
            <img
              src={autoCat.image}
              alt="Auto Accessoires Pieces Detachees"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{autoCat.icon}</span>
                <h3 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                  {autoCat.name}
                </h3>
              </div>
              <p className="text-gray-200 text-sm mt-1 drop-shadow">
                {autoCat.description}
              </p>
            </div>
          </div>
          <div className="bg-[#D4AF37] px-5 py-2.5 text-center">
            <span className="text-[#0B0B0B] font-bold text-sm tracking-widest uppercase">
              {AUTO_LABEL}
            </span>
          </div>
        </div>
      )}

      {/* OTHER CATEGORIES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {catEntries
          .filter((c) => c.slug !== AUTO_SLUG)
          .map((cat) => (
            <div
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group cursor-pointer bg-[#111111] rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            >
              <div className="relative h-32 sm:h-36 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              </div>
              <div className="p-3 text-center">
                <span className="text-lg mb-1 block">{cat.icon}</span>
                <h3 className="text-white text-xs sm:text-sm font-medium leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}