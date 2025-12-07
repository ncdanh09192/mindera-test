import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductGrid from '@/app/components/ProductGrid';
import type { Product } from '@/lib/types';

describe('ProductGrid', () => {
  const mockProducts: Product[] = [
    {
      id: 'gid://shopify/Product/1',
      title: 'Product 1',
      handle: 'product-1',
      availableForSale: true,
      priceRange: {
        minVariantPrice: {
          amount: '10.00',
          currencyCode: 'EUR',
        },
      },
      images: {
        edges: [
          {
            node: {
              url: 'https://example.com/image1.jpg',
              altText: 'Product 1',
            },
          },
        ],
      },
    },
    {
      id: 'gid://shopify/Product/2',
      title: 'Product 2',
      handle: 'product-2',
      availableForSale: true,
      priceRange: {
        minVariantPrice: {
          amount: '20.00',
          currencyCode: 'EUR',
        },
      },
      images: {
        edges: [
          {
            node: {
              url: 'https://example.com/image2.jpg',
              altText: 'Product 2',
            },
          },
        ],
      },
    },
  ];

  it('renders all products', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders correct number of product cards', () => {
    render(<ProductGrid products={mockProducts} />);

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
  });

  it('displays empty state when no products', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  it('does not display empty state when products exist', () => {
    render(<ProductGrid products={mockProducts} />);

    expect(screen.queryByText('No products available')).not.toBeInTheDocument();
  });

  it('renders products in grid layout', () => {
    const { container } = render(<ProductGrid products={mockProducts} />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
