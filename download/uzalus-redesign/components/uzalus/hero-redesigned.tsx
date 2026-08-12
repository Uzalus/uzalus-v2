'use client';

import { useI18n } from '@/lib/i18n';
import { ChevronDown, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const bottomTrustItems = [
  { icon: Truck, labelKey: 'trust.delivery', fallback: 'Fast Delivery' },
  { icon: ShieldCheck, labelKey: 'trust.payment', fallback: 'Secure Payment' },
  { icon: RotateCcw, labelKey: 'trust.returns', fallback: '14 Days Returns' },
  { icon: Headphones, labelKey: 'trust.support', fallback: 'Support 24/7' },
];

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

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Fallback */}
        <div
          className={`hero-video-fallback absolute inset-0 transition-opacity duration-1000 ${
            videoReady && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/images/hero-video-fallback.jpg"
            alt="UZALUS"
            className="w-full h-full object-cover hero-ken-burns"
          />
        </div>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] start-[10%] w-1 h-1 bg-gold/30 rounded-full animate-pulse" />
        <div
          className="absolute top-[25%] end-[15%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-[40%] start-[25%] w-1 h-1 bg-gold/25 rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-[60%] end-[20%] w-2 h-2 bg-gold/15 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute top-[75%] start-[40%] w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[600px] lg:min-h-[700px]">
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-6 py-16 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
            {/* Left Side (60%) */}
            <div className="w-full lg:w-[60%]">
              <div className="space-y-6">
                {/* New Badge */}
                <div className="opacity-0 animate-fade-in-up">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-widest uppercase">
                    {t('hero.new') || 'NOUVEAUTÉ'}
                  </span>
                </div>

                {/* Heading */}
                <div className="opacity-0 animate-fade-in-up animate-delay-200">
                  <h1 className="font-elegant text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight">
                    <span className="block font-light">
                      {t('hero.discover') || 'Découvrez'}
                    </span>
                    <span className="block font-display font-bold gold-shimmer mt-2 tracking-[0.15em]">
                      UZALUS
                    </span>
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="opacity-0 animate-fade-in-up animate-delay-400">
                  <p className="font-elegant text-lg sm:text-xl lg:text-2xl text-foreground/80 italic max-w-xl leading-relaxed">
                    {t('hero.tagline')}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animate-delay-600">
                  <a
                    href="#shop-categories"
                    className="gold-btn px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-bold inline-flex items-center justify-center gap-2"
                  >
                    {t('hero.cta') || 'Découvrir maintenant'}
                  </a>
                  <a
                    href="#categories"
                    className="px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 inline-flex items-center justify-center"
                  >
                    {t('hero.cta2') || 'Nos Soins'}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side (40%) - Hidden on mobile */}
            <div className="hidden lg:flex lg:w-[40%] justify-center items-center opacity-0 animate-fade-in-up animate-delay-400">
              <div className="relative group">
                {/* Gold border glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/40 via-gold/10 to-gold/40 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-gold/30">
                  <img
                    src="/images/shop/cat-auto.jpg"
                    alt="UZALUS Auto Parts"
                    className="w-full max-w-[380px] h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-12 lg:mt-16 opacity-0 animate-fade-in-up animate-delay-600">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-10">
              {bottomTrustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.labelKey} className="flex items-center gap-2">
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                    <span className="text-xs sm:text-sm text-foreground/70">
                      {t(item.labelKey) || item.fallback}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up animate-delay-600">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          {t('hero.scroll')}
        </span>
        <ChevronDown size={20} className="text-gold animate-bounce" />
      </div>
    </section>
  );
}
