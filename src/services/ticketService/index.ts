import { request } from 'services/axiosService';
import { TicketDto, TicketType } from 'types/ticket';

export const getUserTickets = async (language: string) => {
  const { data } = await request<Array<TicketType>>({
    url: `/${language}/tickets`,
  });
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

export const updateTicket = async (
  id: number,
  ticketInfo: Partial<TicketDto>
) => {
  await request({
    method: 'PATCH',
    url: `/ticket/${id}`,
    data: ticketInfo,
  });
};
