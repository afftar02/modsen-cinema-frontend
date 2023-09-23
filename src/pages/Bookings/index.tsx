import Header from 'components/Header';
import Footer from 'components/Footer';
import { styled } from 'styled-components';
import BookingCard from 'components/BookingCard';

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

const SectionTitle = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 300;
  text-transform: uppercase;
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
      <Footer />
    </Wrapper>
  );
}

export default Bookings;
