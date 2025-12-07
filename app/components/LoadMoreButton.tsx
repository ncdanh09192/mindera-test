interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
  totalLoaded?: number;
}

/**
 * LoadMoreButton component for pagination
 */
export default function LoadMoreButton({ onClick, loading, hasMore, totalLoaded = 0 }: LoadMoreButtonProps) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      {hasMore ? (
        <button
          onClick={onClick}
          disabled={loading}
          className="rounded-md bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Load more products"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      ) : totalLoaded > 0 ? (
        <p className="text-sm text-gray-500">
          All {totalLoaded} {totalLoaded === 1 ? 'product' : 'products'} loaded
        </p>
      ) : null}
    </div>
  );
}
