import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

// Mock toast for notifications
vi.mock('react-hot-toast', () => ({
  success: vi.fn(),
  error: vi.fn(),
}));

// Mock react-router-dom's Link component to prevent actual navigation
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: vi.fn().mockImplementation(({ children, to }) => <a href={to}>{children}</a>),
  };
});

describe('ProductCard Component', () => {
  const mockAddToCart = vi.fn();
  const mockProduct: Product = {
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
        <CartContext.Provider value={{ addToCart: mockAddToCart, cartItems: [], getCartTotal: vi.fn() }}>
          <ProductCard product={product} />
        </CartContext.Provider>
      </Router>
    );
  };

  it('renders product details correctly', () => {
    renderProductCard();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
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

    expect(screen.getByText(/OUT OF STOCK/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Out of Stock/i })).toBeDisabled();
  });

  it('shows error toast if quantity exceeds stock', async () => {
    const lowStockProduct = { ...mockProduct, stockQuantity: 0 };
    renderProductCard(lowStockProduct);

    fireEvent.click(screen.getByRole('button', { name: /Out of Stock/i }));

    await waitFor(() => {
      expect(mockAddToCart).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Not enough stock!');
    });
  });

  it('navigates to product detail page on image click', () => {
    renderProductCard();
    const productLink = screen.getByRole('link', { name: mockProduct.name });
    expect(productLink).toHaveAttribute('href', `/products/${mockProduct._id}`);
  });
});
