import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContextType, useAuth } from 'auth/Auth';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { Icon } from 'modsen-library';
import { styled, useTheme } from 'styled-components';

import EditProfileModal from 'components/EditProfileModal';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import SettingsModal from 'components/SettingsModal';

type ProfileMenuProps = {
  onClose: () => void;
};

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 100%;
  flex-shrink: 0;
  background: ${(props) => props.theme.profileMenuBgColor};
  top: 0;
  right: 0;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 70px;
  padding-bottom: 40px;
  transition: background 1.3s ease-in-out;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BackArrowIcon = styled(Icon)`
  position: absolute;
  left: 65px;
  top: 80px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateX(5px);
    opacity: 0.5;
  }

  @media (max-width: 500px) {
    position: static;
  }
`;

const ProfileTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
`;

const ProfileInfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarIcon = styled(Icon)`
  margin-top: 80px;
`;

const UserDetailsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 10px;
`;

const UserNameText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
`;

const UserIdText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

const GenderText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

const ActionBlock = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 45px;
`;

const ActionText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  text-align: center;

  &:hover {
    opacity: 0.5;
  }
`;

const AvatarContainer = styled.div`
  margin-top: 80px;
  width: 250px;
  height: 250px;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 100%;
`;

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
                  alt={'avatar'}
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

export default ProfileMenu;
