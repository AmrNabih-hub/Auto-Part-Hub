import axios from 'axios';

export const fetchProducts = async () => {
  const res = await axios.get('/api/products');
  return res.data;
};

export const createProduct = async (product: { name: string; description?: string; price: number; stock: number }) => {
  const res = await axios.post('/api/products', product);
  return res.data;
}; 