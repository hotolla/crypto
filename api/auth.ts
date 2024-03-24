import { AxiosRequestConfig } from 'axios';
import { IUser } from '@/components/Registration/types';
import { api } from "@/api";

export interface ILoginData {
  name?: string | null,
  email?: string | null,
  password?: string | null
}

export const register = (user: IUser, config?: AxiosRequestConfig) => {
  return api.post('/registration', user, config).then(({ data }) => {
    return data;
  }).catch((data) => {
    throw data;
  });
};

export const login = (loginData: ILoginData, config?: AxiosRequestConfig) => {
  return api.post('/login', loginData, config).then(({ data }) => {
    return data;
  });
};
