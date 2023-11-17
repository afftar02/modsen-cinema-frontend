import { TicketType } from 'types/ticket';

export function useTicketPrice(ticket: TicketType) {
  if (ticket.seats) {
    const result =
      ticket.seats.reduce((sum, seat) => sum + seat.price, 0) *
      (1 - ticket.discount / 100);

    return Number(result.toFixed(1));
  }

  return 0;
}
