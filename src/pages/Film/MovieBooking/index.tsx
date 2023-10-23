import { styled } from 'styled-components';
import Button from 'components/Button';
import Session from 'components/Session';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import HorizontalCarousel from 'components/HorizontalCarousel';
import CinemaHall from 'components/CinemaHall';
import { getSessions } from 'services/sessionService';
import { SessionType } from 'types/Session';
import { createTicket } from 'services/ticketService';
import { useTranslation } from 'react-i18next';

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
  text-transform: capitalize;
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
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<Array<SessionType>>([]);
  const [selectedSessionId, setSelectedSessionId] = useState(-1);
  const [seats, setSeats] = useState<Map<number, number>>(new Map());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  const loadSessions = useCallback(
    async (date: Date) => {
      const loadedSessions = await getSessions(movieId, date);
      setSessions(loadedSessions);
    },
    [movieId]
  );

  const handleDateClick = useCallback(
    async (date: Date) => {
      try {
        setSelectedDate(date);

        await loadSessions(date);

        setSelectedSessionId(-1);
        setSeats(new Map());
      } catch (err) {
        alert(t('loading_error'));
      }
    },
    [loadSessions, t]
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
      alert(t('booking_error'));
    }
  }, [seats, t]);

  const calculateTicketPrice = useCallback(() => {
    let discount = 0;
    let result = 0;

    if (selectedDate) {
      discount = ((selectedDate.getDate() - new Date().getDate()) * 5) / 100;
    }

    seats.forEach((price) => {
      result += price;
    });

    result = (1 - discount) * result;

    return Number(result.toFixed(1));
  }, [seats, selectedDate]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('booking')) {
        const bookingInfo = JSON.parse(
          localStorage.getItem('booking') as string
        );
        const bookingDate = new Date(bookingInfo.date);

        setSelectedDate(bookingDate);
        await loadSessions(bookingDate);
        setSelectedSessionId(Number(bookingInfo.sessionId));
        setSeats(new Map(bookingInfo.seats));
      }
    })();
  }, [loadSessions]);

  useEffect(
    () =>
      localStorage.setItem(
        'booking',
        JSON.stringify({
          movieId: movieId,
          date: selectedDate,
          sessionId: selectedSessionId.toString(),
          seats: Array.from(seats.entries()),
        })
      ),
    [movieId, seats, selectedDate, selectedSessionId]
  );

  return (
    <Wrapper ref={ref}>
      <Divider />
      <Container>
        <BookingTitle>{t('booking_title')}</BookingTitle>
        <HorizontalCarousel
          data={dates}
          onClick={handleDateClick}
          value={selectedDate}
        />
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
            <NoSessionsMessage>{t('no_sessions_text')}</NoSessionsMessage>
          )}
        </SessionsBlock>
        {selectedSessionId >= 0 && (
          <CinemaHall
            sessionId={selectedSessionId}
            onSeatClick={handleSeatClick}
            isBooked={isBooked}
            chosenSeatIds={Array.from(seats.keys())}
            resetIsBooked={() => setIsBooked(false)}
          />
        )}
        {sessions.length > 0 && (
          <ActionContainer>
            <TicketInfo>
              <SeatsCount>
                {seats?.size} {t('seats_text')}
              </SeatsCount>
              <TicketPrice>{calculateTicketPrice()} $</TicketPrice>
            </TicketInfo>
            <StyledButton onClick={handleBookClick}>
              {t('book_button_text')}
            </StyledButton>
          </ActionContainer>
        )}
      </Container>
      <Divider />
    </Wrapper>
  );
}

export default forwardRef<HTMLDivElement, BookingProps>(MovieBooking);
