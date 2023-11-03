import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './index';
import { THEMES } from 'constants/Themes';
import { ThemeProvider } from 'styled-components';
import { AuthContext } from 'auth/Auth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'profile_menu_title':
          return 'User profile';
        case 'user_id_text':
          return 'USER ID';
        case 'edit_profile_text':
          return 'Edit profile';
        case 'settings_text':
          return 'Settings';
        case 'logout_text':
          return 'Log out';
        default:
          break;
      }
    },
  }),
}));

describe('ProfileMenu', () => {
  it('ProfileMenu render and logout', async () => {
    const handleClose = jest.fn();
    const handleLogout = jest.fn();

    render(
      <AuthContext.Provider
        value={{
          register: jest.fn(),
          isAuth: true,
          login: jest.fn(),
          logout: handleLogout,
          user: {
            id: '1',
            name: 'Nikita',
            surname: 'Stetsky',
            email: 'stetsky@gmail.com',
            gender: 'MALE',
          },
          getUserName: jest.fn(() => 'Nikita Stetsky'),
          loadUser: jest.fn(),
          checkAuthenticated: jest.fn(),
        }}
      >
        <ThemeProvider theme={THEMES.Dark}>
          <ProfileMenu onClose={handleClose} />
        </ThemeProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByText('User profile')).toBeInTheDocument();
    expect(screen.getByText('USER ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
    expect(screen.getByText('Nikita Stetsky')).toBeInTheDocument();
    expect(screen.getByText('MALE')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Log out'));
    });

    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
