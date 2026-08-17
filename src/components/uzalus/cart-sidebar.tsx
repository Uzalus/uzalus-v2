'use client';

import { useCartStore, useWishlistStore } from '@/lib/cart-store';
import {
  X, Minus, Plus, Trash2, ShoppingBag, Heart, ArrowRight,
} from 'lucide-react';

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' \u20ac';
}

export function CartSidebar() {
  const items = useCartStore(function (s) { return s.items; });
  const isOpen = useCartStore(function (s) { return s.isOpen; });
  const close = useCartStore(function (s) { return s.close; });
  const updateQuantity = useCartStore(function (s) { return s.updateQuantity; });
  const removeItem = useCartStore(function (s) { return s.removeItem; });
  const totalItems = useCartStore(function (s) { return s.totalItems; });
  const totalPrice = useCartStore(function (s) { return s.totalPrice; });
  const clearCart = useCartStore(function (s) { return s.clearCart; });
  const wishlistCount = useWishlistStore(function (s) { return s.count; });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <div
        className={
          'fixed top-0 right-0 z-[70] h-full w-full max-w-[420px] bg-noir border-s border-border shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out '
          + (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" />
            <h2 className="text-base font-bold text-foreground tracking-wide uppercase">
              Mon Panier
            </h2>
            <span className="bg-gold text-noir text-xs font-bold px-2.5 py-0.5 rounded-full">
              {totalItems()}
            </span>
          </div>
          <button
            onClick={close}
            className="p-2 text-foreground/60 hover:text-foreground hover:bg-noir-lighter rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalPrice() < 39 && items.length > 0 && (
          <div className="px-5 py-3 bg-gold/5 border-b border-border">
            <p className="text-xs text-foreground/70 mb-2">
              Plus que <span className="text-gold font-bold">{formatPrice(39 - totalPrice())}</span> pour la livraison gratuite
            </p>
            <div className="w-full h-1.5 bg-noir-lighter rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-500"
                style={{ width: Math.min(100, (totalPrice() / 39) * 100) + '%' }}
              />
            </div>
          </div>
        )}
        {totalPrice() >= 39 && items.length > 0 && (
          <div className="px-5 py-3 bg-green-900/20 border-b border-border">
            <p className="text-xs text-green-400 font-semibold">
              ✓ Livraison gratuite applicable !
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 280px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-muted-foreground/40" />
              </div>
              <p className="text-foreground/60 text-sm mb-1">Votre panier est vide</p>
              <p className="text-muted-foreground text-xs mb-5">
                Ajoutez des articles pour commencer
              </p>
              <button
                onClick={close}
                className="px-6 py-2.5 bg-gold text-noir text-xs font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map(function (item) {
                return (
                  <div
                    key={item.pid}
                    className="flex gap-3 bg-noir-card border border-border rounded-xl p-3 group"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-noir-lighter shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={function (e) {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/80x100/1a1a1a/333?text=UZALUS';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm text-foreground/90 leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-gold">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-[11px] text-muted-foreground line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-noir-lighter border border-border rounded-lg">
                          <button
                            onClick={function () { updateQuantity(item.pid, item.quantity - 1); }}
                            className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-gold transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-semibold text-foreground w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={function () { updateQuantity(item.pid, item.quantity + 1); }}
                            className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-gold transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          onClick={function () { removeItem(item.pid); }}
                          className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with totals and checkout */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-noir border-t border-border px-5 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total ({totalItems()} articles)</span>
                <span className="text-foreground font-semibold">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span className={totalPrice() >= 39 ? 'text-green-400 font-semibold' : 'text-foreground font-semibold'}>
                  {totalPrice() >= 39 ? 'Gratuite' : '4,99 €'}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-base">
                <span className="text-foreground font-bold">Total</span>
                <span className="text-gold font-bold">
                  {formatPrice(totalPrice() + (totalPrice() >= 39 ? 0 : 4.99))}
                </span>
              </div>
            </div>

            <button
              onClick={function () {
                close();
                window.location.href = '/panier';
              }}
              className="w-full py-3.5 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              Passer la commande
              <ArrowRight size={16} />
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 py-2 text-xs text-muted-foreground hover:text-red-400 transition-colors text-center"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  );
}
