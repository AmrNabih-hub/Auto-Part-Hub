import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  becomeVendor: (name: string, email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Optionally, verify token with backend or decode to get user info
      // For now, we'll just assume the token means a user is logged in
      // and fetch user data if needed later.
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      // In a real app, you'd decode the token or fetch user data here
      setUser(res.data); // Assuming res.data contains user info and token
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const becomeVendor = async (name, email, password, companyName) => {
    try {
      const res = await axios.post('/api/auth/become-vendor', { name, email, password, companyName });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
    } catch (err: unknown) {
      throw new Error(axios.isAxiosError(err) ? err.response?.data?.message || 'Vendor registration failed' : 'Vendor registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
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
