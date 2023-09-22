import { styled } from 'styled-components';
import Seat from 'components/Seat';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #313131;
  flex-shrink: 0;
  padding: 13px 50px;
`;

const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Screen = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 55px;
  font-weight: 400;
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 46px;
`;

const DescriptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 400;
`;

const AvailableSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 3px solid #787878;
  box-sizing: border-box;
`;

const ReservedSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #c4c4c4;
`;

const SelectedSeat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #d98639;
`;

function CinemaHall() {
  return (
    <Wrapper>
      <ScreenContainer>
        <Screen>Screen</Screen>
      </ScreenContainer>
      <div>
        <Seat reserved={false} />
      </div>
      <DescriptionContainer>
        <DescriptionItem>
          <AvailableSeat />
          <Label>Available</Label>
        </DescriptionItem>
        <DescriptionItem>
          <ReservedSeat />
          <Label>Reserved</Label>
        </DescriptionItem>
        <DescriptionItem>
          <SelectedSeat />
          <Label>Selected</Label>
        </DescriptionItem>
      </DescriptionContainer>
    </Wrapper>
  );
}

export default CinemaHall;
