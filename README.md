# Mindera Shopify Headless Product Listing

A headless Shopify product listing page built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates a modern e-commerce storefront with product filtering, sorting, and pagination.

## Features

✅ **Product Listing** - Display products with stock availability
✅ **Price Sorting** - Sort by price (high to low, low to high)
✅ **Pagination** - Load 12 products at a time with "Load More" button
✅ **Responsive Design** - Mobile-first design that works on all screen sizes
✅ **Type Safety** - Full TypeScript implementation
✅ **Testing** - Unit and integration tests with Vitest

## Quick Start

### One-Command Setup

```bash
make start
```

That's it! The application will automatically:
1. Install dependencies (if needed)
2. Create `.env.local` from `.env.example` (if needed)
3. Start the development server on http://localhost:3000

### Prerequisites

- Node.js 18+
- npm or yarn
- A Shopify store with Storefront API access token

### Manual Setup

If you prefer to set up manually:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mindera-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your Shopify credentials to `.env.local`**
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to http://localhost:3000

## Getting Shopify Storefront API Token

1. Log in to your Shopify Admin
2. Go to **Settings** → **Apps and sales channels** → **Develop apps**
3. Click **Create an app**
4. Configure **Storefront API** permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
5. Install the app
6. Copy the **Storefront API access token**
7. Add it to your `.env.local` file

## Available Commands

```bash
# Development
make start          # Setup and start dev server (default)
make dev            # Alias for 'make start'

# Building
make build          # Build for production

# Testing
make test           # Run tests
make test-coverage  # Run tests with coverage report

# Utilities
make setup          # Install dependencies and setup .env
make clean          # Remove node_modules, .next, and .env.local
make help           # Show all available commands
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Shopify Storefront API (GraphQL)
- **Testing**: Vitest + React Testing Library
- **Image Optimization**: Next.js Image component

## Project Structure

```
mindera-test/
├── app/
│   ├── components/
│   │   ├── ProductCard.tsx      # Individual product card
│   │   ├── ProductGrid.tsx      # Product grid layout
│   │   ├── SortDropdown.tsx     # Sorting dropdown
│   │   └── LoadMoreButton.tsx   # Pagination button
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage (product listing)
│   └── globals.css              # Global styles
├── lib/
│   ├── shopify.ts               # Shopify API client
│   ├── queries.ts               # GraphQL queries
│   └── types.ts                 # TypeScript types
├── __tests__/
│   ├── components/              # Component unit tests
│   └── integration/             # Integration tests
├── .env.example                 # Environment variable template
├── Makefile                     # Build automation
└── README.md                    # This file
```

## Testing

### Run all tests
```bash
npm test
# or
make test
```

### Run tests with coverage
```bash
npm run test:coverage
# or
make test-coverage
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Test Coverage

The project includes:
- **Unit tests** for all components (ProductCard, ProductGrid, SortDropdown, LoadMoreButton)
- **Integration tests** for the product listing page
- Tests for sorting functionality
- Tests for pagination (load more)
- Tests for loading and error states

## Key Features Explained

### Stock Filtering
Only products with `availableForSale: true` are displayed. The GraphQL query includes a filter:
```graphql
query: "available_for_sale:true"
```

### Price Sorting
Users can sort products by:
- **Price: Low to High** (`sortKey: PRICE, reverse: false`)
- **Price: High to Low** (`sortKey: PRICE, reverse: true`)

Sorting triggers a new API call to fetch products in the correct order.

### Pagination
- Initial load: 12 products
- "Load More" button fetches the next 12 products
- Uses cursor-based pagination (`after` parameter)
- Button disappears when no more products available

### Responsive Design
- **Mobile**: 1 column
- **Tablet** (640px+): 2 columns
- **Desktop** (1024px+): 3 columns
- **Large Desktop** (1280px+): 4 columns

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | `mindera-test-store.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API public token | `shpat_xxxxx...` |
| `SHOPIFY_STOREFRONT_API_VERSION` | Shopify API version | `2025-07` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. This is safe for Storefront API tokens, which are designed to be public.

## Security Considerations

- ✅ **Storefront API tokens** are safe to expose (read-only, public data)
- ✅ Environment variables are in `.gitignore`
- ✅ No Admin API tokens used (would require server-side only)
- ✅ HTTPS enforced for all API calls
- ✅ Next.js Image component prevents image-based attacks

## Performance Optimizations

- **Next.js Image Component**: Automatic image optimization and lazy loading
- **Cursor-based Pagination**: Efficient loading of large product catalogs
- **Client-side Caching**: Products stay in memory during sort operations
- **Tailwind CSS**: Minimal CSS bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### "Failed to load products"
- Check that your `.env.local` file exists and has valid credentials
- Verify your Storefront API token is correct
- Ensure your Shopify store domain is correct (without `https://`)

### Images not loading
- Check that `next.config.js` has Shopify CDN in `remotePatterns`
- Verify products have valid image URLs

### Tests failing
- Run `npm install` to ensure all dependencies are installed
- Check that `vitest.config.ts` and `vitest.setup.ts` exist

## License

This project is created as a technical assessment for Mindera.

## Contact

For questions or issues, please contact the repository owner.
