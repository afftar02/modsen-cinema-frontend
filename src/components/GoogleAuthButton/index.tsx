import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';
import { GOOGLE_AUTH_URL } from 'constants/BaseApiUrl';

const GoogleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 45px;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  border: 1px solid ${(props) => props.theme.googleButtonBorderColor};

  color: rgba(0, 0, 0, 0.55);
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    opacity: 0.7;
  }
`;

const GoogleIcon = styled(Icon)`
  position: absolute;
  left: 18px;
`;

function GoogleAuthButton() {
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      window.open(GOOGLE_AUTH_URL, '_self');
    } catch (err) {
      alert(t('google_auth_error'));
    }
  };

  return (
    <GoogleButton onClick={handleClick}>
      <GoogleIcon id="google" width={15} height={17} viewBox="0 0 15 17" />
      <span>{t('google_auth')}</span>
    </GoogleButton>
  );
}

export default GoogleAuthButton;
