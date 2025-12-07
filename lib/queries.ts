// GraphQL queries for Shopify Storefront API

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(
      first: $first,
      after: $after,
      sortKey: $sortKey,
      reverse: $reverse,
      query: "available_for_sale:true"
    ) {
      edges {
        cursor
        node {
          id
          title
          handle
          availableForSale
          totalInventory
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
