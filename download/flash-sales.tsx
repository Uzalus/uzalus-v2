"use client";

import { useState, useEffect } from "react";

interface Product {
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
}

const products: Product[] = [
  {
    name: "Casque Bluetooth Pro",
    price: 29.90,
    oldPrice: 59.90,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "-50%",
  },
  {
    name: "Montre Sport Elite",
    price: 39.90,
    oldPrice: 79.90,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "PROMO",
  },
  {
    name: "Enceinte Portable 20W",
    price: 19.90,
    oldPrice: 39.90,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    badge: "-50%",
  },
  {
    name: "Lunettes de Soleil UV",
    price: 14.90,
    oldPrice: 29.90,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    badge: "-50%",
  },
];

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 23, s: 47 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      {Object.entries(time).map(([k, v]) => (
        <div key={k} className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg px-4 py-2 text-center min-w-[60px]">
          <div className="text-2xl font-bold gold-text">{String(v).padStart(2, "0")}</div>
          <div className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">
            {k === "h" ? "Heures" : k === "m" ? "Min" : "Sec"}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlashSales() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1 mb-4">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-medium">VENTES FLASH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Offres <span className="gold-text">Limitées</span>
        </h2>
        <Countdown />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {p.badge}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-white text-sm font-medium mb-2 truncate">{p.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold text-lg">{p.price.toFixed(2)}€</span>
                <span className="text-gray-500 line-through text-sm">{p.oldPrice.toFixed(2)}€</span>
              </div>
              <button className="w-full mt-3 gold-btn py-2 rounded-lg text-[#0B0B0B] font-semibold text-sm hover:scale-[1.02] transition-transform">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense placeholder */}
      <div className="mt-10 border border-white/5 rounded-xl bg-white/[0.02] py-6 text-center">
        <span className="text-gray-600 text-xs uppercase tracking-wider">Publicité — Google AdSense</span>
      </div>
    </section>
  );
}