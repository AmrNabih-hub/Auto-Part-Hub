import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '../types';
import toast from 'react-hot-toast';

// Mock toast for notifications
vi.mock('react-hot-toast', () => {
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(),
  };
  return {
    __esModule: true,
    default: mockToast,
    toast: mockToast,
  };
});

// Mock react-router-dom's Link component to prevent actual navigation
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    Link: vi.fn().mockImplementation(({ children, to }) => <a href={to}>{children}</a>),
  };
});

const mockAddToCart = vi.fn();
// Mock CartContext
const mockCartContext = {
  addToCart: mockAddToCart,
  cartItems: [],
  getCartTotal: vi.fn(),
};

vi.mock('../context/CartContext', () => ({
  useCart: () => mockCartContext,
}));

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: '1',
    _id: '1',
    name: 'Test Product',
    sku: 'TP001',
    description: 'This is a test product description.',
    price: 25.00,
    category: 'Electronics',
    imageUrl: 'http://example.com/test.jpg',
    stockQuantity: 10,
    vendor: 'Test Vendor',
    status: 'Approved',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
    vi.clearAllMocks();
  });

  const renderProductCard = (product = mockProduct) => {
    render(
      <Router>
        <ProductCard product={product} />
      </Router>
    );
  };

  it('renders product details correctly', () => {
    renderProductCard();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(/25.00/i)).toBeInTheDocument();
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls addToCart when "Add to Cart" button is clicked', async () => {
    renderProductCard();

    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledTimes(1);
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct._id, 1);
      expect(toast.success).toHaveBeenCalledWith('1 x Test Product added to cart!');
    });
  });

  it('displays "OUT OF STOCK" when stockQuantity is 0', () => {
    const outOfStockProduct = { ...mockProduct, stockQuantity: 0 };
    renderProductCard(outOfStockProduct);

    expect(screen.getByText('OUT OF STOCK')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Out of Stock/i })).toBeDisabled();
  });

  

  it('navigates to product detail page on image click', () => {
    renderProductCard();
    const productLink = screen.getByRole('link', { name: mockProduct.name });
    expect(productLink).toHaveAttribute('href', `/products/${mockProduct._id}`);
  });
});
