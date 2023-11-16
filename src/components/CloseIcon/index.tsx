import { useTheme } from 'styled-components';

import { StyledIcon } from './styled';
import { CloseIconProps } from './types';

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
