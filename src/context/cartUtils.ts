import { CartState, CartItem, CartAction, CartTotals } from '../types';

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        // If product has a stock limit, do not exceed it
        let maxQuantity = quantity;
        if ('quantity' in action.payload && typeof action.payload.quantity === 'number') {
          maxQuantity = Math.min(existingItem.quantity + quantity, action.payload.quantity);
        } else {
          maxQuantity = existingItem.quantity + quantity;
        }
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity: maxQuantity }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: quantity,
          image: action.payload.image,
          vendor: action.payload.vendor
        }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
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
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07;
  const shipping = subtotal > 500 ? 0 : 8.99;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
}; 