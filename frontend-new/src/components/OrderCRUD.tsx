import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

import type { Order } from '../types';

const OrderCRUD: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('pending');
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders').then(res => setOrders(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/orders', {
      user_id: user?.id,
      total: parseFloat(total),
      status,
    });
    setOrders([...orders, res.data]);
    setTotal('');
    setStatus('pending');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <form onSubmit={handleCreate} className="mb-6">
        <input value={total} onChange={e => setTotal(e.target.value)} placeholder="Total" type="number" className="border p-2 mr-2" required />
        <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 mr-2">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Add Order</button>
      </form>
      <ul>
        {orders.map((o: Order) => (
          <li key={o.id} className="mb-2">Order #{o.id} - ${o.total} ({o.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCRUD; 