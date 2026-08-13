export interface ShopProduct {
  id: number;
  name: string;
  nameEn: string;
  nameEs: string;
  nameAr: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  badge?: 'new' | 'bestseller' | 'sale';
  image: string;
}

export interface ShopCategory {
  key: string;
  image: string;
  products: ShopProduct[];
  icon?: string;
  filters?: string[];
  vehicleSelection?: boolean;
  subCategories?: { key: string; image: string; products: ShopProduct[] }[];
  brands?: { name: string; nameEn: string; nameEs: string; nameAr: string; logo: string; slug: string; productCount: number }[];
}

export const shopCategoriesData: Record<string, ShopCategory> = {
  'mode-homme': {
    key: 'shop.modeHomme',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=400&fit=crop&q=80',
    filters: ['Taille', 'Couleur', 'Matière', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'mode-homme.vetements',
        image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.tshirts',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.chemises',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.pantalons-jeans',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.shorts',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.vestes-manteaux',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.costumes',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.sweats-pulls',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.sous-vetements',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.sport',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.accessoires',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.montres',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-homme.sacs',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  'mode-femme': {
    key: 'shop.modeFemme',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&q=80',
    filters: ['Taille', 'Couleur', 'Matière', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'mode-femme.vetements',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.robes',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.tops-blouses',
        image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.chemises',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.pantalons-jeans',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.jupes',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.shorts',
        image: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.vestes-manteaux',
        image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.pulls-sweats',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.lingerie',
        image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.sport',
        image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.sacs',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.bijoux',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'mode-femme.accessoires',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  enfant: {
    key: 'shop.enfant',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=400&fit=crop&q=80',
    filters: ['Âge', 'Taille', 'Couleur', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'enfant.bebe',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.fille',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.garcon',
        image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.vetements',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.chaussures',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.pyjamas',
        image: 'https://images.unsplash.com/photo-1596460107916-430662021049?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.sport',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.cartables',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.puericulture',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'enfant.jouets',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  chaussures: {
    key: 'shop.chaussures',
    image: '/images/shop/cat-chaussures.jpg',
    filters: ['Pointure', 'Couleur', 'Marque', 'Prix', 'Matériau'],
    products: [],
    subCategories: [
      {
        key: 'chaussures.homme',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.femme',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.enfant',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.baskets',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.sneakers',
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.sport',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.ville',
        image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.bottes',
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.sandales',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.mocassins',
        image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.securite',
        image: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'chaussures.chaussons',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  maison: {
    key: 'shop.maison',
    image: '/images/shop/cat-maison.jpg',
    filters: ['Pièce', 'Style', 'Couleur', 'Matériau', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'maison.meubles',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.salon',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.chambre',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.cuisine',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.salle-de-bain',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.decoration',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.luminaires',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.rangement',
        image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.literie',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.rideaux',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.tapis',
        image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.jardin',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.electromenager',
        image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'maison.ustensiles',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  accessoires: {
    key: 'shop.accessoires',
    image: '/images/shop/cat-accessoires.jpg',
    filters: ['Couleur', 'Matériau', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'accessoires.sacs',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.portefeuilles',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.ceintures',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.lunettes',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.montres',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.bijoux',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.casquettes',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.echarpes',
        image: 'https://images.unsplash.com/photo-1601924921557-45e8e1af0014?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.gants',
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.voyage',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'accessoires.accessoires-personnels',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  telephones: {
    key: 'shop.telephones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80',
    filters: ['Marque téléphone', 'Modèle', 'Type', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'telephones.smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.reconditionne',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.coques',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.protections-ecran',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.chargeurs',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.cables',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.batteries-externes',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.supports',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.ecouteurs',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.casques',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.adaptateurs',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'telephones.tablettes',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  'parfums-cosmetiques': {
    key: 'shop.parfumsCosmetiques',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80',
    filters: ['Type de produit', 'Marque', 'Pour', 'Prix', 'Ingrédient'],
    products: [],
    subCategories: [
      {
        key: 'parfums-cosmetiques.parfums-femme',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.parfums-homme',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.unisexes',
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.maquillage',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.visage',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.corps',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.cheveux',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.hygiene',
        image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.manucure',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.coffrets',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'parfums-cosmetiques.accessoires-beaute',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  'auto-moto': {
    key: 'shop.auto',
    image: '/images/shop/cat-auto.jpg',
    filters: ['Fabricant', 'Modèle', 'Motorisation', 'Année', 'Type pièce'],
    vehicleSelection: true,
    products: [],
    subCategories: [
      {
        key: 'auto-moto.pneus',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.freinage',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.filtres',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.huiles-fluides',
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.moteur',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.embrayage-transmission',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.amortisseurs',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.direction',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.electricite',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.batteries',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.eclairage',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.climatisation',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.refroidissement',
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.echappement',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.carrosserie',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.essuie-glaces',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.roulements',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.distribution',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.accessoires-auto',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.pieces-moto',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'auto-moto.accessoires-moto',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
    brands: [
      { name: 'BMW', nameEn: 'BMW', nameEs: 'BMW', nameAr: 'بي إم دبليو', logo: 'https://img.icons8.com/color/48/bmw.png', slug: 'bmw', productCount: 245 },
      { name: 'Mercedes-Benz', nameEn: 'Mercedes-Benz', nameEs: 'Mercedes-Benz', nameAr: 'مرسيدس بنز', logo: 'https://img.icons8.com/color/48/mercedes.png', slug: 'mercedes', productCount: 312 },
      { name: 'Audi', nameEn: 'Audi', nameEs: 'Audi', nameAr: 'أودي', logo: 'https://img.icons8.com/color/48/audi.png', slug: 'audi', productCount: 198 },
      { name: 'Volkswagen', nameEn: 'Volkswagen', nameEs: 'Volkswagen', nameAr: 'فولكسواجن', logo: 'https://img.icons8.com/color/48/volkswagen.png', slug: 'volkswagen', productCount: 287 },
      { name: 'Peugeot', nameEn: 'Peugeot', nameEs: 'Peugeot', nameAr: 'بيجو', logo: 'https://img.icons8.com/color/48/peugeot.png', slug: 'peugeot', productCount: 234 },
      { name: 'Renault', nameEn: 'Renault', nameEs: 'Renault', nameAr: 'رنو', logo: 'https://img.icons8.com/color/48/renault.png', slug: 'renault', productCount: 267 },
      { name: 'Toyota', nameEn: 'Toyota', nameEs: 'Toyota', nameAr: 'تويوتا', logo: 'https://img.icons8.com/color/48/toyota.png', slug: 'toyota', productCount: 356 },
      { name: 'Honda', nameEn: 'Honda', nameEs: 'Honda', nameAr: 'هوندا', logo: 'https://img.icons8.com/color/48/honda.png', slug: 'honda', productCount: 189 },
      { name: 'Ford', nameEn: 'Ford', nameEs: 'Ford', nameAr: 'فورد', logo: 'https://img.icons8.com/color/48/ford.png', slug: 'ford', productCount: 278 },
      { name: 'Hyundai', nameEn: 'Hyundai', nameEs: 'Hyundai', nameAr: 'هيونداي', logo: 'https://img.icons8.com/color/48/hyundai.png', slug: 'hyundai', productCount: 201 },
      { name: 'Kia', nameEn: 'Kia', nameEs: 'Kia', nameAr: 'كيا', logo: 'https://img.icons8.com/color/48/kia.png', slug: 'kia', productCount: 178 },
      { name: 'Nissan', nameEn: 'Nissan', nameEs: 'Nissan', nameAr: 'نيسان', logo: 'https://img.icons8.com/color/48/nissan.png', slug: 'nissan', productCount: 223 },
      { name: 'Citroen', nameEn: 'Citroen', nameEs: 'Citroen', nameAr: 'ستروين', logo: 'https://img.icons8.com/color/48/citroen.png', slug: 'citroen', productCount: 165 },
      { name: 'Dacia', nameEn: 'Dacia', nameEs: 'Dacia', nameAr: 'داسيا', logo: 'https://img.icons8.com/color/48/dacia.png', slug: 'dacia', productCount: 143 },
      { name: 'BYD', nameEn: 'BYD', nameEs: 'BYD', nameAr: 'بي واي دي', logo: 'https://img.icons8.com/color/48/byd.png', slug: 'byd', productCount: 98 },
      { name: 'Opel', nameEn: 'Opel', nameEs: 'Opel', nameAr: 'أوبل', logo: 'https://img.icons8.com/color/48/opel.png', slug: 'opel', productCount: 176 },
      { name: 'Skoda', nameEn: 'Skoda', nameEs: 'Skoda', nameAr: 'شكودا', logo: 'https://img.icons8.com/color/48/skoda.png', slug: 'skoda', productCount: 154 },
      { name: 'Seat', nameEn: 'Seat', nameEs: 'Seat', nameAr: 'سات', logo: 'https://img.icons8.com/color/48/seat.png', slug: 'seat', productCount: 132 },
      { name: 'Fiat', nameEn: 'Fiat', nameEs: 'Fiat', nameAr: 'فيات', logo: 'https://img.icons8.com/color/48/fiat.png', slug: 'fiat', productCount: 167 },
      { name: 'Volvo', nameEn: 'Volvo', nameEs: 'Volvo', nameAr: 'فولفو', logo: 'https://img.icons8.com/color/48/volvo.png', slug: 'volvo', productCount: 145 },
      { name: 'Land Rover', nameEn: 'Land Rover', nameEs: 'Land Rover', nameAr: 'لاند روفر', logo: 'https://img.icons8.com/color/48/land-rover.png', slug: 'land-rover', productCount: 112 },
      { name: 'Porsche', nameEn: 'Porsche', nameEs: 'Porsche', nameAr: 'بورشه', logo: 'https://img.icons8.com/color/48/porsche.png', slug: 'porsche', productCount: 89 },
    ],
  },

  emballage: {
    key: 'shop.emballage',
    image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
    filters: ['Dimensions', 'Matériau', 'Type', 'Quantité', 'Résistance'],
    products: [],
    subCategories: [
      {
        key: 'emballage.cartons',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.boites',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.sachets-pochettes',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.enveloppes',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.films',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.film-etirable',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.papier-kraft',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.papier-cadeau',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f1a5?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.rubans',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f1a5?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.adhesifs',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.etiquettes',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.calage',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.bulles-d-air',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.polystyrene',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.sacs-expedition',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.emballage-alimentaire',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.emballage-cosmetique',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.emballage-industriel',
        image: 'https://images.unsplash.com/photo-1607166452427-7e4477c5e768?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'emballage.machines-emballage',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  electronique: {
    key: 'shop.electronique',
    image: '/images/shop/cat-electronique.jpg',
    filters: ['Marque', 'Type', 'Prix', 'Spécifications'],
    products: [],
    subCategories: [
      {
        key: 'electronique.ordinateurs',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.pc-portables',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.ecrans',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.claviers-souris',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.imprimantes',
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.reseau',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.wi-fi',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.cameras',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.audio',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.enceintes',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.tv',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.projecteurs',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.gaming',
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.stockage',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.composants-pc',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'electronique.cables',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  sport: {
    key: 'shop.sport',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop&q=80',
    filters: ['Sport', 'Taille', 'Marque', 'Prix', 'Niveau'],
    products: [],
    subCategories: [
      {
        key: 'sport.fitness',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.musculation',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.running',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.football',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.basketball',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.cyclisme',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.camping',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.randonnee',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.peche',
        image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.natation',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.yoga',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'sport.equipements-sportifs',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  bricolage: {
    key: 'shop.bricolage',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
    filters: ['Type outil', 'Marque', 'Prix', 'Usage'],
    products: [],
    subCategories: [
      {
        key: 'bricolage.outillage-a-main',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.outillage-electrique',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.perceuses',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.meuleuses',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.scies',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.cles-douilles',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.visserie',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.fixations',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.peinture',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.plomberie',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.electricite',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.atelier',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.rangement',
        image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bricolage.jardinage',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  animaux: {
    key: 'shop.animaux',
    image: 'https://images.unsplash.com/photo-1450778869180-e12d8520f945?w=600&h=400&fit=crop&q=80',
    filters: ['Animal', 'Type', 'Marque', 'Prix', 'Taille'],
    products: [],
    subCategories: [
      {
        key: 'animaux.chien',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.chat',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.oiseaux',
        image: 'https://images.unsplash.com/photo-1450778869180-e12d8520f945?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.poissons',
        image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.rongeurs',
        image: 'https://images.unsplash.com/photo-1425082661507-d6d2f66e40a4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.alimentation',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.hygiene',
        image: 'https://images.unsplash.com/photo-1450778869180-e12d8520f945?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.jouets',
        image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.couchage',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.transport',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'animaux.accessoires',
        image: 'https://images.unsplash.com/photo-1450778869180-e12d8520f945?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  jouets: {
    key: 'shop.jouets',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80',
    filters: ['Âge', 'Type', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'jouets.jouets-educatifs',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.jeux-de-societe',
        image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.puzzles',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.jouets-bebe',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.vehicules-jouets',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.poupees',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.peluches',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.creatif',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.exterieur',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.anniversaire',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'jouets.livres',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  bureau: {
    key: 'shop.bureau',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
    filters: ['Type', 'Marque', 'Couleur', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'bureau.papeterie',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.cahiers',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.stylos',
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.classeurs',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.impression',
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.encre-toner',
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.organisation',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.mobilier',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.informatique',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bureau.fournitures-scolaires',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  bagagerie: {
    key: 'shop.bagagerie',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
    filters: ['Taille', 'Couleur', 'Matériau', 'Marque', 'Prix'],
    products: [],
    subCategories: [
      {
        key: 'bagagerie.valises',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.sacs-a-dos',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.sacs-voyage',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.sacs-ordinateur',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.trousses',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.organisateurs',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.cadenas',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'bagagerie.accessoires-voyage',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },

  alimentation: {
    key: 'shop.alimentation',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80',
    filters: ['Type', 'Marque', 'Prix', 'Bio/Organique'],
    products: [],
    subCategories: [
      {
        key: 'alimentation.epicerie-seche',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.boissons',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.snacks',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.confiseries',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.cafe-the',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.produits-du-terroir',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.aliments-emballés',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80',
        products: [],
      },
      {
        key: 'alimentation.accessoires-cuisine',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80',
        products: [],
      },
    ],
  },
};
