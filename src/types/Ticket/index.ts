import { SeatType } from 'types/Seat';
import { SessionType } from 'types/Session';
import { MovieType } from 'types/Movie';

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
