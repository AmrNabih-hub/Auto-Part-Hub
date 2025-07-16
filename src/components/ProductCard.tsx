import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > product.stockQuantity) {
      toast.error('Not enough stock!');
      return;
    }
    addToCart(product._id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    setQuantity(1);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Helper to truncate description
  const truncate = (str: string, n: number) =>
    str.length > n ? str.slice(0, n) + '...' : str;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <Link to={`/products/${product._id}`} className="block relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
        />
        {product.stockQuantity === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            OUT OF STOCK
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-md line-clamp-2">
              {product.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
            {truncate(product.description, 100)}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-automotive-orange font-extrabold text-2xl">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              by {product.vendor}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Available:</span>
            <span className={`text-sm font-bold ${
              product.stockQuantity > 10 
                ? 'text-green-500' 
                : product.stockQuantity > 0 
                ? 'text-yellow-500' 
                : 'text-red-500'
            }`}>
              {product.stockQuantity} in stock
            </span>
          </div>

          <motion.button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg ${
              product.stockQuantity > 0
                ? 'bg-automotive-orange hover:bg-orange-600 text-white transform hover:-translate-y-1'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            whileTap={product.stockQuantity > 0 ? { scale: 0.97 } : {}}
          >
            <FaShoppingCart className="text-md" />
            {product.stockQuantity > 0 ? `Add to Cart` : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;