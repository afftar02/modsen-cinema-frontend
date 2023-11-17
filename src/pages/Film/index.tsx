import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_UPLOADS_URL } from 'constants/baseApiUrl';
import { Icon, Review } from 'modsen-library';
import Vibrant from 'node-vibrant/lib/bundle';
import { useAppSelector } from 'redux/hooks';
import { selectMovies } from 'redux/selectors/movie';
import { getMovie } from 'services/movieService';
import { useTheme } from 'styled-components';
import { MovieType } from 'types/Movie';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Footer from 'components/Footer';
import Header from 'components/Header';

import MovieBooking from './MovieBooking';
import MovieInfo from './MovieInfo';
import {
  BackgroundContainer,
  Container,
  MoveNextContainer,
  MoveNextText,
  PageContainer,
  ReviewsBlock,
  StyledPreview,
  TrailerBlock,
  TrailerText,
  Wrapper,
} from './styled';

function Film() {
  const { t, i18n } = useTranslation();
  const [movie, setMovie] = useState<MovieType>();
  const [bookingOpened, setBookingOpened] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState({
    first: '',
    second: '',
    review: '',
  });
  const bookingRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const movies = useAppSelector(selectMovies);

  const theme = useTheme();

  const scrollToBooking = useCallback(() => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const nextMovieId = useMemo(() => {
    if (id) {
      const nextId = movies.at(
        movies.findIndex((movie) => movie.id === +id) + 1
      )?.id;

      return nextId ?? movies.at(0)?.id;
    }
  }, [id, movies]);

  const handleOpenBookingClick = useCallback(() => {
    setBookingOpened(true);
    scrollToBooking();
  }, [scrollToBooking]);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const currentMovie = await getMovie(+id, i18n.language);
          const palette = await Vibrant.from(
            BASE_UPLOADS_URL + currentMovie.poster?.filename
          ).getPalette();
          setMovie(currentMovie);
          setBackgroundColors({
            first: palette.DarkVibrant?.hex ?? theme.filmBgFirstDefaultColor,
            second: palette.LightVibrant?.hex ?? theme.filmBgSecondDefaultColor,
            review: palette.DarkMuted?.hex ?? theme.filmBgReviewDefaultColor,
          });
        } catch (err) {
          navigate('/');
        }
      })();
    }
  }, [i18n.language, id, navigate, theme]);

  useEffect(() => {
    if (bookingOpened) {
      scrollToBooking();
    }
  }, [bookingOpened, scrollToBooking]);

  useEffect(() => {
    if (localStorage.getItem('booking')) {
      const bookingInfo = JSON.parse(localStorage.getItem('booking') as string);

      if (Number(bookingInfo.movieId) === Number(id)) {
        setBookingOpened(true);
      } else {
        localStorage.removeItem('booking');
      }
    }
  }, [id]);

  return (
    <PageContainer>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Wrapper>
          <Container>
            <BackgroundContainer
              $firstBgColor={backgroundColors.first}
              $secondBgColor={backgroundColors.second}
            />
            <Link to={`/film/${nextMovieId}`}>
              <MoveNextContainer>
                <MoveNextText>{t('next_movie_text')}</MoveNextText>
                <Icon
                  id={'arrow-right'}
                  width={69}
                  height={38}
                  viewBox="0 0 69 38"
                  fill={theme.nextFilmArrowColor}
                />
              </MoveNextContainer>
            </Link>
            {movie && (
              <MovieInfo onOpenBooking={handleOpenBookingClick} movie={movie} />
            )}
            {bookingOpened && movie && (
              <MovieBooking ref={bookingRef} movieId={movie?.id} />
            )}
            <TrailerBlock>
              <TrailerText
                initial={{ opacity: 0, translateY: '100%' }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{
                  duration: 0.5,
                }}
                viewport={{ once: true }}
              >
                {t('trailer_title')}
              </TrailerText>
              <StyledPreview
                previewUrl={BASE_UPLOADS_URL + movie?.trailer?.preview.filename}
                videoUrl={BASE_UPLOADS_URL + movie?.trailer?.filename}
              />
            </TrailerBlock>
            <ReviewsBlock>
              {movie?.reviews?.map(({ id, author, description }) => (
                <Review
                  title={t('review_title')}
                  fromLabel={t('from_text')}
                  showMoreLabel={t('read_more_text')}
                  bgColor={backgroundColors.review}
                  key={id}
                  author={author}
                  text={description}
                />
              ))}
            </ReviewsBlock>
          </Container>
        </Wrapper>
      </ErrorBoundary>
      <Footer />
    </PageContainer>
  );
}

export default Film;
