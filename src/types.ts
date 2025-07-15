export interface Product {
  id: string;
  name: string;
  price: number;
  vendor: string;
  image: string;
  description: string;
  category: string;
  brand: string;
  inStock: boolean;
  quantity: number;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

export interface CartState {
  items: CartItem[];
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface FilterState {
  category: string;
  brand: string;
  priceRange: [number, number];
  inStock: boolean;
  searchTerm: string;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }; 