// CJ Dropshipping API v2 Client for UZALUS V2
// Documentation: https://developers.cjdropshipping.com/en/api/api2/api/product.html

export interface CJProduct {
  pid: string;           // CJ Product ID
  productNameEn: string; // English product name
  productNameFr?: string;
 variInfo?: CJVariant[];
  productImage: string;  // Main product image URL
  sellPrice: number;     // CJ selling price (USD)
  originalPrice?: number;
  category?: {
    catId: string;
    catName: string;
  };
  rating?: number;
  ePacketAvailable?: boolean;
  shipTo?: string[];     // Available shipping destinations
  weight?: number;
  description?: string;
}

export interface CJVariant {
  skuId: string;
  variantImg?: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  attrName?: string;  // e.g. "Color:Red;Size:L"
}

export interface CJListResponse {
  code: number;
  message: string;
  data: {
    list: CJProduct[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface CJCategory {
  catId: string;
  catName: string;
  parentId?: string;
  level?: number;
}

const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

export class CJDropshippingAPI {
  private email: string;
  private apiKey: string;

  constructor(email: string, apiKey: string) {
    this.email = email;
    this.apiKey = apiKey;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'CJ-Access-Token': this.apiKey,
    };
  }

  /**
   * List products with criteria (V2 GET)
   * Docs: https://developers.cjdropshipping.com/en/api/api2/api/product.html
   */
  async listProducts(params: {
    categoryIds?: string;  // Comma-separated category IDs
    keywords?: string;     // Search keywords
    page?: number;         // Default 1
    pageSize?: number;     // Default 20, max 100
    minPrice?: number;     // Min sell price
    maxPrice?: number;     // Max sell price
    shipTo?: string;       // e.g. 'FR' for France
    ePacket?: boolean;     // ePacket shipping only
    sortType?: string;     // 'default', 'salesVolume', 'priceAsc', 'priceDesc', 'newArrival'
  } = {}): Promise<CJListResponse> {
    const searchParams = new URLSearchParams();
    searchParams.set('email', this.email);
    
    if (params.categoryIds) searchParams.set('categoryIds', params.categoryIds);
    if (params.keywords) searchParams.set('keywords', params.keywords);
    if (params.page) searchParams.set('page', String(params.page));
    if (params.pageSize) searchParams.set('pageSize', String(Math.min(params.pageSize, 100)));
    if (params.minPrice) searchParams.set('minPrice', String(params.minPrice));
    if (params.maxPrice) searchParams.set('maxPrice', String(params.maxPrice));
    if (params.shipTo) searchParams.set('shipTo', params.shipTo);
    if (params.ePacket) searchParams.set('ePacket', 'true');
    if (params.sortType) searchParams.set('sortType', params.sortType);

    const url = `${CJ_BASE_URL}/product/list?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Get product details by CJ product ID
   */
  async getProduct(pid: string): Promise<{ code: number; data: CJProduct }> {
    const url = `${CJ_BASE_URL}/product/query?email=${encodeURIComponent(this.email)}&pid=${pid}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<{ code: number; data: { categories: CJCategory[] } }> {
    const url = `${CJ_BASE_URL}/product/category?email=${encodeURIComponent(this.email)}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Get shipping cost estimate
   */
  async getShippingCost(params: {
    pid: string;
    quantity?: number;
    shipTo: string;  // Country code, e.g. 'FR'
  }): Promise<{ code: number; data: { shippingCost: number; methods: Array<{ name: string; cost: number; days: number }> } }> {
    const searchParams = new URLSearchParams();
    searchParams.set('email', this.email);
    searchParams.set('pid', params.pid);
    searchParams.set('quantity', String(params.quantity || 1));
    searchParams.set('shipTo', params.shipTo);

    const url = `${CJ_BASE_URL}/product/shipping?${searchParams.toString()}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Create an order on CJ
   */
  async createOrder(params: {
    items: Array<{
      pid: string;
      quantity: number;
      skuId?: string;
      variImg?: string;
      price?: number;
      shippingMethod?: string;
    }>;
    shippingAddress: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      country: string;
      state?: string;
      city: string;
      address1: string;
      address2?: string;
      zipCode: string;
    };
  }): Promise<{ code: number; data: { orderId: string; trackingNumber?: string } }> {
    const url = `${CJ_BASE_URL}/order/createOrder`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        email: this.email,
        ...params,
      }),
    });

    if (!res.ok) {
      throw new Error(`CJ API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }
}

/**
 * Mapping from UZALUS categories to CJ category IDs
 * These are approximate — the user should verify on their CJ dashboard
 */
export const UZALUS_TO_CJ_CATEGORIES: Record<string, { cjCatIds: string; keywords: string }> = {
  'mode-homme': { cjCatIds: '1001,1002', keywords: 'men fashion clothing shirt' },
  'mode-femme': { cjCatIds: '1003,1004', keywords: 'women fashion dress clothing' },
  'enfant': { cjCatIds: '1009,1010', keywords: 'kids children clothing baby' },
  'chaussures': { cjCatIds: '1013', keywords: 'shoes sneakers boots' },
  'maison': { cjCatIds: '1201,1202,1203', keywords: 'home decor garden' },
  'accessoires': { cjCatIds: '1015,1016,1017', keywords: 'bag jewelry watch sunglasses' },
  'telephones': { cjCatIds: '1501', keywords: 'phone case mobile accessories' },
  'parfums-cosmetiques': { cjCatIds: '1711,1712,1713', keywords: 'perfume cosmetics makeup skincare' },
  'auto-moto': { cjCatIds: '1300', keywords: 'car auto motorcycle accessories' },
  'emballage': { cjCatIds: '1205', keywords: 'packaging box gift bag' },
  'electronique': { cjCatIds: '1501,1502', keywords: 'electronics gadgets tech' },
  'sport': { cjCatIds: '1101,1102', keywords: 'sport fitness outdoor' },
  'bricolage': { cjCatIds: '1204', keywords: 'tools hardware DIY repair' },
  'animaux': { cjCatIds: '1700', keywords: 'pet dog cat supplies' },
  'jouets': { cjCatIds: '1011', keywords: 'toys kids games' },
  'bureau': { cjCatIds: '1600', keywords: 'office stationery supplies' },
  'bagagerie': { cjCatIds: '1015', keywords: 'luggage suitcase travel bag backpack' },
  'alimentation': { cjCatIds: '1701', keywords: 'food kitchen accessories' },
};

/**
 * Price multiplier for converting CJ price to UZALUS selling price
 * CJ prices are in USD, UZALUS prices are in EUR
 * Typical dropshipping margin: 2x-4x the cost price
 */
export const PRICE_SETTINGS = {
  /** Multiplier applied to CJ cost price */
  marginMultiplier: 2.5,
  /** EUR to USD conversion rate */
  eurToUsd: 1.08,
  /** Fixed shipping cost added (EUR) */
  shippingMarkup: 4.99,
  /** VAT rate for EU */
  vatRate: 0.20,
};

/**
 * Calculate UZALUS selling price from CJ cost price
 */
export function calculateSellingPrice(cjPriceUsd: number): { price: number; cost: number } {
  const { marginMultiplier, eurToUsd, shippingMarkup } = PRICE_SETTINGS;
  const costEur = (cjPriceUsd / eurToUsd) + shippingMarkup;
  const sellingPrice = costEur * marginMultiplier;
  
  return {
    price: Math.round(sellingPrice * 100) / 100,
    cost: Math.round(costEur * 100) / 100,
  };
}
