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
  subCategories?: { key: string; image: string; products: ShopProduct[] }[];
}

export const shopCategoriesData: Record<string, ShopCategory> = {
  boutique: {
    key: 'shop.boutique',
    image: '/images/shop/cat-boutique.jpg',
    products: [],
  },
  cosmetiques: {
    key: 'shop.cosmetiques',
    image: '/images/shop/cat-cosmetiques.jpg',
    products: [
      { id: 101, name: 'Fond de Teint L\'Oréal Paris Infaillible 24h', nameEn: "L'Oréal Paris Infaillible 24h Foundation", nameEs: 'Base de Maquillaje L\'Oréal Paris Infaillible 24h', nameAr: 'أساس مكياج لوريل باريس إنفاليبل 24 ساعة', price: 18.90, oldPrice: 24.90, rating: 4.7, reviews: 2341, discount: 24, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=400&h=400&fit=crop&q=80' },
      { id: 102, name: 'Rouge à Lèvres Dior Addict Stellar Shine', nameEn: 'Dior Addict Stellar Shine Lipstick', nameEs: 'Labial Dior Addict Stellar Shine', nameAr: 'أحمر شفاه ديور أديكت ستيلار شاين', price: 37.90, oldPrice: 42.90, rating: 4.8, reviews: 1567, discount: 12, badge: 'new', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&q=80' },
      { id: 103, name: 'Mascara Maybelline Lash Sensational', nameEn: 'Maybelline Lash Sensational Mascara', nameEs: 'Máscara Maybelline Lash Sensational', nameAr: 'ماسكارا مايبيلين لاش سينسيشنال', price: 12.90, oldPrice: 16.90, rating: 4.6, reviews: 3421, discount: 24, badge: 'sale', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&q=80' },
      { id: 104, name: 'Palette Yeux Sephora Collection', nameEn: 'Sephora Collection Eye Palette', nameEs: 'Paleta de Ojos Sephora Collection', nameAr: 'بالت عيون سيبورا كولكشن', price: 22.90, oldPrice: 29.90, rating: 4.5, reviews: 987, discount: 23, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&q=80' },
    ],
  },
  parfums: {
    key: 'shop.parfums',
    image: '/images/shop/cat-parfums.jpg',
    products: [
      { id: 201, name: 'Chanel N°5 Eau de Parfum', nameEn: 'Chanel N°5 Eau de Parfum', nameEs: 'Chanel N°5 Eau de Parfum', nameAr: 'شانيل رقم 5 أو دو بارفان', price: 115.00, oldPrice: 135.00, rating: 4.9, reviews: 4521, discount: 15, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80' },
      { id: 202, name: 'Dior Sauvage Eau de Toilette', nameEn: 'Dior Sauvage Eau de Toilette', nameEs: 'Dior Sauvage Eau de Toilette', nameAr: 'ديور سافاج أو دو تواليت', price: 89.90, oldPrice: 105.00, rating: 4.8, reviews: 3890, discount: 14, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop&q=80' },
      { id: 203, name: "Yves Saint Laurent Black Opium", nameEn: 'Yves Saint Laurent Black Opium', nameEs: 'Yves Saint Laurent Black Opium', nameAr: 'إيف سان لوران بلاك أبيوم', price: 79.90, oldPrice: 99.90, rating: 4.7, reviews: 2134, discount: 20, badge: 'sale', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop&q=80' },
      { id: 204, name: 'Lancôme La Vie Est Belle', nameEn: 'Lancôme La Vie Est Belle', nameEs: 'Lancôme La Vie Est Belle', nameAr: 'لانكوم لا في إست بيل', price: 95.00, oldPrice: 120.00, rating: 4.9, reviews: 2876, discount: 21, badge: 'new', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop&q=80' },
    ],
  },
  mode: {
    key: 'shop.mode',
    image: '/images/shop/cat-mode.jpg',
    products: [],
    subCategories: [
      {
        key: 'mode.hommes',
        image: '/images/mode/hommes.jpg',
        products: [
          { id: 301, name: 'Costume Slim Fit Homme', nameEn: "Men's Slim Fit Suit", nameEs: 'Traje Slim Fit Hombre', nameAr: 'بدلة سليم فيت للرجال', price: 189.00, oldPrice: 259.00, rating: 4.7, reviews: 456, discount: 27, badge: 'sale', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&q=80' },
          { id: 302, name: 'Veste en Jean Levi\'s Vintage', nameEn: "Levi's Vintage Denim Jacket", nameEs: "Chaqueta de Mezclilla Levi's Vintage", nameAr: "جاكيت جينز ليڤايز فينتاج", price: 89.90, oldPrice: 119.90, rating: 4.8, reviews: 1234, discount: 25, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&q=80' },
          { id: 303, name: 'Chemise Ralph Lauren Oxford', nameEn: 'Ralph Lauren Oxford Shirt', nameEs: 'Camisa Ralph Lauren Oxford', nameAr: 'قميص رالف لورين أوكسفورد', price: 79.90, oldPrice: 99.90, rating: 4.6, reviews: 876, discount: 20, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&q=80' },
          { id: 304, name: 'Sneakers Nike Air Max 90', nameEn: 'Nike Air Max 90 Sneakers', nameEs: 'Zapatillas Nike Air Max 90', nameAr: 'حذاء نايكي إير ماكس 90', price: 129.90, oldPrice: 159.90, rating: 4.9, reviews: 2345, discount: 19, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80' },
        ],
      },
      {
        key: 'mode.femmes',
        image: '/images/mode/femmes.jpg',
        products: [
          { id: 305, name: 'Robe Midi Élégante Soie', nameEn: 'Elegant Silk Midi Dress', nameEs: 'Vestido Midi de Seda Elegante', nameAr: 'فستان ميدي حرير أنيق', price: 89.90, oldPrice: 129.90, rating: 4.8, reviews: 1567, discount: 31, badge: 'sale', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&q=80' },
          { id: 306, name: 'Blazer Femme Zara Oversize', nameEn: 'Zara Women\'s Oversize Blazer', nameEs: 'Blazer Oversize Mujer Zara', nameAr: 'بليزر أوفرسايز نسائي زارا', price: 69.90, oldPrice: 89.90, rating: 4.7, reviews: 987, discount: 22, badge: 'new', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=400&fit=crop&q=80' },
          { id: 307, name: 'Jean Skinny Calvin Klein', nameEn: 'Calvin Klein Skinny Jeans', nameEs: 'Jean Skinny Calvin Klein', nameAr: 'جينز سكيني كالفن كلاين', price: 69.90, oldPrice: 89.90, rating: 4.6, reviews: 2345, discount: 22, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&q=80' },
          { id: 308, name: 'Top en Linen H&M Premium', nameEn: 'H&M Premium Linen Top', nameEs: 'Top de Lino H&M Premium', nameAr: 'بلوزة كتان إتش آند إم بريميوم', price: 29.90, oldPrice: 39.90, rating: 4.5, reviews: 678, discount: 25, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=400&fit=crop&q=80' },
        ],
      },
      {
        key: 'mode.garcon',
        image: '/images/mode/garcon.jpg',
        products: [
          { id: 309, name: 'T-shirt Nike Sportswear Garçon', nameEn: "Nike Sportswear Boys' T-Shirt", nameEs: 'Camiseta Nike Sportswear Niño', nameAr: 'تي شيرت نايكي سبورتسوير للأولاد', price: 24.90, oldPrice: 34.90, rating: 4.7, reviews: 890, discount: 29, badge: 'sale', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&q=80' },
          { id: 310, name: 'Jean Slim Garçon Ralph Lauren', nameEn: "Ralph Lauren Boys' Slim Jeans", nameEs: 'Jean Slim Niño Ralph Lauren', nameAr: 'جينز سليم أولاد رالف لورين', price: 49.90, oldPrice: 65.00, rating: 4.6, reviews: 567, discount: 23, image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop&q=80' },
          { id: 311, name: 'Hoodie Adidas Originals Kid', nameEn: 'Adidas Originals Kids Hoodie', nameEs: 'Sudadera Adidas Originals Niño', nameAr: 'هودي أديداس أوريجينالز للأطفال', price: 39.90, oldPrice: 54.90, rating: 4.8, reviews: 432, discount: 27, badge: 'new', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&q=80' },
          { id: 312, name: 'Survêtement Puma Garçon', nameEn: "Puma Boys' Tracksuit", nameEs: 'Chandal Puma Niño', nameAr: 'بدلة رياضية بومة للأولاد', price: 44.90, oldPrice: 59.90, rating: 4.5, reviews: 321, discount: 25, image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=400&fit=crop&q=80' },
        ],
      },
      {
        key: 'mode.fille',
        image: '/images/mode/fille.jpg',
        products: [
          { id: 313, name: 'Robe Fleuri Fille Zara', nameEn: "Zara Girls' Floral Dress", nameEs: 'Vestido Floral Niña Zara', nameAr: 'فستان زهري بناتي زارا', price: 29.90, oldPrice: 39.90, rating: 4.8, reviews: 654, discount: 25, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop&q=80' },
          { id: 314, name: 'Jupe Plissée Fille H&M', nameEn: "H&M Girls' Pleated Skirt", nameEs: 'Falda Plisada Niña H&M', nameAr: 'تنورة بليسيه بناتي إتش آند إم', price: 19.90, oldPrice: 29.90, rating: 4.6, reviews: 432, discount: 33, badge: 'sale', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&q=80' },
          { id: 315, name: 'Sneakers Fille Converse', nameEn: "Girls' Converse Sneakers", nameEs: 'Zapatillas Converse Niña', nameAr: 'حذاء كونفرس بناتي', price: 44.90, oldPrice: 54.90, rating: 4.7, reviews: 876, discount: 18, badge: 'new', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop&q=80' },
          { id: 316, name: 'Cardigan Fille Petite Bateau', nameEn: "Petite Bateau Girls' Cardigan", nameEs: 'Cárdigan Niña Petite Bateau', nameAr: 'كارديغان بناتي بيتيت بوتو', price: 34.90, oldPrice: 44.90, rating: 4.5, reviews: 234, discount: 22, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop&q=80' },
        ],
      },
    ],
  },
  chaussures: {
    key: 'shop.chaussures',
    image: '/images/shop/cat-chaussures.jpg',
    products: [
      { id: 401, name: 'Nike Air Jordan 1 High', nameEn: 'Nike Air Jordan 1 High', nameEs: 'Nike Air Jordan 1 High', nameAr: 'نايكي إير جوردان 1 هاي', price: 159.90, oldPrice: 189.90, rating: 4.9, reviews: 3456, discount: 16, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80' },
      { id: 402, name: 'Bottes Chelsea Dr. Martens', nameEn: 'Dr. Martens Chelsea Boots', nameEs: 'Botas Chelsea Dr. Martens', nameAr: 'بوتات تشيلسي دكتور مارتينز', price: 149.90, oldPrice: 179.90, rating: 4.8, reviews: 1234, discount: 17, badge: 'new', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop&q=80' },
      { id: 403, name: 'Escarpins Talon Louboutin', nameEn: 'Louboutin Heel Pumps', nameEs: 'Tacones Louboutin', nameAr: 'حذاء بكعب لوبوتان', price: 599.00, oldPrice: 725.00, rating: 4.9, reviews: 567, discount: 17, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&q=80' },
      { id: 404, name: 'Adidas Ultraboost Running', nameEn: 'Adidas Ultraboost Running', nameEs: 'Adidas Ultraboost Running', nameAr: 'أديداس ألترابوست رانينج', price: 139.90, oldPrice: 169.90, rating: 4.7, reviews: 2789, discount: 18, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop&q=80' },
    ],
  },
  electronique: {
    key: 'shop.electronique',
    image: '/images/shop/cat-electronique.jpg',
    products: [
      { id: 501, name: 'Apple AirPods Pro 2', nameEn: 'Apple AirPods Pro 2', nameEs: 'Apple AirPods Pro 2', nameAr: 'أبل إيربودز برو 2', price: 279.00, oldPrice: 329.00, rating: 4.9, reviews: 5678, discount: 15, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&q=80' },
      { id: 502, name: 'Samsung Galaxy Watch 6', nameEn: 'Samsung Galaxy Watch 6', nameEs: 'Samsung Galaxy Watch 6', nameAr: 'سامسونج جالاكسي ووتش 6', price: 229.00, oldPrice: 279.00, rating: 4.7, reviews: 2345, discount: 18, badge: 'sale', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop&q=80' },
      { id: 503, name: 'Appareil Photo Instax Mini', nameEn: 'Instax Mini Camera', nameEs: 'Cámara Instax Mini', nameAr: 'كاميرا إنستاكس ميني', price: 69.90, oldPrice: 89.90, rating: 4.6, reviews: 1234, discount: 22, badge: 'new', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&q=80' },
      { id: 504, name: 'Enceinte JBL Charge 5', nameEn: 'JBL Charge 5 Speaker', nameEs: 'Altavoz JBL Charge 5', nameAr: 'مكبر صوت جي بي إل شارج 5', price: 149.00, oldPrice: 179.00, rating: 4.8, reviews: 3456, discount: 17, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80' },
    ],
  },
  maison: {
    key: 'shop.maison',
    image: '/images/shop/cat-maison.jpg',
    products: [
      { id: 601, name: 'Bougie Parfumée Diptyque', nameEn: 'Diptyque Scented Candle', nameEs: 'Vela Aromática Diptyque', nameAr: 'شمعة معطرة ديبتيك', price: 39.90, oldPrice: 49.90, rating: 4.8, reviews: 1567, discount: 20, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop&q=80' },
      { id: 602, name: 'Coussin Velours Maison Sarah', nameEn: 'Sarah Home Velvet Cushion', nameEs: 'Cojín de Terciopelo Sarah Home', nameAr: 'وسادة مخمل سارة هوم', price: 29.90, oldPrice: 39.90, rating: 4.5, reviews: 876, discount: 25, badge: 'sale', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop&q=80' },
      { id: 603, name: 'Lampe Design Artemide', nameEn: 'Artemide Design Lamp', nameEs: 'Lámpara Diseño Artemide', nameAr: 'مصمم لامبة آرتيميد', price: 189.00, oldPrice: 249.00, rating: 4.7, reviews: 432, discount: 24, badge: 'new', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop&q=80' },
      { id: 604, name: 'Set Verres Cristallerie Baccarat', nameEn: 'Baccarat Crystal Glass Set', nameEs: 'Juego de Vasos Cristalería Baccarat', nameAr: 'طقم كؤوس بلورية بيكارات', price: 89.90, oldPrice: 119.90, rating: 4.9, reviews: 345, discount: 25, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&q=80' },
    ],
  },
  accessoires: {
    key: 'shop.accessoires',
    image: '/images/shop/cat-accessoires.jpg',
    products: [
      { id: 701, name: 'Sac à Main Louis Vuitton', nameEn: 'Louis Vuitton Handbag', nameEs: 'Bolso Louis Vuitton', nameAr: 'حقيبة يد لوي فيتون', price: 1290.00, oldPrice: 1590.00, rating: 4.9, reviews: 1234, discount: 19, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80' },
      { id: 702, name: 'Montre Rolex Datejust', nameEn: 'Rolex Datejust Watch', nameEs: 'Reloj Rolex Datejust', nameAr: 'ساعة رولكس ديتجست', price: 4590.00, oldPrice: 5290.00, rating: 4.9, reviews: 567, discount: 13, badge: 'bestseller', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&q=80' },
      { id: 703, name: 'Lunettes de Soleil Ray-Ban', nameEn: 'Ray-Ban Sunglasses', nameEs: 'Gafas de Sol Ray-Ban', nameAr: 'نظارات شمسية ريبان', price: 159.00, oldPrice: 189.00, rating: 4.8, reviews: 3456, discount: 16, badge: 'sale', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&q=80' },
      { id: 704, name: 'Collier Tiffany & Co.', nameEn: 'Tiffany & Co. Necklace', nameEs: 'Collar Tiffany & Co.', nameAr: 'قلادة تيفاني آند كو', price: 450.00, oldPrice: 550.00, rating: 4.9, reviews: 890, discount: 18, badge: 'new', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&q=80' },
    ],
  },
};
