import { RootState } from 'redux/store';

export const selectThemeValue = (state: RootState) => state.theme.currentTheme;
