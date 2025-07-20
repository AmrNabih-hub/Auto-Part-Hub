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
  _id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  vendor: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type { User, Order, Product };