import { ActorType } from 'types/actor';
import { CountryType } from 'types/country';
import { GenreType } from 'types/genre';
import { ImageType } from 'types/image';
import { ReviewType } from 'types/review';
import { TrailerType } from 'types/trailer';

export type MovieType = {
  id: number;
  title: string;
  description: string;
  rating: number;
  ageRestriction: number;
  quality: string;
  start: Date;
  author: string;
  reviews?: ReviewType[];
  country?: CountryType;
  actors?: ActorType[];
  genres?: GenreType[];
  poster?: ImageType;
  trailer?: TrailerType;
};
