'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/uzalus/navbar';
import { Footer } from '@/components/uzalus/footer';
import { ChatWidget } from '@/components/uzalus/chat-widget';
import { CartSidebar } from '@/components/uzalus/cart-sidebar';
import MobileNav from '@/components/uzalus/mobile-nav';
import { CategoryPage, type CatSlug } from '@/components/uzalus/category-page';
import { ProductDetail } from '@/components/uzalus/product-detail';
import { useI18n } from '@/lib/i18n-context';
import { PopularGrid } from '@/components/uzalus/popular-grid';
import { useCartStore } from '@/lib/cart-store';
import {
  Search,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Flame,
  FileText,
  Image as ImageIcon,
  Music,
  Languages,
  QrCode,
  Scissors,
  ArrowRight,
  Star,
  Car,
  Wrench,
  Gift,
  Trophy,
  Smartphone,
  Globe,
  Headset,
  Sparkles,
} from 'lucide-react';

/* ================================================================== */
/*  Google AdSense Block                                                */
/* ================================================================== */
function AdSenseBlock({ className = '' }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* empty */ }
  }, []);

  return (
    <div className={`my-2 max-w-4xl mx-auto ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4372638722629302"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/* ================================================================== */
/*  Data: Trending Products                                            */
/* ================================================================== */
const trendingProducts = [
  { id: 1, name: 'Montre Connectée X6', nameEn: 'Smart Watch X6', nameEs: 'Reloj Inteligente X6', nameAr: 'ساعة ذذية X6', price: 39.90, oldPrice: 69.90, discount: 43, rating: 4.6, reviews: 126, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80' },
  { id: 2, name: 'Parfum Élite Intense', nameEn: 'Elite Intense Perfume', nameEs: 'Perfume Élite Intenso', nameAr: 'عطر إليت إنتس', price: 29.90, oldPrice: 49.90, discount: 40, rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80' },
  { id: 3, name: 'Écouteur Sans Fil Pro', nameEn: 'Wireless Earbuds Pro', nameEs: 'Auriculares Inalámbricos Pro', nameAr: 'سماعات لاسك بر', price: 24.90, oldPrice: 38.00, discount: 34, rating: 4.6, reviews: 73, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&q=80' },
  { id: 4, name: 'Enceinte Bluetooth X8', nameEn: 'Bluetooth Speaker X8', nameEs: 'Altavoz Bluetooth X8', nameAr: 'مكبر بلوو X8', price: 19.90, oldPrice: 29.90, discount: 33, rating: 4.4, reviews: 58, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80' },
  { id: 5, name: 'Sac à Dos Voyage', nameEn: 'Travel Backpack', nameEs: 'Mochila de Viaje', nameAr: 'حقيبة لله', price: 34.90, oldPrice: 59.90, discount: 42, rating: 4.8, reviews: 112, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&q=80' },
  { id: 6, name: 'Friteuse à Air 6L', nameEn: '6L Air Fryer', nameEs: 'Freidora de Aire 6L', nameAr: 'قايي هويي 6 لتر', price: 69.90, oldPrice: 99.90, discount: 30, rating: 4.8, reviews: 91, image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1d6034dc7e3c.jpeg' },
];

function getLocalName(p: { name: string; nameEn?: string; nameEs?: string; nameAr?: string }, loc: string): string {
  if (loc === 'ar' && p.nameAr) return p.nameAr;
  if (loc === 'es' && p.nameEs) return p.nameEs;
  if (loc === 'en' && p.nameEn) return p.nameEn;
  return p.name;
}

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
}

/* ================================================================== */
/*  Data: UZALUS Tools                                                 */
/* ================================================================== */
const uzalusTools = [
  { nameKey: 'tools.namePdfToWord', descKey: 'tools.convert', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { nameKey: 'tools.nameWordToPdf', descKey: 'tools.convert', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { nameKey: 'tools.nameCompressPdf', descKey: 'tools.reduce', icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { nameKey: 'tools.nameMergePdf', descKey: 'tools.assemble', icon: Scissors, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { nameKey: 'tools.nameSplitPdf', descKey: 'tools.extractPages', icon: Scissors, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { nameKey: 'tools.nameJpgToPdf', descKey: 'tools.imagesToPdf', icon: ImageIcon, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { nameKey: 'tools.namePdfToJpg', descKey: 'tools.pdfToImages', icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { nameKey: 'tools.nameTranslate', descKey: 'tools.translateText', icon: Languages, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { nameKey: 'tools.nameMp4ToMp3', descKey: 'tools.extractAudio', icon: Music, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { nameKey: 'tools.nameRemoveBg', descKey: 'tools.cleanImages', icon: ImageIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { nameKey: 'tools.nameQrCode', descKey: 'tools.qrCode', icon: QrCode, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

/* ================================================================== */
/*  Data: Homepage Categories (top 10)                                  */
/* ================================================================== */
const homeCategories = [
  { key: 'shop.modeFemme', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop&q=80', slug: 'mode-femme' },
  { key: 'shop.maison', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&q=80', slug: 'maison' },
  { key: 'shop.parfumsCosmetiques', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80', slug: 'parfums-cosmetiques' },
  { key: 'shop.telephones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&q=80', slug: 'telephones' },
  { key: 'shop.auto', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop&q=80', slug: 'auto-moto' },
  { key: 'shop.electronique', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&q=80', slug: 'electronique' },
  { key: 'shop.chaussures', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&q=80', slug: 'chaussures' },
  { key: 'shop.accessoires', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&q=80', slug: 'accessoires' },
  { key: 'shop.sport', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=200&h=200&fit=crop&q=80', slug: 'sport' },
  { key: 'shop.modeHomme', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop&q=80', slug: 'mode-homme' },
];

/* ================================================================== */
/*  Data: Auto Parts Products (real images + real CJ-style prices)       */
/* ================================================================== */
interface CarouselProduct {
  id: string;
  name: string;
  nameEn?: string;
  nameEs?: string;
  nameAr?: string;
  price: string;
  oldPrice: string | null;
  discount: number | null;
  shipping: string;
  shippingKey?: string;
  image: string;
  url: string;
  category?: string;
  catKey?: string;
}

const autoPartsProducts: CarouselProduct[] = [
  { id: 'ap1', name: 'Phare LED Avant Universel', nameEn: 'Universal LED Headlight', nameEs: 'Faro LED Delantero Universal', nameAr: 'مصباح LED أمامي عالمي', price: '24,99 €', oldPrice: '44,99 €', discount: 44, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8d304e804c8a.jpg', url: '/categorie/auto-moto' },
  { id: 'ap2', name: 'Kit Embrayage Complet Valeo', nameEn: 'Complete Clutch Kit Valeo', nameEs: 'Kit de Embrague Completo Valeo', nameAr: 'طقم قابض كامل فاليو', price: '89,99 €', oldPrice: '149,99 €', discount: 40, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/50555b3dfd5d.jpg', url: '/categorie/auto-moto' },
  { id: 'ap3', name: 'Roulement de Roue Conique', nameEn: 'Tapered Wheel Bearing', nameEs: 'Rodamiento de Rueda Cónico', nameAr: 'محمل عجلة مخروطي', price: '12,49 €', oldPrice: null, discount: null, shipping: '+ 3,99 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8cddb3376b0f.jpg', url: '/categorie/auto-moto' },
  { id: 'ap4', name: 'Injecteur Diesel Bosch 4pcs', nameEn: 'Bosch Diesel Injector 4pcs', nameEs: 'Inyector Diésel Bosch 4pz', nameAr: 'حقن ديزل بوش 4 قطع', price: '179,99 €', oldPrice: '289,99 €', discount: 38, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/26f2545dd54b.jpg', url: '/categorie/auto-moto' },
  { id: 'ap5', name: 'Filtre à Huile Premium', nameEn: 'Premium Oil Filter', nameEs: 'Filtro de Aceite Premium', nameAr: 'فلتر زيت عالي الجودة', price: '8,99 €', oldPrice: '14,99 €', discount: 40, shipping: '+ 2,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b533e2e4a54.jpg', url: '/categorie/auto-moto' },
  { id: 'ap6', name: 'Plaquette de Frein Avant', nameEn: 'Front Brake Pads', nameEs: 'Pastillas de Freno Delanteras', nameAr: 'وسادات فرامل أمامية', price: '34,99 €', oldPrice: '54,99 €', discount: 36, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3099fef29c12.jpeg', url: '/categorie/auto-moto' },
  { id: 'ap7', name: 'Amortisseur Arrière Gamme', nameEn: 'Rear Shock Absorber', nameEs: 'Amortiguador Trasero', nameAr: 'ممتص صدمات خلفي', price: '49,99 €', oldPrice: '79,99 €', discount: 37, shipping: '+ 4,99 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86414fb711b8.jpg', url: '/categorie/auto-moto' },
  { id: 'ap8', name: 'Batterie Voiture 12V 60Ah', nameEn: '12V 60Ah Car Battery', nameEs: 'Batería de Coche 12V 60Ah', nameAr: 'بطارية سيارة 12V 60Ah', price: '69,99 €', oldPrice: '109,99 €', discount: 36, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d03ca6a5c417.jpg', url: '/categorie/auto-moto' },
  { id: 'ap9', name: 'Démarreur Auto Universel', nameEn: 'Universal Car Starter', nameEs: 'Motor de Arranque Universal', nameAr: 'مارك سيارة عالمي', price: '119,99 €', oldPrice: '189,99 €', discount: 37, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/aa98aa55d25d.jpg', url: '/categorie/auto-moto' },
  { id: 'ap10', name: 'Alternateur Puissance 120A', nameEn: '120A Power Alternator', nameEs: 'Alternador 120A', nameAr: 'دينامو 120A', price: '134,99 €', oldPrice: '219,99 €', discount: 39, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5932d8a5b2a1.jpg', url: '/categorie/auto-moto' },
  { id: 'ap11', name: 'Joint de Culasse Moteur', nameEn: 'Engine Head Gasket', nameEs: 'Junta de Cabeza de Motor', nameAr: 'جوناس كولة المحرك', price: '18,44 €', oldPrice: null, discount: null, shipping: '+ 3,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e9cbdf178553.jpg', url: '/categorie/auto-moto' },
  { id: 'ap12', name: 'Essuie-glace Silicone Pair', nameEn: 'Silicone Wiper Blades (Pair)', nameEs: 'Limpiaparabrisas Silicona (Par)', nameAr: 'مساحات زجاج سيليكون (زوج)', price: '14,99 €', oldPrice: '24,99 €', discount: 40, shipping: '+ 2,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1986e27855dd.jpg', url: '/categorie/auto-moto' },
];

const uzalusBestSellers: CarouselProduct[] = [
  { id: 'bs1', name: 'Sérum Vitamine C Anti-âge', nameEn: 'Vitamin C Anti-Aging Serum', nameEs: 'Sérum Vitamina C Anti-arrugas', nameAr: 'سيروم فيتامين سي مضاد للتجاعيد', price: '12,99 €', oldPrice: '29,99 €', discount: 57, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c4da9f2def7.jpg', url: '/categorie/parfums-cosmetiques', category: 'PARFUMS & BEAUTÉ', catKey: 'catLabel.parfumsBeaute' },
  { id: 'bs2', name: 'Parfum Femme 50ml', nameEn: 'Women\'s Perfume 50ml', nameEs: 'Perfume Mujer 50ml', nameAr: 'عطر نسائي 50مل', price: '18,99 €', oldPrice: '45,99 €', discount: 59, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ada89db6df3a.jpg', url: '/categorie/parfums-cosmetiques', category: 'PARFUMS & BEAUTÉ', catKey: 'catLabel.parfumsBeaute' },
  { id: 'bs3', name: 'Organiseur Maquillage', nameEn: 'Makeup Organizer', nameEs: 'Organizador de Maquillaje', nameAr: 'منظم مكياج', price: '11,99 €', oldPrice: '24,99 €', discount: 52, shipping: '+ 2,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f7affe6971ca.jpeg', url: '/categorie/parfums-cosmetiques', category: 'PARFUMS & BEAUTÉ', catKey: 'catLabel.parfumsBeaute' },
  { id: 'bs4', name: 'Écouteurs Bluetooth TWS', nameEn: 'TWS Bluetooth Earbuds', nameEs: 'Auriculares Bluetooth TWS', nameAr: 'سماعات بلوتوث TWS', price: '19,99 €', oldPrice: '39,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cba3492c73b.jpg', url: '/categorie/telephones', category: 'HIGH-TECH', catKey: 'catLabel.highTech' },
  { id: 'bs5', name: 'Chargeur Magnétique 15W', nameEn: '15W Magnetic Charger', nameEs: 'Cargador Magnético 15W', nameAr: 'شاحن مغناطيسي 15W', price: '14,99 €', oldPrice: '27,99 €', discount: 46, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop', url: '/categorie/telephones', category: 'HIGH-TECH', catKey: 'catLabel.highTech' },
  { id: 'bs6', name: 'Coque iPhone Premium', nameEn: 'Premium iPhone Case', nameEs: 'Funda iPhone Premium', nameAr: 'كفر آيفون بريميوم', price: '8,99 €', oldPrice: '19,99 €', discount: 55, shipping: '+ 1,99 €', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop', url: '/categorie/telephones', category: 'HIGH-TECH', catKey: 'catLabel.highTech' },
  { id: 'bs7', name: 'Robe Élégante Soie', nameEn: 'Elegant Silk Dress', nameEs: 'Vestido Elegante de Seda', nameAr: 'فستان حرير أنيق', price: '29,99 €', oldPrice: '59,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop', url: '/categorie/mode-femme', category: 'MODE FEMME', catKey: 'catLabel.modeFemme' },
  { id: 'bs8', name: 'Sac à Main Cuir', nameEn: 'Leather Handbag', nameEs: 'Bolso de Cuero', nameAr: 'حقيبة يد جلدية', price: '29,99 €', oldPrice: '59,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop', url: '/categorie/mode-femme', category: 'MODE FEMME', catKey: 'catLabel.modeFemme' },
  { id: 'bs9', name: 'Montre Homme Luxe', nameEn: 'Luxury Men\'s Watch', nameEs: 'Reloj Hombre de Lujo', nameAr: 'ساعة رجالية فاخرة', price: '34,99 €', oldPrice: '69,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', url: '/categorie/mode-homme', category: 'MODE HOMME', catKey: 'catLabel.modeHomme' },
  { id: 'bs10', name: 'Bracelet Homme Acier', nameEn: 'Men\'s Steel Bracelet', nameEs: 'Pulsera Hombre Acero', nameAr: 'سوار رجالي فولاذي', price: '9,99 €', oldPrice: '22,99 €', discount: 57, shipping: '+ 1,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/afbfc85420d7.jpg', url: '/categorie/accessoires', category: 'ACCESSOIRES', catKey: 'catLabel.accessoires' },
  { id: 'bs11', name: 'Baskets Sport Femme', nameEn: 'Women\'s Sports Sneakers', nameEs: 'Zapatillas Deportivas Mujer', nameAr: 'حذاء رياضي نسائي', price: '32,99 €', oldPrice: '64,99 €', discount: 49, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', url: '/categorie/chaussures', category: 'CHAUSSURES', catKey: 'catLabel.chaussures' },
  { id: 'bs12', name: 'Haltère Réglable 20kg', nameEn: 'Adjustable Dumbbell 20kg', nameEs: 'Mancuerna Ajustable 20kg', nameAr: 'دمبل قابل للتعديل 20 كجم', price: '39,99 €', oldPrice: '74,99 €', discount: 47, shipping: '+ 4,99 €', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop', url: '/categorie/sport', category: 'SPORT', catKey: 'catLabel.sport' },
];

const promoFlashProducts: CarouselProduct[] = [
  { id: 'pf1', name: 'Robe Élégante Soie', nameEn: 'Elegant Silk Dress', nameEs: 'Vestido Elegante de Seda', nameAr: 'فستان حرير أنيق', price: '29,99 €', oldPrice: '59,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop', url: '/categorie/mode-femme', category: 'MODE FEMME', catKey: 'catLabel.modeFemme' },
  { id: 'pf2', name: 'Sac à Main Cuir', nameEn: 'Leather Handbag', nameEs: 'Bolso de Cuero', nameAr: 'حقيبة يد جلدية', price: '29,99 €', oldPrice: '59,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop', url: '/categorie/mode-femme', category: 'MODE FEMME', catKey: 'catLabel.modeFemme' },
  { id: 'pf3', name: 'Sérum Vitamine C', nameEn: 'Vitamin C Serum', nameEs: 'Sérum Vitamina C', nameAr: 'سيروم فيتامين سي', price: '12,99 €', oldPrice: '29,99 €', discount: 57, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c4da9f2def7.jpg', url: '/categorie/parfums-cosmetiques', category: 'SOINS BEAUTÉ', catKey: 'catLabel.soinsBeaute' },
  { id: 'pf4', name: 'Parfum Femme 50ml', nameEn: 'Women\'s Perfume 50ml', nameEs: 'Perfume Mujer 50ml', nameAr: 'عطر نسائي 50مل', price: '18,99 €', oldPrice: '45,99 €', discount: 59, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ada89db6df3a.jpg', url: '/categorie/parfums-cosmetiques', category: 'SOINS BEAUTÉ', catKey: 'catLabel.soinsBeaute' },
  { id: 'pf5', name: 'Écouteurs Bluetooth TWS', nameEn: 'TWS Bluetooth Earbuds', nameEs: 'Auriculares Bluetooth TWS', nameAr: 'سماعات بلوتوث TWS', price: '19,99 €', oldPrice: '39,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cba3492c73b.jpg', url: '/categorie/telephones', category: 'HIGH-TECH', catKey: 'catLabel.highTech' },
  { id: 'pf6', name: 'Chargeur Magnétique 15W', nameEn: '15W Magnetic Charger', nameEs: 'Cargador Magnético 15W', nameAr: 'شاحن مغناطيسي 15W', price: '14,99 €', oldPrice: '27,99 €', discount: 46, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop', url: '/categorie/telephones', category: 'HIGH-TECH', catKey: 'catLabel.highTech' },
  { id: 'pf7', name: 'Montre Homme Luxe', nameEn: 'Luxury Men\'s Watch', nameEs: 'Reloj Hombre de Lujo', nameAr: 'ساعة رجالية فاخرة', price: '34,99 €', oldPrice: '69,99 €', discount: 50, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', url: '/categorie/mode-homme', category: 'MODE HOMME', catKey: 'catLabel.modeHomme' },
  { id: 'pf8', name: 'Baskets Sport Femme', nameEn: 'Women\'s Sports Sneakers', nameEs: 'Zapatillas Deportivas Mujer', nameAr: 'حذاء رياضي نسائي', price: '32,99 €', oldPrice: '64,99 €', discount: 49, shipping: 'Livraison gratuite', shippingKey: 'detail.freeShipping', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', url: '/categorie/chaussures', category: 'CHAUSSURES', catKey: 'catLabel.chaussures' },
  { id: 'pf9', name: 'Diffuseur Essentielles', nameEn: 'Essential Oil Diffuser', nameEs: 'Difusor de Aceites Esenciales', nameAr: 'ناشر زيوت عطرية', price: '16,99 €', oldPrice: '34,99 €', discount: 51, shipping: '+ 2,99 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/57b8afc94886.jpg', url: '/categorie/maison', category: 'MAISON', catKey: 'catLabel.maison' },
  { id: 'pf10', name: 'Lampe LED Décorative', nameEn: 'Decorative LED Lamp', nameEs: 'Lámpara LED Decorativa', nameAr: 'مصباح LED ديكوري', price: '15,99 €', oldPrice: '29,99 €', discount: 47, shipping: '+ 2,99 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/71df90dbeb8d.webp', url: '/categorie/maison', category: 'MAISON', catKey: 'catLabel.maison' },
  { id: 'pf11', name: 'Haltère Réglable 20kg', nameEn: 'Adjustable Dumbbell 20kg', nameEs: 'Mancuerna Ajustable 20kg', nameAr: 'دمبل قابل للتعديل 20 كجم', price: '39,99 €', oldPrice: '74,99 €', discount: 47, shipping: '+ 4,99 €', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop', url: '/categorie/sport', category: 'SPORT', catKey: 'catLabel.sport' },
  { id: 'pf12', name: 'Bracelet Homme Acier', nameEn: 'Men\'s Steel Bracelet', nameEs: 'Pulsera Hombre Acero', nameAr: 'سوار رجالي فولاذي', price: '9,99 €', oldPrice: '22,99 €', discount: 57, shipping: '+ 1,49 €', image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/afbfc85420d7.jpg', url: '/categorie/accessoires', category: 'ACCESSOIRES', catKey: 'catLabel.accessoires' },
];

/* Hero banner slides — auto-rotating carousel */
const heroBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop&q=80',
    titleKey: 'banner.modeFemmeTitle',
    subKey: 'banner.modeFemmeSub',
    slug: 'mode-femme',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 2,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2b721c82f06.jpg',
    titleKey: 'banner.autoMotoTitle',
    subKey: 'banner.autoMotoSub',
    slug: 'auto-moto',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1400&h=500&fit=crop&q=80',
    titleKey: 'banner.parfumsTitle',
    subKey: 'banner.parfumsSub',
    slug: 'parfums-cosmetiques',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1400&h=500&fit=crop&q=80',
    titleKey: 'banner.phonesTitle',
    subKey: 'banner.phonesSub',
    slug: 'telephones',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 5,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c9847eddf48c.jpg',
    titleKey: 'banner.maisonTitle',
    subKey: 'banner.maisonSub',
    slug: 'maison',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 6,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b61836580cc0.jpg',
    titleKey: 'banner.sportTitle',
    subKey: 'banner.sportSub',
    slug: 'sport',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 7,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/208981e1bfa6.jpg',
    titleKey: 'banner.modeHommeTitle',
    subKey: 'banner.modeHommeSub',
    slug: 'mode-homme',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 8,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91598a772487.jpg',
    titleKey: 'banner.bebeTitle',
    subKey: 'banner.bebeSub',
    slug: 'bebe-enfant',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 10,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dd6b265b892d.jpg',
    titleKey: 'banner.chaussuresTitle',
    subKey: 'banner.chaussuresSub',
    slug: 'chaussures',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {                                                                                   
    id: 11,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3ec023da81b0.jpg',
    titleKey: 'banner.beauteTitle',
    subKey: 'banner.beauteSub',
    slug: 'parfums-cosmetiques',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {                                                                                   
    id: 12,
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/721aaf9e0072.jpeg',
    titleKey: 'banner.electroniqueTitle',
    subKey: 'banner.electroniqueSub',
    slug: 'electronique',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
];

/* Secondary nav category links */
const navCatLinks = [
  { key: 'shop.auto', slug: 'auto-moto' },
  { key: 'shop.modeFemme', slug: 'mode-femme' },
  { key: 'shop.maison', slug: 'maison' },
  { key: 'shop.parfumsCosmetiques', slug: 'parfums-cosmetiques' },
  { key: 'shop.telephones', slug: 'telephones' },
  { key: 'shop.electronique', slug: 'electronique' },
  { key: 'shop.accessoires', slug: 'accessoires' },
  { key: 'shop.sport', slug: 'sport' },
];

/* ================================================================== */
/*  Main Page Component                                                */
/* ================================================================== */
interface ProductViewState {
  pid: string;
  name: string;
  image: string;
  price: number;
}

export default function Home() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CatSlug | null>(null);
  const [activeProduct, setActiveProduct] = useState<ProductViewState | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const addItemCart = useCartStore(function(state) { return state.addItem; });
  const openCart = useCartStore(function(state) { return state.open; });

  /* Auto-rotate hero banner */
  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => {
      if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    };
  }, []);

  const goBanner = (i: number) => {
    setBannerIndex(i);
    if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    bannerTimerRef.current = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
  };

  const scrollCarousel = (direction: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction * 400, behavior: 'smooth' });
    }
  };

  /* router.push used for category navigation — no more custom events */

  /* ---- Product detail view ---- */
  if (activeProduct) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => {}} />
        <ProductDetail
          pid={activeProduct.pid}
          productName={activeProduct.name}
          productImage={activeProduct.image}
          productPrice={activeProduct.price}
          onBack={() => {
            setActiveProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ChatWidget />
        <MobileNav />
      </div>
    );
  }

  /* ---- Category drill-down view ---- */
  if (activeCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-noir pb-20 md:pb-0">
        <Navbar onCartClick={() => {}} />
        <CategoryPage
          category={activeCategory}
          onBack={() => {
            setActiveCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onProductClick={(pid, name, image, price) => {
            setActiveProduct({ pid, name, image, price });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Footer />
        <ChatWidget />
        <MobileNav />
      </div>
    );
  }

  /* ---- MAIN HOMEPAGE ---- */
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <Navbar onCartClick={() => {}} onProfileClick={() => {}} />

      <main className="flex-1 pb-20 md:pb-0">
        {/* ----------------------------------------------------------- */}
        {/*  SECONDARY NAVIGATION — Horizontal category links          */}
        {/* ----------------------------------------------------------- */}
        <div className="bg-noir border-b border-border hidden md:block">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between h-11">
            <div className="flex items-center gap-6">
              {navCatLinks.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => router.push('/categorie/' + cat.slug)}
                  className="text-xs font-medium text-foreground/70 hover:text-gold transition-colors tracking-wide whitespace-nowrap"
                >
                  {t(cat.key)}
                </button>
              ))}
            </div>
            <button
              onClick={() => document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase gold-btn whitespace-nowrap"
            >
              {t('nav.deals')} 🔥
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/*  HERO BANNER — Video background + rotating text                   */}
        {/* ----------------------------------------------------------- */}
        <section className="relative w-full bg-noir py-1">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center gap-3 lg:gap-4">
            {/* Left AdSense */}
            <div className="hidden lg:flex flex-1 h-[400px] items-center justify-center">
              <AdSenseBlock className="!my-0 w-full h-full max-w-full" />
            </div>

            {/* Center — Video banner */}
            <div className="w-full lg:w-[1000px] shrink-0">
              <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden">
                {/* Video background */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/hero.mp4"
                  poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=400&fit=crop&q=80"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                {/* Rotating text */}
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="px-5 sm:px-8 lg:px-10 w-full">
                    <p className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 tracking-widest uppercase transition-all duration-500">{t(heroBanners[bannerIndex].subKey)}</p>
                    <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gold-text mb-3 sm:mb-4 leading-tight transition-all duration-500">{t(heroBanners[bannerIndex].titleKey)}</h2>
                    <button
                      onClick={() => router.push('/categorie/' + heroBanners[bannerIndex].slug)}
                      className="gold-btn px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase"
                    >
                      {t('banner.discover')}
                    </button>
                  </div>
                </div>

                {/* Left/Right arrows */}
                <button
                  onClick={() => goBanner((bannerIndex - 1 + heroBanners.length) % heroBanners.length)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button
                  onClick={() => goBanner((bannerIndex + 1) % heroBanners.length)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                  {heroBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goBanner(i)}
                      className={`rounded-full transition-all duration-300 ${i === bannerIndex ? 'w-7 h-2.5 bg-gold' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right AdSense */}
            <div className="hidden lg:flex flex-1 h-[400px] items-center justify-center">
              <AdSenseBlock className="!my-0 w-full h-full max-w-full" />
            </div>
          </div>
        </section>

        <section id="promotions" className="bg-noir py-3 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <Flame size={18} className="text-red-400" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">{t('home.promoFlash')}</h2>
                  <p className="text-[11px] text-muted-foreground">{t('home.promoFlashSub')}</p>
                </div>
              </div>
              <button onClick={() => router.push('/categories')}
                className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                {t('home.allPromos')} <ArrowRight size={12} />
              </button>
            </div>

            {/* Horizontal scroll row of compact product cards */}
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {promoFlashProducts.map((p) => (
                <div key={p.id}
                  className="snap-start shrink-0 w-[140px] sm:w-[155px] bg-noir-card border border-border rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => router.push(p.url)}
                >
                  {/* Small product photo */}
                  <div className="relative h-[100px] sm:h-[110px] bg-white/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category badge — top left */}
                    <span className="absolute top-1.5 left-1.5 bg-gold text-noir text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded leading-tight">
                      {p.catKey ? t(p.catKey) : p.category}
                    </span>
                    {/* Discount badge — top right */}
                    {p.discount && (
                      <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">
                        -{p.discount}%
                      </span>
                    )}
                    {/* Hover cart overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={function(e) {
                          e.stopPropagation();
                          addItemCart({ pid: p.id, name: getLocalName(p, locale), image: p.image, price: parsePrice(p.price), originalPrice: p.oldPrice ? parsePrice(p.oldPrice) : undefined });
                          openCart();
                        }}
                        className="gold-btn text-[10px] sm:text-[11px] px-2.5 py-1"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-2 sm:p-2.5">
                    <p className="text-[10px] sm:text-[11px] text-foreground/70 leading-tight line-clamp-2 mb-1.5 min-h-[24px] sm:min-h-[28px] group-hover:text-gold transition-colors">{getLocalName(p, locale)}</p>
                    <div className="flex items-end justify-between gap-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs sm:text-sm font-bold text-gold">{p.price}</span>
                        {p.oldPrice && (
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground line-through">{p.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/*  UZALUS TOOLS — Grid of free tools                            */}
        {/* ----------------------------------------------------------- */}
        <section id="uzalus-tools" className="py-1 bg-noir">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Wrench size={24} className="text-gold" />
                <div>
                  <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gold-text">
                    {t('home.uzalusTools')}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">{t('home.toolsSub')}</p>
                </div>
              </div>
              <button onClick={() => router.push('/tools')} className="text-sm text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                {t('home.seeAllTools')} <ArrowRight size={14} />
              </button>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
              {uzalusTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.nameKey}
                    onClick={() => router.push('/tools')}
                    className="group flex flex-col items-center p-4 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon size={20} className={tool.color} />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90 text-center leading-tight">
                      {t(tool.nameKey)}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {t(tool.descKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/*  FEATURE CARDS — 4 columns                                    */}
        {/* ----------------------------------------------------------- */}
        <section className="bg-noir pt-2">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-gold shrink-0" />
                <span className="text-[11px] text-foreground/60">{t('trust.fastDelivery')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gold shrink-0" />
                <span className="text-[11px] text-foreground/60">{t('trust.securePay')}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-gold shrink-0" />
                <span className="text-[11px] text-foreground/60">{t('trust.easyReturn')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={16} className="text-gold shrink-0" />
                <span className="text-[11px] text-foreground/60">{t('trust.manyProducts')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Boutique */}
              <button
                onClick={() => router.push('/categories')}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <ShoppingBag size={22} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">{t('home.boutique')}</h3>
                  <p className="text-xs text-muted-foreground truncate">{t('home.boutiqueDesc')}</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    {t('home.discover')} <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* Auto & Moto */}
              <button
                onClick={() => router.push('/categorie/auto-moto')}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Car size={22} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">{t('home.autoMoto')}</h3>
                  <p className="text-xs text-muted-foreground truncate">{t('home.autoMotoDesc')}</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    {t('home.search')} <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* UZALUS Tools */}
              <button
                onClick={() => router.push('/tools')}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <Wrench size={22} className="text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">{t('home.toolsCard')}</h3>
                  <p className="text-xs text-muted-foreground truncate">{t('home.toolsCardDesc')}</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    {t('home.use')} <ArrowRight size={12} />
                  </span>
                </div>
              </button>

              {/* Tendances */}
              <button
                onClick={() => document.getElementById('tendances')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 p-5 rounded-xl bg-noir-card border border-border hover:border-gold/30 transition-all duration-300 text-start"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Flame size={22} className="text-orange-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">{t('home.tendancesCard')}</h3>
                  <p className="text-xs text-muted-foreground truncate">{t('home.tendancesCardDesc')}</p>
                  <span className="text-xs text-gold font-semibold mt-1 inline-flex items-center gap-1">
                    {t('home.seeTrends')} <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/*  {t('home.tendances')} — Horizontal scrollable products          */}
        {/* ----------------------------------------------------------- */}
        <section id="tendances" className="py-1 bg-noir-light/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Flame size={24} className="text-orange-400" />
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold gold-text">
                  {t('home.tendances')}
                </h2>
              </div>
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors"
              >
                {t('home.seeAll')} <ArrowRight size={14} />
              </button>
            </div>

            {/* Products horizontal scroll */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-48 sm:w-52 snap-start group bg-noir-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] cursor-pointer"
                  onClick={() => router.push('/categories')}
                >
                  <div className="relative aspect-square overflow-hidden bg-noir-lighter">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded text-[10px] font-bold bg-gold text-noir">
                      -{product.discount}%
                    </span>
                    {/* Hover cart overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={function(e) {
                          e.stopPropagation();
                          addItemCart({ pid: String(product.id), name: getLocalName(product, locale), image: product.image, price: product.price, originalPrice: product.oldPrice });
                          openCart();
                        }}
                        className="gold-btn text-xs px-3 py-1.5"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-foreground/90 mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                      {getLocalName(product, locale)}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm font-bold text-gold">{product.price.toFixed(2)} €</span>
                      <span className="text-xs text-muted-foreground line-through">
                        {product.oldPrice.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-[11px] text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ----------------------------------------------------------- */}
        {/*  UZALUS — Pièces détachées Auto & Moto                        */}
        {/* ----------------------------------------------------------- */}
        <section className="bg-noir py-1 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Car size={18} className="text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">{t('home.autoTitle')}</h2>
                  <p className="text-[11px] text-muted-foreground">{t('home.autoSub')}</p>
                </div>
              </div>
              <button onClick={() => router.push('/categories')}
                className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                {t('home.seeAll')} <ArrowRight size={12} />
              </button>
            </div>

            {/* Horizontal scroll carousel */}
            <div className="relative group/carousel">
              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                ref={carouselRef}
              >
                {autoPartsProducts.map((p) => (
                  <div key={p.id}
                    className="snap-start shrink-0 w-[170px] sm:w-[185px] bg-noir-card border border-border rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    onClick={() => router.push('/categorie/auto-moto')}
                  >
                    {/* Image */}
                    <div className="relative h-[130px] bg-white/5 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {p.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{p.discount}%</span>
                      )}
                      {/* Hover cart overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={function(e) {
                            e.stopPropagation();
                            addItemCart({ pid: p.id, name: getLocalName(p, locale), image: p.image, price: parsePrice(p.price), originalPrice: p.oldPrice ? parsePrice(p.oldPrice) : undefined });
                            openCart();
                          }}
                          className="gold-btn text-[10px] px-2.5 py-1"
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-2.5">
                      <p className="text-[11px] text-foreground/70 leading-tight line-clamp-2 mb-2 min-h-[28px]">{getLocalName(p, locale)}</p>
                      <div className="flex items-end justify-between">
                        <div>
                          {p.oldPrice && (
                            <span className="text-[10px] text-muted-foreground line-through mr-1">{p.oldPrice}</span>
                          )}
                          <span className="text-sm font-bold text-gold">{p.price}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400">{p.shippingKey ? t(p.shippingKey) : p.shipping}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll arrows */}
              <button onClick={() => scrollCarousel(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 rounded-full bg-noir-card border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:border-gold/40 z-10">
                <ArrowRight size={14} className="text-foreground rotate-180" />
              </button>
              <button onClick={() => scrollCarousel(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 rounded-full bg-noir-card border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:border-gold/40 z-10">
                <ArrowRight size={14} className="text-foreground" />
              </button>
            </div>
          </div>
        </section>


        {/* ----------------------------------------------------------- */}
        {/*  UZALUS — Meilleures ventes toutes catégories                    */}
        {/* ----------------------------------------------------------- */}
        <section id="categories" className="bg-noir py-1 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Package size={18} className="text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">{t('home.bestSellers')}</h2>
                  <p className="text-[11px] text-muted-foreground">{t('home.bestSellersSub')}</p>
                </div>
              </div>
              <button onClick={() => router.push('/categories')}
                className="text-xs text-gold hover:text-gold-light font-semibold flex items-center gap-1 transition-colors">
                {t('home.seeAll')} <ArrowRight size={12} />
              </button>
            </div>

            {/* Grid 4 colonnes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {uzalusBestSellers.map((p) => (
                <div key={p.id}
                  className="bg-noir-card border border-border rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => router.push(p.url)}
                >
                  <div className="relative aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={getLocalName(p, locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {p.category && (
                      <span className="absolute top-2 left-2 bg-gold text-noir text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded leading-tight">{p.catKey ? t(p.catKey) : p.category}</span>
                    )}
                    {p.discount && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{p.discount}%</span>
                    )}
                    {/* Hover cart overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={function(e) {
                          e.stopPropagation();
                          addItemCart({ pid: p.id, name: getLocalName(p, locale), image: p.image, price: parsePrice(p.price), originalPrice: p.oldPrice ? parsePrice(p.oldPrice) : undefined });
                          openCart();
                        }}
                        className="gold-btn text-[10px] px-2.5 py-1"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] text-foreground/70 leading-tight line-clamp-2 mb-2 min-h-[28px]">{getLocalName(p, locale)}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        {p.oldPrice && (
                          <span className="text-[10px] text-muted-foreground line-through mr-1">{p.oldPrice}</span>
                        )}
                        <span className="text-sm font-bold text-gold">{p.price}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">{p.shippingKey ? t(p.shippingKey) : p.shipping}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ----------------------------------------------------------- */}
        {/*  POPULAR PRODUCTS GRID — 100+ real CJ products               */}
        {/* ----------------------------------------------------------- */}
        <PopularGrid />

      </main>

      <Footer />
      <ChatWidget />
      <MobileNav />
      <CartSidebar />
    </div>
  );
}
