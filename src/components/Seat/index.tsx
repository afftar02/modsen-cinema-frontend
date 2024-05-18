import { useState } from 'react';

import { StyledSeat } from './styled';
import { SeatProps } from './types';

function Seat({ reserved, selected = false, onClick, ...props }: SeatProps) {
  const [active, setActive] = useState(selected);

  const handleClick = () => {
    if (!reserved) {
      setActive(!active);
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <StyledSeat
      $isReserved={reserved}
      $isSelected={!reserved && active}
      onClick={handleClick}
      {...props}
    />
  );
}

export default Seat;
