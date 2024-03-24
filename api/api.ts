import axios from 'axios';
import { localStorageKey } from '@/components/AuthProvider';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
  const { token } = JSON.parse(localStorage?.getItem(localStorageKey) || '{}');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
