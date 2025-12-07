import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoadMoreButton from '@/app/components/LoadMoreButton';

describe('LoadMoreButton', () => {
  it('renders button when hasMore is true', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={true} totalLoaded={12} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('shows completion message when hasMore is false and products loaded', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={false} totalLoaded={12} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(/All 12 products loaded/i)).toBeInTheDocument();
  });

  it('renders nothing when hasMore is false and no products', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={false} totalLoaded={0} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/loaded/i)).not.toBeInTheDocument();
  });

  it('displays "Load More" text when not loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={true} totalLoaded={5} />);

    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  it('displays "Loading..." text when loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={true} hasMore={true} totalLoaded={5} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={true} totalLoaded={5} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={true} hasMore={true} totalLoaded={5} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is not disabled when not loading', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={true} totalLoaded={5} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('has proper accessibility label', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={true} totalLoaded={5} />);

    const button = screen.getByLabelText('Load more products');
    expect(button).toBeInTheDocument();
  });

  it('displays singular product text when only 1 product loaded', () => {
    const mockOnClick = vi.fn();
    render(<LoadMoreButton onClick={mockOnClick} loading={false} hasMore={false} totalLoaded={1} />);

    expect(screen.getByText(/All 1 product loaded/i)).toBeInTheDocument();
  });
});
