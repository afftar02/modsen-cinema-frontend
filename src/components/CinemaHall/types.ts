import { SeatType } from 'types/seat';

export type CinemaHallProps = {
  screenLabel: string;
  availableSeatLabel: string;
  reservedSeatLabel: string;
  selectedSeatLabel: string;
  seats: Array<SeatType>;
  onSeatClick: (seatId: number, price: number) => void;
  chosenSeatIds?: number[];
};