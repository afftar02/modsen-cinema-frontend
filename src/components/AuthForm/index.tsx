import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import GoogleAuthButton from 'components/GoogleAuthButton';
import FacebookAuthButton from 'components/FacebookAuthButtton';
import GitHubAuthButton from 'components/GitHubAuthButton';
import Button from 'components/Button';
import { useFormik } from 'formik';
import { validateRegistration } from 'helpers/ValidateRegistration';
import { validateLogin } from 'helpers/ValidateLogin';
import PasswordInput from 'components/PasswordInput';

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

const Modal = styled.div`
  position: relative;
  width: 840px;
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

const SubmitButton = styled(Button)`
  width: 100%;
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
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validate: isSignUp ? validateRegistration : validateLogin,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Wrapper>
      <Modal>
        <Link to="/">
          <CloseIcon id="close" width={50} height={50} viewBox="0 0 50 50" />
        </Link>
        <TextBlock>
          <span>{title}</span>
          <BrightText> {brightTitle}</BrightText>
        </TextBlock>
        <StyledForm onSubmit={formik.handleSubmit}>
          {isSignUp && (
            <Input
              iconId={'name'}
              placeholder={formik.errors.name ?? 'Enter your name'}
              onChange={formik.handleChange}
              value={formik.values.name}
              onClick={() => formik.setFieldError('name', undefined)}
              name={'name'}
              isError={!!formik.errors.name}
            />
          )}
          {isSignUp && (
            <Input
              iconId={'surname'}
              placeholder={formik.errors.surname ?? 'Enter your surname'}
              onChange={formik.handleChange}
              value={formik.values.surname}
              onClick={() => formik.setFieldError('surname', undefined)}
              name={'surname'}
              isError={!!formik.errors.surname}
            />
          )}
          <Input
            iconId={'email'}
            placeholder={formik.errors.email ?? 'Enter your email'}
            onChange={formik.handleChange}
            value={formik.values.email}
            onClick={() => formik.setFieldError('email', undefined)}
            name={'email'}
            isError={!!formik.errors.email}
          />
          <PasswordInput
            placeholder={formik.errors.password ?? 'Enter strong password'}
            onChange={formik.handleChange}
            value={formik.values.password}
            onClick={() => formik.setFieldError('password', undefined)}
            isError={!!formik.errors.password}
          />
          <SubmitButton type={'submit'}>Send</SubmitButton>
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
