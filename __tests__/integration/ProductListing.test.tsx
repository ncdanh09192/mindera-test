import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomePage from '@/app/page';
import * as shopify from '@/lib/shopify';

// Mock the Shopify client
vi.mock('@/lib/shopify', () => ({
  fetchProducts: vi.fn(),
}));

describe('Product Listing Integration', () => {
  const mockProductsResponse = {
    products: {
      edges: [
        {
          cursor: 'cursor1',
          node: {
            id: '1',
            title: 'Product 1',
            handle: 'product-1',
            availableForSale: true,
            priceRange: {
              minVariantPrice: { amount: '10.00', currencyCode: 'EUR' },
            },
            images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/image1.jpg', altText: 'Product 1' } }] },
          },
        },
        {
          cursor: 'cursor2',
          node: {
            id: '2',
            title: 'Product 2',
            handle: 'product-2',
            availableForSale: true,
            priceRange: {
              minVariantPrice: { amount: '20.00', currencyCode: 'EUR' },
            },
            images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/image2.jpg', altText: 'Product 2' } }] },
          },
        },
      ],
      pageInfo: { hasNextPage: true, endCursor: 'cursor2' },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and displays products on mount', async () => {
    vi.mocked(shopify.fetchProducts).mockResolvedValue(mockProductsResponse);

    render(<HomePage />);

    // Should show loading state initially
    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    // Should display product count
    expect(screen.getByText('2 products')).toBeInTheDocument();
  });

  it('calls fetchProducts with correct initial parameters', async () => {
    vi.mocked(shopify.fetchProducts).mockResolvedValue(mockProductsResponse);

    render(<HomePage />);

    await waitFor(() => {
      expect(shopify.fetchProducts).toHaveBeenCalledWith({
        first: 12,
        sortKey: 'PRICE',
        reverse: false,
      });
    });
  });

  it('re-fetches products when sort changes', async () => {
    vi.mocked(shopify.fetchProducts).mockResolvedValue(mockProductsResponse);

    const user = userEvent.setup();
    render(<HomePage />);

    await waitFor(() => screen.getByText('Product 1'));

    const sortSelect = screen.getByRole('combobox', { name: /sort/i });
    await user.selectOptions(sortSelect, 'PRICE_DESC');

    await waitFor(() => {
      expect(shopify.fetchProducts).toHaveBeenCalledWith({
        first: 12,
        sortKey: 'PRICE',
        reverse: true,
      });
    });
  });

  it('loads more products when button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(shopify.fetchProducts)
      .mockResolvedValueOnce(mockProductsResponse)
      .mockResolvedValueOnce({
        products: {
          edges: [
            {
              cursor: 'cursor3',
              node: {
                id: '3',
                title: 'Product 3',
                handle: 'product-3',
                availableForSale: true,
                priceRange: {
                  minVariantPrice: { amount: '30.00', currencyCode: 'EUR' },
                },
                images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/image3.jpg', altText: 'Product 3' } }] },
              },
            },
          ],
          pageInfo: { hasNextPage: false, endCursor: null },
        },
      });

    render(<HomePage />);

    await waitFor(() => screen.getByText('Product 1'));

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    await user.click(loadMoreButton);

    await waitFor(() => {
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    // Should display updated product count
    expect(screen.getByText('3 products')).toBeInTheDocument();
  });

  it('shows completion message when no more pages', async () => {
    vi.mocked(shopify.fetchProducts).mockResolvedValue({
      products: {
        edges: mockProductsResponse.products.edges,
        pageInfo: { hasNextPage: false, endCursor: null },
      },
    });

    render(<HomePage />);

    await waitFor(() => screen.getByText('Product 1'));

    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    expect(screen.getByText(/All 2 products loaded/i)).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    vi.mocked(shopify.fetchProducts).mockRejectedValue(new Error('API Error'));

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load products/i)).toBeInTheDocument();
    });
  });

  it('displays loading state on load more', async () => {
    const user = userEvent.setup();
    vi.mocked(shopify.fetchProducts)
      .mockResolvedValueOnce(mockProductsResponse)
      .mockImplementation(() => new Promise(() => {})); // Never resolves to keep loading state

    render(<HomePage />);

    await waitFor(() => screen.getByText('Product 1'));

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    await user.click(loadMoreButton);

    // Button should show loading text and be disabled
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(loadMoreButton).toBeDisabled();
    });
  });
});
