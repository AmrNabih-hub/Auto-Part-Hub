export interface Product {
  _id: string;
  name: string;
  price: number;
  vendor: string;
  imageUrl: string;
  description: string;
  category: string;
  sku: string;
  stockQuantity: number;
  soldCount: number;
  status: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
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