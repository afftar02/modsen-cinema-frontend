import { motion } from 'framer-motion';
import { Button } from 'modsen-library';
import { styled } from 'styled-components';

export const Modal = styled(motion.div)`
  position: relative;
  width: 780px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease-in-out;
  padding: 40px 50px;

  @media (max-width: 840px) {
    width: 100%;
  }
  @media (max-width: 550px) {
    padding: 20px 25px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  align-items: center;
  min-height: 80px;
  max-width: 250px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
`;

export const ApplyButton = styled(Button)`
  width: 100%;
  margin-top: 40px;
`;

export const SettingsItems = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const SettingsItemBlock = styled.div`
  display: flex;
`;

export const SettingsItemTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

export const SettingsItemValues = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 5px;
`;
