'use client';

import { useI18n } from '@/lib/i18n-context';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Beauty hero image background */}
      <div className="absolute inset-0">
        <img
          src="/images/beauty/hero-beauty.png"
          alt="UZALUS Beauty"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Gold particle accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 start-1/4 w-2 h-2 bg-gold/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 end-1/3 w-1.5 h-1.5 bg-gold/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 start-1/3 w-1 h-1 bg-gold/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 end-1/4 w-2.5 h-2.5 bg-gold/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 opacity-0 animate-fade-in-up">
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gold-shimmer tracking-[0.2em]">
            UZALUS
          </span>
          <span className="block font-elegant text-2xl sm:text-3xl text-gold/80 italic mt-2 tracking-wider">Beauté</span>
        </div>

        <div className="mb-10 opacity-0 animate-fade-in-up animate-delay-200">
          <p className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 italic max-w-3xl leading-relaxed">
            {t('hero.tagline')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-400">
          <a
            href="#products"
            className="gold-btn px-10 py-4 rounded-full text-sm sm:text-base tracking-[0.15em] uppercase font-bold inline-flex items-center justify-center"
          >
            {t('hero.cta')}
          </a>
          <a
            href="#categories"
            className="px-10 py-4 rounded-full text-sm sm:text-base tracking-[0.15em] uppercase font-medium border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 inline-flex items-center justify-center"
          >
            {t('hero.cta2')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up animate-delay-600">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}