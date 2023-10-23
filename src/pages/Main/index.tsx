import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from 'components/Header';
import VideoPreview from 'components/VideoPreview';
import ErrorFallback from 'components/ErrorFallback';
import ErrorBoundary from 'components/ErrorBoundary';
import VerticalCarousel from 'components/VerticalCarousel';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getMovies } from 'redux/thunks/movie';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectMovies } from 'redux/selectors/movie';
import { MovieType } from 'types/Movie';
import { getMovie } from 'services/movieService';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { useTranslation } from 'react-i18next';

const MainWrapper = styled.div`
  position: relative;
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Flex = styled.div<{ $marginTop?: number; $height?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$height && `height: ${props.$height}px`};
  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
`;

const DescriptionContainer = styled(motion.div)`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  z-index: 1;
`;

const TrailerTitle = styled.span`
  font-size: 48px;
`;

const TrailerDescription = styled.p`
  width: 594px;
  margin: 10px 0 0;

  font-size: 32px;
`;

const CurrentMoviesContainer = styled(motion.div)`
  margin-right: 50px;
`;

const CurrentMoviesTitle = styled.span`
  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-style: italic;
  font-weight: 300;
  text-transform: uppercase;
`;

const CurrentMoviesDescription = styled.p`
  max-width: 630px;
  margin: 25px 0 0;

  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  font-family: 'Inria Sans', sans-serif;
  font-size: 40px;
  font-style: italic;
  font-weight: 300;
`;

const StyledYear = styled(motion.span)`
  color: ${(props) => props.theme.color};
  transition: color 1.8s ease-in-out;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

function Main() {
  const { t, i18n } = useTranslation();
  const movies = useAppSelector(selectMovies);
  const [lastMovie, setLastMovie] = useState<MovieType>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies(i18n.language));
  }, [dispatch, i18n.language]);

  useEffect(() => {
    if (movies.at(0)) {
      (async () => {
        try {
          const movie = await getMovie(movies[0].id, i18n.language);
          setLastMovie(movie);
        } catch (err) {
          alert(t('loading_error'));
        }
      })();
    }
  }, [i18n.language, movies, t]);

  return (
    <MainWrapper>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Flex $marginTop={150}>
          <DescriptionContainer
            initial={{ opacity: 0, translateY: '100px' }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <TrailerTitle>{lastMovie?.title}</TrailerTitle>
            <TrailerDescription>{lastMovie?.description}</TrailerDescription>
          </DescriptionContainer>
          <VideoPreview
            previewUrl={BASE_UPLOADS_URL + lastMovie?.trailer?.preview.filename}
            videoUrl={BASE_UPLOADS_URL + lastMovie?.trailer?.filename}
            isHiding
          />
        </Flex>
        <Flex $marginTop={86} $height={497}>
          <CurrentMoviesContainer
            initial={{ opacity: 0, translateX: '-100px' }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
          >
            <CurrentMoviesTitle>{t('current_movies_title')}</CurrentMoviesTitle>
            <CurrentMoviesDescription>
              {t('current_movies_description')}
            </CurrentMoviesDescription>
          </CurrentMoviesContainer>
          <VerticalCarousel data={movies} />
        </Flex>
        <Flex $marginTop={150}>
          <motion.img
            src="images/studios.svg"
            alt="studios"
            initial={{ opacity: 0, translateY: '100%' }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
          />
        </Flex>
        <Flex $marginTop={40}>
          <StyledYear
            initial={{ opacity: 0, translateY: '100%' }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
          >
            2023
          </StyledYear>
        </Flex>
        <Outlet />
      </ErrorBoundary>
    </MainWrapper>
  );
}

export default Main;
