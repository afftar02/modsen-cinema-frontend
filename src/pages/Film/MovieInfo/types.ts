import { MovieType } from 'types/Movie';

export type MovieInfoProps = {
  movie: MovieType;
  onOpenBooking?: () => void;
};
