import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-automotive-dark text-automotive-dark dark:text-white shadow-lg sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-automotive-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔧</span>
            </div>
            <h1 className="text-xl font-bold font-poppins">AutoPartHub</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <motion.div key={to} whileHover={{ scale: 1.05 }}>
                <Link
                  to={to}
                  className={`relative px-3 py-1 rounded-full transition-all duration-200
                    ${location.pathname === to
                      ? 'text-white bg-automotive-orange font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                  `}
                  style={{ zIndex: 1 }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            {!user && (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className={`relative px-3 py-1 rounded-full transition-all duration-200
                      ${location.pathname === '/login'
                        ? 'text-white bg-automotive-orange font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                    `}
                    style={{ zIndex: 1 }}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className={`relative px-3 py-1 rounded-full transition-all duration-200
                      ${location.pathname === '/register'
                        ? 'text-white bg-automotive-orange font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                    `}
                    style={{ zIndex: 1 }}
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
            {user && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 relative px-3 py-1 rounded-full transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search parts, brands, or vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-automotive-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-automotive-orange transition-colors"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button 
              className="p-2 hover:bg-automotive-orange rounded-lg transition-colors"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </motion.button>

            {/* Cart Icon */}
            <Link to="/cart">
              <motion.button 
                className="relative p-2 hover:bg-automotive-orange rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaShoppingCart className="text-xl" />
                {cartItemCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-automotive-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 hover:bg-automotive-orange rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-3 py-2 rounded-full transition-all duration-200
                    ${location.pathname === to
                      ? 'text-white bg-automotive-orange font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ zIndex: 1 }}
                >
                  {label}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className={`relative px-3 py-2 rounded-full transition-all duration-200
                      ${location.pathname === '/login'
                        ? 'text-white bg-automotive-orange font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ zIndex: 1 }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`relative px-3 py-2 rounded-full transition-all duration-200
                      ${location.pathname === '/register'
                        ? 'text-white bg-automotive-orange font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ zIndex: 1 }}
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <>
                  <span className="text-gray-700 dark:text-gray-300 px-3 py-2">Welcome, {user.name}</span>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="relative px-3 py-2 rounded-full transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-automotive-orange"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
            {/* Mobile Search */}
            <div className="mt-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-automotive-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-automotive-orange transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 