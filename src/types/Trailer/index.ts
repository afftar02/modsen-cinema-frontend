import { ImageType } from 'types/Image';

export type TrailerType = {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  preview: ImageType;
};
