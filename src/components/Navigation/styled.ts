import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledLink = styled(NavLink)`
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
