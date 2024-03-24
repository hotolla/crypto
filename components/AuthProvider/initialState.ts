import { IUser } from "@/modules/users";

export interface IAuthState {
  isAuthenticated: boolean,
  token: string | null,
  user: IUser | null
}

export const initialState: IAuthState = {
  isAuthenticated: false,
  token: null,
  user: null
};
