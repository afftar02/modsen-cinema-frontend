import { styled } from 'styled-components';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Navigation from 'components/Navigation';
import { Link } from 'react-router-dom';
import { AuthContextType, useAuth } from 'auth/Auth';
import { useState } from 'react';
import ProfileMenu from 'components/ProfileMenu';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import SettingsModal from 'components/SettingsModal';
import { AnimatePresence } from 'framer-motion';

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
  background: #ffffff;
  color: #000000;

  margin-left: 30px;
`;

const ProfileText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
  margin-right: 30px;
`;

function Header() {
  const [profileOpened, setProfileOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { isAuth } = useAuth() as AuthContextType;

  return (
    <>
      <StyledHeader>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Flex>
            <Icon id="logo" width={245} height={55} />
            <Navigation />
          </Flex>
          {isAuth ? (
            <AnimatedFlex onClick={() => setProfileOpened(true)}>
              <ProfileText>Profile</ProfileText>
              <Icon id="profile" width={55} height={55} viewBox="0 0 55 55" />
            </AnimatedFlex>
          ) : (
            <Flex>
              <StyledContainer>
                <Link to={'/signup'}>
                  <Button>Sign up</Button>
                </Link>
                <Link to={'/signin'}>
                  <SignInButton>Sign in</SignInButton>
                </Link>
              </StyledContainer>
              <StyledIcon
                id="settings"
                width={48}
                height={48}
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
