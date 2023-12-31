import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const StyledSpan = styled(motion.span)`
  color: ${(props) => props.theme.color};
  transition: color 1.5s ease-in-out;
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 300;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;

  @media (max-width: 650px) {
    font-size: 35px;
  }
`;
