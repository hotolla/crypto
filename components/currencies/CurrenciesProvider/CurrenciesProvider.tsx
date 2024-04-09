import { ReactNode, useState, useReducer, createContext, useRef, useEffect } from 'react';
import { ICurrency } from '../types';
import * as currenciesApi from '../../../api/currencies';
import { reducer } from './reducer';
import { ICurrenciesState, initialState } from './initialState';
import { Types } from './types';

interface ICurrenciesProviderProps {
  children: ReactNode;
}

interface ICurrenciesProviderValue extends ICurrenciesState {
  fetchCurrencies: () => void;
}

export const CurrenciesContext = createContext<ICurrenciesProviderValue>({
  ...initialState,

  fetchCurrencies: () => {}
});

export const CurrenciesProvider = ({ children }: ICurrenciesProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const fetchCurrenciesAbortController = useRef(new AbortController());

  const fetchCurrencies = () => {
    currenciesApi.fetchCurrencies()
      .then(({ data }: { data: ICurrency[] }) => {
        dispatch({ type: Types.FetchCurrencies, payload: data.map(({
          id,
          symbol,
          name,
          priceUsd,
          changePercent24Hr,
          volumeUsd24Hr,
          marketCapUsd
        }) => ({
          id,
          symbol,
          name,
          priceUsd,
          changePercent24Hr,
          volumeUsd24Hr,
          marketCapUsd
        })) });
      });
  };

  const providerValue = {
    ...state,

    fetchCurrencies
  };
  
  useEffect(() => {
    // fetchCurrencies();

    return () => {
      fetchCurrenciesAbortController.current.abort();
    };
  }, []);

  return (
    <CurrenciesContext.Provider value={providerValue}>
      {children}
    </CurrenciesContext.Provider>
  );
};