import { NextResponse } from 'next/server';
import { CJDropshippingAPI } from '@/lib/cj-api';

// GET /api/cj/categories — Get all CJ categories
export async function GET() {
  try {
    const cjEmail = process.env.CJ_EMAIL || '';
    const cjApiKey = process.env.CJ_API_KEY || '';

    if (!cjEmail || !cjApiKey) {
      return NextResponse.json({
        success: false,
        error: 'API CJ non configurée. Ajoutez CJ_EMAIL et CJ_API_KEY dans .env',
      }, { status: 400 });
    }

    const cj = new CJDropshippingAPI(cjEmail, cjApiKey);
    const result = await cj.getCategories();

    return NextResponse.json({
      success: true,
      categories: result.data?.categories || [],
    });
  } catch (error) {
    console.error('CJ Categories error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }, { status: 500 });
  }
}
