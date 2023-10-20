import Header from 'components/Header';
import Footer from 'components/Footer';
import { styled } from 'styled-components';
import BookingCard from 'components/BookingCard';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import SectionTitle from './SectionTitle';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTickets } from 'redux/selectors/ticket';
import { useCallback, useEffect } from 'react';
import { getTickets } from 'redux/thunks/ticket';
import { updateTicket } from '../../services/ticketService';
import { AnimatePresence } from 'framer-motion';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BookingsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding: 98px 0 170px 178px;
`;

const BookingsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 100px;
  flex-wrap: wrap;
`;

function Bookings() {
  const tickets = useAppSelector(selectTickets);
  const dispatch = useAppDispatch();

  const handleCancelClick = useCallback(
    async (ticketId: number) => {
      try {
        await updateTicket(ticketId, { isMissed: true });
        dispatch(getTickets());
      } catch (err) {
        alert('Ticket cancelling error!');
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <Wrapper>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <BookingsWrapper>
          {tickets.find((ticket) => !ticket.isVisited && !ticket.isMissed) && (
            <div>
              <SectionTitle>Your UPCOMING bookings</SectionTitle>
              <BookingsContainer>
                <AnimatePresence>
                  {tickets.map(
                    (ticket) =>
                      !ticket.isVisited &&
                      !ticket.isMissed && (
                        <BookingCard
                          key={ticket.id}
                          ticket={ticket}
                          onCancelClick={() => handleCancelClick(ticket.id)}
                        />
                      )
                  )}
                </AnimatePresence>
              </BookingsContainer>
            </div>
          )}
          {tickets.find((ticket) => ticket.isVisited) && (
            <div>
              <SectionTitle>Your past bookings</SectionTitle>
              <BookingsContainer>
                <AnimatePresence>
                  {tickets.map(
                    (ticket) =>
                      ticket.isVisited && (
                        <BookingCard
                          key={ticket.id}
                          ticket={ticket}
                          onCancelClick={() => handleCancelClick(ticket.id)}
                          isOver
                        />
                      )
                  )}
                </AnimatePresence>
              </BookingsContainer>
            </div>
          )}
          {tickets.find((ticket) => ticket.isMissed) && (
            <div>
              <SectionTitle>Your missing bookings</SectionTitle>
              <BookingsContainer>
                <AnimatePresence>
                  {tickets.map(
                    (ticket) =>
                      ticket.isMissed && (
                        <BookingCard
                          key={ticket.id}
                          ticket={ticket}
                          onCancelClick={() => handleCancelClick(ticket.id)}
                          isOver
                        />
                      )
                  )}
                </AnimatePresence>
              </BookingsContainer>
            </div>
          )}
        </BookingsWrapper>
      </ErrorBoundary>
      <Footer />
    </Wrapper>
  );
}

export default Bookings;
