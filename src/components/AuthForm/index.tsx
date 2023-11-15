import { styled, useTheme } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateRegistration } from 'helpers/ValidateRegistration';
import { validateLogin } from 'helpers/ValidateLogin';
import { AuthContextType, useAuth } from 'auth/Auth';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import ModalPortal from 'components/ModalPortal';
import { motion } from 'framer-motion';
import CloseIcon from 'components/CloseIcon';
import { useCallback, useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import {
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
} from 'constants/BaseApiUrl';
import {
  Button,
  FacebookAuthButton,
  GitHubAuthButton,
  GoogleAuthButton,
  Input,
  PasswordInput,
} from 'modsen-library';
import { useClickOutside } from 'hooks/useClickOutside';

type AuthFormProps = {
  isSignUp?: boolean;
  title?: string;
  brightTitle?: string;
  hint?: string;
  underlinedHint?: string;
  hintLink?: string;
};

const Modal = styled(motion.div)`
  position: relative;
  width: 840px;
  min-height: 500px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px 107px;
  display: flex;
  flex-direction: column;

  @media (max-width: 840px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    padding: 20px 25px;
  }
`;

const TextBlock = styled.div`
  width: 430px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;

  @media (max-width: 650px) {
    width: 230px;
  }
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

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 14px;
`;

const StyledText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inria Sans', sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 300;
`;

const UnderlinedText = styled.span`
  color: ${(props) => props.theme.color};
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
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { register, login } = useAuth() as AuthContextType;
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => navigate('/'));

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validate: (values) =>
      isSignUp ? validateRegistration(values, t) : validateLogin(values, t),
    validateOnChange: false,
    onSubmit: () => {
      isSignUp ? handleRegister() : handleLogin();
    },
  });

  const handleRegister = useCallback(async () => {
    try {
      await register(formik.values);
      navigate('/');
    } catch (err) {
      const axiosError = err as AxiosError;
      const { message } = axiosError.response?.data as { message: string };

      alert(message);
    }
  }, [formik, navigate, register]);

  const handleLogin = useCallback(async () => {
    try {
      await login(formik.values);
      navigate('/');
    } catch (err) {
      formik.values.email = '';
      formik.values.password = '';
      formik.setFieldError('email', t('invalid_login'));
      formik.setFieldError('password', t('invalid_login'));
    }
  }, [formik, login, navigate, t]);

  return (
    <ModalPortal>
      <Modal
        ref={modalRef}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <Link to="/">
          <CloseIcon />
        </Link>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <TextBlock>
            <span>{title}</span>
            <BrightText> {brightTitle}</BrightText>
          </TextBlock>
          <StyledForm onSubmit={formik.handleSubmit}>
            {isSignUp && (
              <Input
                iconId={'name'}
                placeholder={formik.errors.name ?? t('name_input_placeholder')}
                onChange={formik.handleChange}
                value={formik.values.name}
                onClick={() => formik.setFieldError('name', undefined)}
                name={'name'}
                isError={!!formik.errors.name}
                color={theme.color}
              />
            )}
            {isSignUp && (
              <Input
                iconId={'surname'}
                placeholder={
                  formik.errors.surname ?? t('surname_input_placeholder')
                }
                onChange={formik.handleChange}
                value={formik.values.surname}
                onClick={() => formik.setFieldError('surname', undefined)}
                name={'surname'}
                isError={!!formik.errors.surname}
                color={theme.color}
              />
            )}
            <Input
              iconId={'email'}
              placeholder={formik.errors.email ?? t('email_input_placeholder')}
              onChange={formik.handleChange}
              value={formik.values.email}
              onClick={() => formik.setFieldError('email', undefined)}
              name={'email'}
              isError={!!formik.errors.email}
              color={theme.color}
            />
            <PasswordInput
              placeholder={
                formik.errors.password ?? t('password_input_placeholder')
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              onClick={() => formik.setFieldError('password', undefined)}
              isError={!!formik.errors.password}
              color={theme.color}
            />
            <SubmitButton type={'submit'}>{t('send_text')}</SubmitButton>
          </StyledForm>
          <AuthButtonsContainer>
            <StyledAuthContainer>
              <GoogleAuthButton
                authUrl={GOOGLE_AUTH_URL}
                text={t('google_auth')}
                borderColor={theme.googleButtonBorderColor}
              />
              <FacebookAuthButton
                authUrl={FACEBOOK_AUTH_URL}
                text={t('facebook_auth')}
              />
            </StyledAuthContainer>
            <GitHubAuthButton
              authUrl={GITHUB_AUTH_URL}
              text={t('github_auth')}
            />
          </AuthButtonsContainer>
          <TextContainer>
            <StyledText>{hint}</StyledText>
            {hintLink && (
              <Link to={hintLink}>
                <UnderlinedText>{underlinedHint}</UnderlinedText>
              </Link>
            )}
          </TextContainer>
        </ErrorBoundary>
      </Modal>
    </ModalPortal>
  );
}

export default AuthForm;
