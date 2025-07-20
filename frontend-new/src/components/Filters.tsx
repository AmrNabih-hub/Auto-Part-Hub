import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Product, FilterState } from '../types';
import { FaSearch, FaTimes } from 'react-icons/fa';

export interface FilterState {
  category: string;
  brand: string;
  priceRange: [number, number];
  inStock: boolean;
  searchTerm: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  products: Product[];
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, products }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    brand: 'All',
    priceRange: [0, 500],
    inStock: false,
    searchTerm: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    const newFilters = { ...filters, [name]: isCheckbox ? checked : value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const newFilters = { ...filters, priceRange: [filters.priceRange[0], value] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearSearch = () => {
    const newFilters = { ...filters, searchTerm: '' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const categories = useMemo(() => [
    'All',
    ...Array.from(new Set(products.map(p => p.category)))
  ], [products]);

  const brands = useMemo(() => [
    'All',
    ...Array.from(new Set(products.map(p => p.brand)))
  ], [products]);

  return (
    <motion.div 
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h3>

      {/* Search Filter */}
      <div>
        <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search
        </label>
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleInputChange}
            placeholder="e.g., Spark Plug"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-automotive-orange focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          {filters.searchTerm && (
            <button onClick={clearSearch} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-automotive-orange focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Brand
        </label>
        <select
          id="brand"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-automotive-orange focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Max Price: <span className="font-bold text-automotive-orange">${filters.priceRange[1]}</span>
        </label>
        <input
          type="range"
          id="priceRange"
          name="priceRange"
          min="0"
          max="500"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      {/* In Stock Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={filters.inStock}
          onChange={handleInputChange}
          className="h-4 w-4 text-automotive-orange border-gray-300 rounded focus:ring-automotive-orange"
        />
        <label htmlFor="inStock" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          In Stock Only
        </label>
      </div>
    </motion.div>
  );
};

export default Filters; 