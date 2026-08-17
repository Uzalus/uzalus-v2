'use client';

import { useCartStore } from '@/lib/cart-store';
import { User, UserPlus, Shield, Truck, Package, Lock, ShoppingBag, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

/* ------------------------------------------------------------------ */
/*  Order summary sidebar (compact for checkout)                       */
/* ------------------------------------------------------------------ */
function OrderSummary() {
  const items = useCartStore(function (s) { return s.items; });
  const totalItems = useCartStore(function (s) { return s.totalItems; });
  const totalPrice = useCartStore(function (s) { return s.totalPrice; });
  var shipping = totalPrice() >= 39 ? 0 : 4.99;
  var grandTotal = totalPrice() + shipping;

  return (
    <div className="bg-noir-card border border-border rounded-2xl p-5 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag size={18} className="text-gold" />
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Résumé ({totalItems()} article{totalItems() > 1 ? 's' : ''})
        </h3>
      </div>

      {/* Items list */}
      <div className="space-y-3 mb-5">
        {items.map(function (item) {
          return (
            <div key={item.pid} className="flex gap-3">
              <div className="w-14 h-16 rounded-lg overflow-hidden bg-noir-lighter shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={function (e) {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/56x64/1a1a1a/333?text=UZALUS';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/80 line-clamp-2 leading-snug">{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-muted-foreground">x{item.quantity}</span>
                  <span className="text-sm font-bold text-gold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="space-y-2.5 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sous-total</span>
          <span className="text-foreground font-semibold">{formatPrice(totalPrice())}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Livraison</span>
          <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-foreground font-semibold'}>
            {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between text-base">
          <span className="text-foreground font-bold">Total</span>
          <span className="text-gold font-bold">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Security + service icons */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Lock size={14} className="text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground/50">Paiement 100% sécurisé</span>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex flex-col items-center gap-1">
          <Truck size={18} className="text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/50">Livraison gratuite</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Shield size={18} className="text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/50">Paiement sécurisé</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Package size={18} className="text-muted-foreground/50" />
          <span className="text-[10px] text-muted-foreground/50">Retour 14 jours</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main checkout choice page                                          */
/* ------------------------------------------------------------------ */
export default function CheckoutPage() {
  const items = useCartStore(function (s) { return s.items; });

  /* Empty cart redirect */
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
      {/* Top info bar */}
      <div className="bg-noir-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-gold" />
              <span className="text-xs text-foreground/80">Livraison gratuite dès 39€</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-gold" />
              <span className="text-xs text-foreground/80">Retours gratuits sous 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-gold" />
              <span className="text-xs text-foreground/80">Paiement 100% sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to cart */}
        <Link href="/panier" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} />
          Retour au panier
        </Link>

        {/* Page title centered */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-wide uppercase font-display">
            Passer votre commande
          </h1>
          <p className="text-muted-foreground mt-2">Choisissez comment vous souhaitez commander</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: choice cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Guest card */}
              <Link href="/checkout/informations?mode=guest" className="block bg-noir-card border border-border rounded-xl p-6 hover:border-gold/40 transition-all group">
                <div className="w-14 h-14 rounded-full bg-noir-lighter border border-border flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
                  <User size={24} className="text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <h2 className="text-base font-bold text-foreground uppercase tracking-wider mb-3">
                  Commander sans inscription
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Paiement rapide, aucune création de compte nécessaire. Recevez votre confirmation par email.
                </p>
                <div className="flex items-center gap-1.5 text-gold text-sm font-bold mt-5 group-hover:gap-2.5 transition-all">
                  Continuer
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Register card */}
              <Link href="/checkout/informations?mode=register" className="block bg-noir-card border border-border rounded-xl p-6 hover:border-gold/40 transition-all group relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-gold text-noir text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                    Recommandé
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full bg-noir-lighter border border-border flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
                  <UserPlus size={24} className="text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <h2 className="text-base font-bold text-foreground uppercase tracking-wider mb-3">
                  Créer un compte
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Suivez vos commandes, créez une wishlist et profitez d&apos;offres exclusives.
                </p>
                <div className="flex items-center gap-1.5 text-gold text-sm font-bold mt-5 group-hover:gap-2.5 transition-all">
                  Continuer
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}