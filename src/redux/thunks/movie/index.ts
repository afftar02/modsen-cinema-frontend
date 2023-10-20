import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMovies } from 'services/movieService';
import { setMovies } from 'redux/slices/MovieSlice';

export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async (arg, { dispatch }) => {
    try {
      const movies = await getAllMovies();
      dispatch(setMovies(movies));
    } catch (err) {
      alert('Data loading error!');
    }
  }
);
