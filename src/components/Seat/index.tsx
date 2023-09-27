import { styled } from 'styled-components';
import { useState } from 'react';

type SeatProps = {
  reserved: boolean;
};

const StyledSeat = styled.div<{ $isReserved: boolean; $isSelected: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  border: 3px solid #787878;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.$isReserved
      ? `
    background: #C4C4C4;
    border: none;
    cursor: default;
    `
      : `
    &:hover {
      background: #d98639;
    }
  `};

  ${(props) =>
    props.$isSelected &&
    `
    background: #D98639;
    border: none;
    
    &:hover {
      opacity: 0.5;
      background: #D98639;
    }
  `};
`;

function Seat({ reserved, ...props }: SeatProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!reserved) {
      setSelected(!selected);
    }
  };

  return (
    <StyledSeat
      $isReserved={reserved}
      $isSelected={selected}
      onClick={handleClick}
      {...props}
    />
  );
}

export default Seat;
