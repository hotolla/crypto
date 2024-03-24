'use client';

import { AxiosRequestConfig } from 'axios';
import { api } from '@/api';

export const chargeAccount = (account: any, config?: AxiosRequestConfig) => {
  return api.post('/accounts', account)
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchUser = (account: any, config?: AxiosRequestConfig) => {
  return api.post('/accounts', account)
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      throw error;
    });
};
