import { RootState } from 'redux/store';

export const selectMovies = (state: RootState) => state.movie.movies;
