import { Icon } from 'modsen-library';
import { styled } from 'styled-components';

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  z-index: 5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;
