import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContextType, useAuth } from 'auth/Auth';
import { PATHS } from 'constants/Paths';
import { AnimatePresence } from 'framer-motion';
import { Button, Icon } from 'modsen-library';
import { styled, useTheme } from 'styled-components';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Navigation from 'components/Navigation';
import ProfileMenu from 'components/ProfileMenu';
import SettingsModal from 'components/SettingsModal';

const StyledHeader = styled.header`
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

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const AnimatedFlex = styled(Flex)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledContainer = styled.div`
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

const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const SignInButton = styled(Button)`
  background: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonColor};
  transition: color 1s ease-in-out;
`;

const ProfileText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
  margin-right: 30px;
`;

const LogoLink = styled(Link)`
  margin-right: 92px;

  @media (max-width: 1350px) {
    display: none;
  }
`;

const StyledNavigation = styled(Navigation)`
  padding-top: 14px;
`;

function Header() {
  const { t } = useTranslation();
  const [profileOpened, setProfileOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { isAuth } = useAuth() as AuthContextType;

  const theme = useTheme();

  return (
    <>
      <StyledHeader>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Flex>
            <LogoLink to={PATHS.home}>
              <Icon id="logo" width={245} height={55} fill={theme.logoColor} />
            </LogoLink>
            <StyledNavigation />
          </Flex>
          {isAuth ? (
            <AnimatedFlex onClick={() => setProfileOpened(true)}>
              <ProfileText>{t('profile_text')}</ProfileText>
              <Icon
                id="profile"
                width={55}
                height={55}
                viewBox="0 0 55 55"
                fill={theme.color}
              />
            </AnimatedFlex>
          ) : (
            <Flex>
              <StyledContainer>
                <Link to={PATHS.signup}>
                  <Button>{t('signup_button_text')}</Button>
                </Link>
                <Link to={PATHS.signin}>
                  <SignInButton>{t('signin_button_text')}</SignInButton>
                </Link>
              </StyledContainer>
              <StyledIcon
                id="settings"
                data-cy={'settings'}
                width={48}
                height={48}
                fill={theme.color}
                onClick={() => setSettingsOpened(true)}
              />
            </Flex>
          )}
        </ErrorBoundary>
      </StyledHeader>
      <AnimatePresence>
        {profileOpened && (
          <ProfileMenu onClose={() => setProfileOpened(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {settingsOpened && (
          <SettingsModal onClose={() => setSettingsOpened(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
