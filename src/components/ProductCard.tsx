import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (quantity > product.quantity) {
      toast.error('Not enough stock!');
      return;
    }
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Helper to truncate description
  const truncate = (str: string, n: number) =>
    str.length > n ? str.slice(0, n) + '...' : str;

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        variants={itemVariants}
        whileHover={{ scale: 1.03, y: -5 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
          />
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              OUT OF STOCK
            </div>
          )}
          {product.rating && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
              <FaStar className="text-sm" />
              <span className="font-bold">{product.rating}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-md line-clamp-2">
                {product.name}
              </h3>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {product.brand}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
              {product.description.length > 100 ? (
                <>
                  {truncate(product.description, 100)}{' '}
                  <button
                    className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
                    onClick={() => setShowModal(true)}
                    aria-label="Read full description"
                  >
                    Read more
                  </button>
                </>
              ) : (
                product.description
              )}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-automotive-orange font-extrabold text-2xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.reviews && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                by {product.vendor}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Available:</span>
              <span className={`text-sm font-bold ${
                product.quantity > 10 
                  ? 'text-green-500' 
                  : product.quantity > 0 
                  ? 'text-yellow-500' 
                  : 'text-red-500'
              }`}>
                {product.quantity} in stock
              </span>
            </div>

            {product.inStock && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quantity:</span>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="text-md font-bold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.quantity}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>
            )}

            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg ${
                product.inStock
                  ? 'bg-automotive-orange hover:bg-orange-600 text-white transform hover:-translate-y-1'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
              whileTap={product.inStock ? { scale: 0.97 } : {}}
            >
              <FaShoppingCart className="text-md" />
              {product.inStock ? `Add to Cart` : 'Out of Stock'}
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* Modal for full description */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close full description"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Product Description</h2>
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{product.description}</p>
          </div>
          {/* Click outside to close */}
          <div className="fixed inset-0" onClick={() => setShowModal(false)} />
        </div>
      )}
    </>
  );
};

export default ProductCard; 