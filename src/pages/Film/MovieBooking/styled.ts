import { Button } from 'modsen-library';
import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-top: 80px;
  animation: 0.5s ease-in-out fade-up;
`;

export const Divider = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background: #dba758;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BookingTitle = styled.span`
  color: #bdbdbd;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin: 40px 0;
`;

export const SessionsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 45px;
  margin: 50px 0;
  flex-wrap: wrap;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
  margin-top: 50px;
  margin-bottom: 45px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 21px;
  font-weight: 700;
`;

export const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SeatsCount = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 23px;
  font-weight: 400;
  text-transform: capitalize;
`;

export const TicketPrice = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 35px;
  font-weight: 700;
`;

export const NoSessionsMessage = styled.span`
  color: #fff;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 500;
  margin: 30px 0;
`;
