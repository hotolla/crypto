import axios, { AxiosRequestConfig } from 'axios';

export const fetchExchangeRates = (config?: AxiosRequestConfig) => {
  return axios.get(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY}`,
    config
  ).then(({ data } ) => {
    console.log(data)
    return data;
  });
};
