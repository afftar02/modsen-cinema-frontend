import { styled, useTheme } from 'styled-components';
import Navigation from 'components/Navigation';
import { Link } from 'react-router-dom';
import { AuthContextType, useAuth } from 'auth/Auth';
import { useState } from 'react';
import ProfileMenu from 'components/ProfileMenu';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import SettingsModal from 'components/SettingsModal';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from 'modsen-library';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 65px 85px 0;
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

  margin-left: 30px;
`;

const ProfileText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
  margin-right: 30px;
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
            <Icon id="logo" width={245} height={55} fill={theme.logoColor} />
            <Navigation />
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
                <Link to={'/signup'}>
                  <Button>{t('signup_button_text')}</Button>
                </Link>
                <Link to={'/signin'}>
                  <SignInButton>{t('signin_button_text')}</SignInButton>
                </Link>
              </StyledContainer>
              <StyledIcon
                id="settings"
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
