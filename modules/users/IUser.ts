import { Account } from '@/types';

export interface IUser {
  name?: string | null,
  id?: number |string | null ,
  email?: string | null,
  accounts: Account[]
}

