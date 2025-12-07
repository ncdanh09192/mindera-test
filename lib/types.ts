// Shopify Storefront API Types

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
}

export interface ImageEdge {
  node: Image;
}

export interface PriceRange {
  minVariantPrice: Money;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  totalInventory?: number;
  priceRange: PriceRange;
  images: {
    edges: ImageEdge[];
  };
}

export interface ProductEdge {
  cursor: string;
  node: Product;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface ProductConnection {
  edges: ProductEdge[];
  pageInfo: PageInfo;
}

export interface ProductsResponse {
  products: ProductConnection;
}

export type SortOption = 'PRICE_ASC' | 'PRICE_DESC';

export interface ProductQueryVariables {
  first: number;
  after?: string | null;
  sortKey?: 'PRICE';
  reverse?: boolean;
}
