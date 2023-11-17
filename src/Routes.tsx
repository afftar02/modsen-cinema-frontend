import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PATHS } from 'constants/paths';
import Bookings from 'pages/Bookings';
import Film from 'pages/Film';
import Main from 'pages/Main';
import AuthorizedRoute from 'utils/AuthorizedRoute';

import AuthForm from 'components/AuthForm';
import OAuthSuccessRedirect from 'components/OAuthSuccessRedirect';

function AppRoutes() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="*" element={<Navigate to={PATHS.home} />} />
      <Route path={PATHS.home} element={<Main />}>
        <Route
          path={PATHS.signup}
          element={
            <AuthForm
              isSignUp
              title={t('signup_title')}
              brightTitle={t('signup_bright_title')}
              hint={t('signup_hint')}
              underlinedHint={t('signup_underlined_hint')}
              hintLink={PATHS.signin}
            />
          }
        />
        <Route
          path={PATHS.signin}
          element={
            <AuthForm
              title={t('signin_title')}
              brightTitle={t('signin_bright_title')}
              hint={t('signin_hint')}
              underlinedHint={t('signin_underlined_hint')}
              hintLink={PATHS.signup}
            />
          }
        />
      </Route>
      <Route
        path={PATHS.film}
        element={
          <AuthorizedRoute>
            <Film />
          </AuthorizedRoute>
        }
      />
      <Route
        path={PATHS.bookings}
        element={
          <AuthorizedRoute>
            <Bookings />
          </AuthorizedRoute>
        }
      />
      <Route path={PATHS.oauthSuccess} element={<OAuthSuccessRedirect />} />
    </Routes>
  );
}

export default AppRoutes;
