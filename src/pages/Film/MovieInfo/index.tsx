import Button from 'components/Button';
import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';

type MovieInfoProps = {
  posterUrl: string;
  onOpenBooking?: () => void;
};

const MovieInfoContainer = styled.div`
  position: relative;
`;

const MovieTitleContainer = styled(motion.div)`
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

const PosterContainer = styled(motion.div)`
  width: 410px;
  height: 600px;
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const MovieDataBlock = styled(motion.div)`
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

const DescriptionText = styled(motion.p)`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
  text-transform: capitalize;
`;

function MovieInfo({ onOpenBooking, posterUrl }: MovieInfoProps) {
  const [movieStarted, setMovieStarted] = useState(true);

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
        <MovieTitleText>Black Panther: Wakanda Forever</MovieTitleText>
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
          <Poster src={posterUrl} alt={'poster'} />
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
              Arthur Fleck, Sophie Dumond, Penny Fleck, Lupita Nyongo, Letitia
              Wright
            </InfoText>
          </InfoBlock>
          <BookingBlock>
            {movieStarted ? (
              <Button onClick={onOpenBooking}>Book Now!</Button>
            ) : (
              <ComingSoonButton onClick={() => setMovieStarted(!movieStarted)}>
                Coming soon
              </ComingSoonButton>
            )}
            <RatingBlock>
              <RatingText>8,1</RatingText>
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
          Queen Ramonda, Shuri, MBaku, Okoye and the Dora Milaje fight to
          protect their nation from intervening world powers in the wake of King
          TChallas death. As the Wakandans strive to embrace their next chapter,
          the heroes must band together with Nakia and Everett Ross to forge a
          new path for their beloved kingdom.
        </DescriptionText>
      </div>
    </MovieInfoContainer>
  );
}

export default MovieInfo;
