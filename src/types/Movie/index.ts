import { ReviewType } from 'types/Review';
import { CountryType } from 'types/Country';
import { ActorType } from 'types/Actor';
import { GenreType } from 'types/Genre';
import { ImageType } from 'types/Image';
import { TrailerType } from 'types/Trailer';

export type MovieType = {
  id: number;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  rating: number;
  ageRestriction: number;
  quality: string;
  start: Date;
  author: string;
  reviews?: ReviewType[];
  country?: CountryType;
  actors?: ActorType[];
  genres: GenreType[];
  poster: ImageType;
  trailer?: TrailerType;
};
