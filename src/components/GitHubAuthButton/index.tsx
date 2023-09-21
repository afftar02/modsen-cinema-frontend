import { styled } from 'styled-components';
import Icon from '../Icon';

const GitHubButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 45px;
  border-radius: 10px;
  background: #000;
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

const GitHubIcon = styled(Icon)`
  position: absolute;
  left: 18px;
`;

function GitHubAuthButton() {
  return (
    <GitHubButton>
      <GitHubIcon id="github" width={22} height={24} viewBox="0 0 22 24" />
      <span>Sign up with GitHub</span>
    </GitHubButton>
  );
}

export default GitHubAuthButton;
