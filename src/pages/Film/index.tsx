import Header from 'components/Header';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import Review from 'components/Review';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Footer from 'components/Footer';
import Vibrant from 'node-vibrant/lib/bundle';
import MovieBooking from './MovieBooking';
import VideoPreview from 'components/VideoPreview';
import MovieInfo from './MovieInfo';
import ErrorFallback from 'components/ErrorFallback';
import ErrorBoundary from 'components/ErrorBoundary';
import { motion } from 'framer-motion';
import { MovieType } from 'types/Movie';
import { getMovie } from 'services/movieService';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { selectMovies } from 'redux/selectors/movie';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 0 85px;
`;

const Container = styled.div`
  padding: 171px 120px 155px 120px;
  position: relative;
  margin-top: 46px;
`;

const BackgroundContainer = styled.div<{
  $firstBgColor: string;
  $secondBgColor: string;
}>`
  animation: 1s linear 0.3s fade-up;
  background: ${(props) =>
    props.$firstBgColor || props.$secondBgColor
      ? `linear-gradient(180deg, ${props.$firstBgColor}, ${props.$secondBgColor})`
      : 'transparent'};
  box-shadow:
    -50px -50px 100px 0px #1e1f27 inset,
    50px 50px 100px 20px #1e1f27 inset;
  filter: blur(10px);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const MoveNextContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 100px;
  top: 185px;
  z-index: 5;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  animation: 0.5s ease-in-out fade-up;

  &:hover {
    transform: translateX(15px);
    opacity: 0.7;
  }
`;

const MoveNextText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 500;
  text-decoration-line: underline;
  margin-right: 30px;
`;

const TrailerBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: 78px;
`;

const TrailerText = styled(motion.span)`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 42px;
  font-weight: 500;
  display: inline-block;
`;

const StyledPreview = styled(VideoPreview)`
  margin-top: 67px;
`;

const ReviewsBlock = styled.div`
  position: relative;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

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
            first: palette.DarkVibrant?.hex ?? '#000',
            second: palette.LightVibrant?.hex ?? '#fff',
            review: palette.DarkMuted?.hex ?? '#000',
          });
        } catch (err) {
          navigate('/');
        }
      })();
    }
  }, [i18n.language, id, navigate]);

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
                  fill={'#fff'}
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
              {movie?.reviews?.map((review) => (
                <Review
                  bgColor={backgroundColors.review}
                  key={review.id}
                  author={review.author}
                  text={review.description}
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
