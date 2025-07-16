import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CartItem, Product, CartTotals } from '../types';
import { cartReducer, calculateTotals } from './cartUtils';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
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
  const { user, token } = useAuth();

  // Fetch cart from backend on mount or when user/token changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          const config = {
            headers: {
              'x-auth-token': token,
            },
          };
          const res = await axios.get('/api/cart', config);
          dispatch({ type: 'SET_CART', payload: res.data.items });
        } catch (err) {
          console.error('Failed to fetch cart:', err);
          // toast.error('Failed to load cart.');
        }
      } else {
        dispatch({ type: 'CLEAR_CART' }); // Clear cart if no user is logged in
      }
    };

    fetchCart();
  }, [user, token]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user || !token) {
      toast.error('Please log in to add items to cart.');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = { productId, quantity };
      const res = await axios.post('/api/cart', body, config);
      dispatch({ type: 'SET_CART', payload: res.data.items });
      toast.success(`Item added to cart!`);
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
      toast.error(err.response?.data?.message || 'Failed to add to cart.');
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user || !token) {
      toast.error('Please log in to remove items from cart.');
      return;
    }
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.delete(`/api/cart/${productId}`, config);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      toast.success(`Item removed from cart!`);
    } catch (err: any) {
      console.error('Failed to remove from cart:', err);
      toast.error(err.response?.data?.message || 'Failed to remove from cart.');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !token) {
      toast.error('Please log in to update cart quantity.');
      return;
    }
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const body = { productId, quantity };
      // Assuming addToCart can handle quantity updates by sending the new total quantity
      const res = await axios.post('/api/cart', body, config);
      dispatch({ type: 'SET_CART', payload: res.data.items });
      toast.success(`Cart quantity updated!`);
    } catch (err: any) {
      console.error('Failed to update quantity:', err);
      toast.error(err.response?.data?.message || 'Failed to update quantity.');
    }
  };

  const clearCart = async () => {
    if (!user || !token) {
      toast.error('Please log in to clear cart.');
      return;
    }
    // Backend doesn't have a clear cart endpoint, so we'll remove items one by one
    // In a real app, you'd add a dedicated endpoint for this.
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      for (const item of state.items) {
        await axios.delete(`/api/cart/${item._id}`, config);
      }
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared!');
    } catch (err: any) {
      console.error('Failed to clear cart:', err);
      toast.error(err.response?.data?.message || 'Failed to clear cart.');
    }
  };

  const totals = calculateTotals(state.items);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const value: CartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
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