import React, { useEffect, useState } from 'react';
import axios from 'axios';


import type { User } from '../types';

  const UserCRUD: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  

  useEffect(() => {
    axios.get('http://localhost:8080/api/users').then(res => setUsers(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/users', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    setUsers([...users, res.data]);
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleCreate} className="mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="border p-2 mr-2" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="border p-2 mr-2" required />
        <input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" type="password" className="border p-2 mr-2" required />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Add User</button>
      </form>
      <ul>
        {users.map((u: User) => (
          <li key={u._id} className="mb-2">{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserCRUD; 