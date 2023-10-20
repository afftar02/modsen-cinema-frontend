import { request } from 'services/axiosService';
import { TicketDto, TicketType } from 'types/Ticket';

export const getUserTickets = async () => {
  const { data } = await request<Array<TicketType>>({ url: '/tickets' });
  return data;
};

export const createTicket = async ({
  seatIds,
  isPaid = false,
  isVisited = false,
  isMissed = false,
}: TicketDto) => {
  await request({
    method: 'POST',
    url: '/ticket',
    data: {
      isPaid,
      isVisited,
      isMissed,
      seatIds,
    },
  });
};
