import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Product } from '../types';

const VendorDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    stockQuantity: 0,
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'vendor') {
      navigate('/');
      toast.error('Unauthorized access.');
      return;
    }

    const fetchVendorProducts = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get<Product[]>('/api/products/vendor', config);
        setProducts(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch vendor products');
        toast.error(err.response?.data?.message || 'Failed to fetch vendor products');
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProducts();
  }, [user, token, navigate]);

  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.post<Product>('/api/products', newProduct, config);
      setProducts([...products, res.data]);
      toast.success('Product added successfully!');
      setShowAddProductModal(false);
      setNewProduct({
        name: '',
        sku: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stockQuantity: 0,
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        await axios.delete(`/api/products/${productId}`, config);
        setProducts(products.filter((product) => product._id !== productId));
        toast.success('Product deleted successfully!');
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stockQuantity: product.stockQuantity,
    });
    setShowAddProductModal(true);
  };

  const handleUpdateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.put<Product>(`/api/products/${editingProduct._id}`, newProduct, config);
      setProducts(products.map(p => (p._id === res.data._id ? res.data : p)));
      toast.success('Product updated successfully!');
      setShowAddProductModal(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        sku: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stockQuantity: 0,
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading vendor dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Vendor Dashboard</h1>
      <button
        onClick={() => { setEditingProduct(null); setShowAddProductModal(true); }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Add New Product
      </button>

      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={editingProduct ? handleUpdateProductSubmit : handleAddProductSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">SKU:</label>
                <input
                  type="text"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Description:</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Stock Quantity:</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={newProduct.stockQuantity}
                  onChange={handleAddProductChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-automotive-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">SKU</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300 text-sm font-light">
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.sku}</td>
                <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.stockQuantity}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    product.status === 'Approved' ? 'bg-green-200 text-green-600' :
                    product.status === 'Pending' ? 'bg-yellow-200 text-yellow-600' :
                    'bg-red-200 text-red-600'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleEditProductClick(product)}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;
