import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  becomeVendor: (name: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Optionally, verify token with backend or decode to get user info
      // For now, we'll just assume the token means a user is logged in
      // and fetch user data if needed later.
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      // Get CSRF cookie for Sanctum
      await axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true });
      const res = await axios.post('http://localhost:8080/api/login', { email, password }, { withCredentials: true });
      setToken(res.data.access_token);
      localStorage.setItem('token', res.data.access_token);
      setUser(res.data.user);
      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
    } catch (err: unknown) {
      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message || 'Login failed' : 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation = password) => {
    try {
      // Get CSRF cookie for Sanctum
      await axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true });
      const res = await axios.post('http://localhost:8080/api/register', { name, email, password, password_confirmation }, { withCredentials: true });
      setToken(res.data.access_token);
      localStorage.setItem('token', res.data.access_token);
      setUser(res.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
    } catch (err: unknown) {
      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message || 'Registration failed' : 'Registration failed');
    }
  };

  const becomeVendor = async (name: string, email: string, password: string, companyName: string) => {
    try {
      const res = await axios.post('/api/auth/become-vendor', { name, email, password, companyName });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (err: unknown) {
      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message || 'Vendor registration failed' : 'Vendor registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (err: unknown) {
      console.error('Logout error:', err instanceof Error ? err.message : err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, becomeVendor, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
