import axios from 'axios';

import { getToken } from '@/utils/auth';

const client = axios.create();
client({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  headers: {
    Authorization: '',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.defaults.withCredentials = false;

client.interceptors.request.use(function (config) {
  const token = getToken();
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

client.interceptors.response.use(
  async response => {
    if (!response.data) {
      return Promise.reject(response);
    }
    return response;
  },
  async error => {
    return Promise.reject(error);
  }
);

export default client;
