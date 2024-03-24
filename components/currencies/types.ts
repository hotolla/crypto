export interface ICurrency {
  id: string;
  symbol: string;
  name: string,
  priceUsd: string;
  changePercent24Hr: string;
  volumeUsd24Hr: string;
  marketCapUsd: string;
}

export const ICurrencyState: ICurrency = {
  id: '',
  symbol: '',
  name: '',
  priceUsd: '',
  changePercent24Hr: '',
  volumeUsd24Hr: '',
  marketCapUsd: ''
};

export interface ICurrencyHistory {
  [index: number]: [];
}

export interface ICurrencyCode {
  code: any
};

export const ICurrencyCodeState: ICurrencyCode =  {
  code: 'EUR'
};