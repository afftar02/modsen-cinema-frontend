import { request } from 'services/axiosService';
import { SeatType } from 'types/seat';

export const getSeats = async (sessionId: number) => {
  const { data } = await request<Array<SeatType>>({
    url: `/session/${sessionId}/seats`,
  });
  return data;
};
