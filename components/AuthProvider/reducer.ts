import { Types } from './types';
import { IAuthState, initialState } from './initialState';
import { ILoginPayload } from '@/components/AuthProvider';

export type Action =
  | { type: Types.Login; payload: ILoginPayload }
  | { type: Types.Register; payload: ILoginPayload }
  | { type: Types.Logout }

export const reducer = (state: IAuthState, action: Action) => {
  switch (action.type) {
    case Types.Login:
      return {
        ...state,
        ...action.payload,

        isAuthenticated: true
      };

    case Types.Register:
      return {
        ...state,
        ...action.payload,

        isAuthenticated: true
      };

    case Types.Logout:
      return initialState;

    default:
      return state;
  }
};
