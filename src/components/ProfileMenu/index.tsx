import { useCallback, useState } from 'react';
import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { AuthContextType, useAuth } from 'auth/Auth';
import EditProfileModal from 'components/EditProfileModal';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';

type ProfileMenuProps = {
  onClose: () => void;
};

const Wrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 100%;
  flex-shrink: 0;
  background: #1c1c1c;
  top: 0;
  right: 0;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 70px;
  padding-bottom: 40px;
  animation: 0.5s ease-in-out show-profile;

  @keyframes show-profile {
    from {
      right: -600px;
    }
    to {
      right: 0;
    }
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
`;

const ProfileTitle = styled.span`
  color: #fff;
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
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
`;

const UserIdText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

const GenderText = styled.span`
  color: #fff;
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
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const [editProfileOpened, setEditProfileOpened] = useState(false);

  const { logout } = useAuth() as AuthContextType;

  const handleLogout = useCallback(() => {
    logout();
    onClose();
  }, [logout, onClose]);

  return (
    <>
      {editProfileOpened && (
        <EditProfileModal
          title={'Please, enter new profile information:'}
          onClose={() => setEditProfileOpened(false)}
        />
      )}
      <Wrapper>
        <BackArrowIcon
          id={'arrow-right'}
          width={60}
          height={38}
          viewBox="0 0 69 38"
          onClick={onClose}
        />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ProfileTitle>User profile</ProfileTitle>
          <ProfileInfoContainer>
            <AvatarIcon
              id="avatar"
              width={250}
              height={250}
              viewBox="0 0 250 250"
            />
            <UserDetailsBlock>
              <UserNameText>Name Surname</UserNameText>
              <UserIdText>USER ID: 1798435</UserIdText>
              <GenderText>FEMALE</GenderText>
            </UserDetailsBlock>
            <ActionBlock>
              <ActionText onClick={() => setEditProfileOpened(true)}>
                Edit profile
              </ActionText>
              <ActionText>Settings</ActionText>
              <ActionText onClick={handleLogout}>Log out</ActionText>
            </ActionBlock>
          </ProfileInfoContainer>
          <Icon id="footer-logo" width={123} height={30} viewBox="0 0 123 30" />
        </ErrorBoundary>
      </Wrapper>
    </>
  );
}

export default ProfileMenu;
