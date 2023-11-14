import { Outlet } from 'react-router-dom';
import { styled, useTheme } from 'styled-components';
import Header from 'components/Header';
import VideoPreview from 'components/VideoPreview';
import ErrorFallback from 'components/ErrorFallback';
import ErrorBoundary from 'components/ErrorBoundary';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getMovies } from 'redux/thunks/movie';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectMovies } from 'redux/selectors/movie';
import { MovieType } from 'types/Movie';
import { getMovie } from 'services/movieService';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { useTranslation } from 'react-i18next';
import { VerticalCarousel } from 'modsen-library';
import useWindowDimensions from 'hooks/useWindowDimensions';

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

  @media (max-width: 1500px) {
    width: 400px;
  }
  @media (max-width: 1150px) {
    width: 594px;
  }
  @media (max-width: 700px) {
    width: 360px;
    font-size: 25px;
  }
`;

const CurrentMoviesContainer = styled(motion.div)`
  margin-right: 50px;

  @media (max-width: 1250px) {
    margin: 0 0 50px;
  }
`;

const CurrentMoviesTitle = styled.span`
  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-style: italic;
  font-weight: 300;
  text-transform: uppercase;

  @media (max-width: 700px) {
    font-size: 38px;
  }
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

  @media (max-width: 700px) {
    width: 360px;
    font-size: 30px;
  }
`;

const StyledYear = styled(motion.span)`
  color: ${(props) => props.theme.color};
  transition: color 1.8s ease-in-out;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

const StyledVideoPreview = styled(VideoPreview)`
  @media (max-width: 1500px) {
    width: 650px;
    height: 380px;
  }
  @media (max-width: 700px) {
    width: 360px;
    height: 200px;
  }
`;

const StudiosImage = styled(motion.img)`
  @media (max-width: 700px) {
    width: 360px;
  }
`;

const MoviePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 30px;
  }
  @media (max-width: 700px) {
    margin-top: 50px;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 86px;

  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;

function Main() {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const movies = useAppSelector(selectMovies);
  const [lastMovie, setLastMovie] = useState<MovieType>();

  const theme = useTheme();

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
        <MoviePreviewContainer>
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
          <StyledVideoPreview
            previewUrl={BASE_UPLOADS_URL + lastMovie?.trailer?.preview.filename}
            videoUrl={BASE_UPLOADS_URL + lastMovie?.trailer?.filename}
            isHiding={width > 1150}
          />
        </MoviePreviewContainer>
        <MoviesContainer>
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
          <VerticalCarousel
            data={movies.map((movie) => ({
              ...movie,
              posterUrl: BASE_UPLOADS_URL + movie.poster?.filename,
              genre: movie.genres?.at(0)?.title,
            }))}
            titleColor={theme.color}
            buttonsColor={theme.color}
            linkPrefix={'/film'}
          />
        </MoviesContainer>
        <Flex $marginTop={150}>
          <StudiosImage
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
