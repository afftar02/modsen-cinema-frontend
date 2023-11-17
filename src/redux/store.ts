import { configureStore } from '@reduxjs/toolkit';
import movie from 'redux/slices/MovieSlice';
import theme from 'redux/slices/ThemeSlice';
import ticket from 'redux/slices/TicketSlice';

export const store = configureStore({
  reducer: {
    theme,
    movie,
    ticket,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
