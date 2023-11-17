import { TicketType } from 'types/ticket';

export type BookingCardProps = {
  ticket: TicketType;
  onCancelClick: () => void;
  isOver?: boolean;
};
