'use client';

import { useState } from 'react';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import MobileNav from '@/components/uzalus/mobile-nav';
import {
  Search,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Bot,
  ArrowLeftRight,
  Calculator,
  Code,
  Shield,
  File,
  PenTool,
  TrendingUp,
  Globe,
  ShoppingCart,
  Share2,
  Mail,
  Palette,
  Car,
  ArrowRight,
  Check,
  Lock,
  Zap,
  Monitor,
  Clock,
} from 'lucide-react';

/* Categories with icons and colors */
const categories = [
  { name: 'PDF & Documents', icon: FileText, color: 'text-purple-400', border: 'border-purple-500/30', tools: ['Fusionner PDF', 'Outil PDF', 'Compresser PDF', 'PDF en Word', 'Word en PDF', 'PDF en Email', 'JPG en PDF', 'Signer PDF'], total: 20 },
  { name: 'Images & Design', icon: ImageIcon, color: 'text-green-400', border: 'border-green-500/30', tools: ['Compresser image', 'Redimensionner image', 'Convertir JPG en PNG', 'Convertir PNG en JPG', 'Convertir WEBP en JPG', 'Convertir JPG en WEBP', 'Supprimer arrière-plan', 'Réduire image'], total: 22 },
  { name: 'Vidéo', icon: Film, color: 'text-rose-400', border: 'border-rose-500/30', tools: ['Compresser vidéo', 'Couper vidéo', 'Convertir vidéo', 'Fusionner vidéos', 'Extraire audio', 'Vidéo en GIF', 'Ajouter sous-titres', 'Vidéo en MP3'], total: 18 },
  { name: 'Audio', icon: Music, color: 'text-blue-400', border: 'border-blue-500/30', tools: ['MP4 en MP3', 'Compresser audio', 'Couper audio', 'Convertir audio', 'Fusionner audio', 'Extraire audio', 'Audio en texte', 'Vitesse audio'], total: 12 },
  { name: 'Intelligence Artificielle', icon: Bot, color: 'text-cyan-400', border: 'border-cyan-500/30', tools: ['Chat IA', 'Générer texte', 'Résumer texte', 'Image IA', 'Code IA', 'Traduction IA'], total: 8 },
  { name: 'Convertisseurs', icon: ArrowLeftRight, color: 'text-yellow-400', border: 'border-yellow-500/30', tools: ['PDF en Word', 'Word en PDF', 'JPG en PNG', 'PNG en JPG', 'MP4 en MP3', 'HEIC en JPG'], total: 15 },
];

const moreCategories = [
  { name: 'Calculateurs', icon: Calculator, color: 'text-orange-400' },
  { name: 'Développement', icon: Code, color: 'text-indigo-400' },
  { name: 'Sécurité', icon: Shield, color: 'text-red-400' },
  { name: 'Fichiers', icon: File, color: 'text-teal-400' },
  { name: 'Rédaction', icon: PenTool, color: 'text-pink-400' },
  { name: 'Marketing', icon: TrendingUp, color: 'text-amber-400' },
  { name: 'SEO', icon: Globe, color: 'text-emerald-400' },
  { name: 'E-Commerce', icon: ShoppingCart, color: 'text-violet-400' },
  { name: 'Réseaux Sociaux', icon: Share2, color: 'text-sky-400' },
  { name: 'Emails', icon: Mail, color: 'text-lime-400' },
  { name: 'Productivité', icon: Palette, color: 'text-fuchsia-400' },
  { name: 'Automobile', icon: Car, color: 'text-slate-400' },
];

