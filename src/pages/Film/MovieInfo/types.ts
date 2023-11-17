import { MovieType } from 'types/movie';

export type MovieInfoProps = {
  movie: MovieType;
  onOpenBooking?: () => void;
};
