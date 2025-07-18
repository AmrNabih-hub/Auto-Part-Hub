import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <div className="p-8 text-red-600">Forbidden: Admins only</div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li><Link to="/products" className="text-orange-600 underline">Manage Products</Link></li>
        <li><Link to="/users" className="text-orange-600 underline">Manage Users</Link></li>
        <li><Link to="/orders" className="text-orange-600 underline">Manage Orders</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
