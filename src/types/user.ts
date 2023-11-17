import { ImageType } from 'types/image';

export type UserType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  gender?: string;
  avatar?: ImageType;
};
