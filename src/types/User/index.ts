import { ImageType } from 'types/Image';

export type UserType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  gender?: string;
  avatar?: ImageType;
};
