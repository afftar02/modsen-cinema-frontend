import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { motion } from 'framer-motion';
import { Button, Icon } from 'modsen-library';
import { styled } from 'styled-components';
import { MovieType } from 'types/Movie';

type MovieInfoProps = {
  movie: MovieType;
  onOpenBooking?: () => void;
};

const MovieInfoContainer = styled.div`
  position: relative;

  @media (max-width: 1500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
  }
`;

const MovieTitleContainer = styled(motion.div)`
  margin-bottom: 34px;
`;

const MovieTitleText = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 400;
  text-transform: uppercase;
`;

const MovieDataContainer = styled.div`
  display: flex;
  margin: 34px 0;

  @media (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PosterContainer = styled(motion.div)`
  width: 410px;
  height: 600px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media (max-width: 700px) {
    width: 300px;
    height: 400px;
  }
`;

const Poster = styled.img`
  height: 100%;
  border-radius: 10px;
`;

const MovieDataBlock = styled(motion.div)`
  margin-left: 70px;

  @media (max-width: 1500px) {
    margin: 0;
  }
`;

const InfoBlock = styled.div`
  margin-top: 20px;
  width: 680px;

  @media (max-width: 1500px) {
    width: 100%;
  }
`;

const InfoLabel = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
`;

const InfoText = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
  text-transform: capitalize;
`;

const BookingBlock = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 50px;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RatingBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const RatingText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 700;
`;

const DescriptionText = styled(motion.span)`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
`;

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
            alt={'poster'}
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
      <div>
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
      </div>
    </MovieInfoContainer>
  );
}

export default MovieInfo;
