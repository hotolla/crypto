export interface Account {
  amount: number;
  currency: string;
  _id: string;
}

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
}