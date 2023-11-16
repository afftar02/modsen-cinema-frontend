import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';

type RouteProps = {
  children: ReactNode;
};

function AuthorizedRoute({ children }: RouteProps) {
  const { isAuth } = useAuth() as AuthContextType;

  return isAuth ? <>{children}</> : <Navigate to="/signin" />;
}

export default AuthorizedRoute;
