import * as reduxToolkit from '@reduxjs/toolkit';
import { MovieType } from 'types/Movie';

interface MovieState {
  movies: MovieType[];
}

const initialState: MovieState = {
  movies: [],
};

const movieSlice = reduxToolkit.createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies(state, action: reduxToolkit.PayloadAction<Array<MovieType>>) {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
