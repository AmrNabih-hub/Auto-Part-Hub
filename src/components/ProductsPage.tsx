import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './ProductGrid';
import Filters, { FilterState } from './Filters';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import useFetch from '../hooks/useFetch.tsx';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  // Add other fields as per your backend Product model
}

const ProductsPage: React.FC = () => {
  // Temporarily use hardcoded API URL for testing
  const { data: products, loading, error } = useFetch<Product[]>('/api/products');

  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    brand: 'All',
    priceRange: [0, 500],
    inStock: false,
    searchTerm: '',
  });

  const [sort, setSort] = useState({ by: 'price', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    const filtered = products.filter((product) => {
      const categoryMatch = filters.category === 'All' || product.category === filters.category;
      // Brand filtering is currently disabled as the product model doesn't include a brand field
      // TODO: Add brand field to Product model and database schema when needed
      // const brandMatch = filters.brand === 'All' || product.brand === filters.brand;
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const inStockMatch = !filters.inStock || product.stockQuantity > 0;
      const searchMatch =
        !filters.searchTerm ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return categoryMatch && priceMatch && inStockMatch && searchMatch; // Brand filtering disabled
    });

    return filtered.sort((a, b) => {
      if (sort.by === 'price') {
        return sort.order === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sort.by === 'name') {
        return sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [products, filters, sort]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSortChange = (by: string) => {
    setSort(prev => ({
      by,
      order: prev.by === by && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Find Your Perfect Part
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our curated collection of high-quality automotive parts.
          </p>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Filters onFilterChange={setFilters} products={products || []} />
          </aside>
          <div className="lg:w-3/4">
            {/* Sort and Results Header */}
            <div className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing <span className="font-semibold text-automotive-orange">{paginatedProducts.length}</span> of{' '}
                <span className="font-semibold">{filteredAndSortedProducts.length}</span> results
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Sort by:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleSortChange('price')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      sort.by === 'price' ? 'bg-automotive-orange text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Price {sort.by === 'price' && (sort.order === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                  </button>
                  <button 
                    onClick={() => handleSortChange('name')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      sort.by === 'name' ? 'bg-automotive-orange text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Name {sort.by === 'name' && (sort.order === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
                  </button>
                </div>
              </div>
            </div>
            <ProductGrid products={paginatedProducts} />
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-automotive-orange text-white shadow'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;