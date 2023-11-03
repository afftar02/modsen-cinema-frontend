import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterInput from './index';
import { THEMES } from 'constants/Themes';
import { ThemeProvider } from 'styled-components';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'invalid_email':
          return 'Invalid email address';
        case 'subscribed_text':
          return 'Subscription successfully completed!';
        case 'subscription_error':
          return 'Subscription error!';
        case 'email_subscription_placeholder':
          return 'Enter email';
        default:
          break;
      }
    },
  }),
}));

const alertMock = jest.fn();
global.alert = alertMock;

describe('FooterInput', () => {
  it('renders the component with the placeholder text', async () => {
    render(
      <ThemeProvider theme={THEMES.Dark}>
        <FooterInput />
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('handles the Enter key press with invalid email', async () => {
    render(
      <ThemeProvider theme={THEMES.Dark}>
        <FooterInput />
      </ThemeProvider>
    );

    const inputElement = screen.getByPlaceholderText('Enter email');

    act(() => {
      fireEvent.change(inputElement, { target: { value: '123' } });
    });

    expect(inputElement).toHaveValue('123');

    act(() => {
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Invalid email address');
    });
  });
});
