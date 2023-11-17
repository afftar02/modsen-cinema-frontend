import { ImageType } from 'types/image';

export type TrailerType = {
  id: number;
  filename: string;
  mimetype: string;
  size: number;
  preview: ImageType;
};
