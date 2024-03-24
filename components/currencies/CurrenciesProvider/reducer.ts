import { ICurrency } from '../types';
import { ICurrenciesState } from './initialState';
import { Types } from './types';

export type Action =
  | { type: Types.FetchCurrencies; payload: ICurrency[]}
  | { type: Types.FetchCurrency; payload: ICurrency[]}

export const reducer = (state: ICurrenciesState, { type, payload }: Action) => {
  switch (type) {
    case Types.FetchCurrencies:
      return { ...state, currencies: payload };

    case Types.FetchCurrencies:
      return { ...state, currencies: payload };

    default:
    return state;
  };
};
