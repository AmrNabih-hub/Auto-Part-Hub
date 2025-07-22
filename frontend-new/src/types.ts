interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  companyName?: string;
}

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: string; // Changed from _id to id
  name: string;
  sku?: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity?: number;
  vendor: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  brand: string; // Added brand property
  inStock: boolean; // Added to match product data
  quantity: number; // Added to match product data
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string; // Added image property
  quantity: number; // Added quantity property
}

interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface FilterState { // Exported FilterState
  category: string;
  brand: string;
  priceRange: [number, number];
  inStock: boolean;
  searchTerm: string;
}

export type { User, Order, Product, CartItem, CartTotals, CartState, CartAction };

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };