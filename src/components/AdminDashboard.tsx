import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Product } from '../types';

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      toast.error('Unauthorized access.');
      return;
    }

    const fetchPendingProducts = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get<Product[]>('/api/admin/products/pending', config);
        setPendingProducts(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch pending products');
        toast.error(err.response?.data?.message || 'Failed to fetch pending products');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProducts();
  }, [user, token, navigate]);

  const handleApproveReject = async (productId: string, action: 'approve' | 'reject') => {
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.patch(`/api/admin/products/${productId}/${action}`, {}, config);
      setPendingProducts(pendingProducts.filter((product) => product._id !== productId));
      toast.success(`Product ${action}d successfully!`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || `Failed to ${action} product.`);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading admin dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Pending Products</h2>
      {
        pendingProducts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No pending products to review.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Vendor</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Stock</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300 text-sm font-light">
                {pendingProducts.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                    <td className="py-3 px-6 text-left">{product.vendor}</td>
                    <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-6 text-left">{product.stockQuantity}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          onClick={() => handleApproveReject(product._id, 'approve')}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-xs mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproveReject(product._id, 'reject')}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default AdminDashboard;
