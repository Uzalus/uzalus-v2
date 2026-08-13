'use client';

import { useI18n } from '@/lib/i18n-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const circleCats = [
  { key: 'shop.modeFemme', slug: 'mode-femme', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.modeHomme', slug: 'mode-homme', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.enfant', slug: 'enfant', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.chaussures', slug: 'chaussures', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.parfumsCosmetiques', slug: 'parfums-cosmetiques', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.telephones', slug: 'telephones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.maison', slug: 'maison', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.electronique', slug: 'electronique', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.sport', slug: 'sport', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.auto', slug: 'auto-moto', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.accessoires', slug: 'accessoires', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&q=80' },
  { key: 'shop.bagagerie', slug: 'bagagerie', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=200&fit=crop&q=80' },
];

export function CategoryCircles() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const handleClick = (slug: string) => {
    window.dispatchEvent(new CustomEvent('open-category', { detail: slug }));
  };

  return (
    <section className="py-6 lg:py-8 bg-noir">
      <div className="max-w-[1400px] mx-auto px-2 relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute start-0 top-1/2 -translate-y-1/2 z-20 w-8 h-14 rounded-e-lg bg-white/90 shadow-lg flex items-center justify-center hover:bg-gold hover:text-noir transition-colors group"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} className="text-noir group-hover:text-noir" />
        </button>

        {/* Scrollable circles */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto px-5 py-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {circleCats.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
            >
              <div className="w-[72px] h-[72px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img
                  src={cat.image}
                  alt={t(cat.key)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-[11px] lg:text-xs text-foreground/70 group-hover:text-gold transition-colors font-medium text-center leading-tight max-w-[80px]">
                {t(cat.key)}
              </span>
            </button>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute end-0 top-1/2 -translate-y-1/2 z-20 w-8 h-14 rounded-s-lg bg-white/90 shadow-lg flex items-center justify-center hover:bg-gold hover:text-noir transition-colors group"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} className="text-noir group-hover:text-noir" />
        </button>
      </div>
    </section>
  );
}
