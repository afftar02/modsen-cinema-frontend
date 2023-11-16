import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { Button, Icon } from 'modsen-library';

import {
  BookingBlock,
  DescriptionText,
  InfoBlock,
  InfoLabel,
  InfoText,
  MovieDataBlock,
  MovieDataContainer,
  MovieInfoContainer,
  MovieTitleContainer,
  MovieTitleText,
  Poster,
  PosterContainer,
  RatingBlock,
  RatingText,
} from './styled';
import { MovieInfoProps } from './types';

function MovieInfo({ onOpenBooking, movie }: MovieInfoProps) {
  const { t } = useTranslation();

  const bookingStartDate = useMemo(() => {
    const date = new Date(movie.start);
    date.setDate(movie.start.getDate() - 7);
    return date;
  }, [movie]);

  return (
    <MovieInfoContainer>
      <MovieTitleContainer
        initial={{ opacity: 0, translateY: '30%' }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true }}
      >
        <MovieTitleText>{movie.title}</MovieTitleText>
      </MovieTitleContainer>
      <MovieDataContainer>
        <PosterContainer
          initial={{ opacity: 0, translateX: '-50%' }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.5,
          }}
          viewport={{ once: true }}
        >
          <Poster
            src={BASE_UPLOADS_URL + movie.poster?.filename}
            alt="poster"
          />
        </PosterContainer>
        <MovieDataBlock
          initial={{ opacity: 0, translateX: '50%' }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.5,
          }}
          viewport={{ once: true }}
        >
          <InfoBlock>
            <InfoLabel>{t('movie_year')}</InfoLabel>
            <InfoText>{movie.start.getFullYear()}</InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>{t('movie_country')}</InfoLabel>
            <InfoText>{movie.country?.title.toUpperCase()}</InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>{t('movie_genre')}</InfoLabel>
            <InfoText>
              {movie.genres?.map((genre) => genre.title).join(' / ')}
            </InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>{t('movie_author')}</InfoLabel>
            <InfoText>{movie.author}</InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>{t('movie_actors')}</InfoLabel>
            <InfoText>
              {movie.actors &&
                movie.actors
                  .map((actor) => `${actor.name} ${actor.surname}`)
                  .join(', ')}
            </InfoText>
          </InfoBlock>
          <BookingBlock>
            {bookingStartDate <= new Date() ? (
              <Button onClick={onOpenBooking}>{t('book_button_text')}!</Button>
            ) : (
              <Button disabled>{t('coming_soon_text')}</Button>
            )}
            <RatingBlock>
              <RatingText>
                {movie.rating ? movie.rating.toLocaleString() : 0}
              </RatingText>
              <Icon id={'star'} width={39} height={38} viewBox="0 0 39 38" />
            </RatingBlock>
          </BookingBlock>
        </MovieDataBlock>
      </MovieDataContainer>
      <DescriptionText
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true }}
      >
        {movie.description}
      </DescriptionText>
    </MovieInfoContainer>
  );
}

export default MovieInfo;
