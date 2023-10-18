import { request } from 'services/axiosService';
import { User } from 'auth/Auth';

export const getCurrentUser = async () => {
  const { data } = await request<User>({ url: '/person' });
  return data;
};
