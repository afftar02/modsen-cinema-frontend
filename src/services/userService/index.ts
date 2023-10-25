import { request } from 'services/axiosService';
import { UserType } from 'types/User';

export const getCurrentUser = async () => {
  const { data } = await request<UserType>({ url: '/person' });
  return data;
};

export const updateUser = async (data: Partial<UserType>) => {
  await request({ url: '/person', method: 'PATCH', data });
};
