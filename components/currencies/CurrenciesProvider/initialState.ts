import { ICurrency } from '../types';

export interface ICurrenciesState {
  currencies: ICurrency[];
};

export const initialState: ICurrenciesState = {
  currencies: []
};
