import { request } from 'services/axiosService';
import { MovieType } from 'types/Movie';

export const getAllMovies = async (language: string) => {
  const { data } = await request<Array<MovieType>>({
    url: `/${language}/movies`,
  });
  return data;
};

export const getMovie = async (id: number, language: string) => {
  const { data } = await request<MovieType>({
    url: `/${language}/movie/${id}`,
  });

  data.start = new Date(data.start);

  return data;
};
