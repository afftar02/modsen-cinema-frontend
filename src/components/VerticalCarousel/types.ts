export type SlideType = {
  id: number;
  title: string;
  ageRestriction: number;
  quality: string;
  start: Date;
  posterUrl: string;
  genre?: string;
};

export type VerticalCarouselProps = {
  data: SlideType[];
  titleColor: string;
  buttonsColor: string;
  linkPrefix: string;
};