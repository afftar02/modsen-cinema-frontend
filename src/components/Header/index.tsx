import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';
import { PATHS } from 'constants/paths';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from 'styled-components';

import Button from 'components/Button';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Icon from 'components/Icon';
import ProfileMenu from 'components/ProfileMenu';
import SettingsModal from 'components/SettingsModal';

import {
  AnimatedFlex,
  Flex,
  LogoLink,
  ProfileText,
  SignInButton,
  StyledContainer,
  StyledHeader,
  StyledIcon,
  StyledNavigation,
} from './styled';

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

export default memo(Header);
