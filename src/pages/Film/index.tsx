import Header from 'components/Header';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Review from 'components/Review';
import { useEffect, useRef, useState } from 'react';
import Footer from 'components/Footer';
import Vibrant from 'node-vibrant/lib/bundle';
import MovieBooking from './MovieBooking';

const Wrapper = styled.div`
  padding: 0 85px;
`;

const Container = styled.div`
  padding: 171px 120px 155px 120px;
  position: relative;
  margin-top: 46px;
`;

const BackgroundContainer = styled.div<{
  firstBgColor: string;
  secondBgColor: string;
}>`
  background: ${(props) =>
    `linear-gradient(180deg, ${props.firstBgColor}, ${props.secondBgColor})`};
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

const MovieInfo = styled.div`
  position: relative;
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

const MovieTitleContainer = styled.div`
  width: 630px;
  height: 130px;
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
`;

const PosterContainer = styled.div`
  width: 410px;
  height: 600px;
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const MovieDataBlock = styled.div`
  margin-left: 70px;
`;

const InfoBlock = styled.div`
  margin-top: 20px;
  width: 680px;
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
`;

const BookingBlock = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 50px;
  align-items: center;
`;

const ComingSoonButton = styled(Button)`
  background: #4f4f4f;
  cursor: auto;
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

const DescriptionText = styled.p`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
  text-transform: capitalize;
`;

const TrailerMock = styled.img`
  cursor: pointer;
  margin-top: 67px;
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

const ReviewsBlock = styled.div`
  position: relative;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

function Film() {
  const [movieStarted, setMovieStarted] = useState(true);
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
    <>
      <Header />
      <Wrapper>
        <Container>
          <BackgroundContainer
            firstBgColor={backgroundColors.first}
            secondBgColor={backgroundColors.second}
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
          <MovieInfo>
            <MovieTitleContainer>
              <MovieTitleText>Black Panther: Wakanda Forever</MovieTitleText>
            </MovieTitleContainer>
            <MovieDataContainer>
              <PosterContainer>
                <Poster src={imageUrl} alt={'poster'} />
              </PosterContainer>
              <MovieDataBlock>
                <InfoBlock>
                  <InfoLabel>Release year: </InfoLabel>
                  <InfoText>2022</InfoText>
                </InfoBlock>
                <InfoBlock>
                  <InfoLabel>Country: </InfoLabel>
                  <InfoText>USA</InfoText>
                </InfoBlock>
                <InfoBlock>
                  <InfoLabel>Genre: </InfoLabel>
                  <InfoText>New / Action / Adventure / Fantasy</InfoText>
                </InfoBlock>
                <InfoBlock>
                  <InfoLabel>Author: </InfoLabel>
                  <InfoText>Ryan Googler</InfoText>
                </InfoBlock>
                <InfoBlock>
                  <InfoLabel>Actors: </InfoLabel>
                  <InfoText>
                    Arthur Fleck, Sophie Dumond, Penny Fleck, Lupita Nyongo,
                    Letitia Wright
                  </InfoText>
                </InfoBlock>
                <BookingBlock>
                  {movieStarted ? (
                    <Button onClick={() => setBookingOpened(true)}>
                      Book Now!
                    </Button>
                  ) : (
                    <ComingSoonButton
                      onClick={() => setMovieStarted(!movieStarted)}
                    >
                      Coming soon
                    </ComingSoonButton>
                  )}
                  <RatingBlock>
                    <RatingText>8,1</RatingText>
                    <Icon
                      id={'star'}
                      width={39}
                      height={38}
                      viewBox="0 0 39 38"
                    />
                  </RatingBlock>
                </BookingBlock>
              </MovieDataBlock>
            </MovieDataContainer>
            <div>
              <DescriptionText>
                Queen Ramonda, Shuri, MBaku, Okoye and the Dora Milaje fight to
                protect their nation from intervening world powers in the wake
                of King TChallas death. As the Wakandans strive to embrace their
                next chapter, the heroes must band together with Nakia and
                Everett Ross to forge a new path for their beloved kingdom.
              </DescriptionText>
            </div>
          </MovieInfo>
          {bookingOpened && <MovieBooking ref={bookingRef} />}
          <TrailerBlock>
            <TrailerText>Watch trailer online!</TrailerText>
            <TrailerMock src="/images/trailer-mock.png" alt="trailer" />
          </TrailerBlock>
          <ReviewsBlock>
            <Review />
            <Review />
            <Review />
          </ReviewsBlock>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Film;