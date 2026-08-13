'use client';

import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   UZALUS TOOLS — Page complète des outils numériques
   Phase 1 : Schéma visuel avec 18 catégories
   ═══════════════════════════════════════════════════════════════ */

interface ToolCategory {
  slug: string;
  icon: string;
  title: string;
  color: string;
  description: string;
  tools: string[];
}

const toolCategories: ToolCategory[] = [
  {
    slug: 'pdf-documents',
    icon: '\u{1F4C4}',
    title: 'PDF & Documents',
    color: '#EF4444',
    description: 'Tous les outils PDF, OCR, signature et documents',
    tools: ['OCR', 'Signature \u00e9lectronique', 'Factures', 'Devis', 'Contrats', 'G\u00e9n\u00e9rateur de documents', 'Fusionner PDF', 'Compresser PDF', 'Splitter PDF', 'PDF \u2192 Word', 'Word \u2192 PDF', 'Prot\u00e9ger PDF'],
  },
  {
    slug: 'images-design',
    icon: '\u{1F3A8}',
    title: 'Images & Design',
    color: '#22C55E',
    description: 'Compression, conversion, arri\u00e8re-plan, logo, QR',
    tools: ['Compression', 'Conversion', 'Suppression arri\u00e8re-plan', 'Redimensionnement', 'G\u00e9n\u00e9ration IA', 'Logo', 'QR Code', 'Filigrane', 'Banni\u00e8res'],
  },
  {
    slug: 'video',
    icon: '\u{1F3A5}',
    title: 'Vid\u00e9o',
    color: '#A855F7',
    description: 'Conversion, compression, montage, GIF, sous-titres',
    tools: ['Conversion', 'Compression', 'Montage rapide', 'Cr\u00e9er GIF', 'Sous-titres', 'Extraction audio', 'Transcription'],
  },
  {
    slug: 'audio',
    icon: '\u{1F3B5}',
    title: 'Audio',
    color: '#F97316',
    description: 'Conversion, compression, d\u00e9coupage, fusion, voix',
    tools: ['Conversion', 'Compression', 'D\u00e9coupage', 'Fusion', 'Voix \u2192 Texte', 'Texte \u2192 Voix'],
  },
  {
    slug: 'ia',
    icon: '\u{1F916}',
    title: 'Intelligence Artificielle',
    color: '#8B5CF6',
    description: 'Chat IA, r\u00e9sum\u00e9, traduction, g\u00e9n\u00e9ration',
    tools: ['Chat IA', 'R\u00e9sum\u00e9', 'Traduction', 'Correction', 'G\u00e9n\u00e9ration texte', 'G\u00e9n\u00e9ration images', 'G\u00e9n\u00e9ration CV', 'Description produits', 'Assistant e-commerce'],
  },
  {
    slug: 'developpeurs',
    icon: '\u{1F4BB}',
    title: 'D\u00e9veloppeurs',
    color: '#3B82F6',
    description: 'JSON, HTML, CSS, JS, SQL, Regex, API, Base64',
    tools: ['JSON', 'HTML', 'CSS', 'JavaScript', 'SQL', 'Regex', 'API', 'Base64', 'JWT', 'UUID', 'Hash', 'Timestamp'],
  },
  {
    slug: 'calculateurs',
    icon: '\u{1F522}',
    title: 'Calculateurs',
    color: '#F59E0B',
    description: 'TVA, marge, b\u00e9n\u00e9fice, remise, salaire, pr\u00eat',
    tools: ['TVA', 'Marge', 'B\u00e9n\u00e9fice', 'Remise', 'Salaire', 'Pr\u00eat', 'Pourcentage', 'Conversion', 'Livraison', 'Prix de vente'],
  },
  {
    slug: 'convertisseurs',
    icon: '\u{1F504}',
    title: 'Convertisseurs',
    color: '#14B8A6',
    description: 'Unit\u00e9s, devises, images, documents, audio, vid\u00e9o',
    tools: ['Unit\u00e9s', 'Devises', 'Images', 'Documents', 'Audio', 'Vid\u00e9o', 'Temps', 'Poids', 'Dimensions'],
  },
  {
    slug: 'securite',
    icon: '\u{1F510}',
    title: 'S\u00e9curit\u00e9',
    color: '#10B981',
    description: 'Mots de passe, hash, QR, UUID, cl\u00e9s, v\u00e9rification',
    tools: ['G\u00e9n\u00e9rateur mots de passe', 'Analyse mot de passe', 'Hash', 'QR', 'UUID', 'Cl\u00e9s al\u00e9atoires', 'V\u00e9rification fichiers'],
  },
  {
    slug: 'business',
    icon: '\u{1F4CA}',
    title: 'Business',
    color: '#6366F1',
    description: 'Facture, devis, bon de commande, contrats, marge',
    tools: ['Facture', 'Devis', 'Bon de commande', 'Calcul marge', 'Calcul prix', 'G\u00e9n\u00e9rateur contrats', 'Documents commerciaux'],
  },
  {
    slug: 'marketing',
    icon: '\u{1F4E3}',
    title: 'Marketing',
    color: '#EC4899',
    description: 'Slogans, descriptions produits, posts, emails, SEO',
    tools: ['G\u00e9n\u00e9rateur slogans', 'Descriptions produits', 'Posts r\u00e9seaux sociaux', 'Emails marketing', 'Publicit\u00e9s', 'Hashtags', 'Titres SEO'],
  },
  {
    slug: 'seo',
    icon: '\u{1F310}',
    title: 'SEO',
    color: '#06B6D4',
    description: 'Meta title, description, mots-cl\u00e9s, sitemap, robots',
    tools: ['Meta title', 'Meta description', 'Mots-cl\u00e9s', 'Sitemap', 'Robots.txt', 'Schema.org', 'Analyse SEO', 'Contenu SEO'],
  },
  {
    slug: 'e-commerce',
    icon: '\u{1F6D2}',
    title: 'E-commerce',
    color: '#D4AF37',
    description: 'Description IA, marge, prix, SKU, code-barres, QR',
    tools: ['Description produit IA', 'Calculateur marge', 'Calculateur prix', 'G\u00e9n\u00e9rateur SKU', 'Code-barres', 'QR produit', 'Devises', 'Livraison'],
  },
  {
    slug: 'reseaux-sociaux',
    icon: '\u{1F4F1}',
    title: 'R\u00e9seaux Sociaux',
    color: '#E11D48',
    description: 'Instagram, TikTok, YouTube, Facebook, LinkedIn',
    tools: ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'LinkedIn', 'G\u00e9n\u00e9rateur posts', 'G\u00e9n\u00e9rateur hashtags'],
  },
  {
    slug: 'fichiers',
    icon: '\u{1F4C1}',
    title: 'Fichiers',
    color: '#0EA5E9',
    description: 'ZIP, d\u00e9compression, fusion, renommage, conversion',
    tools: ['ZIP', 'D\u00e9compression', 'Fusion', 'S\u00e9paration', 'Renommage', 'Compression', 'Conversion'],
  },
  {
    slug: 'emploi',
    icon: '\u{1F4BC}',
    title: 'Emploi',
    color: '#7C3AED',
    description: 'CV, lettre de motivation, profil professionnel',
    tools: ['CV', 'Lettre de motivation', 'CV \u2192 PDF', 'Profil professionnel', 'Pr\u00e9paration entretien'],
  },
  {
    slug: 'mathematiques',
    icon: '\u{1F9EE}',
    title: 'Math\u00e9matiques & \u00c9tudes',
    color: '#059669',
    description: 'Calculatrice, pourcentage, \u00e9quations, statistiques',
    tools: ['Calculatrice scientifique', 'Pourcentage', '\u00c9quations', 'Statistiques', 'Moyenne', 'Conversion scientifique'],
  },
  {
    slug: 'automobile',
    icon: '\u{1F697}',
    title: 'Automobile',
    color: '#DC2626',
    description: 'Recherche par marque, pi\u00e8ces, huiles, entretien',
    tools: ['Recherche marque', 'Mod\u00e8le', 'Ann\u00e9e', 'Motorisation', 'Pi\u00e8ces', 'Accessoires', 'Huiles', 'Entretien', 'Compatibilit\u00e9 v\u00e9hicule'],
  },
];

