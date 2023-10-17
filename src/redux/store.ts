import { configureStore } from '@reduxjs/toolkit';
import theme from 'redux/slices/ThemeSlice';

export const store = configureStore({
  reducer: {
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;
