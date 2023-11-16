import { BrowserRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { AuthContextType } from 'auth/types';
import { THEMES } from 'constants/Themes';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import EditProfileModal from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'loading_error':
          return 'Data loading error!';
        case 'edit_profile_title':
          return 'Please, enter new profile information:';
        case 'upload_avatar_text':
          return 'Upload a profile photo';
        case 'uploaded_file_text':
          return 'Uploaded file:';
        case 'edit_name_placeholder':
          return 'Enter new name';
        case 'edit_surname_placeholder':
          return 'Enter new surname';
        case 'edit_gender_placeholder':
          return 'Choose your gender';
        case 'edit_password_placeholder':
          return 'Enter new password';
        case 'save_text':
          return 'Save';
        case 'invalid_gender_error':
          return 'Invalid gender type, please type MALE or FEMALE';
        case 'invalid_password_error':
          return 'Password length must be from 4 to 16 characters';
        default:
          break;
      }
    },
  }),
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

describe('EditProfileModal', () => {
  it('editing with password less than 4 chars', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <EditProfileModal onClose={jest.fn} />
        </ThemeProvider>
      </BrowserRouter>
    );

    const genderSelect = screen.getByDisplayValue('Choose your gender');
    const passwordInput = screen.getByPlaceholderText('Enter new password');

    act(() => {
      fireEvent.change(genderSelect, {
        target: { value: 'MALE' },
      });
      fireEvent.change(passwordInput, {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute(
        'placeholder',
        'Password length must be from 4 to 16 characters'
      );
    });
  });

  it('editing with password more than 16 chars', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <EditProfileModal onClose={jest.fn} />
        </ThemeProvider>
      </BrowserRouter>
    );

    const genderSelect = screen.getByDisplayValue('Choose your gender');
    const passwordInput = screen.getByPlaceholderText('Enter new password');

    act(() => {
      fireEvent.change(genderSelect, {
        target: { value: 'FEMALE' },
      });
      fireEvent.change(passwordInput, {
        target: { value: '12372397483724897329847893274987328947893274' },
      });
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute(
        'placeholder',
        'Password length must be from 4 to 16 characters'
      );
    });
  });

  it('save without any values changed', async () => {
    const handleClose = jest.fn();

    render(
      <BrowserRouter>
        <ThemeProvider theme={THEMES.Dark}>
          <EditProfileModal onClose={handleClose} />
        </ThemeProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
