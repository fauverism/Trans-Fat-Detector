import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TextSearchTab from '@/components/TextSearchTab';

describe('TextSearchTab', () => {
  it('renders search input and button', () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    expect(screen.getByPlaceholderText(/Try 'Oreos' or 'Doritos'/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables button when input has text', () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    const input = screen.getByPlaceholderText(/Try 'Oreos' or 'Doritos'/i);
    fireEvent.change(input, { target: { value: 'Oreos' } });

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('calls setResult when search is performed', async () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    const input = screen.getByPlaceholderText(/Try 'Oreos' or 'Doritos'/i);
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Oreos' } });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(mockSetResult).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('calls search on Enter key press', async () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    const input = screen.getByPlaceholderText(/Try 'Oreos' or 'Doritos'/i);
    fireEvent.change(input, { target: { value: 'Doritos' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(
      () => {
        expect(mockSetResult).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('shows searching state during search', async () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    const input = screen.getByPlaceholderText(/Try 'Oreos' or 'Doritos'/i);
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Oreos' } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('displays tip message', () => {
    const mockSetResult = vi.fn();
    render(<TextSearchTab setResult={mockSetResult} />);

    expect(screen.getByText(/Try searching for popular snack brands/i)).toBeInTheDocument();
  });
});
