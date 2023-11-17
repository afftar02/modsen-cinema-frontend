import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { BASE_UPLOADS_URL } from 'constants/baseApiUrl';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { VerticalCarousel } from 'modsen-library';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectMovies } from 'redux/selectors/movie';
import { getMovies } from 'redux/thunks/movie';
import { getMovie } from 'services/movieService';
import { useTheme } from 'styled-components';
import { MovieType } from 'types/movie';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Header from 'components/Header';

import {
  CurrentMoviesContainer,
  CurrentMoviesDescription,
  CurrentMoviesTitle,
  DescriptionContainer,
  Flex,
  MainWrapper,
  MoviePreviewContainer,
  MoviesContainer,
  StudiosImage,
  StyledVideoPreview,
  StyledYear,
  TrailerDescription,
  TrailerTitle,
} from './styled';

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
