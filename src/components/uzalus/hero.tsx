'use client';

import { useI18n } from '@/lib/i18n-context';
import { ChevronDown, Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {}); // autoplay may be blocked
    }
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* <video
          ref={videoRef}
          src="/videos/uzalus-promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        /> */}
        {/* Fallback: animated beauty hero with Ken Burns effect */}
        <div className="hero-video-fallback absolute inset-0">
          <img
            src="/images/hero-video-fallback.jpg"
            alt="UZALUS"
            className="w-full h-full object-cover hero-ken-burns"
          />
        </div>
      </div>

      {/* Dark overlay with cinematic gradient */}
      <div className="hero-overlay absolute inset-0" />

      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] start-[10%] w-1 h-1 bg-gold/30 rounded-full animate-pulse" />
        <div className="absolute top-[25%] end-[15%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] start-[25%] w-1 h-1 bg-gold/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] end-[20%] w-2 h-2 bg-gold/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[75%] start-[40%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] start-[60%] w-1 h-1 bg-gold/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[85%] end-[35%] w-1 h-1 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 opacity-0 animate-fade-in-up">
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gold-shimmer tracking-[0.2em]">
            UZALUS
          </span>
          <span className="block font-elegant text-2xl sm:text-3xl text-gold/80 italic mt-2 tracking-wider">Beauté & Boutique</span>
        </div>

        <div className="mb-10 opacity-0 animate-fade-in-up animate-delay-200">
          <p className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 italic max-w-3xl leading-relaxed">
            {t('hero.tagline')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-400">
          <a
            href="#shop-categories"
            className="gold-btn px-10 py-4 rounded-full text-sm sm:text-base tracking-[0.15em] uppercase font-bold inline-flex items-center justify-center gap-2"
          >
            <Play size={16} fill="currentColor" />
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
        <span className="text-xs text-muted-foreground tracking-widest uppercase">{t('hero.scroll')}</span>
        <ChevronDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}