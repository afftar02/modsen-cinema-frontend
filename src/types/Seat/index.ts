export type SeatType = {
  id: number;
  price: number;
  number: number;
  row: number;
  ticket?: { id: number } | null;
};
