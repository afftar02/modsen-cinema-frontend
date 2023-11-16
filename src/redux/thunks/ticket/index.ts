import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTickets } from 'redux/slices/TicketSlice';
import { getUserTickets } from 'services/ticketService';

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
