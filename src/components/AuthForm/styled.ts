import { motion } from 'framer-motion';
import { Button } from 'modsen-library';
import { styled } from 'styled-components';

export const Modal = styled(motion.div)`
  position: relative;
  width: 840px;
  min-height: 500px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px 107px;
  display: flex;
  flex-direction: column;

  @media (max-width: 840px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    padding: 20px 25px;
  }
`;

export const TextBlock = styled.div`
  width: 430px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;

  @media (max-width: 650px) {
    width: 230px;
  }
`;

export const BrightText = styled.span`
  color: #d98639;
`;

export const StyledForm = styled.form`
  margin-top: 33px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const AuthButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const StyledAuthContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 14px;
`;

export const StyledText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inria Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
`;

export const UnderlinedText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inria Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
  text-decoration-line: underline;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  margin-left: 4px;

  &:hover {
    opacity: 0.7;
  }
`;
