import { Account } from '@/types';

export const calculateTotalAmount = (accounts: Account[], exchangeRates: any) => {
  return accounts.reduce((total, account) => {
    return total + account.amount * (1 / exchangeRates?.[account.currency]);
  }, 0);
};
