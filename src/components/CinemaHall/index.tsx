import { useCallback, useMemo } from 'react';
import { calculateRowsLengths } from 'helpers/calculateRowsLengths';
import { calculateSeatLeftPosition } from 'helpers/calculateSeatLeftPosition';
import { calculateSeatTopPosition } from 'helpers/calculateSeatTopPosition';
import useWindowDimensions from 'hooks/useWindowDimensions';

import {
  AvailableSeat,
  DescriptionContainer,
  DescriptionItem,
  Label,
  ReservedSeat,
  Screen,
  ScreenContainer,
  SeatsContainer,
  SelectedSeat,
  StyledSeat,
  Wrapper,
} from './styled';
import { CinemaHallProps } from './types';

function CinemaHall({
  seats,
  onSeatClick,
  chosenSeatIds,
  screenLabel,
  availableSeatLabel,
  reservedSeatLabel,
  selectedSeatLabel,
}: CinemaHallProps) {
  const { width } = useWindowDimensions();

  const seatWidth = useMemo(() => (width > 700 ? 45 : 30), [width]);
  const seatSpace = useMemo(() => (width > 700 ? 17 : 8), [width]);
  const centerSpace = useMemo(() => (width > 700 ? 90 : 20), [width]);
  const rowsLengths = useMemo(() => calculateRowsLengths(seats), [seats]);

  const getSeatTopPosition = useCallback(
    (row: number) => calculateSeatTopPosition(row, seatWidth, seatSpace),
    [seatWidth, seatSpace]
  );
  const getSeatLeftPosition = useCallback(
    (seatNumber: number, row: number) =>
      calculateSeatLeftPosition(
        rowsLengths,
        seatNumber,
        row,
        seatWidth,
        seatSpace,
        centerSpace
      ),
    [centerSpace, rowsLengths, seatSpace, seatWidth]
  );

  const calculateWidth = useCallback(() => {
    const maxRowLength = Math.max(...rowsLengths.values());
    return (
      maxRowLength * seatWidth + (maxRowLength - 2) * seatSpace + centerSpace
    );
  }, [centerSpace, rowsLengths, seatSpace, seatWidth]);

  const calculateHeight = useCallback(() => {
    return rowsLengths.size * seatWidth + (rowsLengths.size - 1) * seatSpace;
  }, [rowsLengths.size, seatSpace, seatWidth]);

  return (
    <Wrapper>
      <ScreenContainer>
        <Screen>{screenLabel}</Screen>
      </ScreenContainer>
      <SeatsContainer $width={calculateWidth()} $height={calculateHeight()}>
        {seats.map((seat) => (
          <StyledSeat
            key={seat.id}
            reserved={seat.ticket !== null}
            selected={chosenSeatIds?.includes(seat.id)}
            $top={getSeatTopPosition(seat.row)}
            $left={getSeatLeftPosition(seat.number, seat.row)}
            onClick={() => onSeatClick(seat.id, seat.price)}
          />
        ))}
      </SeatsContainer>
      <DescriptionContainer>
        <DescriptionItem>
          <AvailableSeat />
          <Label>{availableSeatLabel}</Label>
        </DescriptionItem>
        <DescriptionItem>
          <ReservedSeat />
          <Label>{reservedSeatLabel}</Label>
        </DescriptionItem>
        <DescriptionItem>
          <SelectedSeat />
          <Label>{selectedSeatLabel}</Label>
        </DescriptionItem>
      </DescriptionContainer>
    </Wrapper>
  );
}

export default CinemaHall;
