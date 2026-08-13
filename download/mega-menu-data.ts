// ============================================================// UZALUS V3 — Mega-Menu 3 Niveaux (style Wish)// Données détaillées pour les sous-catégories// ============================================================

export interface MegaGroup {
  name: string;
  items: string[];
}

export interface MegaMenuDetail {
  groups: MegaGroup[];
  brands?: string[];
}

/**
 * Clé = slug de la catégorie dans shopCategoriesData
 * Valeur = groupes de sous-catégories avec leurs items
 *
 * Pour les catégories SANS données détaillées ici,
 * le navbar affiche les subCategories de shop-data.ts (comportement 2 niveaux).
 */
export const megaMenuDetails: Record<string, MegaMenuDetail> = {
  // ============================================================
  // MODE HOMME
  // ============================================================
  'mode-homme': {
    groups: [
      {
        name: 'Chemises',
        items: [
          'Chemises relax à col bouteur',
          'À carreaux',
          'Flanelle',
          'Chemises habillées',
          'Chemises à manches courtes',
          'Chemises casual',
        ],
      },
      {
        name: 'Pantalon',
        items: [
          'Cargo',
          'Chino',
          'Velours côtelé',
          'Pantalon de sport',
          'Pantalon habillé',
          'Court',
        ],
      },
      {
        name: 'Jean',
        items: [
          'Bootcut',
          'Coupe large',
          'Skinny',
          'Slim Fit',
          'Droit',
          'Déchiré',
        ],
      },
      {
        name: 'Manteaux et vestes',
        items: [
          'Blazers',
          'Bomber',
          'Doudounes',
          'Polaire',
          'Veste en jean',
          'Trench',
        ],
      },
      {
        name: 'T-shirts & Hauts',
        items: [
          'T-shirts basiques',
          'T-shirts à motifs',
          'Polo',
          'Débardeurs',
          'Cols roulés',
        ],
      },
      {
        name: 'Sweats & Pulls',
        items: [
          'Sweats à capuche',
          'Pulls en maille',
          'Cardigans',
          'Vestes en molleton',
        ],
      },
      {
        name: 'Sous-vêtements',
        items: [
          'Boxers',
          'Caleçons',
          'Chaussettes',
          'Débardeurs homme',
        ],
      },
      {
        name: 'Sport',
        items: [
          'Survêtements',
          'Shorts de sport',
          'T-shirts sport',
          'Jogging',
        ],
      },
    ],
  },

  // ============================================================
  // MODE FEMME
  // ============================================================
  'mode-femme': {
    groups: [
      {
        name: 'Robes',
        items: [
          'Par couleur',
          'Robes de fête',
          'Longues',
          'Par matière',
          'À motifs',
          'Casual',
          'Midi',
        ],
      },
      {
        name: 'Manteaux et vestes',
        items: [
          'Blazers',
          'Bomber',
          'Doudounes',
          'Capes',
          'Velours côtelé',
          'Trench-coat',
        ],
      },
      {
        name: 'Mode du monde',
        items: [
          'Abaya',
          'African',
          'Ao Dai',
          'Cheongsam',
          'Caftan',
        ],
      },
      {
        name: 'Vêtements de sport',
        items: [
          'Pantalon de sport',
          'Jogging',
          'Shorts',
          'Brassières de sport',
          'Survêtements',
        ],
      },
      {
        name: 'Tops & Blouses',
        items: [
          'T-shirts',
          'Débardeurs',
          'Chemisiers',
          'Cols roulés',
          'Hauts à motifs',
        ],
      },
      {
        name: 'Pantalons & Jeans',
        items: [
          'Jean skinny',
          'Jean large',
          'Pantalon palazzo',
          'Leggings',
          'Pantalon habillé',
          'Court',
        ],
      },
      {
        name: 'Jupes',
        items: [
          'Courte',
          'Longue',
          'Midi',
          'Plissée',
          'En jean',
        ],
      },
      {
        name: 'Lingerie',
        items: [
          'Soutiens-gorge',
          'Culottes',
          'Ensembles',
          'Nuisettes',
          'Body',
        ],
      },
    ],
  },

  // ============================================================
  // ENFANT
  // ============================================================
  enfant: {
    groups: [
      {
        name: 'Filles',
        items: [
          'Vêtements de sport',
          'Vêtements de danse',
          'Robes',
          'Sweats à capuche',
          'Vestes',
          'Jupes',
        ],
      },
      {
        name: 'Garçons',
        items: [
          'Vêtements de sport',
          'Sweats à capuche',
          'Vestes',
          'Jean',
          'Pyjamas',
          'Pantalons',
        ],
      },
      {
        name: 'Bébé',
        items: [
          'Bébé garçon',
          'Bébé fille',
          'Combinaisons',
          'Grenouillères',
          'Vêtements de nuit',
          'Bodies',
        ],
      },
      {
        name: 'Chaussures enfant',
        items: [
          'Bébé',
          'Fille',
          'Garçon',
          'Chaussures lumineuses',
          'Sandales',
        ],
      },
      {
        name: 'Puériculture',
        items: [
          'Poussettes',
          'Sièges auto',
          'Lits bébé',
          'Biberons',
          'Table à langer',
        ],
      },
    ],
  },

  // ============================================================
  // CHAUSSURES
  // ============================================================
  chaussures: {
    brands: ['Adidas', 'Nike', 'Air Jordans', 'Asics', 'Balenciaga', 'Champion', 'New Balance', 'Puma', 'Reebok', 'Converse'],
    groups: [
      {
        name: 'Femmes',
        items: [
          'Bottes',
          'Bohème',
          'Par matière',
          'Sabots',
          'Confort',
          'Escarpins',
          'Sandales',
          'Mocassins',
        ],
      },
      {
        name: 'Hommes',
        items: [
          'Bateau',
          'Bottes',
          'Décontracté',
          'Par matière',
          'Derby',
          'Mocassins',
          'Sandales',
          'Baskets',
        ],
      },
      {
        name: 'Enfants',
        items: [
          'Bébé',
          'Fille',
          'Garçon',
          'Chaussures lumineuses',
          'Sandales',
          'Bottes',
        ],
      },
      {
        name: 'Sport',
        items: [
          'Running',
          'Football',
          'Basketball',
          'Fitness',
          'Randonnée',
          'Cyclisme',
        ],
      },
    ],
  },

  // ============================================================
  // ACCESSOIRES
  // ============================================================
  accessoires: {
    groups: [
      {
        name: 'Femmes',
        items: [
          'Ceintures',
          'Cache-oreilles',
          'Gants',
          'Bijoux',
          'Lunettes de soleil',
          'Écharpes',
        ],
      },
      {
        name: 'Hommes',
        items: [
          'Boucles de ceinture',
          'Ceintures',
          'Cannes',
          'Boutons de manchette',
          'Cache-oreilles',
          'Cravates',
        ],
      },
      {
        name: 'Montres',
        items: [
          'Montres femme',
          'Montres homme',
          'Montres enfant',
          'Montres sport',
          'Montres connectées',
        ],
      },
      {
        name: 'Sacs',
        items: [
          'Sacs à dos',
          'Sacs banane',
          'Porte-documents',
          'Pochettes',
          'Sacs de plage',
        ],
      },
      {
        name: 'Filles',
        items: [
          'Charme Croc',
          'Gants',
          'Chapeaux',
          'Bijoux',
          'Sacs à main',
        ],
      },
      {
        name: 'Garçons',
        items: [
          'Ceintures',
          'Gants',
          'Chapeaux',
          'Lunettes de soleil',
          'Montres',
        ],
      },
    ],
  },

  // ============================================================
  // BRICOLAGE (≈ Outils Wish)
  // ============================================================
  bricolage: {
    brands: ['Stanley', 'Black+Decker', 'Bosch', 'DeWalt', 'Makita', 'Milwaukee', 'Husqvarna', 'Skil'],
    groups: [
      {
        name: 'Outillage à main',
        items: [
          'Outils de fixation',
          'Marteaux',
          'Outils de coupe',
          'Ciseaux et limes',
          'Pinces et étaux',
          'Pistolets à colle',
          'Clés et douilles',
          'Tournevis',
          'Niveaux et mesures',
        ],
      },
      {
        name: 'Outillage électrique',
        items: [
          'Perceuses',
          'Meuleuses',
          'Scies électriques',
          'Ponceuses',
          'Pistolets à clous',
          'Visseuses sans fil',
          'Scies sauteuses',
        ],
      },
      {
        name: 'Menuiserie',
        items: [
          'Scies à ruban',
          'Raboteuses',
          'Défonceuses',
          'Ponceuses à bois',
          'Scies circulaires',
        ],
      },
      {
        name: 'Jardinage',
        items: [
          'Taille et élagage',
          'Arrosage',
          'Outils de plantation',
          'Bêches et pelles',
          'Râteaux',
          'Tuyaux et raccords',
          'Outils neige',
        ],
      },
      {
        name: 'Rangement atelier',
        items: [
          'Boîtes à outils',
          'Caissons à outils',
          'Sacs à outils',
          'Chariots',
          'Établis',
          'Armoires de garage',
          'Chevalets de sciage',
        ],
      },
      {
        name: 'Visserie & Fixations',
        items: [
          'Vis',
          'Boulons',
          'Chevilles',
          'Clous',
          'Écrous',
          'Rondelles',
        ],
      },
      {
        name: 'Peinture',
        items: [
          'Pinceaux',
          'Rouleaux',
          'Peinture murale',
          'Peinture bois',
          'Sous-couche',
          'Lasure',
        ],
      },
      {
        name: 'Plomberie',
        items: [
          'Tuyaux',
          'Raccords',
          'Robinet',
          'Joints',
          'Outils plomberie',
        ],
      },
    ],
  },

  // ============================================================
  // ANIMAUX
  // ============================================================
  animaux: {
    groups: [
      {
        name: 'Chiens',
        items: [
          'Alimentation chien',
          'Colliers et laisses',
          'Jouets à mâcher',
          'Paniers et lits',
          'Shampoing et soins',
          'Transporteurs',
          'Vestes',
        ],
      },
      {
        name: 'Chats',
        items: [
          'Alimentation chat',
          'Bacs à litière',
          'Distributeurs automatiques',
          'Griffoirs',
          'Jouets interactifs',
          'Croquettes et pâtées',
          'Lits et igloos',
          'Gamelles',
        ],
      },
      {
        name: 'Lapins',
        items: [
          'Jouets à mâcher',
          'Cages et clapier',
          'Mangeoirs',
          'Aliments',
          'Tapis imitation herbe',
          'Harnais',
        ],
      },
      {
        name: 'Oiseaux',
        items: [
          'Cages',
          'Alimentation',
          'Jouets',
          'Perchoirs',
          'Nids',
        ],
      },
      {
        name: 'Poissons',
        items: [
          'Aquariums',
          'Pompes et filtres',
          'Alimentation',
          'Décoration aquarium',
          'Éclairage',
        ],
      },
      {
        name: 'Rongeurs',
        items: [
          'Cages',
          'Roues d\'exercice',
          'Alimentation',
          'Lits et nidification',
          'Tunnels',
        ],
      },
    ],
  },

  // ============================================================
  // AUTO-MOTO (garde les brands de shop-data.ts)
  // ============================================================
  'auto-moto': {
    groups: [
      {
        name: 'Freinage',
        items: [
          'Plaquettes de frein',
          'Disques de frein',
          'Étriers',
          'Liquide de frein',
          'Flexible de frein',
        ],
      },
      {
        name: 'Moteur',
        items: [
          'Filtres',
          'Huiles',
          'Bougies',
          'Courroies',
          'Joint de culasse',
          'Pompe à eau',
        ],
      },
      {
        name: 'Pneus',
        items: [
          'Pneus été',
          'Pneus hiver',
          'Pneus 4 saisons',
          'Jantes',
          'Valves',
        ],
      },
      {
        name: 'Électricité',
        items: [
          'Batteries',
          'Alternateurs',
          'Démarreurs',
          'Ampoules',
          'Fusibles',
        ],
      },
      {
        name: 'Carrosserie',
        items: [
          'Rétroviseurs',
          'Phares',
          'Calandres',
          'Pare-chocs',
          'Essuie-glaces',
        ],
      },
      {
        name: 'Suspension',
        items: [
          'Amortisseurs',
          'Ressorts',
          'Barres stabilisatrices',
          'Rotules',
          'Silentblocs',
        ],
      },
      {
        name: 'Pièces moto',
        items: [
          'Casques',
          'Pneus moto',
          'Chaînes',
          'Freins moto',
          'Accessoires moto',
        ],
      },
    ],
  },

  // ============================================================
  // SPORT
  // ============================================================
  sport: {
    groups: [
      {
        name: 'Fitness & Musculation',
        items: [
          'Haltères',
          'Barres et poids',
          'Bancs de musculation',
          'Élastiques',
          'Tapis de fitness',
          'Corde à sauter',
        ],
      },
      {
        name: 'Running',
        items: [
          'Chaussures de running',
          'Montres sport',
          'Brassards',
          'Sacs d\'hydratation',
          'Vêtements techniques',
        ],
      },
      {
        name: 'Football',
        items: [
          'Ballons',
          'Chaussures à crampons',
          'Protège-tibias',
          'Gants de gardien',
          'Maillots',
        ],
      },
      {
        name: 'Cyclisme',
        items: [
          'Vélos',
          'Casques',
          'Lumières',
          'Pneus et chambres à air',
          'Vêtements cyclisme',
        ],
      },
      {
        name: 'Camping & Randonnée',
        items: [
          'Tentes',
          'Sacs de couchage',
          'Sac à dos randonnée',
          'Réchauds',
          'Lampes frontales',
          'Boussoles',
        ],
      },
      {
        name: 'Pêche',
        items: [
          'Cannes à pêche',
          'Moulinets',
          'Leurres',
          'Lignes',
          'Accessoires pêche',
        ],
      },
      {
        name: 'Yoga',
        items: [
          'Tapis de yoga',
          'Blocs',
          'Sangles',
          'Coussins de méditation',
          'Vêtements yoga',
        ],
      },
    ],
  },

  // ============================================================
  // MAISON
  // ============================================================
  maison: {
    groups: [
      {
        name: 'Salon',
        items: [
          'Canapés',
          'Tables basses',
          'Meubles TV',
          'Étagères',
          'Bibliothèques',
          'Tapis',
        ],
      },
      {
        name: 'Chambre',
        items: [
          'Lits',
          'Matelas',
          'Tables de nuit',
          'Commodes',
          'Literie',
          'Veilleuses',
        ],
      },
      {
        name: 'Cuisine',
        items: [
          'Ustensiles de cuisine',
          'Casseroles et poêles',
          'Électroménager',
          'Rangement alimentaire',
          'Verres et vaisselle',
        ],
      },
      {
        name: 'Salle de bain',
        items: [
          'Serviettes',
          'Tapis de bain',
          'Organisation',
          'Accessoires',
          'Miroirs',
        ],
      },
      {
        name: 'Décoration',
        items: [
          'Cadres photo',
          'Bougies et bougeoirs',
          'Vases',
          'Coussins',
          'Rideaux',
          'Horloges murales',
        ],
      },
      {
        name: 'Luminaires',
        items: [
          'Lampes de table',
          'Plafonniers',
          'Appliques murales',
          'Bandes LED',
          'Lampadaires',
        ],
      },
      {
        name: 'Jardin',
        items: [
          'Meubles de jardin',
          'Barbecues',
          'Pots de fleurs',
          'Outils de jardin',
          'Arrosage',
        ],
      },
    ],
  },
};
