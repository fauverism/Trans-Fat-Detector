import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUploadTab from '@/components/ImageUploadTab';

describe('ImageUploadTab', () => {
  it('renders upload area', () => {
    const mockSetResult = vi.fn();
    render(<ImageUploadTab setResult={mockSetResult} />);

    expect(screen.getByText(/Drag & drop an image here/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse Files/i)).toBeInTheDocument();
  });

  it('displays tip message', () => {
    const mockSetResult = vi.fn();
    render(<ImageUploadTab setResult={mockSetResult} />);

    expect(screen.getByText(/Make sure the ingredients list is clear and well-lit/i)).toBeInTheDocument();
  });

  it('handles file selection', () => {
    const mockSetResult = vi.fn();
    render(<ImageUploadTab setResult={mockSetResult} />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByRole('button', { name: /Browse Files/i }).parentElement?.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    }
  });

  it('shows file input element', () => {
    const mockSetResult = vi.fn();
    const { container } = render(<ImageUploadTab setResult={mockSetResult} />);

    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it('displays heading and description', () => {
    const mockSetResult = vi.fn();
    render(<ImageUploadTab setResult={mockSetResult} />);

    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    expect(screen.getByText(/Take a photo of the ingredients label/i)).toBeInTheDocument();
  });
});
