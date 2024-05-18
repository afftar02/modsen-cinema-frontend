import { SeatType } from 'types/seat';

export const calculateRowsLengths = (seats: Array<SeatType>) => {
  const map = new Map<number, number>();
  for (const seat of seats) {
    map.set(seat.row, map.has(seat.row) ? Number(map.get(seat.row)) + 1 : 1);
  }
  return map;
}