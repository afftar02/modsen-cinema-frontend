import { TicketType } from 'types/Ticket';

export type BookingCardProps = {
  ticket: TicketType;
  onCancelClick: () => void;
  isOver?: boolean;
};
