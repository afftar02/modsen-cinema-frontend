import { render, screen } from '@testing-library/react';
import { THEMES } from 'constants/Themes';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import Footer from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'subscribe_text':
          return 'Subscribe';
        case 'subscribe_description_text':
          return 'Join our newsletter to stay up to date on features and releases';
        default:
          break;
      }
    },
  }),
}));

describe('Footer', () => {
  it('Correct footer render', async () => {
    render(
      <ThemeProvider theme={THEMES.Dark}>
        <Footer />
      </ThemeProvider>
    );

    expect(screen.getByText('Subscribe')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join our newsletter to stay up to date on features and releases'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('First column')).toBeInTheDocument();
  });
});
