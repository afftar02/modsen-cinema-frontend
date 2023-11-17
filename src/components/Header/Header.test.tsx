import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AuthContext } from 'auth/Auth';
import { THEMES } from 'constants/themes';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import Header from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'profile_text':
          return 'Profile';
        case 'signup_button_text':
          return 'Sign up';
        case 'signin_button_text':
          return 'Sign in';
        default:
          break;
      }
    },
  }),
}));

describe('Header', () => {
  it('Unauthorized header render', async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            register: jest.fn(),
            isAuth: false,
            login: jest.fn(),
            logout: jest.fn(),
            user: null,
            getUserName: jest.fn(),
            loadUser: jest.fn(),
            checkAuthenticated: jest.fn(),
          }}
        >
          <ThemeProvider theme={THEMES.Dark}>
            <Header />
          </ThemeProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).toBeNull();
  });

  it('Authorized header render', async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            register: jest.fn(),
            isAuth: true,
            login: jest.fn(),
            logout: jest.fn(),
            user: null,
            getUserName: jest.fn(),
            loadUser: jest.fn(),
            checkAuthenticated: jest.fn(),
          }}
        >
          <ThemeProvider theme={THEMES.Dark}>
            <Header />
          </ThemeProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.queryByText('Sign up')).toBeNull();
    expect(screen.queryByText('Sign in')).toBeNull();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
