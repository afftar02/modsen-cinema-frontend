import Auth from 'auth/Auth';
import { THEMES } from 'constants/Themes';
import { AnimatePresence } from 'framer-motion';
import Wrapper from 'pages/Wrapper';
import { useAppSelector } from 'redux/hooks';
import { selectThemeValue } from 'redux/selectors/theme';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './Routes';

function App() {
  const currentThemeValue = useAppSelector(selectThemeValue);

  return (
    <Auth>
      <AnimatePresence mode={'wait'}>
        <ThemeProvider theme={THEMES[currentThemeValue]}>
          <Wrapper>
            <AppRoutes />
          </Wrapper>
        </ThemeProvider>
      </AnimatePresence>
    </Auth>
  );
}

export default App;
