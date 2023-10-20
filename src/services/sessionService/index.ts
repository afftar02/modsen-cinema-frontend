import { request } from 'services/axiosService';
import { SessionType } from 'types/Session';

export const getSessions = async (movieId: number, date?: Date) => {
  const { data } = await request<Array<SessionType>>({
    url: `/movie/${movieId}/sessions`,
    params: { date },
  });

  for (let i = 0; i < data.length; i++) {
    data[i].start = new Date(data[i].start);
    data[i].end = new Date(data[i].end);
  }

  return data;
};
