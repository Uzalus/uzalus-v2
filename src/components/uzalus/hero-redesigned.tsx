'use client';

import { useI18n } from '@/lib/i18n-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Slide data                                                        */
/* ------------------------------------------------------------------ */
interface Slide {
  title: string;
  titleKey: string;
  subtitle: string;
  subtitleKey: string;
  cta: string;
  ctaKey: string;
  bg: string;
  tag?: string;
  tagKey?: string;
}

const slides: Slide[] = [
  {
    title: "C'EST LA RENTRÉE",
    titleKey: 'hero.slide1Title',
    subtitle: '400 000 BEST-SELLERS',
    subtitleKey: 'hero.slide1Sub',
    cta: 'ACHETER MAINTENANT',
    ctaKey: 'hero.slide1Cta',
    bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&q=80',
    tag: 'TENDANCES',
    tagKey: 'hero.slide1Tag',
  },
  {
    title: 'ESTHÉTIQUE D\'AOÛT',
    titleKey: 'hero.slide2Title',
    subtitle: 'Des tenues pour tous les styles',
    subtitleKey: 'hero.slide2Sub',
    cta: 'VOIR TOUT',
    ctaKey: 'hero.slide2Cta',
    bg: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop&q=80',
  },
  {
    title: 'AUTO & MOTO',
    titleKey: 'hero.slide3Title',
    subtitle: 'Accessoires & pièces détachées',
    subtitleKey: 'hero.slide3Sub',
    cta: 'DÉCOUVRIR',
    ctaKey: 'hero.slide3Cta',
    bg: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=600&fit=crop&q=80',
  },
];

/* Side promo banners — left column */
const leftBanners = [
  {
    titleKey: 'hero.sideStyle',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=260&fit=crop&q=80',
  },
  {
    titleKey: 'hero.sideFast',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=260&fit=crop&q=80',
  },
  {
    titleKey: 'hero.sideHome',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=260&fit=crop&q=80',
  },
];

/* Side promo banners — right column (brand spotlights) */
const rightBanners = [
  {
    label: 'U',
    labelKey: 'hero.brandU',
    bg: 'from-gold/30 to-noir-card',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=260&fit=crop&q=80',
  },
  {
    label: 'Z',
    labelKey: 'hero.brandZ',
    bg: 'from-gold-dark/30 to-noir-card',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=260&fit=crop&q=80',
  },
  {
    label: 'PREMIUM',
    labelKey: 'hero.brandPremium',
    bg: 'from-gold/20 to-noir-card',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=260&fit=crop&q=80',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export function HeroRedesigned() {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  /* Auto-advance every 5s */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full bg-noir overflow-hidden">
      {/* ---- 3-column grid ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-2 p-2 max-w-[1400px] mx-auto">
        {/* LEFT — 3 stacked promo banners (hidden on mobile) */}
        <div className="hidden lg:flex flex-col gap-2">
          {leftBanners.map((b, i) => (
            <button
              key={i}
              onClick={() => {
                const el = document.querySelector('#categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex-1 min-h-[160px] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={b.image}
                alt={t(b.titleKey)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 start-3 z-10">
                <span className="text-white font-bold text-sm tracking-wide drop-shadow-lg">
                  {t(b.titleKey)}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CENTER — Main carousel */}
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] rounded-xl overflow-hidden group">
          {/* Background image with transition */}
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={s.bg}
                alt={t(s.titleKey)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            </div>
          ))}

          {/* Content overlay */}
          <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-lg">
              {slide.tag && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-gold text-noir text-xs font-bold tracking-wider uppercase mb-4 opacity-0 animate-fade-in-up">
                  {t(slide.tagKey!)}
                </span>
              )}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight opacity-0 animate-fade-in-up animate-delay-100">
                {t(slide.titleKey)}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 opacity-0 animate-fade-in-up animate-delay-200">
                {t(slide.subtitleKey)}
              </p>
              <button
                onClick={() => {
                  const el = document.querySelector('#categories');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-white text-noir text-sm font-bold tracking-wider uppercase hover:bg-gold hover:text-noir transition-all duration-300 inline-flex items-center gap-2 opacity-0 animate-fade-in-up animate-delay-300"
              >
                {t(slide.ctaKey)}
              </button>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute start-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold/80 transition-colors opacity-0 lg:group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute end-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold/80 transition-colors opacity-0 lg:group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-gold' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — 3 brand/spotlight banners (hidden on mobile) */}
        <div className="hidden lg:flex flex-col gap-2">
          {rightBanners.map((b, i) => (
            <button
              key={i}
              onClick={() => {
                const el = document.querySelector('#categories');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex-1 min-h-[160px] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={b.image}
                alt={t(b.labelKey)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${b.bg}`} />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="font-display text-2xl font-bold text-gold/80 group-hover:text-gold transition-colors drop-shadow-lg">
                  {t(b.labelKey)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
