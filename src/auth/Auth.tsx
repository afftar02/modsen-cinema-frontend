import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
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
  loadUser: () => Promise<void>;
  checkAuthenticated: () => Promise<void>;
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
    await loadUser();
  };

  const register = async (data: RegisterParams) => {
    await registerUser(data);
    setIsAuth(true);
    await loadUser();
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem('tokens');
  };

  const loadUser = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const getUserName = () =>
    `${user?.name} ${user?.surname}` || user?.email || '';

  const checkAuthenticated = useCallback(async () => {
    if (localStorage.getItem('tokens')) {
      try {
        await loadUser();
        setIsAuth(true);
      } catch (err) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      await checkAuthenticated();
      setIsAuthChecked(true);
    })();
  }, [checkAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        register,
        login,
        logout,
        user,
        getUserName,
        loadUser,
        checkAuthenticated,
      }}
    >
      {isAuthChecked && children}
    </AuthContext.Provider>
  );
}

export default Auth;
