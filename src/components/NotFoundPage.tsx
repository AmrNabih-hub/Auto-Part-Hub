import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <h1 className="text-6xl font-bold text-automotive-orange mb-4">404</h1>
    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Page not found.</p>
    <Link to="/" className="bg-automotive-orange hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">Go Home</Link>
  </div>
);

export default NotFoundPage; 