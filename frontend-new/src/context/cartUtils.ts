import type { CartState, CartItem, CartAction, CartTotals } from '../types';

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export const calculateTotals = (items: CartItem[]): CartTotals => {
  const subtotal = items.reduce((sum, item: CartItem) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07;
  const shipping = subtotal > 500 ? 0 : 8.99;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
};