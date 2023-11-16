import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const MovieInfoContainer = styled.div`
  position: relative;

  @media (max-width: 1500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
  }
`;

export const MovieTitleContainer = styled(motion.div)`
  margin-bottom: 34px;
`;

export const MovieTitleText = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const MovieDataContainer = styled.div`
  display: flex;
  margin: 34px 0;

  @media (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PosterContainer = styled(motion.div)`
  width: 410px;
  height: 600px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media (max-width: 700px) {
    width: 300px;
    height: 400px;
  }
`;

export const Poster = styled.img`
  height: 100%;
  border-radius: 10px;
`;

export const MovieDataBlock = styled(motion.div)`
  margin-left: 70px;

  @media (max-width: 1500px) {
    margin: 0;
  }
`;

export const InfoBlock = styled.div`
  margin-top: 20px;
  width: 680px;

  @media (max-width: 1500px) {
    width: 100%;
  }
`;

export const InfoLabel = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
`;

export const InfoText = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
  text-transform: capitalize;
`;

export const BookingBlock = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 50px;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const RatingBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const RatingText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 700;
`;

export const DescriptionText = styled(motion.span)`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
`;
