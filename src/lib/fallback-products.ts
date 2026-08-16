// 100 produits populaires UZALUS — fallback quand l'API CJ n'est pas configurée
// Images réelles, prix réalistes dropshipping EUR, toutes niches mélangées

export interface FallbackProduct {
  pid: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number;
  comments: number;
  slug: string;
}

export const fallbackProducts: FallbackProduct[] = [
  // === TÉLÉPHONES & ACCESSOIRES (telephones) ===
  { pid: 'fb-t1', name: 'Écouteurs Bluetooth TWS Pro', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9c3d13b42f9f.jpg', price: 19.99, oldPrice: 39.99, discount: 50, rating: 4.7, comments: 2341, slug: 'telephones' },
  { pid: 'fb-t2', name: 'Montre Connectée Sport X6', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7b16262ff9f.jpg', price: 29.99, oldPrice: 59.99, discount: 50, rating: 4.5, comments: 1876, slug: 'telephones' },
  { pid: 'fb-t3', name: 'Coque iPhone Luxe Magnétique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a89c03396f9b.jpg', price: 8.99, oldPrice: 19.99, discount: 55, rating: 4.3, comments: 987, slug: 'telephones' },
  { pid: 'fb-t4', name: 'Chargeur Magnétique 15W Rapide', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cf862fd51640.jpeg', price: 14.99, oldPrice: 27.99, discount: 46, rating: 4.6, comments: 1543, slug: 'telephones' },
  { pid: 'fb-t5', name: 'Câble USB-C Rapide 2m', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f5256b782578.jpg', price: 6.99, oldPrice: 12.99, discount: 46, rating: 4.4, comments: 2103, slug: 'telephones' },
  { pid: 'fb-t6', name: 'Support Voiture Magnétique 360°', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1ce979985e13.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.5, comments: 1342, slug: 'telephones' },

  // === PARFUMS & COSMÉTIQUES ===
  { pid: 'fb-p1', name: 'Sérum Vitamine C Anti-âge', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9aa5db2e6bb1.jpg', price: 12.99, oldPrice: 29.99, discount: 57, rating: 4.8, comments: 3456, slug: 'parfums-cosmetiques' },
  { pid: 'fb-p2', name: 'Parfum Femme Élégant 50ml', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3a5b65f9829c.jpg', price: 18.99, oldPrice: 45.99, discount: 59, rating: 4.7, comments: 2789, slug: 'parfums-cosmetiques' },
  { pid: 'fb-p3', name: 'Parfum Homme Boisé 50ml', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fb9d585d0270.jpg', price: 16.99, oldPrice: 39.99, discount: 58, rating: 4.6, comments: 1987, slug: 'parfums-cosmetiques' },
  { pid: 'fb-p4', name: 'Kit Pinceaux Maquillage Pro 15pcs', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7af670af2962.jpg', price: 9.99, oldPrice: 24.99, discount: 60, rating: 4.5, comments: 1654, slug: 'parfums-cosmetiques' },
  { pid: 'fb-p5', name: 'Crème Hydratante Acide Hyaluronique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ee386443a9a5.jpg', price: 14.99, oldPrice: 32.99, discount: 55, rating: 4.7, comments: 2234, slug: 'parfums-cosmetiques' },
  { pid: 'fb-p6', name: 'Rouge à Lèvres Matte Longue Tenue', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/beae06372242.jpg', price: 7.99, oldPrice: 16.99, discount: 53, rating: 4.4, comments: 1432, slug: 'parfums-cosmetiques' },

  // === MODE FEMME ===
  { pid: 'fb-mf1', name: 'Robe Élégante Été Fleuri', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2703fc7a8a62.jpeg', price: 24.99, oldPrice: 54.99, discount: 55, rating: 4.6, comments: 1876, slug: 'mode-femme' },
  { pid: 'fb-mf2', name: 'Sac à Main Cuir Véritable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3a8ecdd735f1.jpg', price: 29.99, oldPrice: 64.99, discount: 54, rating: 4.8, comments: 2134, slug: 'mode-femme' },
  { pid: 'fb-mf3', name: 'Ensemble Sport Femme Chic', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b8031ec1e060.jpg', price: 22.99, oldPrice: 44.99, discount: 49, rating: 4.5, comments: 1567, slug: 'mode-femme' },
  { pid: 'fb-mf4', name: 'Top Crop Satin Élégant', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/38452aa16a0d.webp', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.3, comments: 987, slug: 'mode-femme' },
  { pid: 'fb-mf5', name: 'Bikini Mode Plage Été', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/38fae1f89a11.jpg', price: 16.99, oldPrice: 34.99, discount: 51, rating: 4.4, comments: 1234, slug: 'mode-femme' },
  { pid: 'fb-mf6', name: 'Jupe Longue Plissée Élégante', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d847862feee.jpeg', price: 19.99, oldPrice: 42.99, discount: 53, rating: 4.6, comments: 1089, slug: 'mode-femme' },

  // === MODE HOMME ===
  { pid: 'fb-mh1', name: 'Chemise Homme Slim Fit Premium', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d62becfdddea.jpg', price: 19.99, oldPrice: 42.99, discount: 53, rating: 4.5, comments: 1654, slug: 'mode-homme' },
  { pid: 'fb-mh2', name: 'Montre Homme Acier Inoxydable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/796c9ac12ea1.jpg', price: 34.99, oldPrice: 69.99, discount: 50, rating: 4.7, comments: 2345, slug: 'mode-homme' },
  { pid: 'fb-mh3', name: 'T-shirt Homme Coton Bio', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9a61250e8399.jpg', price: 12.99, oldPrice: 24.99, discount: 48, rating: 4.4, comments: 1432, slug: 'mode-homme' },
  { pid: 'fb-mh4', name: 'Veste Homme Coupe-vent Sport', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/def8a8fa1c3c.jpg', price: 39.99, oldPrice: 79.99, discount: 50, rating: 4.6, comments: 1876, slug: 'mode-homme' },
  { pid: 'fb-mh5', name: 'Pantalon Chino Homme Stretch', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ef7d4d717bca.jpg', price: 22.99, oldPrice: 44.99, discount: 49, rating: 4.5, comments: 1234, slug: 'mode-homme' },
  { pid: 'fb-mh6', name: 'Portefeuille Homme Cuir Slim', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7035d2449897.jpeg', price: 11.99, oldPrice: 24.99, discount: 52, rating: 4.4, comments: 987, slug: 'mode-homme' },

  // === CHAUSSURES ===
  { pid: 'fb-ch1', name: 'Baskets Sport Blanc Homme', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8965c7981785.jpg', price: 32.99, oldPrice: 64.99, discount: 49, rating: 4.6, comments: 2134, slug: 'chaussures' },
  { pid: 'fb-ch2', name: 'Bottines Femme Cuir Talon', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/55a16f3795fb.jpg', price: 34.99, oldPrice: 69.99, discount: 50, rating: 4.5, comments: 1876, slug: 'chaussures' },
  { pid: 'fb-ch3', name: 'Sneakers Femme Platform Rose', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cfa4505537bc.jpg', price: 27.99, oldPrice: 54.99, discount: 49, rating: 4.4, comments: 1567, slug: 'chaussures' },
  { pid: 'fb-ch4', name: 'Sandales Homme Été Confort', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ea570d37bb63.jpg', price: 16.99, oldPrice: 32.99, discount: 48, rating: 4.3, comments: 987, slug: 'chaussures' },
  { pid: 'fb-ch5', name: 'Bottes Chelsea Homme Cuir', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cb0918c7753.jpg', price: 44.99, oldPrice: 89.99, discount: 50, rating: 4.7, comments: 1432, slug: 'chaussures' },
  { pid: 'fb-ch6', name: 'Espadrilles Femme Été Natur', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3ba2507c2052.jpg', price: 14.99, oldPrice: 27.99, discount: 46, rating: 4.4, comments: 876, slug: 'chaussures' },

  // === MAISON ===
  { pid: 'fb-ma1', name: 'Lampe LED Décorative Moderne', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e5f5db1385.jpg', price: 15.99, oldPrice: 34.99, discount: 54, rating: 4.5, comments: 1876, slug: 'maison' },
  { pid: 'fb-ma2', name: 'Diffuseur Huiles Essentielles Bois', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6efb1c5b3455.jpg', price: 16.99, oldPrice: 34.99, discount: 51, rating: 4.6, comments: 2134, slug: 'maison' },
  { pid: 'fb-ma3', name: 'Robot Aspirateur Intelligent', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/31605089b30d.png', price: 89.99, oldPrice: 179.99, discount: 50, rating: 4.7, comments: 3456, slug: 'maison' },
  { pid: 'fb-ma4', name: 'Coussin Décoratif Velours Doré', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/547e96ad19b6.jpg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.3, comments: 987, slug: 'maison' },
  { pid: 'fb-ma5', name: 'Tapis Salon Moderne Fléché', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8757a59cd36b.jpg', price: 24.99, oldPrice: 49.99, discount: 50, rating: 4.5, comments: 1432, slug: 'maison' },
  { pid: 'fb-ma6', name: 'Friteuse à Air 6L Numérique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4f3af64c767a.jpg', price: 54.99, oldPrice: 109.99, discount: 50, rating: 4.8, comments: 2789, slug: 'maison' },

  // === AUTO & MOTO ===
  { pid: 'fb-am1', name: 'Phare LED Avant Universel', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3d9fb324b235.jpg', price: 24.99, oldPrice: 44.99, discount: 44, rating: 4.5, comments: 1567, slug: 'auto-moto' },
  { pid: 'fb-am2', name: 'Support Téléphone Voiture 360°', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/888a15962ef9.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.4, comments: 2345, slug: 'auto-moto' },
  { pid: 'fb-am3', name: 'Plaquettes de Frein Avant Premium', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d1d28d594cbd.jpg', price: 29.99, oldPrice: 54.99, discount: 45, rating: 4.6, comments: 1234, slug: 'auto-moto' },
  { pid: 'fb-am4', name: 'Caméra de Recul HD Night Vision', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c25a64184e78.jpg', price: 22.99, oldPrice: 44.99, discount: 49, rating: 4.5, comments: 1876, slug: 'auto-moto' },
  { pid: 'fb-am5', name: 'Chargeur Voiture USB Rapide 3 Ports', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/33f5d28ca121.jpg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.3, comments: 987, slug: 'auto-moto' },
  { pid: 'fb-am6', name: 'Cover Siège Auto Universel Cuir', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9d1302585118.jpg', price: 34.99, oldPrice: 69.99, discount: 50, rating: 4.6, comments: 1432, slug: 'auto-moto' },

  // === ÉLECTRONIQUE ===
  { pid: 'fb-el1', name: 'Enceinte Bluetooth Portable Étanche', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9fe5585309f7.jpg', price: 19.99, oldPrice: 39.99, discount: 50, rating: 4.6, comments: 2345, slug: 'electronique' },
  { pid: 'fb-el2', name: 'Brosse à Dents Électrique Sonique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2069066579df.jpg', price: 16.99, oldPrice: 34.99, discount: 51, rating: 4.7, comments: 1876, slug: 'electronique' },
  { pid: 'fb-el3', name: 'Lampe de Bureau LED Rechargeable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6bca4b0d2c07.jpg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.4, comments: 1234, slug: 'electronique' },
  { pid: 'fb-el4', name: 'Écouteurs Casque Bluetooth Pliable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b0d31a6e7df.jpg', price: 22.99, oldPrice: 44.99, discount: 49, rating: 4.5, comments: 1654, slug: 'electronique' },
  { pid: 'fb-el5', name: 'Clé USB 128GB Métal Premium', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/45eac8840463.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.3, comments: 987, slug: 'electronique' },
  { pid: 'fb-el6', name: 'Mini Projecteur Portable HD', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dbddd2ad4b13.jpeg', price: 49.99, oldPrice: 99.99, discount: 50, rating: 4.5, comments: 1432, slug: 'electronique' },

  // === SPORT ===
  { pid: 'fb-sp1', name: 'Tapis de Yoga Antidérapant 6mm', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ed5758e4ebb2.jpg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.5, comments: 1876, slug: 'sport' },
  { pid: 'fb-sp2', name: 'Haltère Réglable 20kg Home Fitness', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2bd81d4e0ea7.png', price: 39.99, oldPrice: 74.99, discount: 47, rating: 4.6, comments: 2134, slug: 'sport' },
  { pid: 'fb-sp3', name: 'Bandes de Résistance Set 5pcs', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f5d88819d411.jpg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.4, comments: 1567, slug: 'sport' },
  { pid: 'fb-sp4', name: 'Gourde Isotherme Sport 750ml', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2ca9fbd0b4a9.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.3, comments: 987, slug: 'sport' },
  { pid: 'fb-sp5', name: 'Brassière Sport Femme Impact', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8cee0a324de8.jpeg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.5, comments: 1234, slug: 'sport' },
  { pid: 'fb-sp6', name: 'Gants de Fitness Breathable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/83a502089ef2.jpg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.3, comments: 876, slug: 'sport' },

  // === ACCESSOIRES ===
  { pid: 'fb-ac1', name: 'Lunettes de Soleil Polarisées', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0fd6c22fed4b.jpeg', price: 12.99, oldPrice: 27.99, discount: 54, rating: 4.5, comments: 2134, slug: 'accessoires' },
  { pid: 'fb-ac2', name: 'Bracelet Homme Acier Inoxydable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/979c62848dcb.jpg', price: 9.99, oldPrice: 22.99, discount: 57, rating: 4.4, comments: 1654, slug: 'accessoires' },
  { pid: 'fb-ac3', name: 'Collier Femme Chaîne Or 18K', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4f9f83a93fcf.jpg', price: 14.99, oldPrice: 34.99, discount: 57, rating: 4.6, comments: 1432, slug: 'accessoires' },
  { pid: 'fb-ac4', name: 'Ceinture Homme Cuir Automatique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c4d527798cab.jpg', price: 16.99, oldPrice: 34.99, discount: 51, rating: 4.5, comments: 1234, slug: 'accessoires' },
  { pid: 'fb-ac5', name: 'Bague Femme Zircon Cubique', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1fbed8b3e652.jpg', price: 7.99, oldPrice: 17.99, discount: 56, rating: 4.3, comments: 987, slug: 'accessoires' },
  { pid: 'fb-ac6', name: 'Montre Femme Bracelet Maille', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bb0f878c2837.png', price: 19.99, oldPrice: 44.99, discount: 56, rating: 4.5, comments: 1100, slug: 'accessoires' },

  // === ENFANT ===
  { pid: 'fb-en1', name: 'Jouet Éducatif Enfant Bois', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8757a59cd36b.jpg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.6, comments: 1876, slug: 'enfant' },
  { pid: 'fb-en2', name: 'Robe Fille Princesse Tulle', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d847862feee.jpeg', price: 16.99, oldPrice: 34.99, discount: 51, rating: 4.5, comments: 1432, slug: 'enfant' },
  { pid: 'fb-en3', name: 'Peluche Animaux Coton Bio', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/094c2d52e99e.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.7, comments: 2134, slug: 'enfant' },

  // === JOUETS ===
  { pid: 'fb-jo1', name: 'Blocs de Construction 100pcs', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6252c3f7bab2.png', price: 19.99, oldPrice: 39.99, discount: 50, rating: 4.6, comments: 2345, slug: 'jouets' },
  { pid: 'fb-jo2', name: 'Pistolet à Eau Électrique Auto', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/048bea336662.jpg', price: 16.99, oldPrice: 32.99, discount: 48, rating: 4.4, comments: 1567, slug: 'jouets' },
  { pid: 'fb-jo3', name: 'Jeu de Société Famille Quiz', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6dbe449e7437.jpg', price: 12.99, oldPrice: 24.99, discount: 48, rating: 4.5, comments: 987, slug: 'jouets' },

  // === ANIMAUX ===
  { pid: 'fb-an1', name: 'Jouet Interactif Chat LED', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5cb5f36db5b3.png', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.4, comments: 1876, slug: 'animaux' },
  { pid: 'fb-an2', name: 'Laisse Chien Rétractable 5m', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbc3fb19d2a8.jpg', price: 11.99, oldPrice: 22.99, discount: 48, rating: 4.5, comments: 1432, slug: 'animaux' },
  { pid: 'fb-an3', name: 'Bol Anti-glouton Pour Chien', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/77f552b577a3.png', price: 8.99, oldPrice: 16.99, discount: 47, rating: 4.3, comments: 987, slug: 'animaux' },

  // === BRICOLAGE ===
  { pid: 'fb-br1', name: 'Kit Tournevis Multifonction 32-en-1', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/18b7f8536c0d.jpg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.5, comments: 2134, slug: 'bricolage' },
  { pid: 'fb-br2', name: 'Perceuse Sans Fil 21V + Accessoires', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de5cb65c2741.jpg', price: 44.99, oldPrice: 89.99, discount: 50, rating: 4.6, comments: 1876, slug: 'bricolage' },
  { pid: 'fb-br3', name: 'Niveau à Bulle Laser LED', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/65deb883b54c.jpg', price: 19.99, oldPrice: 39.99, discount: 50, rating: 4.4, comments: 1234, slug: 'bricolage' },

  // === BUREAU ===
  { pid: 'fb-bu1', name: 'Organiseur Bureau Rangement Bois', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2743e64929db.jpg', price: 16.99, oldPrice: 32.99, discount: 48, rating: 4.5, comments: 1567, slug: 'bureau' },
  { pid: 'fb-bu2', name: 'Clavier Mécanique RGB Rétractable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/00f88c3355fa.jpg', price: 24.99, oldPrice: 49.99, discount: 50, rating: 4.6, comments: 2345, slug: 'bureau' },
  { pid: 'fb-bu3', name: 'Lampe de Lecture LED Flexible', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7dcdd5bf2d46.jpeg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.3, comments: 987, slug: 'bureau' },

  // === BAGAGERIE ===
  { pid: 'fb-bg1', name: 'Sac à Dos Voyage Imperméable 40L', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5fa0ca30c1a4.jpg', price: 24.99, oldPrice: 49.99, discount: 50, rating: 4.6, comments: 2134, slug: 'bagagerie' },
  { pid: 'fb-bg2', name: 'Valise Cabine Rigide 20 Pouces', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e1bbdca987ac.jpg', price: 54.99, oldPrice: 109.99, discount: 50, rating: 4.7, comments: 1876, slug: 'bagagerie' },
  { pid: 'fb-bg3', name: 'Trousse de Toilette Suspendue', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/343f9311d772.jpg', price: 9.99, oldPrice: 19.99, discount: 50, rating: 4.4, comments: 1234, slug: 'bagagerie' },

  // === ALIMENTATION ===
  { pid: 'fb-al1', name: 'Gourde Isotherme Inox 500ml', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7efc2c472dc3.jpg', price: 12.99, oldPrice: 24.99, discount: 48, rating: 4.5, comments: 1567, slug: 'alimentation' },
  { pid: 'fb-al2', name: 'Set Couteaux Cuisine 6pcs Acier', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e4a5ec2416af.jpg', price: 19.99, oldPrice: 39.99, discount: 50, rating: 4.6, comments: 2134, slug: 'alimentation' },
  { pid: 'fb-al3', name: 'Bouteille Eau Filtrante Portable', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d9c83247a337.jpeg', price: 14.99, oldPrice: 29.99, discount: 50, rating: 4.4, comments: 987, slug: 'alimentation' },

  // === EMBALLAGE ===
  { pid: 'fb-emb1', name: 'Boîte Cadeau Luxe avec Nœud', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ac3f9d5b09b9.jpeg', price: 8.99, oldPrice: 16.99, discount: 47, rating: 4.3, comments: 987, slug: 'emballage' },
  { pid: 'fb-emb2', name: 'Sachet Cadeau Organza Or 10pcs', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/96f964193368.jpg', price: 6.99, oldPrice: 12.99, discount: 46, rating: 4.4, comments: 876, slug: 'emballage' },
  { pid: 'fb-emb3', name: 'Ruban Décoratif Fleur 10m', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/653287a4ffb2.jpeg', price: 4.99, oldPrice: 9.99, discount: 50, rating: 4.2, comments: 654, slug: 'emballage' },
];
