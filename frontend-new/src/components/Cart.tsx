import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totals, clearCart, isCartOpen, openCart, closeCart } = useCart();

  React.useEffect(() => {
    const handleOpenCart = () => {
      console.log('Received open-cart event, opening cart drawer');
      openCart();
    };
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Mobile Cart Button */}
      <motion.button
        className="fixed bottom-4 right-4 lg:hidden bg-automotive-orange text-white p-4 rounded-full shadow-lg z-50"
        onClick={openCart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaShoppingCart className="text-xl" />
        {cartItemCount > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {cartItemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Desktop Cart Sidebar */}
      <div className="hidden lg:block lg:w-80">
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaShoppingCart />
              Cart ({cartItemCount})
            </h2>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaShoppingCart className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Add some products to get started!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-automotive-orange font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        title={item.quantity <= 1 ? 'Minimum quantity is 1' : ''}
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={(() => {
                          // Find the product's max stock from items (if available)
                          const prod = items.find(p => p.id === item.id);
                          return !!(prod && prod.quantity && item.quantity >= prod.quantity);
                        })()}
                        title={(() => {
                          const prod = items.find(p => p.id === item.id);
                          return prod && prod.quantity && item.quantity >= prod.quantity ? 'Max stock reached' : '';
                        })()}
                      >
                        <FaPlus className="text-xs" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Cart Totals */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (7%):</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
                    <span>Total:</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-automotive-orange hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaShoppingCart />
                    Cart ({cartItemCount})
                  </h2>
                  <button
                    onClick={closeCart}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence>
                    {items.length === 0 ? (
                      <motion.div
                        className="text-center py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FaShoppingCart className="text-4xl text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                          Add some products to get started!
                        </p>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                {item.name}
                              </h3>
                              <p className="text-automotive-orange font-bold">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                                title={item.quantity <= 1 ? 'Minimum quantity is 1' : ''}
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={(() => {
                                  // Find the product's max stock from items (if available)
                                  const prod = items.find(p => p.id === item.id);
                                  return !!(prod && prod.quantity && item.quantity >= prod.quantity);
                                })()}
                                title={(() => {
                                  const prod = items.find(p => p.id === item.id);
                                  return prod && prod.quantity && item.quantity >= prod.quantity ? 'Max stock reached' : '';
                                })()}
                              >
                                <FaPlus className="text-xs" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {items.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (7%):</span>
                        <span>${totals.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping:</span>
                        <span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
                        <span>Total:</span>
                        <span>${totals.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-automotive-orange hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart; 