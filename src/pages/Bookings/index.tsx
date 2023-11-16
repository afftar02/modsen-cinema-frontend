import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectTickets } from 'redux/selectors/ticket';
import { getTickets } from 'redux/thunks/ticket';
import { updateTicket } from 'services/ticketService';
import { styled } from 'styled-components';

import BookingCard from 'components/BookingCard';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Footer from 'components/Footer';
import Header from 'components/Header';

import SectionTitle from './SectionTitle';

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

  @media (max-width: 1000px) {
    padding: 60px 0 100px 0;
  }
  @media (max-width: 650px) {
    padding: 60px 10px;
  }
`;

const BookingsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 100px;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 650px) {
    gap: 60px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (max-width: 1000px) {
    align-items: center;
  }
`;

function Bookings() {
  const { t, i18n } = useTranslation();
  const tickets = useAppSelector(selectTickets);
  const dispatch = useAppDispatch();

  const handleCancelClick = useCallback(
    async (ticketId: number) => {
      try {
        await updateTicket(ticketId, { isMissed: true });
        dispatch(getTickets(i18n.language));
      } catch (err) {
        alert(t('ticket_cancel_error'));
      }
    },
    [dispatch, i18n.language, t]
  );

  useEffect(() => {
    dispatch(getTickets(i18n.language));
  }, [dispatch, i18n.language]);

  return (
    <Wrapper>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <BookingsWrapper>
          {tickets.find((ticket) => !ticket.isVisited && !ticket.isMissed) && (
            <SectionContainer>
              <SectionTitle>{t('upcoming_bookings_title')}</SectionTitle>
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
            </SectionContainer>
          )}
          {tickets.find((ticket) => ticket.isVisited) && (
            <SectionContainer>
              <SectionTitle>{t('past_bookings_title')}</SectionTitle>
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
            </SectionContainer>
          )}
          {tickets.find((ticket) => ticket.isMissed) && (
            <SectionContainer>
              <SectionTitle>{t('missing_bookings_title')}</SectionTitle>
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
            </SectionContainer>
          )}
        </BookingsWrapper>
      </ErrorBoundary>
      <Footer />
    </Wrapper>
  );
}

export default Bookings;
