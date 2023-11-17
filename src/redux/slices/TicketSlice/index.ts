import * as reduxToolkit from '@reduxjs/toolkit';
import { TicketType } from 'types/ticket';

interface TicketState {
  tickets: TicketType[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = reduxToolkit.createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets(state, action: reduxToolkit.PayloadAction<Array<TicketType>>) {
      state.tickets = action.payload;
    },
  },
});

export const { setTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
