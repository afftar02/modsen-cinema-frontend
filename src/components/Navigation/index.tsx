import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledNav = styled.nav`
  margin-left: 92px;
  padding-top: 14px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
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

  &.active {
    color: #d98639;
    text-decoration: underline;
  }
`;

function Navigation() {
  return (
    <StyledNav>
      <StyledLink to={'/'}>Home</StyledLink>
      <StyledLink to={'/bookings'}>Bookings</StyledLink>
    </StyledNav>
  );
}

export default Navigation;
