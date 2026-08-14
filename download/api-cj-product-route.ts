import { NextRequest, NextResponse } from 'next/server';

// Cache for CJ access token
let cachedToken: string | null = null;
let tokenExpiry = 0;

const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const cjApiKey = process.env.CJ_API_KEY || '';
  if (!cjApiKey) throw new Error('CJ_API_KEY non configuré');

  const res = await fetch(`${CJ_BASE_URL}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: cjApiKey }),
  });

  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.message || 'Token failed');

  cachedToken = data.data.access_token;
  // Cache for 23 hours (CJ tokens last 24h)
  tokenExpiry = now + 23 * 60 * 60 * 1000;
  return cachedToken;
}

// GET /api/cj/product/[pid]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pid: string }> }
) {
  try {
    const { pid } = await params;

    if (!pid) {
      return NextResponse.json({
        success: false,
        error: 'PID manquant',
      }, { status: 400 });
    }

    const token = await getAccessToken();
    const cjEmail = process.env.CJ_EMAIL || '';

    const url = `${CJ_BASE_URL}/product/query?email=${encodeURIComponent(cjEmail)}&pid=${pid}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': token,
      },
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();

    if (result.code !== 200) {
      return NextResponse.json({
        success: false,
        error: result.message || 'Erreur API CJ',
      }, { status: 500 });
    }

    const product = result.data;

    // Parse variants to extract colors and sizes
    const colors: { name: string; image: string }[] = [];
    const sizes: string[] = [];
    const colorSet = new Set<string>();
    const sizeSet = new Set<string>();

    if (product.variInfo && Array.isArray(product.variInfo)) {
      for (const v of product.variInfo) {
        if (v.attrName) {
          const parts = v.attrName.split(';');
          for (const part of parts) {
            const [key, value] = part.split(':');
            if (key && value) {
              const k = key.trim().toLowerCase();
              const val = value.trim();
              if (k.includes('color') || k.includes('couleur') || k.includes('色')) {
                if (!colorSet.has(val)) {
                  colorSet.add(val);
                  colors.push({ name: val, image: v.variantImg || '' });
                }
              }
              if (k.includes('size') || k.includes('taille') || k.includes('尺码')) {
                if (!sizeSet.has(val)) {
                  sizeSet.add(val);
                  sizes.push(val);
                }
              }
            }
          }
        }
      }
    }

    // Extract all images from product
    const images: string[] = [];
    if (product.productImage) {
      images.push(product.productImage);
    }
    // Collect variant images that are unique
    if (product.variInfo) {
      for (const v of product.variInfo) {
        if (v.variantImg && !images.includes(v.variantImg)) {
          images.push(v.variantImg);
        }
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        pid: product.pid,
        productNameEn: product.productNameEn || '',
        productNameFr: product.productNameFr || '',
        productImage: product.productImage || '',
        images: images,
        sellPrice: product.sellPrice || 0,
        originalPrice: product.originalPrice || 0,
        rating: product.rating || 0,
        description: product.description || '',
        weight: product.weight || 0,
        ePacketAvailable: product.ePacketAvailable || false,
        colors: colors,
        sizes: sizes,
        variants: product.variInfo || [],
        category: product.category || null,
      },
    });
  } catch (error) {
    console.error('CJ Product Detail API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }, { status: 500 });
  }
}
