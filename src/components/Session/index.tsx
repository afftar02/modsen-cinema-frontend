import { useMemo } from 'react';
import { convertDatePeriod } from 'helpers/convertDatePeriod';

import {
  CinemaFormat,
  SeatsContainer,
  SeatsText,
  SessionContainer,
  SessionTime,
} from './styled';
import { SessionProps } from './types';

function Session({
  start,
  end,
  format,
  availableSeats,
  onClick,
  formatLabel,
  seatsLabel,
  selected = false,
}: SessionProps) {
  const sessionTime = useMemo(
    () => convertDatePeriod(start, end),
    [end, start]
  );

  return (
    <SessionContainer $selected={selected} onClick={onClick}>
      <SessionTime>{sessionTime}</SessionTime>
      <CinemaFormat>
        {formatLabel}: {format}
      </CinemaFormat>
      <SeatsContainer>
        <img src={'/images/seat.png'} alt={'seat'} />
        <SeatsText>
          {availableSeats ?? 0} {seatsLabel}
        </SeatsText>
      </SeatsContainer>
    </SessionContainer>
  );
}

export default Session;
