import { Provider } from 'react-redux';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { THEMES } from 'constants/themes';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import SettingsModal from './index';

const mockStore = configureStore([]);
const store = mockStore({
  theme: {
    currentTheme: 'Dark',
  },
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'settings_title':
          return 'Choose settings:';
        case 'language_title':
          return 'Language:';
        case 'en':
          return 'English';
        case 'ru':
          return 'Russian';
        case 'dark_theme':
          return 'Dark';
        case 'light_theme':
          return 'Light';
        case 'theme_title':
          return 'Theme:';
        case 'apply_text':
          return 'Apply';
        default:
          break;
      }
    },
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('SettingsModal', () => {
  const onClose = jest.fn();

  it('renders the component with the title', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={THEMES.Dark}>
          <SettingsModal onClose={onClose} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Choose settings:')).toBeInTheDocument();
  });

  it('handles language selection', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={THEMES.Dark}>
          <SettingsModal onClose={onClose} />
        </ThemeProvider>
      </Provider>
    );

    const languageRadio = screen.getByDisplayValue('ru');
    fireEvent.click(languageRadio);

    expect(languageRadio).toBeChecked();
  });

  it('handles theme selection', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={THEMES.Dark}>
          <SettingsModal onClose={onClose} />
        </ThemeProvider>
      </Provider>
    );

    const themeRadio = screen.getByDisplayValue('Light');
    fireEvent.click(themeRadio);

    expect(themeRadio).toBeChecked();
  });

  it('handles apply button click', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={THEMES.Dark}>
          <SettingsModal onClose={onClose} />
        </ThemeProvider>
      </Provider>
    );

    const applyButton = screen.getByText('Apply');

    act(() => {
      fireEvent.click(applyButton);
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
