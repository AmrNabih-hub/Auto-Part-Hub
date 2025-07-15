import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { CartItem, Product, CartTotals } from '../types';
import { cartReducer, calculateTotals } from './cartUtils';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totals: CartTotals;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isCartOpen, setCartOpen] = React.useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart, increment quantity if duplicate
  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  const removeItem = (productId: string) => {
    let item: CartItem | undefined = undefined;
    if (state.items.length > 0) {
      item = state.items.find(item => item.id === productId);
    }
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    if (item) {
      toast.success(`${item.name} removed from cart`, {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared!', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
    });
  };

  const totals = calculateTotals(state.items);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const value: CartContextType = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totals,
    isCartOpen,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 