const popularTools = [
  { name: 'Compresser PDF', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'JPG en PNG', icon: ImageIcon, color: 'text-green-400', bg: 'bg-green-500/10' },
  { name: 'MP4 en MP3', icon: Music, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { name: 'Mot de passe', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' },
  { name: 'Minifier CSS', icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Calculatrice', icon: Calculator, color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const recentTools = [
  { name: 'Compresser PDF', color: 'bg-purple-500' },
  { name: 'JPG en PDF', color: 'bg-green-500' },
  { name: 'Supprimer arrière-plan', color: 'bg-cyan-500' },
  { name: 'MP4 en MP3', color: 'bg-rose-500' },
  { name: 'Fusionner PDF', color: 'bg-orange-500' },
];

const advantages = [
  { icon: Check, title: '100% Gratuit', desc: 'Aucun frais cachés', color: 'text-emerald-400' },
  { icon: Lock, title: 'Sécurisé', desc: 'Vos données sont protégées', color: 'text-blue-400' },
  { icon: Zap, title: 'Rapide', desc: 'Traitement ultra-rapide', color: 'text-yellow-400' },
  { icon: Monitor, title: 'Multi-plateforme', desc: 'Fonctionne sur tous les appareils', color: 'text-purple-400' },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allSidebarCats = [...categories, ...moreCategories];

  return (
    <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">

            {/* ====== LEFT SIDEBAR ====== */}
            <aside className="hidden lg:block w-[220px] shrink-0">
              <div className="sticky top-24 bg-noir-card border border-border rounded-2xl p-4 space-y-1">
                {allSidebarCats.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        activeCategory === cat.name
                          ? 'bg-gold/10 text-gold'
                          : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} className={activeCategory === cat.name ? 'text-gold' : cat.color} />
                      {cat.name}
                    </button>
                  );
                })}
                <div className="pt-3 mt-3 border-t border-border">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase gold-btn"
                  >
                    Tous les outils
                  </button>
                </div>
              </div>
            </aside>

            {/* ====== CENTER CONTENT ====== */}
            <div className="flex-1 min-w-0">
              {/* Hero */}
              <div className="text-center mb-8">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  TOUS LES OUTILS NUMÉRIQUES
                </h1>
                <p className="font-display text-xl sm:text-2xl gold-text mb-3">
                  AU MÊME ENDROIT.
                </p>
                <p className="text-sm text-muted-foreground">
                  Gratuits, rapides, simples et en ligne. Aucune installation.
                </p>
              </div>

              {/* Search bar */}
              <div className="max-w-xl mx-auto mb-8">
                <div className="flex items-center gap-2 bg-noir-card border border-border rounded-xl px-4 py-3 focus-within:border-gold/40 transition-colors">
                  <Search size={18} className="text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Que voulez-vous faire aujourd'hui ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                  />
                  <button className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold gold-btn">
                    Rechercher
                  </button>
                </div>
              </div>

              {/* Popular tools */}
              <div className="mb-8">
                <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Outils populaires</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {popularTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={tool.name}
                        className="group flex flex-col items-center p-4 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                      >
                        <div className={`w-11 h-11 rounded-full ${tool.bg} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform`}>
                          <Icon size={20} className={tool.color} />
                        </div>
                        <span className="text-[11px] font-medium text-foreground/80 text-center group-hover:text-gold transition-colors">{tool.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ad banner placeholder */}
              <div className="mb-8 rounded-xl bg-noir-card border border-border h-20 flex items-center justify-center">
                <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">Espace publicitaire</span>
              </div>

              {/* Advantages */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {advantages.map((adv) => {
                  const Icon = adv.icon;
                  return (
                    <div key={adv.title} className="flex items-center gap-3 p-3 rounded-xl bg-noir-card border border-border">
                      <Icon size={18} className={`${adv.color} shrink-0`} />
                      <div>
                        <p className="text-xs font-bold text-foreground">{adv.title}</p>
                        <p className="text-[10px] text-muted-foreground">{adv.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* All categories with tools */}
              <div>
                <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                  Toutes les catégories, sous-catégories et outils
                </h2>
                <div className="space-y-4">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.name} className={`bg-noir-card border ${cat.border} rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(212,175,55,0.04)] transition-all`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center`}>
                            <Icon size={18} className={cat.color} />
                          </div>
                          <h3 className={`text-sm font-bold ${cat.color}`}>{cat.name}</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {cat.tools.map((tool) => (
                            <button
                              key={tool}
                              className="text-left px-3 py-2 rounded-lg text-xs text-foreground/70 hover:text-gold hover:bg-white/5 transition-all duration-200"
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                        <button className="mt-3 flex items-center gap-1 text-[11px] text-gold/70 hover:text-gold font-semibold transition-colors">
                          Voir plus ({cat.total} outils) <ArrowRight size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ====== RIGHT SIDEBAR ====== */}
            <aside className="hidden xl:block w-[220px] shrink-0">
              <div className="sticky top-24 bg-noir-card border border-border rounded-2xl p-4">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Mes outils récents</h3>
                <div className="space-y-2">
                  {recentTools.map((tool) => (
                    <div key={tool.name} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <span className={`w-2 h-2 rounded-full ${tool.color} shrink-0`} />
                      <span className="text-xs text-foreground/70 hover:text-gold transition-colors">{tool.name}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2 rounded-lg text-[11px] font-semibold border border-border text-foreground/60 hover:text-gold hover:border-gold/30 transition-all">
                  Voir tout l&apos;historique
                </button>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
      <MobileNav />
    </div>
  );
}
