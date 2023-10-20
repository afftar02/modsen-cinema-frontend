import { styled } from 'styled-components';
import Button from 'components/Button';
import Session from 'components/Session';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import HorizontalCarousel from 'components/HorizontalCarousel';
import CinemaHall from 'components/CinemaHall';
import { getSessions } from 'services/sessionService';
import { SessionType } from 'types/Session';
import { createTicket } from 'services/ticketService';

type BookingProps = {
  movieId: number;
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 80px;
  animation: 0.5s ease-in-out fade-up;
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

const NoSessionsMessage = styled.span`
  color: #fff;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 500;
  margin: 30px 0;
`;

const DATES_NUMBER = 7;

function MovieBooking(
  { movieId }: BookingProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [sessions, setSessions] = useState<Array<SessionType>>([]);
  const [selectedSessionId, setSelectedSessionId] = useState(-1);
  const [seats, setSeats] = useState<Map<number, number>>(new Map());
  const [isBooked, setIsBooked] = useState(false);

  const dates = useMemo(() => {
    const dates = new Array<Date>();
    const date = new Date();

    for (let i = 0; i < DATES_NUMBER; i++) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }, []);

  const handleDateClick = useCallback(
    async (date: Date) => {
      try {
        const loadedSessions = await getSessions(movieId, date);
        setSessions(loadedSessions);
        setSelectedSessionId(-1);
        setSeats(new Map());
      } catch (err) {
        alert('Data loading error!');
      }
    },
    [movieId]
  );

  const handleSessionClick = useCallback((sessionId: number) => {
    setSelectedSessionId(sessionId);
    setSeats(new Map());
  }, []);

  const handleSeatClick = useCallback((seatId: number, price: number) => {
    setSeats((prev) => {
      if (prev?.has(seatId)) {
        prev?.delete(seatId);
      } else {
        prev?.set(seatId, price);
      }
      return new Map(prev);
    });
  }, []);

  const handleBookClick = useCallback(async () => {
    try {
      await createTicket({ seatIds: [...seats.keys()] });
      setSeats(new Map());
      setIsBooked(true);
    } catch (err) {
      alert('Booking error!');
    }
  }, [seats]);

  const calculateTicketPrice = useCallback(() => {
    const sessionDate = sessions?.find(
      (session: SessionType) => session?.id === selectedSessionId
    )?.start;
    let discount = 0;
    let result = 0;

    if (sessionDate) {
      discount = ((sessionDate.getDate() - new Date().getDate()) * 5) / 100;
    }

    seats.forEach((price) => {
      result += price;
    });

    result = (1 - discount) * result;

    return Number(result.toFixed(1));
  }, [seats, selectedSessionId, sessions]);

  return (
    <Wrapper ref={ref}>
      <Divider />
      <Container>
        <BookingTitle>Book Now!</BookingTitle>
        <HorizontalCarousel data={dates} onClick={handleDateClick} />
        <SessionsBlock>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <Session
                key={session.id}
                onClick={() => handleSessionClick(session.id)}
                selected={selectedSessionId === session.id}
                data={session}
              />
            ))
          ) : (
            <NoSessionsMessage>No sessions available!</NoSessionsMessage>
          )}
        </SessionsBlock>
        {selectedSessionId >= 0 && (
          <CinemaHall
            sessionId={selectedSessionId}
            onSeatClick={handleSeatClick}
            isBooked={isBooked}
            resetIsBooked={() => setIsBooked(false)}
          />
        )}
        {sessions.length > 0 && (
          <ActionContainer>
            <TicketInfo>
              <SeatsCount>{seats?.size} Seats</SeatsCount>
              <TicketPrice>{calculateTicketPrice()} $</TicketPrice>
            </TicketInfo>
            <StyledButton onClick={handleBookClick}>Book Now</StyledButton>
          </ActionContainer>
        )}
      </Container>
      <Divider />
    </Wrapper>
  );
}

export default forwardRef<HTMLDivElement, BookingProps>(MovieBooking);
