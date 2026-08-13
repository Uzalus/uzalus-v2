'use client';

import { useState, useMemo } from 'react';

/* ══════════════════════════════════════════════
   UZALUS TOOLS — Page complète Phase 1
   Thème : Noir #000 + Or #D4AF37
   Tous les outils = « Bientôt disponible »
   ══════════════════════════════════════════════ */

/* ── Données des 18 catégories ── */
const categories = [
  {
    id: 'pdf', name: 'PDF & Documents', color: '#9b59b6', count: 20,
    tools: ['Fusionner PDF','Diviser PDF','Compresser PDF','PDF en Word','Word en PDF','PDF en Excel','JPG en PDF','Signer PDF','Protéger PDF','Déverrouiller PDF','PDF en PowerPoint','PowerPoint en PDF','PDF en HTML','HTML en PDF','Numériser PDF','OCR PDF','Annoter PDF','Réorganiser PDF','Watermark PDF','PDF en TIFF']
  },
  {
    id: 'images', name: 'Images & Design', color: '#27ae60', count: 22,
    tools: ['Compresser image','Redimensionner image','Convertir JPG en PNG','Convertir PNG en JPG','Convertir WEBP en JPG','Convertir JPG en WEBP','Supprimer arrière-plan','Recadrer image','Photo en filigrane','Ajouter un filigrane','Convertir SVG en PNG','Flouter image','Rotation image','Miroir image','Filtres image','Collage photo','ICO converter','BMP en JPG','TIFF en JPG','Optimizer image','Capturer écran','HEIC en JPG']
  },
  {
    id: 'video', name: 'Vidéo', color: '#e91e63', count: 18,
    tools: ['Compresser vidéo','Convertir vidéo','Couper vidéo','Fusionner vidéo','Extraire audio','Vidéo en GIF','Ajouter sous-titres','Vidéo en MP3','MP4 en WEBM','Vidéo en AVI','Réduire la résolution','Changer vitesse','Retourner vidéo','Ajouter watermark','Extraire images','GIF animé','Compresser pour YouTube','Thumbnail vidéo']
  },
  {
    id: 'audio', name: 'Audio', color: '#ff9800', count: 14,
    tools: ['Compresser audio','Convertir audio','MP4 en MP3','WAV en MP3','MP3 en WAV','Audio en MIDI','Extraire audio vidéo','Couper audio','Fusionner audio','Volume booster','Vitesse audio','Audio en texte','Texte en audio','Normaliser audio']
  },
  {
    id: 'ia', name: 'Intelligence Artificielle', color: '#00bcd4', count: 16,
    tools: ['ChatGPT clone','Générateur de texte IA','Résumé automatique','Traducteur IA','Correcteur orthographique','Générateur d\'emails','Générateur de code','Analyse de sentiment','Générateur de slogans','Générateur de noms','Générateur de bio','Générateur de posts','Générateur de FAQ','Générateur de descriptions produit','Générateur de lettres','Générateur d\'articles']
  },
  {
    id: 'convertisseurs', name: 'Convertisseurs', color: '#2196f3', count: 20,
    tools: ['JPG en PNG','PNG en JPG','WEBP en JPG','JPG en WEBP','SVG en PNG','PNG en SVG','BMP en JPG','TIFF en JPG','HEIC en JPG','AVIF en JPG','ICO en PNG','PNG en ICO','Word en PDF','PDF en Word','Excel en PDF','PDF en Excel','PPT en PDF','PDF en PPT','HTML en PDF','PDF en HTML']
  },
  {
    id: 'calculateurs', name: 'Calculateurs', color: '#ff5722', count: 18,
    tools: ['Calculatrice en ligne','Calculatrice IMC','Calcul pourcentage','Calcul TVA','Calcul marge','Convertisseur d\'unités','Calculatrice hypothécaire','Calculatrice de prêt','Calcul âge','Calcul date','Calculatrice scientifique','Compteur de mots','Compteur de caractères','Calculatrice de densité','Convertisseur de devises','Calculatrice de temps','Calculatrice binaire','Calculatrice RGB']
  },
  {
    id: 'dev', name: 'Développeur', color: '#607d8b', count: 16,
    tools: ['Formateur JSON','Minifier CSS','Minifier JS','Minifier HTML','Beautifier JSON','Beautifier CSS','Beautifier JS','HTML en JSX','JSX en HTML','Encode Base64','Decode Base64','Encode URL','Decode URL','Générateur de gradient','Générateur de box-shadow','Générateur de placeholder']
  },
  {
    id: 'securite', name: 'Sécurité', color: '#f44336', count: 14,
    tools: ['Générateur de mot de passe','Vérificateur de mot de passe','Hash MD5','Hash SHA256','Hash SHA512','Encode Base64','Decode Base64','Crypter texte','Décrypter texte','Générateur de clé API','Vérificateur de sécurité','Analyse d\'URL','Whois lookup','Vérificateur IP']
  },
  {
    id: 'fichiers', name: 'Fichiers', color: '#673ab7', count: 16,
    tools: ['Compresser ZIP','Décompresser ZIP','RAR en ZIP','7z en ZIP','Tar en ZIP','Extraire fichier','Fusionner fichiers','Diviser fichiers','Renommer en lot','Convertir fichier','Comparer fichiers','File Viewer','ZIP en RAR','Créer archive','Protéger par mot de passe','Analyser fichier']
  },
  {
    id: 'business', name: 'Business', color: '#e74c3c', count: 18,
    tools: ['Générateur de facture','Générateur de devis','Bon de commande','Reçu de paiement','Contrat de travail','Lettre de motivation','CV professionnel','Rapport d\'activité','Fiche de paie','Calcul de marge','Note de frais','PV d\'assemblée','Charte graphique','Business plan','Générateur logo','Plan comptable','Amortissement','Tableau de bord']
  },
  {
    id: 'marketing', name: 'Marketing', color: '#ff5252', count: 17,
    tools: ['Générateur de slogan','Description produit (IA)','Générateur de titres','Générateur d\'accroches','Email marketing IA','Générateur de hashtags','Idées de contenu','Analyse de concurrence','Calendrier éditorial','A/B Test calculator','ROI Calculator','Générateur meta tags','Générateur CTAs','Landing page analyzer','Générateur FAQ','Audit marketing','Brand voice']
  },
  {
    id: 'seo', name: 'SEO', color: '#009688', count: 16,
    tools: ['Générateur Meta Title','Générateur Meta Description','Analyser SEO On-Page','Analyse mots-clés','Sitemap Generator','Robots.txt Generator','Schema Validator','SEO Score Checker','Analyse de backlinks','Générateur de slug','Keyword density','Page speed test','Mobile friendly test','Redirect checker','HTTP header checker','Open graph preview']
  },
  {
    id: 'ecommerce', name: 'E-Commerce', color: '#e91e63', count: 15,
    tools: ['Générateur de nom de boutique','Calculateur de prix','Générateur de description produit','Analyseur de prix concurrent','Calculateur de frais de port','Générateur de code promo','Générateur de politique de retour','Générateur CGV','Générateur de politique de confidentialité','Calculateur de TVA','Générateur de facture','Suivi de commande','Générateur d\'étiquettes','Analyseur de tendance','Calculateur de marge bénéficiaire']
  },
  {
    id: 'reseaux', name: 'Réseaux Sociaux', color: '#2196f3', count: 14,
    tools: ['Générateur de bio Instagram','Générateur de bio TikTok','Générateur de bio Twitter/X','Planificateur de posts','Générateur de hashtags','Analyseur de profil','Générateur de story','Générateur de caption','Calculateur d\'engagement','Extracteur de vidéos','Redimensionneur d\'image','Générateur de cover','Analyseur d\'audience','Générateur de lien bio']
  },
  {
    id: 'emploi', name: 'Emploi', color: '#795548', count: 15,
    tools: ['Générateur de CV','Générateur de lettre de motivation','Générateur de profil LinkedIn','Analyseur de CV','Préparation entretien','Générateur de questions d\'entretien','Calculateur de salaire','Convertisseur de salaire','Générateur d\'offre d\'emploi','Générateur de contrat','Générateur de fiche de poste','Évaluateur de compétences','Plan de carrière','Générateur d\'email professionnel','Générateur de rapport d\'activité']
  },
  {
    id: 'maths', name: 'Mathématiques', color: '#9c27b0', count: 14,
    tools: ['Calculatrice scientifique','Résoudre équation','Grapheur de fonctions','Calculatrice matricielle','Convertisseur d\'angles','Table de multiplication','Calculatrice de fractions','Générateur de nombres aléatoires','Calculatrice de probabilités','Statistiques descriptives','Résoudre système d\'équations','Théorème de Pythagore','Calcul de PGCD/PPCM','Générateur de graphiques']
  },
  {
    id: 'auto', name: 'Automobile', color: '#455a64', count: 12,
    tools: ['Calculateur de coût de trajet','Calculateur de consommation','Convertisseur km/miles','Calculateur d\'assurance auto','Calculateur de péages','Estimation valeur véhicule','Calculateur d\'emprunt auto','Comparateur de carburants','Calculateur de CO2','Plan d\'entretien','Calculateur de vitesse moyenne','Calculateur d\'amortissement']
  },
];

