export type SessionType = {
  id: number;
  start: Date;
  end: Date;
  format: string;
  availableSeats?: number;
};
