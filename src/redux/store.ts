import { configureStore } from '@reduxjs/toolkit';
import theme from 'redux/slices/ThemeSlice';
import movie from 'redux/slices/MovieSlice';

export const store = configureStore({
  reducer: {
    theme,
    movie,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
