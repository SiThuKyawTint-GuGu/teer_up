import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

api.defaults.withCredentials = false;

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

export default api;
