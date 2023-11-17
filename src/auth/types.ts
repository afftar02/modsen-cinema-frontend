import { ReactNode } from 'react';
import { UserType } from 'types/user';

export type AuthProps = {
  children: ReactNode;
};

export type RegisterParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuth: boolean;
  register: (data: RegisterParams) => Promise<void>;
  login: (data: LoginParams) => Promise<void>;
  logout: () => void;
  user: UserType | null;
  getUserName: () => string;
  loadUser: () => Promise<void>;
  checkAuthenticated: () => Promise<void>;
};
