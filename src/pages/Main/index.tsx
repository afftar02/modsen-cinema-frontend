import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from 'components/Header';
import VideoPreview from 'components/VideoPreview';
import ErrorFallback from 'components/ErrorFallback';
import ErrorBoundary from 'components/ErrorBoundary';
import VerticalCarousel from '../../components/VerticalCarousel';

const MainWrapper = styled.div`
  position: relative;
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Flex = styled.div<{ $marginTop?: number; $height?: number; }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$height && `height: ${props.$height}px`};
  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
`;

const DescriptionContainer = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
  color: #ffffff;

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

const CurrentMovieTitle = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-style: italic;
  font-weight: 300;
  text-transform: uppercase;
`;

const CurrentMovieDescription = styled.p`
  width: 630px;
  margin: 25px 0 0;

  color: #fff;
  font-family: 'Inria Sans', sans-serif;
  font-size: 40px;
  font-style: italic;
  font-weight: 300;
`;

const StyledYear = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

function Main() {
  return (
    <MainWrapper>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Flex $marginTop={150}>
          <DescriptionContainer>
            <TrailerTitle>THE BATMAN</TrailerTitle>
            <TrailerDescription>
              Batman is called to intervene when the mayor of Gotham City is
              murdered. Soon, his investigation leads him to uncover a web of
              corruption, linked to his own dark past.
            </TrailerDescription>
          </DescriptionContainer>
          <VideoPreview
            previewUrl={
              'https://s3-alpha-sig.figma.com/img/e73d/a448/7b1a870666847d044c701bcd275121cc?Expires=1696204800&Signature=ZFuRAwH4r-rcBOelM~MyxSkAxPBHp6Xz40LCvAMW7TXPxrBYfWXOQA9lIscy3wu06OcH~fOgQD6kWKAyk3SI0mhN7DWLdprhUfNsApaEPN0686zVvGBewQRqKz2Mtj6ZP-y5I1xASJJ7yBgGrLFOmydA86t7lWktu~lC9etqSnhsao7hmhLns21hIGwME7Nrliu8l3NLY29ap2khsU5cesx7e5YB598465kBJti0-qS12Dje2nivlOOz7Lt0pNAHivpYgSGvsljKJr7eQShnNAgAX5HRkcB-4e646k3EG3vboRMDbYkr-5cYxJG6QmEdEb0WbrCjyZaIGNHWBvqzMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            }
            videoUrl={
              'https://www.film.ru/sites/default/files/trailers/16916130/The-Batman-trailer-3-rus.mp4'
            }
            isHiding
          />
        </Flex>
        <Flex $marginTop={86} $height={497}>
          <div>
            <CurrentMovieTitle>Now in the Cinema</CurrentMovieTitle>
            <CurrentMovieDescription>
              Watch great Movies in the best cinema! We care about your comfort.
              Book tickets right now!
            </CurrentMovieDescription>
          </div>
          <VerticalCarousel />
        </Flex>
        <Flex $marginTop={150}>
          <img src="images/studios.svg" alt="studios" />
        </Flex>
        <Flex $marginTop={40}>
          <StyledYear>2023</StyledYear>
        </Flex>
        <Outlet />
      </ErrorBoundary>
    </MainWrapper>
  );
}

export default Main;
