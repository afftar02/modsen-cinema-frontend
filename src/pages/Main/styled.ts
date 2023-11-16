import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import VideoPreview from 'components/VideoPreview';

export const MainWrapper = styled.div`
  position: relative;
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Flex = styled.div<{ $marginTop?: number; $height?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$height && `height: ${props.$height}px`};
  ${(props) => props.$marginTop && `margin-top: ${props.$marginTop}px`};
`;

export const DescriptionContainer = styled(motion.div)`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  z-index: 1;
`;

export const TrailerTitle = styled.span`
  font-size: 48px;
`;

export const TrailerDescription = styled.p`
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

export const CurrentMoviesContainer = styled(motion.div)`
  margin-right: 50px;

  @media (max-width: 1250px) {
    margin: 0 0 50px;
  }
`;

export const CurrentMoviesTitle = styled.span`
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

export const CurrentMoviesDescription = styled.p`
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

export const StyledYear = styled(motion.span)`
  color: ${(props) => props.theme.color};
  transition: color 1.8s ease-in-out;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

export const StyledVideoPreview = styled(VideoPreview)`
  @media (max-width: 1500px) {
    width: 650px;
    height: 380px;
  }
  @media (max-width: 700px) {
    width: 360px;
    height: 200px;
  }
`;

export const StudiosImage = styled(motion.img)`
  @media (max-width: 700px) {
    width: 360px;
  }
`;

export const MoviePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  padding-left: 50px;

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 30px;
    padding-left: 0;
  }
  @media (max-width: 700px) {
    margin-top: 50px;
  }
`;

export const MoviesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 86px;

  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;
