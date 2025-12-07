import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/app/components/ProductCard';
import type { Product } from '@/lib/types';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 'gid://shopify/Product/1',
    title: 'Test Product',
    handle: 'test-product',
    availableForSale: true,
    totalInventory: 10,
    priceRange: {
      minVariantPrice: {
        amount: '29.99',
        currencyCode: 'EUR',
      },
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://example.com/image.jpg',
            altText: 'Test Image',
          },
        },
      ],
    },
  };

  it('renders product title', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays formatted price correctly', () => {
    render(<ProductCard product={mockProduct} />);
    const priceElement = screen.getByTestId('product-price');
    expect(priceElement).toHaveTextContent('€29.99');
  });

  it('shows product image', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByRole('img', { name: /Test Image/i });
    expect(image).toBeInTheDocument();
  });

  it('displays out of stock overlay when not available', () => {
    const unavailableProduct = { ...mockProduct, availableForSale: false };
    render(<ProductCard product={unavailableProduct} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('does not show out of stock overlay when available', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.queryByText('Out of Stock')).not.toBeInTheDocument();
  });

  it('has proper data-testid for testing', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('uses placeholder image when no image available', () => {
    const productWithoutImage = {
      ...mockProduct,
      images: { edges: [] },
    };
    render(<ProductCard product={productWithoutImage} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
