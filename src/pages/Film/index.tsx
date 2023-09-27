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

const PageContainer = styled.div`
  position: relative;
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
  });

  const bookingRef = useRef<HTMLDivElement>(null);

  const imageUrl =
    'https://s3-alpha-sig.figma.com/img/f0cd/eaad/9c1523083ead593c088a9515c7e60053?Expires=1696204800&Signature=hLVUuPaI0bZg9HDH~uGsWyjCYDTqI2iVMuVfGxg27b~jA56acfadlS~pUEdesLtolSgzVIeBec40nENKxRhbl3G4V1DvPealjDQLL9lRREWjkX~6I6sETULKNPl1QRg564LhJO9CkX0bQ4tFqg9CAPCESbSh5fS6rlCLUwSghb~Y2DU97CJbhjKXlkaNXQCbTV-q9sJbF3eu9Jy6FVDuro3CdG~i~3P0g1M9uHv8BPaYhX1ON18gMymZINOinZKkpYrQ8-FQAuNvXCtW73ZPPKMGuyW8oly~WorScGy586IdLZ3y6frn3ojtovoWUz9M5G28EAlW74KmqCT0nDOE2w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

  useEffect(() => {
    (async () => {
      const palette = await Vibrant.from(imageUrl).getPalette();
      setBackgroundColors({
        first: palette.DarkVibrant?.hex ?? '#000',
        second: palette.LightVibrant?.hex ?? '#fff',
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
            <Review />
            <Review />
            <Review />
          </ReviewsBlock>
        </Container>
      </Wrapper>
      <Footer />
    </PageContainer>
  );
}

export default Film;
