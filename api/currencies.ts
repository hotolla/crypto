import axios, { AxiosRequestConfig } from 'axios';
import { ICurrency } from '@/components/currencies/types';

export const fetchCurrencies = (config?: AxiosRequestConfig) => {
  return axios.get('https://api.coincap.io/v2/assets', config).then(({ data }) => {
    return data;
  });
};

export const fetchCurrency = (id: ICurrency['id'], config?: AxiosRequestConfig) => {
  return axios.get(`https://api.coincap.io/v2/assets/${id}`, config).then(({ data }) => {
    return data;
  });
};

export const fetchCurrencyCandles = (id: ICurrency['id'], config?: AxiosRequestConfig) => {
  return axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7', config)
    .then(({ data }) => {
      return data;
  });
};
