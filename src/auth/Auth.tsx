import { useState, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthProps = {
  children: ReactNode;
};

export type AuthContextType = {
  isAuth: boolean;
  register: () => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

function Auth({ children }: AuthProps) {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    setIsAuth(true);
    navigate('/');
  };

  const register = () => {
    setIsAuth(true);
    navigate('/');
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
