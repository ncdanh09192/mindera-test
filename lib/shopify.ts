import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { GET_PRODUCTS_QUERY } from './queries';
import type { ProductsResponse, ProductQueryVariables } from './types';

// Shopify configuration
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-07';

// Create Shopify Storefront API client
export const shopifyClient = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION,
  publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

/**
 * Fetch products from Shopify
 * @param variables - Query variables (first, after, sortKey, reverse)
 * @returns Products data with pagination info
 */
export async function fetchProducts(
  variables: ProductQueryVariables
): Promise<ProductsResponse> {
  try {
    const { data, errors } = await shopifyClient.request<ProductsResponse>(
      GET_PRODUCTS_QUERY,
      { variables }
    );

    if (errors) {
      console.error('Shopify API errors:', errors);
      throw new Error('Failed to fetch products from Shopify');
    }

    if (!data) {
      throw new Error('No data returned from Shopify API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
