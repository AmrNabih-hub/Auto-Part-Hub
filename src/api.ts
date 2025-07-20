import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (config.url?.includes('login') || config.url?.includes('register')) {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
  }
  return config;
});

export default api;
