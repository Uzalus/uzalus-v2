'use client';

import { useI18n } from '@/lib/i18n-context';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function HeroRedesigned() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.load();
      v.play().catch(() => {
        const handleClick = () => {
          v.play().catch(() => {});
          document.removeEventListener('click', handleClick);
        };
        document.addEventListener('click', handleClick, { once: true });
      });
    }
  }, []);

  const scrollToCategories = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden h-screen lg:h-[85vh]">
      {/* LEFT SIDE — Video Background (60% desktop, full mobile) */}
      <div className="absolute inset-0 lg:w-[60%] z-0">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 hero-ken-burns ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Fallback image with Ken Burns */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoReady && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/images/hero-video-fallback.jpg"
            alt="UZALUS"
            className="w-full h-full object-cover hero-ken-burns"
          />
        </div>

        {/* Dark overlay on left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/60 to-transparent lg:bg-gradient-to-l lg:from-noir/80 lg:via-noir/60 lg:to-transparent" />
      </div>

      {/* RIGHT SIDE — Auto parts photo (40% desktop, hidden mobile) */}
      <div className="absolute inset-y-0 end-0 w-[40%] hidden lg:block z-0">
        <img
          src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=1200&fit=crop&q=80"
          alt="Auto Parts"
          className="w-full h-full object-cover hero-ken-burns"
        />
        <div className="absolute inset-0 bg-noir/40" />
      </div>

      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-[12%] start-[8%] w-1 h-1 bg-gold/30 rounded-full animate-pulse" />
        <div
          className="absolute top-[22%] end-[18%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-[38%] start-[22%] w-1 h-1 bg-gold/25 rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-[55%] end-[25%] w-2 h-2 bg-gold/15 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute top-[70%] start-[35%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute top-[18%] end-[35%] w-1 h-1 bg-gold/25 rounded-full animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-[80%] end-[12%] w-1.5 h-1.5 bg-gold/18 rounded-full animate-pulse"
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className="absolute top-[45%] start-[12%] w-1 h-1 bg-gold/22 rounded-full animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex items-center h-full">
        <div className="w-full h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 lg:px-6 py-16 lg:py-0">
            <div className="max-w-2xl lg:max-w-3xl space-y-6 lg:space-y-8">
              {/* UZALUS Logo Text */}
              <div className="opacity-0 animate-fade-in-up">
                <h1
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold gold-shimmer tracking-[0.2em]"
                >
                  UZALUS
                </h1>
              </div>

              {/* Tagline */}
              <div className="opacity-0 animate-fade-in-up animate-delay-200">
                <p className="text-lg sm:text-xl lg:text-2xl text-foreground/80 font-elegant italic max-w-xl leading-relaxed">
                  {t('hero.tagline')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-400">
                <a
                  href="#categories"
                  onClick={scrollToCategories}
                  className="gold-btn px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-bold inline-flex items-center justify-center gap-2"
                >
                  {t('hero.cta')}
                </a>
                <a
                  href="#categories"
                  onClick={scrollToCategories}
                  className="px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 inline-flex items-center justify-center"
                >
                  {t('hero.cta2')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up animate-delay-600 z-20">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          {t('hero.scroll')}
        </span>
        <ChevronDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}
