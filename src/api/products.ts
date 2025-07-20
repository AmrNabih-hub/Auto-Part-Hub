import api from '../api';

export const fetchProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const createProduct = async (product: { name: string; description?: string; price: number; stock: number }) => {
  const res = await api.post('/products', product);
  return res.data;
}; 