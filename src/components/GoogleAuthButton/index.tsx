import { styled } from 'styled-components';
import Icon from 'components/Icon';

type GoogleAuthProps = {
  authUrl: string;
  text: string;
};

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

function GoogleAuthButton({ authUrl, text }: GoogleAuthProps) {
  const handleClick = async () => {
    try {
      window.open(authUrl, '_self');
    } catch (err) {
      alert('Authorization error!');
    }
  };

  return (
    <GoogleButton onClick={handleClick}>
      <GoogleIcon id="google" width={15} height={17} viewBox="0 0 15 17" />
      <span>{text}</span>
    </GoogleButton>
  );
}

export default GoogleAuthButton;
