import { styled } from 'styled-components';
import { MouseEventHandler } from 'react';

type SessionProps = {
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const SessionContainer = styled.div<{ $selected: boolean }>`
  padding: 16px 20px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 4.039px solid transparent;
  ${(props) => props.$selected && 'border: 4.039px solid #d98639;'};
  background: rgba(90, 90, 92, 0.8);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
`;

const SessionTime = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 600;
`;

const CinemaFormat = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

const SeatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SeatsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 300;
`;

function Session({ onClick, selected = false }: SessionProps) {
  return (
    <SessionContainer $selected={selected} onClick={onClick}>
      <SessionTime>2:30 PM - 4:25 PM</SessionTime>
      <CinemaFormat>Cinema: 1D</CinemaFormat>
      <SeatsContainer>
        <img src={'/images/seat.png'} alt={'seat'} />
        <SeatsText>25 seats available</SeatsText>
      </SeatsContainer>
    </SessionContainer>
  );
}

export default Session;
