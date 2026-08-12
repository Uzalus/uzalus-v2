'use client';

import { useState, useEffect, useRef } from 'react';
import { shopCategoriesData } from '@/lib/shop-data';
import { megaMenuDetails } from '@/lib/mega-menu-data';

/* ─── Noms des 18 catégories (FR) ─── */
const catNames: Record<string, string> = {
  'mode-homme': 'Mode Homme',
  'mode-femme': 'Mode Femme',
  'enfant': 'Enfant',
  'chaussures': 'Chaussures',
  'maison': 'Maison & Déco',
  'accessoires': 'Accessoires',
  'telephones': 'Téléphones',
  'parfums-cosmetiques': 'Parfums & Cosmétiques',
  'auto-moto': 'Auto & Moto',
  'emballage': 'Emballage',
  'electronique': 'Électronique',
  'sport': 'Sport',
  'bricolage': 'Bricolage & Outils',
  'animaux': 'Animaux',
  'jouets': 'Jouets',
  'bureau': 'Bureau',
  'bagagerie': 'Bagagerie',
  'alimentation': 'Alimentation',
};

/* ─── Noms des sous-catégories (FR) ─── */
const subNames: Record<string, string> = {
  'mode-homme.vetements': 'Vêtements',
  'mode-homme.tshirts': 'T-shirts',
  'mode-homme.chemises': 'Chemises',
  'mode-homme.pantalons-jeans': 'Pantalons & Jeans',
  'mode-homme.shorts': 'Shorts',
  'mode-homme.vestes-manteaux': 'Vestes & Manteaux',
  'mode-homme.costumes': 'Costumes',
  'mode-homme.sweats-pulls': 'Sweats & Pulls',
  'mode-homme.sous-vetements': 'Sous-vêtements',
  'mode-homme.sport': 'Sport',
  'mode-homme.accessoires': 'Accessoires',
  'mode-homme.montres': 'Montres',
  'mode-homme.sacs': 'Sacs',
  'mode-femme.vetements': 'Vêtements',
  'mode-femme.robes': 'Robes',
  'mode-femme.tops-blouses': 'Tops & Blouses',
  'mode-femme.chemises': 'Chemises',
  'mode-femme.pantalons-jeans': 'Pantalons & Jeans',
  'mode-femme.jupes': 'Jupes',
  'mode-femme.shorts': 'Shorts',
  'mode-femme.vestes-manteaux': 'Vestes & Manteaux',
  'mode-femme.pulls-sweats': 'Pulls & Sweats',
  'mode-femme.lingerie': 'Lingerie',
  'mode-femme.sport': 'Sport',
  'mode-femme.sacs': 'Sacs',
  'mode-femme.bijoux': 'Bijoux',
  'mode-femme.accessoires': 'Accessoires',
  'enfant.bebe': 'Bébé',
  'enfant.fille': 'Fille',
  'enfant.garcon': 'Garçon',
  'enfant.vetements': 'Vêtements',
  'enfant.chaussures': 'Chaussures',
  'enfant.pyjamas': 'Pyjamas',
  'enfant.sport': 'Sport',
  'enfant.cartables': 'Cartables',
  'enfant.puericulture': 'Puériculture',
  'enfant.jouets': 'Jouets',
  'chaussures.homme': 'Homme',
  'chaussures.femme': 'Femme',
  'chaussures.enfant': 'Enfant',
  'chaussures.baskets': 'Baskets',
  'chaussures.sneakers': 'Sneakers',
  'chaussures.sport': 'Sport',
  'chaussures.ville': 'Ville',
  'chaussures.bottes': 'Bottes',
  'chaussures.sandales': 'Sandales',
  'chaussures.mocassins': 'Mocassins',
  'chaussures.securite': 'Sécurité',
  'chaussures.chaussons': 'Chaussons',
  'maison.meubles': 'Meubles',
  'maison.salon': 'Salon',
  'maison.chambre': 'Chambre',
  'maison.cuisine': 'Cuisine',
  'maison.salle-de-bain': 'Salle de bain',
  'maison.decoration': 'Décoration',
  'maison.luminaires': 'Luminaires',
  'maison.rangement': 'Rangement',
  'maison.literie': 'Literie',
  'maison.rideaux': 'Rideaux',
  'maison.tapis': 'Tapis',
  'maison.jardin': 'Jardin',
  'maison.electromenager': 'Électroménager',
  'maison.ustensiles': 'Ustensiles',
  'accessoires.sacs': 'Sacs',
  'accessoires.portefeuilles': 'Portefeuilles',
  'accessoires.ceintures': 'Ceintures',
  'accessoires.lunettes': 'Lunettes',
  'accessoires.montres': 'Montres',
  'accessoires.bijoux': 'Bijoux',
  'accessoires.casquettes': 'Casquettes',
  'accessoires.echarpes': 'Écharpes',
  'accessoires.gants': 'Gants',
  'accessoires.voyage': 'Voyage',
  'accessoires.accessoires-personnels': 'Accessoires personnels',
  'telephones.smartphones': 'Smartphones',
  'telephones.reconditionne': 'Reconditionné',
  'telephones.coques': 'Coques',
  'telephones.protections-ecran': 'Protections écran',
  'telephones.chargeurs': 'Chargeurs',
  'telephones.cables': 'Câbles',
  'telephones.batteries-externes': 'Batteries externes',
  'telephones.supports': 'Supports',
  'telephones.ecouteurs': 'Écouteurs',
  'telephones.casques': 'Casques',
  'telephones.adaptateurs': 'Adaptateurs',
  'telephones.tablettes': 'Tablettes',
  'parfums-cosmetiques.parfums-femme': 'Parfums Femme',
  'parfums-cosmetiques.parfums-homme': 'Parfums Homme',
  'parfums-cosmetiques.unisexes': 'Unisexes',
  'parfums-cosmetiques.maquillage': 'Maquillage',
  'parfums-cosmetiques.visage': 'Soins visage',
  'parfums-cosmetiques.corps': 'Soins corps',
  'parfums-cosmetiques.cheveux': 'Cheveux',
  'parfums-cosmetiques.hygiene': 'Hygiène',
  'parfums-cosmetiques.manucure': 'Manucure',
  'parfums-cosmetiques.coffrets': 'Coffrets',
  'parfums-cosmetiques.accessoires-beaute': 'Accessoires beauté',
  'auto-moto.pneus': 'Pneus',
  'auto-moto.freinage': 'Freinage',
  'auto-moto.filtres': 'Filtres',
  'auto-moto.huiles-fluides': 'Huiles & Fluides',
  'auto-moto.moteur': 'Moteur',
  'auto-moto.embrayage-transmission': 'Embrayage & Transmission',
  'auto-moto.amortisseurs': 'Amortisseurs',
  'auto-moto.direction': 'Direction',
  'auto-moto.electricite': 'Électricité',
  'auto-moto.batteries': 'Batteries',
  'auto-moto.eclairage': 'Éclairage',
  'auto-moto.climatisation': 'Climatisation',
  'auto-moto.refroidissement': 'Refroidissement',
  'auto-moto.echappement': 'Échappement',
  'auto-moto.carrosserie': 'Carrosserie',
  'auto-moto.essuie-glaces': 'Essuie-glaces',
  'auto-moto.roulements': 'Roulements',
  'auto-moto.distribution': 'Distribution',
  'auto-moto.accessoires-auto': 'Accessoires auto',
  'auto-moto.pieces-moto': 'Pièces moto',
  'auto-moto.accessoires-moto': 'Accessoires moto',
  'emballage.cartons': 'Cartons',
  'emballage.boites': 'Boîtes',
  'emballage.sachets-pochettes': 'Sachets & Pochettes',
  'emballage.enveloppes': 'Enveloppes',
  'emballage.films': 'Films',
  'emballage.film-etirable': 'Film étirable',
  'emballage.papier-kraft': 'Papier kraft',
  'emballage.papier-cadeau': 'Papier cadeau',
  'emballage.rubans': 'Rubans',
  'emballage.adhesifs': 'Adhésifs',
  'emballage.etiquettes': 'Étiquettes',
  'emballage.calage': 'Calage',
  'emballage.bulles-d-air': 'Bulles d\'air',
  'emballage.polystyrene': 'Polystyrène',
  'emballage.sacs-expedition': 'Sacs d\'expédition',
  'emballage.emballage-alimentaire': 'Emballage alimentaire',
  'emballage.emballage-cosmetique': 'Emballage cosmétique',
  'emballage.emballage-industriel': 'Emballage industriel',
  'emballage.machines-emballage': 'Machines d\'emballage',
  'electronique.ordinateurs': 'Ordinateurs',
  'electronique.pc-portables': 'PC portables',
  'electronique.ecrans': 'Écrans',
  'electronique.claviers-souris': 'Claviers & Souris',
  'electronique.imprimantes': 'Imprimantes',
  'electronique.reseau': 'Réseau',
  'electronique.wi-fi': 'Wi-Fi',
  'electronique.cameras': 'Caméras',
  'electronique.audio': 'Audio',
  'electronique.enceintes': 'Enceintes',
  'electronique.tv': 'TV',
  'electronique.projecteurs': 'Projecteurs',
  'electronique.gaming': 'Gaming',
  'electronique.stockage': 'Stockage',
  'electronique.composants-pc': 'Composants PC',
  'electronique.cables': 'Câbles',
  'sport.fitness': 'Fitness',
  'sport.musculation': 'Musculation',
  'sport.running': 'Running',
  'sport.football': 'Football',
  'sport.basketball': 'Basketball',
  'sport.cyclisme': 'Cyclisme',
  'sport.camping': 'Camping',
  'sport.randonnee': 'Randonnée',
  'sport.peche': 'Pêche',
  'sport.natation': 'Natation',
  'sport.yoga': 'Yoga',
  'sport.equipements-sportifs': 'Équipements sportifs',
  'bricolage.outillage-a-main': 'Outillage à main',
  'bricolage.outillage-electrique': 'Outillage électrique',
  'bricolage.perceuses': 'Perceuses',
  'bricolage.meuleuses': 'Meuleuses',
  'bricolage.scies': 'Scies',
  'bricolage.cles-douilles': 'Clés & Douilles',
  'bricolage.visserie': 'Visserie',
  'bricolage.fixations': 'Fixations',
  'bricolage.peinture': 'Peinture',
  'bricolage.plomberie': 'Plomberie',
  'bricolage.electricite': 'Électricité',
  'bricolage.atelier': 'Atelier',
  'bricolage.rangement': 'Rangement',
  'bricolage.jardinage': 'Jardinage',
  'animaux.chien': 'Chiens',
  'animaux.chat': 'Chats',
  'animaux.oiseaux': 'Oiseaux',
  'animaux.poissons': 'Poissons',
  'animaux.rongeurs': 'Rongeurs',
  'animaux.alimentation': 'Alimentation',
  'animaux.hygiene': 'Hygiène',
  'animaux.jouets': 'Jouets',
  'animaux.couchage': 'Couchage',
  'animaux.transport': 'Transport',
  'animaux.accessoires': 'Accessoires',
  'jouets.jouets-educatifs': 'Jouets éducatifs',
  'jouets.jeux-de-societe': 'Jeux de société',
  'jouets.puzzles': 'Puzzles',
  'jouets.jouets-bebe': 'Jouets bébé',
  'jouets.vehicules-jouets': 'Véhicules jouets',
  'jouets.poupees': 'Poupées',
  'jouets.peluches': 'Peluches',
  'jouets.creatif': 'Créatif',
  'jouets.exterieur': 'Extérieur',
  'jouets.anniversaire': 'Anniversaire',
  'jouets.livres': 'Livres',
  'bureau.papeterie': 'Papeterie',
  'bureau.cahiers': 'Cahiers',
  'bureau.stylos': 'Stylos',
  'bureau.classeurs': 'Classeurs',
  'bureau.impression': 'Impression',
  'bureau.encre-toner': 'Encre & Toner',
  'bureau.organisation': 'Organisation',
  'bureau.mobilier': 'Mobilier',
  'bureau.informatique': 'Informatique',
  'bureau.fournitures-scolaires': 'Fournitures scolaires',
  'bagagerie.valises': 'Valises',
  'bagagerie.sacs-a-dos': 'Sacs à dos',
  'bagagerie.sacs-voyage': 'Sacs voyage',
  'bagagerie.sacs-ordinateur': 'Sacs ordinateur',
  'bagagerie.trousses': 'Trousses',
  'bagagerie.organisateurs': 'Organisateurs',
  'bagagerie.cadenas': 'Cadenas',
  'bagagerie.accessoires-voyage': 'Accessoires voyage',
  'alimentation.epicerie-seche': 'Épicerie sèche',
  'alimentation.boissons': 'Boissons',
  'alimentation.snacks': 'Snacks',
  'alimentation.confiseries': 'Confiseries',
  'alimentation.cafe-the': 'Café & Thé',
  'alimentation.produits-du-terroir': 'Produits du terroir',
  'alimentation.aliments-emballés': 'Aliments emballés',
  'alimentation.accessoires-cuisine': 'Accessoires cuisine',
};

