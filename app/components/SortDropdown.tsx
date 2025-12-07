import type { SortOption } from '@/lib/types';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

/**
 * SortDropdown component for sorting products by price
 */
export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Sort products by price"
      >
        <option value="PRICE_ASC">Price: Low to High</option>
        <option value="PRICE_DESC">Price: High to Low</option>
      </select>
    </div>
  );
}
