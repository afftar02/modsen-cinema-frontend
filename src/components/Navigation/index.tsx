import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

type NavigationProps = {
  className?: string;
};

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

function Navigation({ className }: NavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className={className}>
      <StyledLink to={'/'}>{t('main_page_nav_text')}</StyledLink>
      <StyledLink to={'/bookings'}>{t('bookings_page_nav_text')}</StyledLink>
    </nav>
  );
}

export default Navigation;