/* ── 6 outils populaires ── */
const popularTools = [
  { name: 'Compresser PDF', color: '#9b59b6' },
  { name: 'JPG en PNG', color: '#27ae60' },
  { name: 'MP4 en MP3', color: '#e91e63' },
  { name: 'Mots de passe', color: '#f44336' },
  { name: 'Minifier CSS', color: '#607d8b' },
  { name: 'Calculatrice', color: '#ff5722' },
];

/* ── Icônes SVG par catégorie ── */
const CatIcon = ({ id, color, s = 20 }: { id: string; color: string; s?: number }) => {
  const icons: Record<string, JSX.Element> = {
    pdf: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    images: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    video: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    audio: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    ia: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93"/><path d="M12 2a4 4 0 00-4 4c0 1.95 1.4 3.58 3.25 3.93"/><circle cx="12" cy="14" r="4"/></svg>,
    convertisseurs: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
    calculateurs: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>,
    dev: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    securite: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    fichiers: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
    business: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    marketing: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    seo: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    ecommerce: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    reseaux: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    emploi: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    maths: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="12" r="10" opacity="0.3"/></svg>,
    auto: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14"/><path d="M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  };
  return icons[id] || null;
};

/* ── Composant principal ── */
export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const showToast = (name: string) => {
    setToast(name);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories
      .map(c => ({
        ...c,
        tools: c.tools.filter(t => t.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
      }))
      .filter(c => c.tools.length > 0);
  }, [search]);

  const totalTools = categories.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ═══ TOAST ═══ */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-xl shadow-2xl shadow-[#D4AF37]/20 animate-[slideIn_0.3s_ease]">
          Bientôt disponible : {toast}
        </div>
      )}

      {/* ═══ LAYOUT 3 COLONNES ═══ */}
      <div className="flex min-h-screen">

        {/* ──── SIDEBAR GAUCHE ──── */}
        <aside className="hidden xl:block w-[230px] shrink-0 bg-[#0a0a0a] border-r border-[#1a1a1a] sticky top-0 h-screen overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">Catégories</span>
            </div>
            <nav className="space-y-0.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCat(cat.id);
                    const el = document.getElementById('cat-' + cat.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150 ' + (
                    activeCat === cat.id
                      ? 'bg-white/5 text-white font-semibold'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                  )}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
              <button
                onClick={() => { setActiveCat(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-center text-black transition-colors"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Tous les outils
              </button>
            </div>
          </div>
        </aside>

        {/* ──── CONTENU PRINCIPAL ──── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* ════════ HERO ════════ */}
            <div className="text-center mb-8 pt-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                <span className="text-white">Tous les outils numériques</span>
                <br />
                <span style={{ color: '#D4AF37' }}>au même endroit.</span>
              </h1>
              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
                Gratuits, rapides, simples et en ligne. Aucune installation.
              </p>
            </div>

            {/* ════════ BARRE DE RECHERCHE ════════ */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg shadow-white/5">
                <div className="flex items-center gap-3 flex-1 px-5 py-3.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Que voulez-vous faire aujourd'hui ?"
                    className="flex-1 bg-transparent text-black text-sm placeholder-gray-400 outline-none"
                  />
                </div>
                <button
                  className="px-6 py-3.5 font-bold text-sm text-black shrink-0 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Rechercher
                </button>
              </div>
            </div>

            {/* ════════ 6 OUTILS POPULAIRES ════════ */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4">Outils populaires</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {popularTools.map((tool, i) => (
                  <button
                    key={i}
                    onClick={() => showToast(tool.name)}
                    className="flex flex-col items-center gap-3 bg-white rounded-2xl p-5 hover:shadow-xl hover:shadow-white/10 transition-all duration-200 hover:-translate-y-1 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: tool.color + '18' }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tool.color }} />
                    </div>
                    <span className="text-xs font-medium text-gray-800 text-center leading-tight">{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ ADSENSE SLOT 1 ═══ */}
            <div className="mb-8">
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 text-center">
                <p className="text-white/20 text-xs">Google AdSense</p>
              </div>
            </div>

            {/* ════════ 4 BADGES FEATURES ════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {[
                { icon: 'check', title: '100% Gratuit', sub: 'Sans inscription' },
                { icon: 'shield', title: 'Sécurisé', sub: 'Vos fichiers sont protégés' },
                { icon: 'bolt', title: 'Rapide', sub: 'Traitement ultra-rapide' },
                { icon: 'screen', title: 'Multi-plateforme', sub: 'Fonctionne sur tous appareils' },
              ].map((b, i) => (
                <div key={i} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#D4AF37' + '18' }}>
                    {b.icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    {b.icon === 'shield' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    {b.icon === 'bolt' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
                    {b.icon === 'screen' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{b.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ════════ TITRE SECTION CATÉGORIES ════════ */}
            <div className="mb-6">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                Toutes les catégories, sous-catégories et outils
              </h2>
            </div>

            {/* ════════ GRILLE 18 CATÉGORIES ════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredCategories.map(cat => (
                <div
                  key={cat.id}
                  id={'cat-' + cat.id}
                  className="bg-[#111] rounded-xl border border-[#1a1a1a] overflow-hidden hover:border-[#222] transition-colors duration-200 group"
                  style={{ borderTopColor: cat.color, borderTopWidth: '2px' }}
                >
                  {/* Header carte */}
                  <div className="p-4 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cat.color + '20' }}
                      >
                        <CatIcon id={cat.id} color={cat.color} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">{cat.name}</h3>
                        <p className="text-[11px] text-white/30">{cat.count} outils</p>
                      </div>
                    </div>
                  </div>

                  {/* Liste outils */}
                  <div className="px-4 pb-2">
                    <div className="space-y-0.5">
                      {cat.tools.slice(0, 8).map((tool, i) => (
                        <button
                          key={i}
                          onClick={() => showToast(tool)}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-100 group/item"
                        >
                          <span className="w-1 h-1 rounded-full shrink-0 opacity-40" style={{ backgroundColor: cat.color }} />
                          <span className="truncate">{tool}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => showToast(cat.name)}
                      className="text-[11px] font-semibold hover:underline transition-colors"
                      style={{ color: cat.color }}
                    >
                      Voir plus ({cat.count} outils)
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Si recherche sans résultat */}
            {filteredCategories.length === 0 && search.trim() && (
              <div className="text-center py-16">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <p className="text-white/40 text-sm">Aucun outil trouvé pour « {search} »</p>
              </div>
            )}

            {/* ═══ ADSENSE SLOT 2 ═══ */}
            <div className="mb-10">
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 text-center">
                <p className="text-white/20 text-xs">Google AdSense</p>
              </div>
            </div>

            {/* ════════ BARRE DE STATS ════════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { value: '18', label: 'Catégories' },
                { value: (totalTools) + '+', label: 'Outils gratuits' },
                { value: '0', label: 'Inscription requise' },
                { value: '100%', label: 'En ligne' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 text-center">
                  <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{s.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ════════ SÉCURITÉ + AVANTAGES + COMMENT ÇA MARCHE ════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

              {/* Comment ça marche */}
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Comment ça marche</h3>
                <div className="space-y-2.5">
                  {['Sélectionnez un outil','Uploadez votre fichier','Traitement automatique','Téléchargez le résultat'].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-black" style={{ backgroundColor: '#D4AF37' }}>
                        {i + 1}
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sécurité */}
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Sécurité & Confidentialité</h3>
                <div className="space-y-2.5">
                  {[
                    'Fichiers supprimés automatiquement',
                    'Aucun fichier stocké définitivement',
                    'Connexion sécurisée SSL / HTTPS',
                    'Vos fichiers ne sont jamais partagés',
                    'Respect total de la vie privée',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      <p className="text-xs text-white/50 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avantages */}
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-4">Avantages</h3>
                <div className="space-y-2.5">
                  {[
                    'Rapide et stable',
                    'Peut supporter des millions d\'utilisateurs',
                    'Pas de bug même en forte charge',
                    'Solide et fiable',
                    'Entièrement sécurisé',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      <p className="text-xs text-white/50 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ ADSENSE SLOT 3 ═══ */}
            <div className="mb-10">
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 text-center">
                <p className="text-white/20 text-xs">Google AdSense</p>
              </div>
            </div>

            {/* ════════ 3 BADGES FOOTER ════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { title: '100% Gratuit pour tous', sub: 'Aucune limite pour la majorité des outils.', color: '#3498db' },
                { title: 'Vos fichiers sont en sécurité', sub: 'Suppression automatique après traitement.', color: '#D4AF37' },
                { title: 'Rapide et puissant', sub: 'Technologie avancée pour un résultat instantané.', color: '#3498db' },
              ].map((b, i) => (
                <div key={i} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: b.color + '20' }}>
                    {i === 0 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={b.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    {i === 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={b.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
                    {i === 2 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={b.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{b.title}</p>
                    <p className="text-[11px] text-white/40 mt-1 leading-relaxed">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* ──── SIDEBAR DROITE ──── */}
        <aside className="hidden xl:block w-[250px] shrink-0 bg-[#0a0a0a] border-l border-[#1a1a1a] sticky top-0 h-screen overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/60 mb-4">Mes outils récents</h3>
            <div className="space-y-1">
              {[
                { name: 'Compresser PDF', time: 'Il y a 2 minutes', color: '#9b59b6' },
                { name: 'JPG en PDF', time: 'Il y a 5 minutes', color: '#27ae60' },
                { name: 'Supprimer arrière-plan', time: 'Il y a 1 heure', color: '#00bcd4' },
                { name: 'MP4 en MP3', time: 'Il y a 2 heures', color: '#e91e63' },
                { name: 'Fusionner PDF', time: 'Hier', color: '#ff9800' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => showToast(item.name)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '20' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/70 group-hover:text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-white/25">{item.time}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* AdSense sidebar */}
            <div className="mt-6 mb-4">
              <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-3 text-center">
                <p className="text-white/20 text-[10px]">Google AdSense</p>
              </div>
            </div>

            <button
              onClick={() => showToast('Historique')}
              className="w-full py-2.5 rounded-lg border border-[#222] text-xs text-white/40 hover:text-white hover:border-[#333] transition-colors text-center"
            >
              {"Voir tout l\'historique"}
            </button>
          </div>
        </aside>
      </div>

      {/* ═══ STYLE ANIMATION TOAST ═══ */}
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}