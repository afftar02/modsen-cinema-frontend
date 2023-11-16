import { Icon } from 'modsen-library';
import { styled, useTheme } from 'styled-components';

import { CloseIconProps } from './types';

const StyledIcon = styled(Icon)`
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

function CloseIcon({ onClick, lineColor, bgColor }: CloseIconProps) {
  const theme = useTheme();

  return (
    <StyledIcon
      id="close"
      width={50}
      height={50}
      viewBox="0 0 50 50"
      data-cy={'close'}
      stroke={lineColor ?? theme.closeIconColor}
      fill={bgColor ?? theme.closeIconBgColor}
      onClick={onClick}
    />
  );
}

export default CloseIcon;
