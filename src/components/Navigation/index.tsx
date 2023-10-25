import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledNav = styled.nav`
  margin-left: 92px;
  padding-top: 14px;
`;

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color};
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
  const { t } = useTranslation();

  return (
    <StyledNav>
      <StyledLink to={'/'}>{t('main_page_nav_text')}</StyledLink>
      <StyledLink to={'/bookings'}>{t('bookings_page_nav_text')}</StyledLink>
    </StyledNav>
  );
}

export default Navigation;
