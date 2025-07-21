interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  token?: string;
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
  id: string;
  _id?: string;
  name: string;
  sku?: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  image?: string; // For backward compatibility
  stockQuantity?: number;
  stock?: number;
  vendor?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  brand?: string;
}

interface CartItem {
  id: string;
  _id?: string;
  productId: string;
  quantity: number;
  product?: Product;
  image?: string;
  imageUrl?: string;
  name: string;
  price: number;
}

interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'SET_CART' | 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'CLEAR_CART';
  payload?: any;
}

export type { User, Order, Product, CartItem, CartTotals, CartState, CartAction };