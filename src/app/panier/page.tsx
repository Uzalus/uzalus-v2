'use client';

import { useCartStore } from '@/lib/cart-store';
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Clock, ShieldCheck, Tag, Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

export default function PanierPage() {
  const items = useCartStore(function (s) { return s.items; });
  const totalItems = useCartStore(function (s) { return s.totalItems; });
  const totalPrice = useCartStore(function (s) { return s.totalPrice; });
  const updateQuantity = useCartStore(function (s) { return s.updateQuantity; });
  const removeItem = useCartStore(function (s) { return s.removeItem; });
  const clearCart = useCartStore(function (s) { return s.clearCart; });
  const [promoCode, setPromoCode] = useState('');

  var shipping = totalPrice() >= 39 ? 0 : 4.99;
  var grandTotal = totalPrice() + shipping;

  /* Empty cart */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-noir flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-foreground/40" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Votre panier est vide</h1>
        <p className="text-muted-foreground text-sm mb-6">Ajoutez des articles avant de passer commande</p>
        <Link href="/" className="px-8 py-3 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-gold" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-wide uppercase font-display">
              Mon Panier ({totalItems()})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
            Vider tout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Product list */}
          <div className="lg:col-span-2">
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 mb-2">
              <div className="col-span-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produit</div>
              <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Quantité</div>
              <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Total</div>
            </div>

            {/* Product rows */}
            <div className="space-y-4">
              {items.map(function (item) {
                return (
                  <div key={item.pid} className="bg-noir-card border border-border rounded-xl p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-noir-lighter shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={function (e) {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/96x96/1a1a1a/333?text=UZALUS';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm text-foreground font-semibold leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-baseline gap-2 mt-1.5">
                            <span className="text-base font-bold text-gold">{formatPrice(item.price)}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-xs text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <Truck size={14} className="text-green-400" />
                            <span className="text-xs text-green-400 font-medium">Livraison gratuite</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="sm:col-span-3 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-noir-lighter border border-border rounded-lg">
                          <button
                            onClick={function () { updateQuantity(item.pid, item.quantity - 1); }}
                            className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-gold hover:bg-noir-lighter rounded-l-lg transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-foreground w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={function () { updateQuantity(item.pid, item.quantity + 1); }}
                            className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-gold hover:bg-noir-lighter rounded-r-lg transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={function () { removeItem(item.pid); }}
                          className="ml-3 p-2 text-muted-foreground/50 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="sm:col-span-3 text-right">
                        <span className="text-base font-bold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Summary card */}
              <div className="bg-noir-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <Ticket size={20} className="text-gold" />
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Résumé de la commande</h2>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total ({totalItems()} article{totalItems() > 1 ? 's' : ''})</span>
                    <span className="text-foreground font-semibold">{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-foreground font-semibold'}>
                      {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border mb-4" />

                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-gold">{formatPrice(grandTotal)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-gold text-noir text-sm font-bold rounded-lg uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  Passer la commande
                  <ArrowRight size={16} />
                </Link>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <ShieldCheck size={14} className="text-muted-foreground/60" />
                  <span className="text-xs text-muted-foreground/60">Paiement 100% sécurisé</span>
                </div>
              </div>

              {/* Promo code card */}
              <div className="bg-noir-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <Tag size={18} className="text-gold" />
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Code promo</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTREZ VOTRE CODE"
                    value={promoCode}
                    onChange={function (e) { setPromoCode(e.target.value); }}
                    className="flex-1 bg-noir-lighter border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors uppercase tracking-wider"
                  />
                  <button className="px-5 py-3 border border-gold text-gold text-sm font-bold rounded-lg uppercase tracking-wider hover:bg-gold/10 transition-colors">
                    Appliquer
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-noir-card border border-border rounded-xl p-4 flex flex-col items-center text-center">
                  <Truck size={22} className="text-gold mb-2" />
                  <span className="text-[11px] text-foreground/80 font-medium leading-tight">Livraison gratuite</span>
                </div>
                <div className="bg-noir-card border border-border rounded-xl p-4 flex flex-col items-center text-center">
                  <Clock size={22} className="text-gold mb-2" />
                  <span className="text-[11px] text-foreground/80 font-medium leading-tight">Retour 14 jours</span>
                </div>
                <div className="bg-noir-card border border-border rounded-xl p-4 flex flex-col items-center text-center">
                  <ShieldCheck size={22} className="text-gold mb-2" />
                  <span className="text-[11px] text-foreground/80 font-medium leading-tight">Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}