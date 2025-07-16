import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #F97316',
                padding: '16px',
                color: '#F97316',
                background: '#FFEDD5',
              },
            }}
          />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {user && user.role === 'vendor' && (
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              )}
              {user && user.role === 'admin' && (
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App; 