const steps = [
  { num: '1', title: 'Choisissez', desc: 'S\u00e9lectionnez votre outil' },
  { num: '2', title: 'Importez', desc: 'Chargez votre fichier' },
  { num: '3', title: 'Traitez', desc: 'Traitement automatique' },
  { num: '4', title: 'T\u00e9l\u00e9chargez', desc: 'R\u00e9cup\u00e9rez le r\u00e9sultat' },
];

const totalTools = toolCategories.reduce(function(sum, cat) { return sum + cat.tools.length; }, 0);

function catBg(color: string) {
  return { background: color + '15' };
}
function catBgText(color: string) {
  return { background: color + '15', color: color };
}

export function UZALUSTools({ onBack }: { onBack?: () => void }) {
  const [search, setSearch] = useState('');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = search.trim()
    ? toolCategories.filter(function(cat) {
        var q = search.toLowerCase();
        return (
          cat.title.toLowerCase().indexOf(q) >= 0 ||
          cat.description.toLowerCase().indexOf(q) >= 0 ||
          cat.tools.some(function(t) { return t.toLowerCase().indexOf(q) >= 0; })
        );
      })
    : toolCategories;

  const activeCat = activeSlug ? toolCategories.find(function(c) { return c.slug === activeSlug; }) : null;

  return (
    <div className="min-h-screen bg-[#0B0B0B]">

      {/* HEADER */}
      <div className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Retour
          </button>
          <span className="text-white/30 text-xs">UZALUS Tools v1.0</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

        {/* HERO */}
        <div className="pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">{'\u{1F9F0}'}</span>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-wider" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #A68A2A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UZALUS TOOLS</h1>
          </div>
          <p className="text-white/60 text-lg mb-3">Des outils pratiques, gratuits et rapides</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/40 mb-8">
            <span className="px-3 py-1 rounded-full bg-[#111] border border-[#222]">PDF</span>
            <span className="px-3 py-1 rounded-full bg-[#111] border border-[#222]">Images</span>
            <span className="px-3 py-1 rounded-full bg-[#111] border border-[#222]">Documents</span>
            <span className="px-3 py-1 rounded-full bg-[#111] border border-[#222]">Convertisseurs</span>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">IA</span>
          </div>

          {/* Recherche IA */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex items-center bg-[#111] border border-[#222] rounded-2xl px-5 py-3 gap-3 focus-within:border-[#D4AF37]/50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" value={search} onChange={function(e) { setSearch(e.target.value); setActiveSlug(null); }} placeholder="Que voulez-vous faire ? Ex: compresser un PDF..." className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full" />
              {search ? (
                <button onClick={function() { setSearch(''); }} className="text-white/40 hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-white/30">
            <span>{toolCategories.length} cat\u00e9gories</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{totalTools} outils</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>100% Gratuit</span>
          </div>
        </div>

        {/* ADSENSE 1 */}
        <div className="my-6">
          <div className="bg-[#111] border border-dashed border-[#222] rounded-xl h-[90px] flex items-center justify-center">
            <span className="text-white/15 text-xs tracking-widest uppercase">Espace publicitaire \u2014 Google AdSense</span>
          </div>
        </div>

        {/* DETAIL CATEGORIE ou GRILLE */}
        {activeCat ? (
          <div className="pb-10">
            <button onClick={function() { setActiveSlug(null); }} className="flex items-center gap-2 text-[#D4AF37] hover:text-[#F5E6A3] text-sm font-semibold mb-6 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Toutes les cat\u00e9gories
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={catBg(activeCat.color)}>{activeCat.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-white">{activeCat.title}</h2>
                <p className="text-white/50 text-sm">{activeCat.description}</p>
              </div>
              <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold" style={catBgText(activeCat.color)}>{activeCat.tools.length} outils</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {activeCat.tools.map(function(tool) {
                return (
                  <div key={tool} className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-[#D4AF37]/30 transition-all duration-200 group cursor-pointer">
                    <div className="text-sm text-white/70 group-hover:text-[#D4AF37] transition-colors font-medium">{tool}</div>
                    <div className="text-[10px] text-white/25 mt-1">Bient\u00f4t disponible</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filtered.map(function(cat) {
              return (
                <button key={cat.slug} onClick={function() { setActiveSlug(cat.slug); }} className="bg-[#111] border border-[#222] rounded-2xl p-5 text-left hover:border-[#D4AF37]/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={catBg(cat.color)}>{cat.icon}</div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={catBgText(cat.color)}>{cat.tools.length}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-1">{cat.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-3">{cat.description}</p>
                  <div className="space-y-1">
                    {cat.tools.slice(0, 4).map(function(tool) {
                      return <div key={tool} className="text-xs text-white/25 hover:text-white/50 transition-colors">{'\u2022'} {tool}</div>;
                    })}
                    {cat.tools.length > 4 ? (
                      <div className="text-[10px] text-[#D4AF37]/60 font-semibold pt-1">+{cat.tools.length - 4} autres...</div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ADSENSE 2 */}
        <div className="my-8">
          <div className="bg-[#111] border border-dashed border-[#222] rounded-xl h-[90px] flex items-center justify-center">
            <span className="text-white/15 text-xs tracking-widest uppercase">Espace publicitaire \u2014 Google AdSense</span>
          </div>
        </div>

        {/* COMMENT CA MARCHE */}
        <div className="py-12">
          <h2 className="text-xl font-bold text-white text-center mb-10">Comment \u00e7a marche ?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(function(step) {
              return (
                <div key={step.num} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-[#D4AF37]">{step.num}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-white/40">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADSENSE 3 */}
        <div className="my-8">
          <div className="bg-[#111] border border-dashed border-[#222] rounded-xl h-[90px] flex items-center justify-center">
            <span className="text-white/15 text-xs tracking-widest uppercase">Espace publicitaire \u2014 Google AdSense</span>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Pr\u00eat \u00e0 transformer votre workflow ?</h2>
          <p className="text-white/50 text-sm mb-6">Tous les outils dont vous avez besoin, gratuits et sans inscription.</p>
          <button onClick={function() { setActiveSlug(null); }} className="px-8 py-3 bg-[#D4AF37] text-black font-bold text-sm rounded-full hover:bg-[#F5E6A3] transition-colors">Explorer tous les outils</button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-[#1a1a1a] mt-8">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {toolCategories.slice(0, 6).map(function(cat) {
              return (
                <button key={cat.slug} onClick={function() { setActiveSlug(cat.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left">
                  <span className="text-lg">{cat.icon}</span>
                  <p className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors mt-1">{cat.title}</p>
                </button>
              );
            })}
          </div>
          <div className="border-t border-[#1a1a1a] mt-6 pt-6 text-center text-xs text-white/20">
            {'\u00A9'} 2026 UZALUS Tools. Tous droits r\u00e9serv\u00e9s.
          </div>
        </div>
      </div>

    </div>
  );
}