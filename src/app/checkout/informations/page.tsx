'use client';

import { useCartStore } from '@/lib/cart-store';
import { User, Truck, Package, Shield, Lock, ShoppingBag, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

/* ------------------------------------------------------------------ */
/*  Order summary sidebar                                              */
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

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Lock size={14} className="text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground/50">Paiement 100% sécurisé</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
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
/*  Content that uses useSearchParams                                   */
/* ------------------------------------------------------------------ */
function InformationsContent() {
  const items = useCartStore(function (s) { return s.items; });
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'guest' | 'register'>('guest');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(function () {
    var m = searchParams.get('mode');
    if (m === 'register') setMode('register');
  }, [searchParams]);

  function updateField(field: string, value: string) {
    setForm(function (prev) {
      return Object.assign({}, prev, { [field]: value });
    });
  }

  function inputClass(): string {
    return 'w-full bg-noir-lighter border border-[#404040] rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors';
  }

  function labelClass(): string {
    return 'block text-sm font-semibold text-foreground mb-1.5';
  }

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
        {/* Back to checkout */}
        <Link href="/checkout" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} />
          Retour
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2">
            <div className="bg-noir-card border border-border rounded-2xl p-6 sm:p-8">
              {/* Section title */}
              <div className="flex items-center gap-2.5 mb-6">
                <User size={22} className="text-gold" />
                <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
                  {mode === 'register' ? 'Créer votre compte' : 'Vos informations'}
                </h2>
              </div>

              <div className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass()}>Prénom <span className="text-red-500">*</span></label>
                    <input type="text" className={inputClass()} placeholder="Jean" value={form.firstName} onChange={function (e) { updateField('firstName', e.target.value); }} />
                  </div>
                  <div>
                    <label className={labelClass()}>Nom <span className="text-red-500">*</span></label>
                    <input type="text" className={inputClass()} placeholder="Dupont" value={form.lastName} onChange={function (e) { updateField('lastName', e.target.value); }} />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass()}>Email <span className="text-red-500">*</span></label>
                    <input type="email" className={inputClass()} placeholder="jean@email.com" value={form.email} onChange={function (e) { updateField('email', e.target.value); }} />
                  </div>
                  <div>
                    <label className={labelClass()}>Téléphone <span className="text-red-500">*</span></label>
                    <input type="tel" className={inputClass()} placeholder="+33 6 12 34 56 78" value={form.phone} onChange={function (e) { updateField('phone', e.target.value); }} />
                  </div>
                </div>

                {/* Password fields (register mode only) */}
                {mode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass()}>Mot de passe <span className="text-red-500">*</span></label>
                      <input type="password" className={inputClass()} placeholder="••••••••" value={form.password} onChange={function (e) { updateField('password', e.target.value); }} />
                    </div>
                    <div>
                      <label className={labelClass()}>Confirmer le mot de passe <span className="text-red-500">*</span></label>
                      <input type="password" className={inputClass()} placeholder="••••••••" value={form.confirmPassword} onChange={function (e) { updateField('confirmPassword', e.target.value); }} />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={function () { window.location.href = '/checkout'; }}
                    className="flex items-center gap-2 px-6 py-3 border border-[#404040] text-foreground text-sm font-semibold rounded-lg hover:bg-noir-lighter transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Retour
                  </button>
                  <button
                    onClick={function () {
                      if (mode === 'register') {
                        alert('Compte créé avec succès ! Bienvenue sur UZALUS.');
                      } else {
                        window.location.href = '/checkout/livraison';
                      }
                    }}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-noir text-sm font-bold rounded-lg uppercase tracking-wider hover:bg-gold-light transition-colors"
                  >
                    Continuer
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
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

/* ------------------------------------------------------------------ */
/*  Page wrapper with Suspense                                          */
/* ------------------------------------------------------------------ */
export default function InformationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InformationsContent />
    </Suspense>
  );
}
