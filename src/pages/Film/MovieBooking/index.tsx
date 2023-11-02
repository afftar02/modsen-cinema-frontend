import { styled } from 'styled-components';
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CinemaHall from 'components/CinemaHall';
import { getSessions } from 'services/sessionService';
import { SessionType } from 'types/Session';
import { createTicket } from 'services/ticketService';
import { useTranslation } from 'react-i18next';
import { Button, HorizontalCarousel, Session } from 'modsen-library';
import { SeatType } from 'types/Seat';
import { getSeats } from 'services/seatService';

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
  const [chosenSeats, setChosenSeats] = useState<Map<number, number>>(
    new Map()
  );
  const [seats, setSeats] = useState<Array<SeatType>>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      try {
        const loadedSessions = await getSessions(movieId, date);
        setSessions(loadedSessions);
      } catch (err) {
        alert(t('loading_error'));
      }
    },
    [movieId, t]
  );

  const loadSeats = useCallback(
    async (sessionId: number) => {
      try {
        const loadedSeats = await getSeats(sessionId);
        setSeats(loadedSeats);
      } catch (err) {
        alert(t('loading_error'));
      }
    },
    [t]
  );

  const handleDateClick = useCallback(
    async (date: Date) => {
      try {
        setSelectedDate(date);

        await loadSessions(date);

        setSelectedSessionId(-1);
        setChosenSeats(new Map());
      } catch (err) {
        alert(t('loading_error'));
      }
    },
    [loadSessions, t]
  );

  const handleSessionClick = useCallback(
    async (sessionId: number) => {
      setSelectedSessionId(sessionId);
      await loadSeats(sessionId);
      setChosenSeats(new Map());
    },
    [loadSeats]
  );

  const handleSeatClick = useCallback((seatId: number, price: number) => {
    setChosenSeats((prev) => {
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
      await createTicket({ seatIds: [...chosenSeats.keys()] });
      await loadSeats(selectedSessionId);
      setChosenSeats(new Map());
    } catch (err) {
      alert(t('booking_error'));
    }
  }, [chosenSeats, loadSeats, selectedSessionId, t]);

  const calculateTicketPrice = useCallback(() => {
    let discount = 0;
    let result = 0;

    if (selectedDate) {
      discount = ((selectedDate.getDate() - new Date().getDate()) * 5) / 100;
    }

    chosenSeats.forEach((price) => {
      result += price;
    });

    result = (1 - discount) * result;

    return Number(result.toFixed(1));
  }, [chosenSeats, selectedDate]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('booking')) {
        const bookingInfo = JSON.parse(
          localStorage.getItem('booking') as string
        );
        if (bookingInfo.date && Number(bookingInfo.sessionId) >= 0) {
          const bookingDate = new Date(bookingInfo.date);

          setSelectedDate(bookingDate);
          await loadSessions(bookingDate);
          setSelectedSessionId(Number(bookingInfo.sessionId));
          await loadSeats(Number(bookingInfo.sessionId));
        }
        if (bookingInfo.chosenSeats) {
          setChosenSeats(new Map(bookingInfo.chosenSeats));
        }
      }
    })();
  }, [loadSeats, loadSessions]);

  useEffect(
    () =>
      localStorage.setItem(
        'booking',
        JSON.stringify({
          movieId: movieId,
          date: selectedDate,
          sessionId: selectedSessionId.toString(),
          chosenSeats: Array.from(chosenSeats.entries()),
        })
      ),
    [movieId, chosenSeats, selectedDate, selectedSessionId]
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
                start={session.start}
                end={session.end}
                format={session.format}
                availableSeats={session.availableSeats}
                formatLabel={t('session_cinema')}
                seatsLabel={t('session_seats_available')}
                onClick={() => handleSessionClick(session.id)}
                selected={selectedSessionId === session.id}
              />
            ))
          ) : (
            <NoSessionsMessage>{t('no_sessions_text')}</NoSessionsMessage>
          )}
        </SessionsBlock>
        {selectedSessionId >= 0 && (
          <CinemaHall
            seats={seats}
            onSeatClick={handleSeatClick}
            chosenSeatIds={Array.from(chosenSeats.keys())}
          />
        )}
        {sessions.length > 0 && (
          <ActionContainer>
            <TicketInfo>
              <SeatsCount>
                {chosenSeats?.size} {t('seats_text')}
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
