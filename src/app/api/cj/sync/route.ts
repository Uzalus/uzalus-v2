import { NextRequest, NextResponse } from 'next/server';
import { CJDropshippingAPI, calculateSellingPrice, UZALUS_TO_CJ_CATEGORIES } from '@/lib/cj-api';

// POST /api/cj/sync — Sync products from CJ to UZALUS
// Body: { category: string, count?: number, minPrice?: number, maxPrice?: number }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, count = 8, minPrice, maxPrice } = body;

    const cjEmail = process.env.CJ_EMAIL || '';
    const cjApiKey = process.env.CJ_API_KEY || '';

    if (!cjEmail || !cjApiKey) {
      return NextResponse.json({
        success: false,
        error: 'API CJ non configurée. Ajoutez CJ_EMAIL et CJ_API_KEY dans le fichier .env',
        instructions: {
          step1: 'Connectez-vous sur cjdropshipping.com',
          step2: "Allez dans Paramètres → API → Générer une clé d'API",
          step3: 'Ajoutez ces lignes dans votre fichier .env :',
          env: 'CJ_EMAIL=votre@email.com\nCJ_API_KEY=votre_clé_api',
        },
      }, { status: 400 });
    }

    const cj = new CJDropshippingAPI(cjEmail, cjApiKey);
    const catMapping = UZALUS_TO_CJ_CATEGORIES[category];

    if (!catMapping) {
      return NextResponse.json({
        success: false,
        error: `Catégorie inconnue: ${category}. Catégories disponibles: ${Object.keys(UZALUS_TO_CJ_CATEGORIES).join(', ')}`,
      }, { status: 400 });
    }

    // Fetch products from CJ
    const result = await cj.listProducts({
      categoryIds: catMapping.cjCatIds || undefined,
      keywords: catMapping.keywords,
      pageSize: Math.min(count, 100),
      shipTo: 'FR',
      ePacket: true,
      sortType: 'salesVolume',
      minPrice: minPrice ? minPrice / 2.5 : undefined, // Convert EUR to approx USD CJ price
      maxPrice: maxPrice ? maxPrice / 2.5 : undefined,
    });

    if (result.code !== 200 || !result.data?.list?.length) {
      return NextResponse.json({
        success: false,
        error: 'Aucun produit trouvé sur CJ pour cette catégorie.',
        suggestion: 'Essayez d\'élargir les critères de recherche ou de changer de catégorie.',
      }, { status: 404 });
    }

    // Transform CJ products to UZALUS format
    const uzalusProducts = result.data.list.map((p, i) => {
      const pricing = calculateSellingPrice(p.sellPrice || 10);
      const originalPrice = Math.round(pricing.price * 1.35 * 100) / 100; // Fake original price for discount display
      const discount = Math.round((1 - pricing.price / originalPrice) * 100);

      return {
        id: 1000 + i,
        cjPid: p.pid,
        name: p.productNameEn || 'Produit',
        nameEn: p.productNameEn || 'Product',
        nameEs: p.productNameEn || 'Producto',
        nameAr: p.productNameEn || 'منتج',
        price: pricing.price,
        oldPrice: originalPrice,
        cost: pricing.cost,
        rating: Math.min(5, Math.max(3.5, (p.rating || 4.0) + Math.random() * 0.5)),
        reviews: Math.floor(Math.random() * 3000) + 100,
        discount,
        badge: i === 0 ? 'bestseller' as const : i < 3 ? 'new' as const : 'sale' as const,
        image: p.productImage || '',
        ePacketAvailable: p.ePacketAvailable,
        source: 'cj' as const,
      };
    });

    return NextResponse.json({
      success: true,
      category,
      synced: uzalusProducts.length,
      total: result.data.total,
      products: uzalusProducts,
    });
  } catch (error) {
    console.error('CJ Sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur de synchronisation',
    }, { status: 500 });
  }
}
