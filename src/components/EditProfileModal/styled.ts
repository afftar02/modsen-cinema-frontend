import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import Button from 'components/Button';

export const Modal = styled(motion.div)`
  position: relative;
  width: 840px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px 107px;

  @media (max-width: 840px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 20px 25px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  max-width: 430px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;

  @media (max-width: 500px) {
    max-width: 230px;
  }
`;

export const StyledForm = styled.form`
  margin-top: 20px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 500px) {
    gap: 35px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;
