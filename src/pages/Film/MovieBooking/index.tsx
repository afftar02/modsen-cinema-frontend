import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getSeats } from 'services/seatService';
import { getSessions } from 'services/sessionService';
import { createTicket } from 'services/ticketService';
import { SeatType } from 'types/seat';
import { SessionType } from 'types/session';

import CinemaHall from 'components/CinemaHall';
import HorizontalCarousel from 'components/HorizontalCarousel';
import Session from 'components/Session';

import {
  ActionContainer,
  BookingTitle,
  Container,
  Divider,
  NoSessionsMessage,
  SeatsCount,
  SessionsBlock,
  StyledButton,
  TicketInfo,
  TicketPrice,
  Wrapper,
} from './styled';
import { BookingProps } from './types';

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
            screenLabel={t('screen_text')}
            availableSeatLabel={t('available_text')}
            reservedSeatLabel={t('reserved_text')}
            selectedSeatLabel={t('selected_text')}
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
