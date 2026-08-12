'use client';

import { X, ShoppingBag } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

interface EmptyCartModalProps {
  open: boolean;
  onClose: () => void;
}

export function EmptyCartModal({ open, onClose }: EmptyCartModalProps) {
  const { t } = useI18n();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-noir-lighter border border-border rounded-2xl shadow-2xl shadow-black/50 w-[360px] max-w-[90vw] p-8 text-center animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Cart illustration */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gold/10" />
          <div className="absolute inset-2 rounded-full bg-gold/5 flex items-center justify-center">
            <ShoppingBag size={40} className="text-gold/60" />
          </div>
          {/* Sparkle dots */}
          <div className="absolute top-0 end-2 w-2 h-2 bg-gold/40 rounded-full animate-pulse" />
          <div className="absolute bottom-2 start-0 w-1.5 h-1.5 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-4 start-1 w-1 h-1 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          {t('cart.emptyTitle')}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {t('cart.emptyDesc')}
        </p>

        <button
          onClick={() => {
            onClose();
            /* future: navigate to login */
          }}
          className="gold-btn px-8 py-3 rounded-full text-sm tracking-wider uppercase font-bold"
        >
          {t('profile.signIn')}
        </button>
      </div>
    </div>
  );
}
