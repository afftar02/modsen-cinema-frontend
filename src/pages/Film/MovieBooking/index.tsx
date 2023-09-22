import { styled } from 'styled-components';
import Button from 'components/Button';
import Session from 'components/Session';
import { ForwardedRef, forwardRef, useState } from 'react';
import HorizontalCarousel from 'components/HorizontalCarousel';
import CinemaHall from 'components/CinemaHall';

const Wrapper = styled.div`
  position: relative;
  margin-top: 80px;
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background: #dba758;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingTitle = styled.span`
  color: #bdbdbd;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin: 40px 0;
`;

const SessionsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
  margin: 50px 0;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
  margin-top: 50px;
  margin-bottom: 45px;
`;

const StyledButton = styled(Button)`
  font-size: 21px;
  font-weight: 700;
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeatsCount = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 23px;
  font-weight: 400;
`;

const TicketPrice = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 35px;
  font-weight: 700;
`;

const sessions = [{ id: 1 }, { id: 2 }, { id: 3 }];

function MovieBooking(props: object, ref: ForwardedRef<HTMLDivElement>) {
  const [selectedSessionId, setSelectedSessionId] = useState(-1);

  return (
    <Wrapper ref={ref}>
      <Divider />
      <Container>
        <BookingTitle>Book Now!</BookingTitle>
        <HorizontalCarousel />
        <SessionsBlock>
          {sessions.map((session) => (
            <Session
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              selected={selectedSessionId === session.id}
            />
          ))}
        </SessionsBlock>
        <CinemaHall />
        <ActionContainer>
          <TicketInfo>
            <SeatsCount>6 Seats</SeatsCount>
            <TicketPrice>45 $</TicketPrice>
          </TicketInfo>
          <StyledButton>Book Now</StyledButton>
        </ActionContainer>
      </Container>
      <Divider />
    </Wrapper>
  );
}

export default forwardRef<HTMLDivElement>(MovieBooking);
