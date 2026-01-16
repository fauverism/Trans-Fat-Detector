import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsDisplay from '@/components/ResultsDisplay';
import { TransFatResult } from '@/app/page';

describe('ResultsDisplay', () => {
  const mockResultWithTransFat: TransFatResult = {
    productName: 'Test Product',
    hasTransFat: true,
    transFatTypes: ['Partially Hydrogenated Oils', 'Shortening'],
    totalTransFat: '1.5g',
    ingredients: ['Flour', 'Sugar', 'Partially Hydrogenated Soybean Oil', 'Salt'],
    warnings: ['Contains trans fats', 'May increase heart disease risk'],
  };

  const mockResultNoTransFat: TransFatResult = {
    productName: 'Healthy Product',
    hasTransFat: false,
    transFatTypes: [],
    totalTransFat: '0g',
    ingredients: ['Whole Wheat', 'Olive Oil', 'Salt'],
    warnings: [],
  };

  it('displays warning message when trans fat is detected', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText(/Trans Fats Detected!/i)).toBeInTheDocument();
  });

  it('displays success message when no trans fat is detected', () => {
    render(<ResultsDisplay result={mockResultNoTransFat} />);
    expect(screen.getByText(/No Trans Fats Found!/i)).toBeInTheDocument();
  });

  it('displays product name', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays total trans fat amount when present', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText(/Total Trans Fat: 1.5g/i)).toBeInTheDocument();
  });

  it('displays trans fat types when present', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText('Partially Hydrogenated Oils')).toBeInTheDocument();
    expect(screen.getByText('Shortening')).toBeInTheDocument();
  });

  it('displays all ingredients', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText('Flour')).toBeInTheDocument();
    expect(screen.getByText('Sugar')).toBeInTheDocument();
    expect(screen.getByText('Partially Hydrogenated Soybean Oil')).toBeInTheDocument();
    expect(screen.getByText('Salt')).toBeInTheDocument();
  });

  it('displays health warnings when present', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText(/Contains trans fats/i)).toBeInTheDocument();
    expect(screen.getByText(/May increase heart disease risk/i)).toBeInTheDocument();
  });

  it('displays educational information', () => {
    render(<ResultsDisplay result={mockResultWithTransFat} />);
    expect(screen.getByText(/Did You Know?/i)).toBeInTheDocument();
    expect(screen.getByText(/hydrogenation/i)).toBeInTheDocument();
  });

  it('does not display trans fat types section when none present', () => {
    render(<ResultsDisplay result={mockResultNoTransFat} />);
    expect(screen.queryByText(/Types of Trans Fats Found/i)).not.toBeInTheDocument();
  });

  it('does not display warnings section when none present', () => {
    render(<ResultsDisplay result={mockResultNoTransFat} />);
    expect(screen.queryByText(/Health Warnings/i)).not.toBeInTheDocument();
  });
});
