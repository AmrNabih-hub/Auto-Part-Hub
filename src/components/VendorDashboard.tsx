import React from 'react';
import { useAuth } from '../context/AuthContext';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user || user.role !== 'vendor') {
    return <div className="p-8 text-red-600">Forbidden: Vendors only</div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
      <p>Welcome, vendor! Here you can manage your products and orders.</p>
    </div>
  );
};

export default VendorDashboard;
