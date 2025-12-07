'use client';

import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import SortDropdown from './components/SortDropdown';
import LoadMoreButton from './components/LoadMoreButton';
import { fetchProducts } from '@/lib/shopify';
import type { Product, SortOption } from '@/lib/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('PRICE_ASC');
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial products and handle sort changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts({
          first: 12,
          sortKey: 'PRICE',
          reverse: sortOption === 'PRICE_DESC',
        });

        setProducts(data.products.edges.map(edge => edge.node));
        setEndCursor(data.products.pageInfo.endCursor);
        setHasNextPage(data.products.pageInfo.hasNextPage);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please check your environment variables.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [sortOption]);

  // Load more products (pagination)
  const handleLoadMore = async () => {
    if (!endCursor || !hasNextPage || loadingMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const data = await fetchProducts({
        first: 12,
        after: endCursor,
        sortKey: 'PRICE',
        reverse: sortOption === 'PRICE_DESC',
      });

      setProducts(prev => [...prev, ...data.products.edges.map(edge => edge.node)]);
      setEndCursor(data.products.pageInfo.endCursor);
      setHasNextPage(data.products.pageInfo.hasNextPage);
    } catch (err) {
      console.error('Error loading more products:', err);
      setError('Failed to load more products.');
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle sort change
  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    // Reset pagination when sort changes (handled by useEffect)
    setEndCursor(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Spring/Summer
            </h1>
            <p className="mt-2 text-lg text-gray-500">SS2024</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          <SortDropdown
            currentSort={sortOption}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
              <p className="mt-4 text-sm text-gray-500">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <ProductGrid products={products} />

            {/* Load More Button */}
            <LoadMoreButton
              onClick={handleLoadMore}
              loading={loadingMore}
              hasMore={hasNextPage}
              totalLoaded={products.length}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Mindera Shopify Headless Store
          </p>
        </div>
      </footer>
    </div>
  );
}
