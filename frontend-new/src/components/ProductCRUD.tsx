import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../api/products';

import type { Product } from '../types';

const ProductCRUD: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = await createProduct({
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });
    setProducts([...products, newProduct]);
    setName('');
    setPrice('');
    setStock('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <form onSubmit={handleCreate} className="mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2" required />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 mr-2" required />
        <input value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" type="number" className="border p-2 mr-2" required />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>
      <ul>
        {products.map((p: Product) => (
          <li key={p.id} className="mb-2">{p.name} - ${p.price} (Stock: {p.stockQuantity})</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCRUD; 