/* ─── Liste ordonnée des slugs ─── */
const catSlugs = Object.keys(shopCategoriesData);

/* ─── Composant Navbar ─── */
export function Navbar({ onCartClick, onProfileClick }: { onCartClick?: () => void; onProfileClick?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => {
      setMegaOpen(false);
      setHoveredGroup(null);
    }, 200);
  };

  /* ─── Helper: 3-level data check ─── */
  const getDetail = (slug: string) => megaMenuDetails[slug];
  const hasDetail = (slug: string) => !!megaMenuDetails[slug];

  /* ─── Navigate to category ─── */
  const goToCategory = (slug: string, subKey?: string) => {
    window.dispatchEvent(
      new CustomEvent('open-category', {
        detail: subKey ? { slug, sub: subKey } : slug,
      })
    );
    setMegaOpen(false);
    setMobileOpen(false);
  };

  /* ─── Auto-moto brands (from shop-data) ─── */
  const autoBrands = shopCategoriesData['auto-moto']?.brands || [];

  return (
    <>
      {/* ══════ Promo bar ══════ */}
      <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] text-xs text-[#888] hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-center items-center h-9 gap-8">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Livraison gratuite dès 25€
          </span>
          <span className="w-px h-3.5 bg-[#1a1a1a]" />
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Retours sous 30 jours
          </span>
          <span className="w-px h-3.5 bg-[#1a1a1a]" />
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Paiement sécurisé
          </span>
        </div>
      </div>

      {/* ══════ Main navbar ══════ */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0B0B]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-[#1a1a1a]' : 'bg-[#0B0B0B] border-b border-[#1a1a1a]'}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white/80 hover:text-[#D4AF37] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl lg:text-2xl font-bold tracking-wider" style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #A68A2A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                UZALUS
              </span>
            </a>

            {/* Center search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6 items-center bg-[#111] border border-[#222] rounded-full px-5 py-2.5 gap-2 focus-within:border-[#D4AF37]/50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                placeholder="Rechercher sur UZALUS..."
                className="bg-transparent text-sm text-white placeholder-[#666] outline-none w-full"
              />
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-xs font-semibold text-white/80 hover:text-[#D4AF37] transition-colors tracking-wide uppercase">Accueil</a>
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <a
                  href="#shop-categories"
                  className="text-xs font-semibold text-[#D4AF37] hover:text-[#F5E6A3] transition-colors tracking-wide uppercase flex items-center gap-1"
                >
                  Boutique
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                </a>
              </div>
              <a href="#categories" className="text-xs font-semibold text-white/80 hover:text-[#D4AF37] transition-colors tracking-wide uppercase">Catégories</a>
              <a href="#promotions" className="text-xs font-semibold text-white/80 hover:text-[#D4AF37] transition-colors tracking-wide uppercase">Promos</a>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Profile */}
              <button
                onClick={onProfileClick}
                className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors"
                aria-label="Compte"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              {/* Wishlist */}
              <button className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors relative" aria-label="Favoris">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
              </button>
              {/* Cart */}
              <button
                onClick={onCartClick}
                className="p-2 text-white/80 hover:text-[#D4AF37] transition-colors relative"
                aria-label="Panier"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MEGA-MENU 3 NIVEAUX (style Wish)
            Panneau gauche: 18 catégories
            Panneau milieu: groupes de sous-catégories
            Panneau droite: items du groupe sélectionné
        ══════════════════════════════════════════════════════ */}
        {megaOpen && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-[#0d0d0d]/98 backdrop-blur-2xl border-b border-[#1a1a1a] shadow-2xl shadow-black/50"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="max-w-[1400px] mx-auto flex">
              {/* ── PANNEAU GAUCHE: 18 catégories ── */}
              <div className="w-[220px] shrink-0 border-r border-[#1a1a1a] py-4 px-2 max-h-[520px] overflow-y-auto">
                <p className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase px-3 mb-3">
                  Toutes les catégories
                </p>
                {catSlugs.map((slug) => {
                  const isActive = hoveredCat === slug;
                  return (
                    <button
                      key={slug}
                      onMouseEnter={() => {
                        setHoveredCat(slug);
                        setHoveredGroup(null);
                      }}
                      onClick={() => goToCategory(slug)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 ${
                        isActive
                          ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                          : 'text-white/60 hover:text-white hover:bg-[#111]'
                      }`}
                    >
                      <span className="text-sm font-medium truncate">{catNames[slug] || slug}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-auto shrink-0 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/15'}`}><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  );
                })}
              </div>

              {/* ── PANNEAU DROITE ── */}
              <div className="flex-1 py-6 max-h-[520px] overflow-y-auto">
                {hoveredCat && shopCategoriesData[hoveredCat] ? (
                  hasDetail(hoveredCat) ? (
                    /* ─────────────────────────────────────
                       MODE 3 NIVEAUX (données détaillées)
                       ───────────────────────────────────── */
                    <div className="flex h-full">
                      {/* Sous-panneau: liste des groupes */}
                      <div className="w-[180px] shrink-0 border-r border-[#1a1a1a] pr-4 mr-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-white text-sm">{catNames[hoveredCat]}</h3>
                          <button
                            onClick={() => goToCategory(hoveredCat)}
                            className="text-[10px] text-[#D4AF37] hover:text-[#F5E6A3] font-bold tracking-wide uppercase whitespace-nowrap"
                          >
                            Tout voir →
                          </button>
                        </div>

                        {/* Brands (si présents) */}
                        {getDetail(hoveredCat)?.brands && getDetail(hoveredCat)!.brands!.length > 0 && (
                          <div className="mb-4">
                            <p className="text-[10px] text-[#D4AF37]/80 font-bold tracking-widest uppercase mb-2">Marques</p>
                            <div className="flex flex-wrap gap-1.5">
                              {getDetail(hoveredCat)!.brands!.map((b) => (
                                <span
                                  key={b}
                                  className="px-2.5 py-1 rounded-full bg-[#111] border border-[#222] text-[11px] text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors cursor-pointer"
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Auto-moto brands (depuis shop-data) */}
                        {hoveredCat === 'auto-moto' && autoBrands.length > 0 && (
                          <div className="mb-4">
                            <p className="text-[10px] text-[#D4AF37]/80 font-bold tracking-widest uppercase mb-2">Marques</p>
                            <div className="flex flex-wrap gap-1.5">
                              {autoBrands.slice(0, 10).map((b) => (
                                <span
                                  key={b.slug}
                                  className="px-2.5 py-1 rounded-full bg-[#111] border border-[#222] text-[11px] text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors cursor-pointer"
                                >
                                  {b.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Liste des groupes */}
                        <div className="space-y-0.5">
                          {getDetail(hoveredCat)!.groups.map((group) => {
                            const isGroupActive = hoveredGroup === group.name;
                            return (
                              <button
                                key={group.name}
                                onMouseEnter={() => setHoveredGroup(group.name)}
                                onClick={() => goToCategory(hoveredCat)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                                  isGroupActive
                                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-semibold'
                                    : 'text-white/50 hover:text-white hover:bg-[#111]'
                                }`}
                              >
                                {group.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Zone principale: items du groupe sélectionné */}
                      <div className="flex-1 min-w-0">
                        {hoveredGroup && getDetail(hoveredCat)?.groups.find((g) => g.name === hoveredGroup) ? (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-bold text-white">{hoveredGroup}</h4>
                              <span className="text-[10px] text-white/30">
                                {getDetail(hoveredCat)!.groups.find((g) => g.name === hoveredGroup)!.items.length} articles
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                              {getDetail(hoveredCat)!
                                .groups.find((g) => g.name === hoveredGroup)!
                                .items.map((item) => (
                                  <button
                                    key={item}
                                    onClick={() => goToCategory(hoveredCat)}
                                    className="text-left py-1.5 text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-150 truncate"
                                  >
                                    {item}
                                  </button>
                                ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-white/20">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="mb-3 opacity-40"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                            <p className="text-sm">Survolez un groupe pour voir les détails</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* ─────────────────────────────────────
                       MODE 2 NIVEAUX (fallback standard)
                       ───────────────────────────────────── */
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-white">{catNames[hoveredCat]}</h3>
                        <button
                          onClick={() => goToCategory(hoveredCat)}
                          className="text-xs text-[#D4AF37] hover:text-[#F5E6A3] font-bold tracking-wide uppercase"
                        >
                          Tout voir →
                        </button>
                      </div>

                      {/* Auto-moto brands */}
                      {hoveredCat === 'auto-moto' && autoBrands.length > 0 && (
                        <div className="mb-5">
                          <p className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase mb-3">Marques</p>
                          <div className="flex flex-wrap gap-2">
                            {autoBrands.slice(0, 8).map((brand) => (
                              <span
                                key={brand.slug}
                                className="px-3 py-1.5 rounded-full bg-[#111] border border-[#222] text-xs text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors cursor-pointer"
                              >
                                {brand.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Subcategories grid */}
                      {shopCategoriesData[hoveredCat].subCategories && shopCategoriesData[hoveredCat].subCategories!.length > 0 ? (
                        <div className={`grid gap-x-8 gap-y-1 ${
                          shopCategoriesData[hoveredCat].subCategories!.length > 14
                            ? 'grid-cols-4'
                            : shopCategoriesData[hoveredCat].subCategories!.length > 8
                            ? 'grid-cols-3'
                            : 'grid-cols-2'
                        }`}>
                          {shopCategoriesData[hoveredCat].subCategories!.map((sub) => (
                            <button
                              key={sub.key}
                              onClick={() => goToCategory(hoveredCat, sub.key)}
                              className="text-left py-1.5 text-sm text-white/55 hover:text-[#D4AF37] transition-colors duration-150 truncate"
                            >
                              {subNames[sub.key] || sub.key.split('.').pop()?.replace(/([A-Z])/g, ' $1') || sub.key}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-white/30">Tout voir →</p>
                      )}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/20">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="mb-3 opacity-40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <p className="text-sm">Survolez une catégorie</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════ Mobile menu ══════ */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0B0B0B]/98 backdrop-blur-xl border-t border-[#1a1a1a]">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <div className="flex items-center bg-[#111] border border-[#222] rounded-full px-4 py-2.5 gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent text-sm text-white placeholder-[#666] outline-none w-full"
                />
              </div>
              <a href="/" onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/80 hover:text-[#D4AF37] transition-colors font-medium tracking-wide uppercase text-sm">Accueil</a>
              <a href="#shop-categories" onClick={() => setMobileOpen(false)} className="block py-2.5 text-[#D4AF37] transition-colors font-medium tracking-wide uppercase text-sm">Boutique</a>
              <a href="#categories" onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/80 hover:text-[#D4AF37] transition-colors font-medium tracking-wide uppercase text-sm">Catégories</a>
              <a href="#promotions" onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/80 hover:text-[#D4AF37] transition-colors font-medium tracking-wide uppercase text-sm">Promos</a>

              {/* Mobile categories */}
              <div className="pt-2 border-t border-[#1a1a1a]">
                <p className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase mb-2">Catégories</p>
                <div className="grid grid-cols-2 gap-1">
                  {catSlugs.map((slug) => (
                    <button
                      key={slug}
                      onClick={() => goToCategory(slug)}
                      className="flex items-center gap-2 py-1.5 text-white/60 hover:text-[#D4AF37] transition-colors text-xs w-full text-left"
                    >
                      {catNames[slug] || slug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
