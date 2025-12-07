import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SortDropdown from '@/app/components/SortDropdown';

describe('SortDropdown', () => {
  it('renders with correct label', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown currentSort="PRICE_ASC" onSortChange={mockOnSort} />);

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('displays current sort option', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown currentSort="PRICE_ASC" onSortChange={mockOnSort} />);

    const select = screen.getByRole('combobox', { name: /sort products/i });
    expect(select).toHaveValue('PRICE_ASC');
  });

  it('shows both sort options', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown currentSort="PRICE_ASC" onSortChange={mockOnSort} />);

    expect(screen.getByText('Price: Low to High')).toBeInTheDocument();
    expect(screen.getByText('Price: High to Low')).toBeInTheDocument();
  });

  it('calls onSortChange when selection changes', async () => {
    const user = userEvent.setup();
    const mockOnSort = vi.fn();

    render(<SortDropdown currentSort="PRICE_ASC" onSortChange={mockOnSort} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'PRICE_DESC');

    expect(mockOnSort).toHaveBeenCalledWith('PRICE_DESC');
  });

  it('has proper accessibility attributes', () => {
    const mockOnSort = vi.fn();
    render(<SortDropdown currentSort="PRICE_ASC" onSortChange={mockOnSort} />);

    const select = screen.getByLabelText(/sort by/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('aria-label', 'Sort products by price');
  });
});
