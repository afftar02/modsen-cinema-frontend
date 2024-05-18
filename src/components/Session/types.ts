import { MouseEventHandler } from "react";

export type SessionProps = {
  start: Date;
  end: Date;
  format: string;
  formatLabel: string;
  seatsLabel: string;
  availableSeats?: number;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};