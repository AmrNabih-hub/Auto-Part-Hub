import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded components
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const Home = React.lazy(() => import('./components/Home'));
const ProductsPage = React.lazy(() => import('./components/ProductsPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const CartPage = React.lazy(() => import('./components/CartPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const VendorDashboard = React.lazy(() => import('./components/VendorDashboard'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const SentryTest = React.lazy(() => import('./components/SentryTest'));

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
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
          </Suspense>
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
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
                <Route path="/sentry-test" element={<SentryTest />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App; 