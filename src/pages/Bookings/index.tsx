import Header from 'components/Header';
import Footer from 'components/Footer';
import { styled } from 'styled-components';
import BookingCard from 'components/BookingCard';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
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
`;

const BookingsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 100px;
`;

function Bookings() {
  return (
    <Wrapper>
      <Header />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <BookingsWrapper>
          <div>
            <SectionTitle>Your UPCOMING bookings</SectionTitle>
            <BookingsContainer>
              <BookingCard />
              <BookingCard />
            </BookingsContainer>
          </div>
          <div>
            <SectionTitle>Your past bookings</SectionTitle>
            <BookingsContainer>
              <BookingCard isOver />
            </BookingsContainer>
          </div>
          <div>
            <SectionTitle>Your missing bookings</SectionTitle>
            <BookingsContainer>
              <BookingCard isOver />
            </BookingsContainer>
          </div>
        </BookingsWrapper>
      </ErrorBoundary>
      <Footer />
    </Wrapper>
  );
}

export default Bookings;
