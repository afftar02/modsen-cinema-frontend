import { RootState } from 'redux/store';

export const selectTickets = (state: RootState) => state.ticket.tickets;
