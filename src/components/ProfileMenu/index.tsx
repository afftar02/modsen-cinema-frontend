import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { AnimatePresence } from 'framer-motion';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { Icon } from 'modsen-library';
import { useTheme } from 'styled-components';

import EditProfileModal from 'components/EditProfileModal';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import SettingsModal from 'components/SettingsModal';

import {
  ActionBlock,
  ActionText,
  AvatarContainer,
  AvatarIcon,
  AvatarImage,
  BackArrowIcon,
  GenderText,
  ProfileInfoContainer,
  ProfileTitle,
  UserDetailsBlock,
  UserIdText,
  UserNameText,
  Wrapper,
} from './styled';
import { ProfileMenuProps } from './types';

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [editProfileOpened, setEditProfileOpened] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { logout, getUserName, user } = useAuth() as AuthContextType;

  const theme = useTheme();

  const handleLogout = useCallback(() => {
    logout();
    onClose();
  }, [logout, onClose]);

  return (
    <>
      <AnimatePresence>
        {editProfileOpened && (
          <EditProfileModal onClose={() => setEditProfileOpened(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {settingsOpened && (
          <SettingsModal onClose={() => setSettingsOpened(false)} />
        )}
      </AnimatePresence>
      <Wrapper
        initial={{ translateX: '100%' }}
        animate={{ translateX: 0 }}
        exit={{ translateX: '100%' }}
        transition={{
          duration: 0.3,
        }}
      >
        <BackArrowIcon
          id={'arrow-right'}
          width={60}
          height={38}
          viewBox="0 0 69 38"
          onClick={onClose}
          fill={theme.color}
          data-cy={'close-menu'}
        />
        <ErrorBoundary fallback={<ErrorFallback />}>
          {width > 500 && (
            <ProfileTitle>{t('profile_menu_title')}</ProfileTitle>
          )}
          <ProfileInfoContainer>
            {user?.avatar ? (
              <AvatarContainer>
                <AvatarImage
                  src={BASE_UPLOADS_URL + user.avatar.filename}
                  alt="avatar"
                />
              </AvatarContainer>
            ) : (
              <AvatarIcon
                id="avatar"
                width={250}
                height={250}
                viewBox="0 0 250 250"
              />
            )}
            <UserDetailsBlock>
              <UserNameText>{getUserName()}</UserNameText>
              <UserIdText>
                {t('user_id_text')}: {user?.id}
              </UserIdText>
              <GenderText>{user?.gender}</GenderText>
            </UserDetailsBlock>
            <ActionBlock>
              <ActionText onClick={() => setEditProfileOpened(true)}>
                {t('edit_profile_text')}
              </ActionText>
              <ActionText onClick={() => setSettingsOpened(true)}>
                {t('settings_text')}
              </ActionText>
              <ActionText onClick={handleLogout}>{t('logout_text')}</ActionText>
            </ActionBlock>
          </ProfileInfoContainer>
          <Icon
            id="footer-logo"
            width={123}
            height={30}
            viewBox="0 0 123 30"
            fill={theme.logoColor}
          />
        </ErrorBoundary>
      </Wrapper>
    </>
  );
}

export default memo(ProfileMenu);
