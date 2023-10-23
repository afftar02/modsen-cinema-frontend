import Main from 'pages/Main';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthForm from 'components/AuthForm';
import Film from 'pages/Film';
import Bookings from 'pages/Bookings';
import Auth from 'auth/Auth';
import AuthorizedRoute from 'utils/AuthorizedRoute';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { selectThemeValue } from 'redux/selectors/theme';
import { THEMES } from 'constants/Themes';
import Wrapper from 'pages/Wrapper';
import { useAppSelector } from 'redux/hooks';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentThemeValue = useAppSelector(selectThemeValue);

  return (
    <Auth>
      <AnimatePresence mode={'wait'}>
        <ThemeProvider theme={THEMES[currentThemeValue]}>
          <Wrapper>
            <Routes location={location} key={location.key}>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Main />}>
                <Route
                  path="signup"
                  element={
                    <AuthForm
                      isSignUp
                      title={t('signup_title')}
                      brightTitle={t('signup_bright_title')}
                      hint={t('signup_hint')}
                      underlinedHint={t('signup_underlined_hint')}
                      hintLink={'/signin'}
                    />
                  }
                />
                <Route
                  path="signin"
                  element={
                    <AuthForm
                      title={t('signin_title')}
                      brightTitle={t('signin_bright_title')}
                      hint={t('signin_hint')}
                      underlinedHint={t('signin_underlined_hint')}
                      hintLink={'/signup'}
                    />
                  }
                />
              </Route>
              <Route
                path="/film/:id"
                element={
                  <AuthorizedRoute>
                    <Film />
                  </AuthorizedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <AuthorizedRoute>
                    <Bookings />
                  </AuthorizedRoute>
                }
              />
            </Routes>
          </Wrapper>
        </ThemeProvider>
      </AnimatePresence>
    </Auth>
  );
}

export default App;
