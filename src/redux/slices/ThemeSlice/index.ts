import * as reduxToolkit from '@reduxjs/toolkit';
import { THEMES } from 'constants/themes';
import { ThemeValueType } from 'types/themeValue';

interface ThemeState {
  currentTheme: ThemeValueType;
}

const initialState: ThemeState = {
  currentTheme: localStorage.getItem('theme')
    ? (localStorage.getItem('theme') as ThemeValueType)
    : THEMES.Dark.value,
};

const themeSlice = reduxToolkit.createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: reduxToolkit.PayloadAction<ThemeValueType>) {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
