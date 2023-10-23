import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';

const FacebookButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 45px;
  border-radius: 10px;
  background: #1877f2;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  border: none;

  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    opacity: 0.7;
  }
`;

const FacebookIcon = styled(Icon)`
  position: absolute;
  left: 18px;
`;

function FacebookAuthButton() {
  const { t } = useTranslation();

  return (
    <FacebookButton>
      <FacebookIcon id="facebook" width={19} height={20} viewBox="0 0 19 20" />
      <span>{t('facebook_auth')}</span>
    </FacebookButton>
  );
}

export default FacebookAuthButton;
