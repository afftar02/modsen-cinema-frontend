import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const Preview = styled(motion.div)<{
  $previewUrl: string;
  $isHiding?: boolean;
}>`
  background:
    url(${(props) => props.$previewUrl}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: ${(props) =>
    props.$isHiding
      ? `250px 10px 250px 0px ${props.theme.shadowColor} inset`
      : '15px 15px 50px 0px #000'};

  position: relative;
  ${(props) => props.$isHiding && 'left: -105px;'}
  width: 850px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 1.3s ease-in-out;
`;

export const PlayIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`;
