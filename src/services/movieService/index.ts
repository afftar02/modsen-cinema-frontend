import { request } from 'services/axiosService';
import { MovieType } from 'types/Movie';

export const getAllMovies = async () => {
  const { data } = await request<Array<MovieType>>({ url: '/en/movies' });
  return data;
};

export const getMovie = async (id: number) => {
  const { data } = await request<MovieType>({ url: `/en/movie/${id}` });

  data.start = new Date(data.start);

  return data;
};
