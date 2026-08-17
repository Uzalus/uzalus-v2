'use client';

import { useCartStore } from '@/lib/cart-store';
import { User, UserPlus, Shield, Truck, Package, Lock, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function formatPrice(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' \u20ac';
}

/* ------------------------------------------------------------------ */
/*  Guest checkout form                                                */
/* ------------------------------------------------------------------ */
function GuestForm() {
  const [step, setStep] = useState<'info' | 'shipping' | 'payment'>('info');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  function updateField(field: string, value: string) {
    setForm(function (prev) {
      return Object.assign({}, prev, { [field]: value });
    });
  }

  function inputClass(): string {
    return 'w-full bg-noir-lighter border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors';
  }

  function labelClass(): string {
    return 'block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wider';
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {['Informations', 'Livraison', 'Paiement'].map(function (label, idx) {
          var stepKeys: Array<'info' | 'shipping' | 'payment'> = ['info', 'shipping', 'payment'];
          var currentIdx = stepKeys.indexOf(step);
          var isActive = idx === currentIdx;
          var isDone = idx < currentIdx;
          return (
            <div key={label} className="flex items-center gap-3">
              <div className={
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors '
                + (isDone ? 'bg-green-600 text-white' : isActive ? 'bg-gold text-noir' : 'bg-noir-lighter text-muted-foreground border border-border')
              }>
                {isDone ? '\u2713' : (idx + 1)}
              </div>
              <span className={
                'text-xs font-semibold tracking-wide uppercase ' + (isActive ? 'text-gold' : isDone ? 'text-green-400' : 'text-muted-foreground')
              }>
                {label}
              </span>
              {idx < 2 && <div className="w-8 h-px bg-border mx-1" />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Personal info */}
      {step === 'info' && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground">Vos informations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass()}>Pr\u00e9nom *</label>
              <input type="text" className={inputClass()} placeholder="Jean" value={form.firstName} onChange={function (e) { updateField('firstName', e.target.value); }} />
            </div>
            <div>
              <label className={labelClass()}>Nom *</label>
              <input type="text" className={inputClass()} placeholder="Dupont" value={form.lastName} onChange={function (e) { updateField('lastName', e.target.value); }} />
            </div>
          </div>
          <div>
            <label className={labelClass()}>Email *</label>
            <input type="email" className={inputClass()} placeholder="jean@exemple.com" value={form.email} onChange={function (e) { updateField('email', e.target.value); }} />
          </div>
          <div>
            <label className={labelClass()}>T\u00e9l\u00e9phone</label>
            <input type="tel" className={inputClass()} placeholder="+33 6 12 34 56 78" value={form.phone} onChange={function (e) { updateField('phone', e.target.value); }} />
          </div>
          <button onClick={function () { setStep('shipping'); }} className="w-full py-3.5 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2 mt-4">
            Continuer
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 2: Shipping address */}
      {step === 'shipping' && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground">Adresse de livraison</h3>
          <div>
            <label className={labelClass()}>Adresse *</label>
            <input type="text" className={inputClass()} placeholder="12 Rue de la Paix" value={form.address} onChange={function (e) { updateField('address', e.target.value); }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass()}>Ville *</label>
              <input type="text" className={inputClass()} placeholder="Paris" value={form.city} onChange={function (e) { updateField('city', e.target.value); }} />
            </div>
            <div>
              <label className={labelClass()}>Code postal *</label>
              <input type="text" className={inputClass()} placeholder="75001" value={form.postalCode} onChange={function (e) { updateField('postalCode', e.target.value); }} />
            </div>
          </div>
          <div>
            <label className={labelClass()}>Pays</label>
            <input type="text" className={inputClass()} placeholder="France" value={form.country} onChange={function (e) { updateField('country', e.target.value); }} />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={function () { setStep('info'); }} className="flex-1 py-3.5 border border-border text-foreground text-sm font-bold rounded-full uppercase tracking-wider hover:bg-noir-lighter transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Retour
            </button>
            <button onClick={function () { setStep('payment'); }} className="flex-1 py-3.5 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
              Continuer
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 'payment' && (
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-foreground">Paiement</h3>
          <div>
            <label className={labelClass()}>Num\u00e9ro de carte *</label>
            <input type="text" className={inputClass()} placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={function (e) { updateField('cardNumber', e.target.value); }} />
          </div>
          <div>
            <label className={labelClass()}>Nom sur la carte *</label>
            <input type="text" className={inputClass()} placeholder="JEAN DUPONT" value={form.cardName} onChange={function (e) { updateField('cardName', e.target.value); }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass()}>Expiration *</label>
              <input type="text" className={inputClass()} placeholder="MM/AA" maxLength={5} value={form.cardExpiry} onChange={function (e) { updateField('cardExpiry', e.target.value); }} />
            </div>
            <div>
              <label className={labelClass()}>CVC *</label>
              <input type="text" className={inputClass()} placeholder="123" maxLength={3} value={form.cardCvc} onChange={function (e) { updateField('cardCvc', e.target.value); }} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={function () { setStep('shipping'); }} className="flex-1 py-3.5 border border-border text-foreground text-sm font-bold rounded-full uppercase tracking-wider hover:bg-noir-lighter transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Retour
            </button>
            <button onClick={function () { alert('Commande confirm\u00e9e ! Merci pour votre achat sur UZALUS.'); }} className="flex-1 py-3.5 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
              Confirmer le paiement
              <Shield size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Register form                                                      */
/* ------------------------------------------------------------------ */
function RegisterForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  function updateField(field: string, value: string) {
    setForm(function (prev) {
      return Object.assign({}, prev, { [field]: value });
    });
  }

  function inputClass(): string {
    return 'w-full bg-noir-lighter border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors';
  }

  function labelClass(): string {
    return 'block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wider';
  }

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-foreground">Cr\u00e9er votre compte</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Pr\u00e9nom *</label>
          <input type="text" className={inputClass()} placeholder="Jean" value={form.firstName} onChange={function (e) { updateField('firstName', e.target.value); }} />
        </div>
        <div>
          <label className={labelClass()}>Nom *</label>
          <input type="text" className={inputClass()} placeholder="Dupont" value={form.lastName} onChange={function (e) { updateField('lastName', e.target.value); }} />
        </div>
      </div>
      <div>
        <label className={labelClass()}>Email *</label>
        <input type="email" className={inputClass()} placeholder="jean@exemple.com" value={form.email} onChange={function (e) { updateField('email', e.target.value); }} />
      </div>
      <div>
        <label className={labelClass()}>T\u00e9l\u00e9phone</label>
        <input type="tel" className={inputClass()} placeholder="+33 6 12 34 56 78" value={form.phone} onChange={function (e) { updateField('phone', e.target.value); }} />
      </div>
      <div>
        <label className={labelClass()}>Mot de passe *</label>
        <input type="password" className={inputClass()} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={form.password} onChange={function (e) { updateField('password', e.target.value); }} />
      </div>
      <div>
        <label className={labelClass()}>Confirmer le mot de passe *</label>
        <input type="password" className={inputClass()} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={form.confirmPassword} onChange={function (e) { updateField('confirmPassword', e.target.value); }} />
      </div>
      <button onClick={function () { alert('Compte cr\u00e9\u00e9 avec succ\u00e8s ! Bienvenue sur UZALUS.'); }} className="w-full py-3.5 bg-gold text-noir text-sm font-bold rounded-full uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2 mt-4">
        Cr\u00e9er mon compte
        <UserPlus size={16} />
      </button>
      <p className="text-xs text-muted-foreground text-center">
        En cr\u00e9ant un compte, vous acceptez nos <span className="text-gold cursor-pointer hover:underline">conditions g\u00e9n\u00e9rales</span> et notre <span className="text-gold cursor-pointer hover:underline">politique de confidentialit\u00e9</span>.
      </p>
    </div>
  );
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
          R\u00e9sum\u00e9 ({totalItems()} article{totalItems() > 1 ? 's' : ''})
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

      {/* Security note */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Lock size={14} className="text-green-400" />
        <span className="text-xs text-muted-foreground">Paiement 100% s\u00e9curis\u00e9</span>
      </div>

      {/* Service icons */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex flex-col items-center gap-1">
          <Truck size={18} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Livraison gratuite</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Shield size={18} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Paiement s\u00e9curis\u00e9</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Package size={18} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Retour 14 jours</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main checkout page                                                 */
/* ------------------------------------------------------------------ */
export default function CheckoutPage() {
  const items = useCartStore(function (s) { return s.items; });
  const totalItems = useCartStore(function (s) { return s.totalItems; });
  const [mode, setMode] = useState<'choice' | 'guest' | 'register'>('choice');

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
          Retour \u00e0 la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} />
          Retour \u00e0 la boutique
        </Link>

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-wide uppercase">
            Passer votre commande
          </h1>
          <p className="text-muted-foreground mt-2">Choisissez comment vous souhaitez commander</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: checkout flow */}
          <div className="lg:col-span-2">
            {mode === 'choice' && (
              <div className="space-y-6">
                {/* Two choice cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Guest checkout card */}
                  <button
                    onClick={function () { setMode('guest'); }}
                    className="text-left bg-noir-card border border-border rounded-2xl p-6 hover:border-gold/50 transition-all group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-full bg-noir-lighter border border-border flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
                      <User size={24} className="text-gold" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2">Commander sans inscription</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Paiement rapide, aucune cr\u00e9ation de compte n\u00e9cessaire.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      Recevez votre confirmation par email.
                    </p>
                    <div className="flex items-center gap-1 text-gold text-sm font-bold mt-5 group-hover:gap-2 transition-all">
                      Continuer
                      <ArrowRight size={16} />
                    </div>
                  </button>

                  {/* Register card */}
                  <button
                    onClick={function () { setMode('register'); }}
                    className="text-left bg-noir-card border border-border rounded-2xl p-6 hover:border-gold/50 transition-all group cursor-pointer relative"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="bg-gold/20 text-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recommand\u00e9
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-noir-lighter border border-border flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
                      <UserPlus size={24} className="text-gold" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-2">Cr\u00e9er un compte</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Suivez vos commandes, cr\u00e9ez une wishlist et profitez d&apos;offres exclusives.
                    </p>
                    <div className="flex items-center gap-1 text-gold text-sm font-bold mt-5 group-hover:gap-2 transition-all">
                      Continuer
                      <ArrowRight size={16} />
                    </div>
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-t border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-800/40 flex items-center justify-center">
                      <Shield size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Paiement 100% s\u00e9curis\u00e9</p>
                      <p className="text-[10px] text-muted-foreground">Donn\u00e9es prot\u00e9g\u00e9es</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/40 flex items-center justify-center">
                      <Truck size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Livraison gratuite</p>
                      <p className="text-[10px] text-muted-foreground">D\u00e8s 39 \u20ac d&apos;achat</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-orange-900/30 border border-orange-800/40 flex items-center justify-center">
                      <Package size={18} className="text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Retour sous 14 jours</p>
                      <p className="text-[10px] text-muted-foreground">Satisfait ou rembours\u00e9</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mode === 'guest' && (
              <div>
                <button onClick={function () { setMode('choice'); }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
                  <ArrowLeft size={16} />
                  Retour au choix
                </button>
                <div className="bg-noir-card border border-border rounded-2xl p-6">
                  <GuestForm />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <button onClick={function () { setMode('choice'); }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
                  <ArrowLeft size={16} />
                  Retour au choix
                </button>
                <div className="bg-noir-card border border-border rounded-2xl p-6">
                  <RegisterForm />
                </div>
              </div>
            )}
          </div>

          {/* Right column: order summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}