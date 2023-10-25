import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserTickets } from 'services/ticketService';
import { setTickets } from 'redux/slices/TicketSlice';

export const getTickets = createAsyncThunk<void, string>(
  'ticket/getTickets',
  async (language, { dispatch }) => {
    try {
      const tickets = await getUserTickets(language);
      dispatch(setTickets(tickets));
    } catch (err) {
      alert('Data loading error!');
    }
  }
);
