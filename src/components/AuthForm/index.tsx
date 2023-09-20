import Icon from '../Icon';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Input from '../Input';
import GoogleAuthButton from '../GoogleAuthButton';
import FacebookAuthButton from '../FacebookAuthButtton';
import GitHubAuthButton from '../GitHubAuthButton';

type AuthFormProps = {
  isSignUp?: boolean;
  title?: string;
  brightTitle?: string;
  hint?: string;
  underlinedHint?: string;
  hintLink?: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(30, 31, 39, 0.7);
  z-index: 5;
`;

const Modal = styled.div<{ isSignUp?: boolean }>`
  position: relative;
  width: 840px;
  height: ${(props) => (props.isSignUp ? '842px' : '593px')};
  box-sizing: border-box;

  background-color: #1e1f27;
  padding: 40px 107px;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const TextBlock = styled.div`
  width: 430px;
  height: 123px;

  color: #fff;
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
`;

const BrightText = styled.span`
  color: #d98639;
`;

const StyledForm = styled.form`
  margin-top: 33px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const StyledAuthContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 14px;
`;

const StyledText = styled.span`
  color: #fff;
  font-family: 'Inria Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
`;

const UnderlinedText = styled.span`
  color: #fff;
  font-family: 'Inria Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
  text-decoration-line: underline;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  margin-left: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

function AuthForm({
  isSignUp = false,
  title,
  brightTitle,
  hint,
  underlinedHint,
  hintLink,
}: AuthFormProps) {
  return (
    <Wrapper>
      <Modal isSignUp={isSignUp}>
        <Link to="/">
          <CloseIcon id="close" width={50} height={50} viewBox="0 0 50 50" />
        </Link>
        <TextBlock>
          <span>{title}</span>
          <BrightText> {brightTitle}</BrightText>
        </TextBlock>
        <StyledForm>
          {isSignUp && (
            <Input iconId={'name'} placeholder={'Enter your name'} />
          )}
          {isSignUp && (
            <Input iconId={'surname'} placeholder={'Enter your surname'} />
          )}
          <Input iconId={'email'} placeholder={'Enter your email'} />
          <Input
            iconId={'password'}
            placeholder={'Enter strong password'}
            type={'password'}
          />
        </StyledForm>
        <AuthButtonsContainer>
          <StyledAuthContainer>
            <GoogleAuthButton />
            <FacebookAuthButton />
          </StyledAuthContainer>
          <GitHubAuthButton />
        </AuthButtonsContainer>
        <TextContainer>
          <StyledText>{hint}</StyledText>
          {hintLink && (
            <Link to={hintLink}>
              <UnderlinedText>{underlinedHint}</UnderlinedText>
            </Link>
          )}
        </TextContainer>
      </Modal>
    </Wrapper>
  );
}

export default AuthForm;
