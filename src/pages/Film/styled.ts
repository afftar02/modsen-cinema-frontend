import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import VideoPreview from 'components/VideoPreview';

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Wrapper = styled.div`
  padding: 0 85px;

  @media (max-width: 1000px) {
    padding: 0 30px;
  }
  @media (max-width: 700px) {
    padding: 0 10px;
  }
  @media (max-width: 550px) {
    padding: 0;
  }
`;

export const Container = styled.div`
  padding: 171px 120px 155px 120px;
  position: relative;
  margin-top: 46px;

  @media (max-width: 700px) {
    padding: 170px 80px;
  }
  @media (max-width: 550px) {
    padding: 170px 50px;
  }
  @media (max-width: 450px) {
    padding: 170px 30px;
  }
`;

export const BackgroundContainer = styled.div<{
  $firstBgColor: string;
  $secondBgColor: string;
}>`
  animation: 1s linear 0.3s fade-up;
  background: ${(props) =>
    props.$firstBgColor || props.$secondBgColor
      ? `linear-gradient(180deg, ${props.$firstBgColor}, ${props.$secondBgColor})`
      : 'transparent'};
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

export const MoveNextContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 100px;
  top: 185px;
  z-index: 5;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  animation: 0.5s ease-in-out fade-up;

  &:hover {
    transform: translateX(15px);
    opacity: 0.7;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
    right: 0;
    top: 0;
  }
`;

export const MoveNextText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 500;
  text-decoration-line: underline;
  margin-right: 30px;

  @media (max-width: 800px) {
    margin: 0;
    text-align: center;
  }
`;

export const TrailerBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: 78px;
`;

export const TrailerText = styled(motion.span)`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 42px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
`;

export const StyledPreview = styled(VideoPreview)`
  margin-top: 67px;

  @media (max-width: 1100px) {
    width: 650px;
    height: 380px;
  }
  @media (max-width: 850px) {
    width: 440px;
    height: 240px;
  }
  @media (max-width: 700px) {
    width: 370px;
    height: 190px;
  }
`;

export const ReviewsBlock = styled.div`
  position: relative;
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  flex-wrap: wrap;
`;
