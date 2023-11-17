import { MovieType } from 'types/movie';
import { SeatType } from 'types/seat';
import { SessionType } from 'types/session';

export type TicketType = {
  id: number;
  isPaid: boolean;
  isVisited: boolean;
  isMissed: boolean;
  discount: number;
  seats?: SeatType[];
  session?: SessionType;
  movie?: MovieType;
};

export type TicketDto = {
  isPaid?: boolean;
  isVisited?: boolean;
  isMissed?: boolean;
  seatIds: number[];
};
