"use client";

export function MarqueeBanner() {
  const brands = [
    "NIKE", "SAMSUNG", "APPLE", "ADIDAS", "SONY", "BOSE",
    "NIKE", "SAMSUNG", "APPLE", "ADIDAS", "SONY", "BOSE",
  ];

  return (
    <div className="relative overflow-hidden py-4 bg-[#0f0f0f] border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {brands.map((brand, i) => (
          <span
            key={i}
            className="mx-8 text-gray-500 text-sm font-medium tracking-[0.3em] uppercase select-none"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}