import { Link } from 'react-router-dom';
import { Button, Icon } from 'modsen-library';
import { styled } from 'styled-components';

import Navigation from 'components/Navigation';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 65px 85px 0;

  @media (max-width: 800px) {
    padding: 35px 45px 0;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const AnimatedFlex = styled(Flex)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledContainer = styled.div`
  margin-right: 60px;
  display: flex;
  gap: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 15px;
  }
  @media (max-width: 700px) {
    flex-direction: row;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const SignInButton = styled(Button)`
  background: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonColor};
  transition: color 1s ease-in-out;
`;

export const ProfileText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
  margin-right: 30px;
`;

export const LogoLink = styled(Link)`
  margin-right: 92px;

  @media (max-width: 1350px) {
    display: none;
  }
`;

export const StyledNavigation = styled(Navigation)`
  padding-top: 14px;
`;
