import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMovies } from 'services/movieService';
import { setMovies } from 'redux/slices/MovieSlice';

export const getMovies = createAsyncThunk<void, string>(
  'movie/getMovies',
  async (language, { dispatch }) => {
    try {
      const movies = await getAllMovies(language);
      dispatch(setMovies(movies));
    } catch (err) {
      alert('Data loading error!');
    }
  }
);
