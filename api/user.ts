import { AxiosRequestConfig } from 'axios';
import { api } from '@/api/api';

export const fetchUser = (config?: AxiosRequestConfig) => {
  return api.get('/user', config).then(({ data }) => {
    return data;
  });
};

