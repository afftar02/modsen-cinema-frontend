import { BrowserRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { AuthContextType } from 'auth/types';
import { THEMES } from 'constants/themes';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import AuthForm from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'name_input_placeholder':
          return 'name';
        case 'surname_input_placeholder':
          return 'surname';
        case 'email_input_placeholder':
          return 'email';
        case 'password_input_placeholder':
          return 'password';
        case 'send_text':
          return 'Submit';
        case 'invalid_password_error':
          return 'Password length must be from 4 to 16 characters';
        case 'email_required_error':
          return 'Email required';
        case 'password_required_error':
          return 'Password required';
        case 'name_required_error':
          return 'Name required';
        case 'surname_required_error':
          return 'Surname required';
        case 'invalid_email':
          return 'Invalid email address';
        default:
          break;
      }
    },
  }),
}));
jest.mock('constants/baseApiUrl', () => ({
  FACEBOOK_AUTH_URL: 'fakeFacebookUrl',
  GITHUB_AUTH_URL: 'fakeGithubUrl',
  GOOGLE_AUTH_URL: 'fakeGoogleUrl',
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('auth/Auth', () => {
  return {
    useAuth: () =>
      ({
        register: jest.fn(),
        isAuth: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
        getUserName: jest.fn(),
        loadUser: jest.fn(),
        checkAuthenticated: jest.fn(),
      }) as AuthContextType,
  };
});

describe('AuthForm', () => {
  it('sign up with empty fields', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <AuthForm
            isSignUp={true}
            title="Title"
            brightTitle="Bright Title"
            hint="Hint"
            underlinedHint="Underlined Hint"
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText('name');
    const surnameInput = screen.getByPlaceholderText('surname');
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    act(() => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(nameInput).toHaveAttribute('placeholder', 'Name required');
      expect(surnameInput).toHaveAttribute('placeholder', 'Surname required');
      expect(emailInput).toHaveAttribute('placeholder', 'Email required');
      expect(passwordInput).toHaveAttribute('placeholder', 'Password required');
    });
  });

  it('sign in with empty fields', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <AuthForm
            title="Title"
            brightTitle="Bright Title"
            hint="Hint"
            underlinedHint="Underlined Hint"
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    act(() => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('placeholder', 'Email required');
      expect(passwordInput).toHaveAttribute('placeholder', 'Password required');
    });
  });

  it('sign in with invalid email', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <AuthForm
            title="Title"
            brightTitle="Bright Title"
            hint="Hint"
            underlinedHint="Underlined Hint"
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: 'mail' },
      });
      fireEvent.change(passwordInput, {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(emailInput).toHaveAttribute(
        'placeholder',
        'Invalid email address'
      );
    });
  });

  it('sign in with password less than 4 chars', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <AuthForm
            title="Title"
            brightTitle="Bright Title"
            hint="Hint"
            underlinedHint="Underlined Hint"
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute(
        'placeholder',
        'Password length must be from 4 to 16 characters'
      );
    });
  });

  it('sign in with password more than 16 chars', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <AuthForm
            title="Title"
            brightTitle="Bright Title"
            hint="Hint"
            underlinedHint="Underlined Hint"
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(passwordInput, {
        target: { value: '12372397483724897329847893274987328947893274' },
      });
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute(
        'placeholder',
        'Password length must be from 4 to 16 characters'
      );
    });
  });
});
