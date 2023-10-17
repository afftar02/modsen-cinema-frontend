import { styled } from 'styled-components';
import Icon from 'components/Icon';

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
  return (
    <GoogleButton>
      <GoogleIcon id="google" width={15} height={17} viewBox="0 0 15 17" />
      <span>Continue with Google</span>
    </GoogleButton>
  );
}

export default GoogleAuthButton;
