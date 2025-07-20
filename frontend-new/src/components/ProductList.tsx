import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - ${p.price}</li>
      ))}
    </ul>
  );
};

export default ProductList; 