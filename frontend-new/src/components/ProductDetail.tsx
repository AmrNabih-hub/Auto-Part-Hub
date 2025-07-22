import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch.tsx';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useFetch<Product>(`/api/products/${id}`);
  const { addToCart } = useCart();

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-6" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-automotive-orange mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Stock: {product.stockQuantity}</p>
          <button
            onClick={handleAddToCart}
            className="bg-automotive-orange hover:bg-automotive-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
