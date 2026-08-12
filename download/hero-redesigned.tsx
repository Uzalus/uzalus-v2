"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroRedesigned() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: "Auto Parts Premium",
      subtitle: "Pieces detachees et accessoires de qualite pour votre vehicule",
      cta: "Decouvrir",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
    },
    {
      title: "Electronique & High-Tech",
      subtitle: "Les dernieres innovations a prix imbattables",
      cta: "Explorer",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
    },
    {
      title: "Mode & Accessoires",
      subtitle: "Tendances exclusives livrees chez vous",
      cta: "Shopping",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[750px] overflow-hidden bg-[#0B0B0B]">
      {/* Background */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center kenBurns"
              style={{ backgroundImage: `url(${s.image})` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6 fadeInUp">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-wide">
                UZALUS — Nouvelle Collection
              </span>
            </div>

            <h1
              key={`title-${currentSlide}`}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 fadeInUp"
              style={{ animationDelay: "0.15s" }}
            >
              {slide.title.split(" ").map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="gold-text">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </h1>

            <p
              key={`sub-${currentSlide}`}
              className="text-gray-300 text-lg sm:text-xl mb-8 max-w-lg fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              {slide.subtitle}
            </p>

            <div
              key={`cta-${currentSlide}`}
              className="flex flex-wrap gap-4 fadeInUp"
              style={{ animationDelay: "0.45s" }}
            >
              <Link href="#categories" className="gold-btn px-8 py-3.5 rounded-lg text-[#0B0B0B] font-semibold text-base hover:scale-105 transition-transform duration-200 inline-block">
                {slide.cta}
              </Link>
              <Link href="#categories" className="px-8 py-3.5 rounded-lg border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-colors duration-200 inline-block">
                Toutes les categories
              </Link>
            </div>

            <div
              className="flex gap-8 mt-12 fadeInUp"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { value: "18", label: "Categories" },
                { value: "50K+", label: "Produits" },
                { value: "4.8\u2605", label: "Note clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold gold-text">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
              }, 5000);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-8 bg-[#D4AF37]"
                : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}