import { styled } from 'styled-components';

const StyledNav = styled.nav`
  margin-left: 92px;
  padding-top: 14px;
`;

const StyledText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  transition: color 0.1s ease-out;

  margin-right: 50px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #d98639;
  }
`;

function Navigation() {
  return (
    <StyledNav>
      <StyledText>Home</StyledText>
      <StyledText>Bookings</StyledText>
    </StyledNav>
  );
}

export default Navigation;
