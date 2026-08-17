// Fallback-first strategy: always return curated products, enhanced by CJ API when available
export const maxDuration = 10;

import { NextRequest, NextResponse } from 'next/server';
import { fallbackProducts, FallbackProduct, toCJProduct } from '@/lib/fallback-products';

// GET /api/cj/products?category=electronique&keyword=serum
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const keyword = searchParams.get('keyword') || '';

    // 1) Always start with fallback products for the requested category
    let filtered = fallbackProducts.filter(function(p) { return p.slug === category; });

    // 2) If keyword provided, further filter fallback by name
    if (keyword) {
      var kw = keyword.toLowerCase();
      filtered = filtered.filter(function(p) { return p.name.toLowerCase().includes(kw); });
    }

    // 3) Try CJ API in background only if we have credentials AND need more products
    var cjEmail = process.env.CJ_EMAIL || '';
    var cjApiKey = process.env.CJ_API_KEY || '';

    if (cjEmail && cjApiKey) {
      try {
        var cjProducts = await fetchCJProducts(cjEmail, cjApiKey, category, keyword);
        if (cjProducts.length > 0) {
          // Merge: fallback first, then unique CJ products (max 100 total)
          var existingPids = new Set(filtered.map(function(p) { return p.pid; }));
          var uniqueCJ = cjProducts.filter(function(p) { return !existingPids.has(String(p.pid)); });
          filtered = filtered.concat(uniqueCJ.slice(0, 100 - filtered.length));
        }
      } catch (cjError) {
        // Silently ignore CJ API errors — fallback products are enough
        console.error('CJ API skipped:', cjError);
      }
    }

    var products = filtered.map(toCJProduct);

    return NextResponse.json({
      success: true,
      products: products,
      total: products.length,
      page: 1,
      pageSize: products.length,
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur serveur',
      products: [],
    }, { status: 500 });
  }
}

/**
 * Fetch from CJ API with a 5s timeout to avoid Vercel Hobby plan limits
 */
async function fetchCJProducts(email: string, apiKey: string, category: string, keyword: string) {
  var CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

  // Get access token
  var authRes = await fetch(CJ_BASE_URL + '/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: apiKey }),
  });
  var authData = await authRes.json();
  if (authData.code !== 200 || !authData.data?.accessToken) {
    return [];
  }
  var token = authData.data.accessToken;

  // Category-to-CJ mapping
  var catMap: Record<string, { ids: string; kw: string }> = {
    'mode-homme': { ids: '1001,1002', kw: 'men fashion clothing shirt' },
    'mode-femme': { ids: '1003,1004', kw: 'women fashion dress clothing' },
    'enfant': { ids: '1009,1010', kw: 'kids children clothing baby' },
    'chaussures': { ids: '1013', kw: 'shoes sneakers boots' },
    'maison': { ids: '1201,1202,1203', kw: 'home decor garden' },
    'accessoires': { ids: '1015,1016,1017', kw: 'bag jewelry watch sunglasses' },
    'telephones': { ids: '1501', kw: 'phone case mobile accessories' },
    'parfums-cosmetiques': { ids: '1711,1712,1713', kw: 'perfume cosmetics makeup skincare' },
    'auto-moto': { ids: '1300', kw: 'car auto motorcycle accessories' },
    'electronique': { ids: '1501,1502', kw: 'electronics gadgets tech' },
    'sport': { ids: '1101,1102', kw: 'sport fitness outdoor' },
    'bricolage': { ids: '1204', kw: 'tools hardware DIY repair' },
    'animaux': { ids: '1700', kw: 'pet dog cat supplies' },
    'jouets': { ids: '1011', kw: 'toys kids games' },
    'bureau': { ids: '1600', kw: 'office stationery supplies' },
    'bagagerie': { ids: '1015', kw: 'luggage suitcase travel bag backpack' },
    'alimentation': { ids: '1701', kw: 'food kitchen accessories' },
    'emballage': { ids: '1205', kw: 'packaging box gift bag' },
  };

  var mapping = catMap[category];
  var params = new URLSearchParams();
  params.set('email', email);
  params.set('page', '1');
  params.set('pageSize', '20');
  params.set('shipTo', 'FR');
  params.set('sortType', 'salesVolume');

  if (mapping) {
    params.set('categoryIds', mapping.ids);
    if (!keyword) params.set('keywords', mapping.kw);
  }
  if (keyword) params.set('keywords', keyword);

  // Fetch with 5s timeout
  var controller = new AbortController();
  var timeoutId = setTimeout(function() { controller.abort(); }, 5000);

  try {
    var res = await fetch(CJ_BASE_URL + '/product/list?' + params.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': token,
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    var data = await res.json();
    if (data.code !== 200) return [];

    return (data.data?.list || []).map(function(p: any) {
      return {
        pid: String(p.pid || ''),
        productName: p.productNameEn || p.productName || '',
        image: p.productImage || '',
        sellPrice: parseCJPrice(p.sellPrice),
        originalPrice: parseCJPrice(p.originalPrice) || undefined,
        discount: p.discount ? Number(p.discount) : undefined,
        rating: p.rating ? Number(p.rating) : undefined,
        comments: p.commentCount ? Number(p.commentCount) : undefined,
      };
    });
  } catch (e) {
    clearTimeout(timeoutId);
    return [];
  }
}

function parseCJPrice(raw: any): number {
  if (typeof raw === 'number') return raw > 0 ? raw : 0;
  if (typeof raw !== 'string') return 0;
  var match = raw.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}
