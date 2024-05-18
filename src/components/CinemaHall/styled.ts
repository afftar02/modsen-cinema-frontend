import { styled } from 'styled-components';

import Seat from 'components/Seat';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #313131;
  flex-shrink: 0;
  padding: 13px 50px;

  @media (max-width: 700px) {
    padding: 13px 0;
  }
`;

export const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Screen = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 55px;
  font-weight: 400;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 46px;

  @media (max-width: 700px) {
    max-width: 360px;
    gap: 25px;
  }
`;

export const DescriptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 400;
`;

export const AvailableSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 3px solid #787878;
  box-sizing: border-box;
`;

export const ReservedSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #c4c4c4;
`;

export const SelectedSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #d98639;
`;

export const SeatsContainer = styled.div<{ $width: number; $height: number }>`
  position: relative;
  height: ${(props) => `${props.$height}px`};
  width: ${(props) => `${props.$width}px`};
`;

export const StyledSeat = styled(Seat)<{ $left: number; $top: number }>`
  position: absolute;
  left: ${(props) => `${props.$left}px`};
  top: ${(props) => `${props.$top}px`};

  @media (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;
