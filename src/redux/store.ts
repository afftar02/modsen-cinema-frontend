import { configureStore } from '@reduxjs/toolkit';
import theme from 'redux/slices/ThemeSlice';
import movie from 'redux/slices/MovieSlice';
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
