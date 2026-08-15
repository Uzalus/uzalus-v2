// Allow Vercel to wait up to 30s for CJ API response
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';
import { CJDropshippingAPI, UZALUS_TO_CJ_CATEGORIES } from '@/lib/cj-api';

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

    if (!cjEmail || !cjApiKey) {
      return NextResponse.json({
        success: false,
        error: 'CJ Dropshipping API non configuré. Définissez CJ_EMAIL et CJ_API_KEY dans .env',
        products: [],
      }, { status: 400 });
    }

    const cj = new CJDropshippingAPI(cjEmail, cjApiKey);

    const catMapping = UZALUS_TO_CJ_CATEGORIES[category];
    const params: Parameters<typeof cj.listProducts>[0] = {
      page,
      pageSize,
      shipTo: 'FR',
      ePacket: true,
      sortType,
    };

    if (catMapping) {
      if (catMapping.cjCatIds) params.categoryIds = catMapping.cjCatIds;
      if (keyword) {
        params.keywords = keyword;
      } else if (catMapping.keywords) {
        params.keywords = catMapping.keywords;
      }
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
