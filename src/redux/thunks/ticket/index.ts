import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserTickets } from 'services/ticketService';
import { setTickets } from 'redux/slices/TicketSlice';

export const getTickets = createAsyncThunk(
  'ticket/getTickets',
  async (arg, { dispatch }) => {
    try {
      const tickets = await getUserTickets();
      dispatch(setTickets(tickets));
    } catch (err) {
      alert('Data loading error!');
    }
  }
);
