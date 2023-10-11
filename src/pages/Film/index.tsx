import Header from 'components/Header';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import Review from 'components/Review';
import { useEffect, useRef, useState } from 'react';
import Footer from 'components/Footer';
import Vibrant from 'node-vibrant/lib/bundle';
import MovieBooking from './MovieBooking';
import VideoPreview from 'components/VideoPreview';
import MovieInfo from './MovieInfo';
import ErrorFallback from 'components/ErrorFallback';
import ErrorBoundary from 'components/ErrorBoundary';

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
  background: ${(props) =>
    `linear-gradient(180deg, ${props.$firstBgColor}, ${props.$secondBgColor})`};
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

const MoveNextContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 100px;
  top: 185px;
  z-index: 5;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

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

const TrailerText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 42px;
  font-weight: 500;
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
  const [bookingOpened, setBookingOpened] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState({
    first: '',
    second: '',
    review: '',
  });

  const bookingRef = useRef<HTMLDivElement>(null);

  const imageUrl =
    'https://s3-alpha-sig.figma.com/img/e5cc/8136/0873c95c1344b596f117082814368ada?Expires=1698019200&Signature=EpJa3G7fEGF26GpsYcpiZV4KbCq-DWnb771YFlaGRRwLj50BmrzcotnY7yJSiWxo5-a4YR4N12xVr6FgkPGy8iFNJatIoDn0msa8iUoSs73-vQZtdvzV52z84ukpH9A9aQFIVzGSWZlifzzZBn23~dHXqeOXw7CCQp1YWc-E0zrRXYVVA9KEta4etGXlMIlZRyeeC6lTA11KbWjWgJ1H9f8m50sSQzCc1rvVFkNC7~uqOx12VmpCzv55dVdorSJDsQzJ4vy0YD8wi4H8aJBm1IuiUm05vIRNu36ooaPHfob~qxAwnITjRRPOTOH8H0xWhqA67qaoeNnmtiABUDSZ4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

  useEffect(() => {
    (async () => {
      const palette = await Vibrant.from(imageUrl).getPalette();
      setBackgroundColors({
        first: palette.DarkVibrant?.hex ?? '#000',
        second: palette.LightVibrant?.hex ?? '#fff',
        review: palette.DarkMuted?.hex ?? '#000',
      });
    })();
  }, []);

  useEffect(() => {
    if (bookingOpened) {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bookingOpened]);

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
            <MoveNextContainer>
              <MoveNextText>Move to the next movie</MoveNextText>
              <Icon
                id={'arrow-right'}
                width={69}
                height={38}
                viewBox="0 0 69 38"
              />
            </MoveNextContainer>
            <MovieInfo
              onOpenBooking={() => setBookingOpened(true)}
              posterUrl={imageUrl}
            />
            {bookingOpened && <MovieBooking ref={bookingRef} />}
            <TrailerBlock>
              <TrailerText>Watch trailer online!</TrailerText>
              <StyledPreview
                previewUrl={
                  'https://s3-alpha-sig.figma.com/img/e73d/a448/7b1a870666847d044c701bcd275121cc?Expires=1696204800&Signature=ZFuRAwH4r-rcBOelM~MyxSkAxPBHp6Xz40LCvAMW7TXPxrBYfWXOQA9lIscy3wu06OcH~fOgQD6kWKAyk3SI0mhN7DWLdprhUfNsApaEPN0686zVvGBewQRqKz2Mtj6ZP-y5I1xASJJ7yBgGrLFOmydA86t7lWktu~lC9etqSnhsao7hmhLns21hIGwME7Nrliu8l3NLY29ap2khsU5cesx7e5YB598465kBJti0-qS12Dje2nivlOOz7Lt0pNAHivpYgSGvsljKJr7eQShnNAgAX5HRkcB-4e646k3EG3vboRMDbYkr-5cYxJG6QmEdEb0WbrCjyZaIGNHWBvqzMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                }
                videoUrl={
                  'https://www.film.ru/sites/default/files/trailers/16916130/The-Batman-trailer-3-rus.mp4'
                }
              />
            </TrailerBlock>
            <ReviewsBlock>
              <Review bgColor={backgroundColors.review} />
              <Review bgColor={backgroundColors.review} />
              <Review bgColor={backgroundColors.review} />
            </ReviewsBlock>
          </Container>
        </Wrapper>
      </ErrorBoundary>
      <Footer />
    </PageContainer>
  );
}

export default Film;
