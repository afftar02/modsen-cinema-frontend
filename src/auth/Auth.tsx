import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { loginUser, registerUser } from 'services/authService';
import { getCurrentUser } from 'services/userService';
import { UserType } from 'types/User';

type AuthProps = {
  children: ReactNode;
};

type RegisterParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type LoginParams = {
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
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

function Auth({ children }: AuthProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const login = async (data: LoginParams) => {
    await loginUser(data);
    setIsAuth(true);
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const register = async (data: RegisterParams) => {
    await registerUser(data);
    setIsAuth(true);
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  const getUserName = () =>
    `${user?.name} ${user?.surname}` || user?.email || '';

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('tokens')) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuth(true);
        } catch (err) {
          logout();
        }
      }
      setIsAuthChecked(true);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, register, login, logout, user, getUserName }}
    >
      {isAuthChecked && children}
    </AuthContext.Provider>
  );
}

export default Auth;
