// Allow Vercel to wait up to 30s for CJ API response
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { CJDropshippingAPI, UZALUS_TO_CJ_CATEGORIES } from '@/lib/cj-api';
import { fallbackProducts, FallbackProduct } from '@/lib/fallback-products';

/**
 * Transform fallback products into CJProduct-like format for the frontend
 */
function toCJProduct(p: FallbackProduct) {
  return {
    pid: p.pid,
    productName: p.name,
    productNameEn: p.name,
    productImage: p.image,
    sellPrice: p.price,
    originalPrice: p.oldPrice || undefined,
    discount: p.discount || undefined,
    rating: p.rating,
    commentCount: p.comments,
  };
}

// GET /api/cj/products?category=cosmetiques&keyword=serum
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const keyword = searchParams.get('keyword') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '100');
    const sortType = searchParams.get('sortType') || 'salesVolume';

    const cjEmail = process.env.CJ_EMAIL || '';
    const cjApiKey = process.env.CJ_API_KEY || '';

    // If CJ API is not configured, return fallback products
    if (!cjEmail || !cjApiKey) {
      let filtered = fallbackProducts.filter(p => p.slug === category);

      // If keyword is provided, further filter by name
      if (keyword) {
        const kw = keyword.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(kw));
      }

      // If no specific category or no results, return all products for that category or empty
      const products = filtered.map(toCJProduct);

      return NextResponse.json({
        success: true,
        products,
        total: products.length,
        page: 1,
        pageSize: products.length,
      });
    }

    const cj = new CJDropshippingAPI(cjEmail, cjApiKey);

    const catMapping = UZALUS_TO_CJ_CATEGORIES[category];
    const params: Parameters<typeof cj.listProducts>[0] = {
      page,
      pageSize: Math.min(pageSize, 100),
      shipTo: 'FR',
      sortType,
    };

    // Only add category/keyword filters when category is specified
    // Without category, we get the top products sorted by salesVolume
    if (catMapping) {
      if (catMapping.cjCatIds) params.categoryIds = catMapping.cjCatIds;
      if (catMapping.keywords) params.keywords = catMapping.keywords;
    } else if (keyword) {
      params.keywords = keyword;
    }

    const result = await cj.listProducts(params);

    if (result.code !== 200) {
      return NextResponse.json({
        success: false,
        error: result.message || 'Erreur API CJ',
        products: [],
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      products: result.data?.list || [],
      total: result.data?.total || 0,
      page: result.data?.page || 1,
      pageSize: result.data?.pageSize || 20,
    });
  } catch (error) {
    console.error('CJ Products API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      products: [],
    }, { status: 500 });
  }
}
