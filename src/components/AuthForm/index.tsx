import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';
import { AxiosError } from 'axios';
import {
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
} from 'constants/baseApiUrl';
import { PATHS } from 'constants/paths';
import { useFormik } from 'formik';
import { validateLogin } from 'helpers/validateLogin';
import { validateRegistration } from 'helpers/validateRegistration';
import { useClickOutside } from 'hooks/useClickOutside';
import {
  FacebookAuthButton,
  GitHubAuthButton,
  GoogleAuthButton,
  Input,
  PasswordInput,
} from 'modsen-library';
import { useTheme } from 'styled-components';

import CloseIcon from 'components/CloseIcon';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import ModalPortal from 'components/ModalPortal';

import {
  AuthButtonsContainer,
  BrightText,
  Modal,
  StyledAuthContainer,
  StyledForm,
  StyledText,
  SubmitButton,
  TextBlock,
  TextContainer,
  UnderlinedText,
} from './styled';
import { AuthFormProps } from './types';

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
        <Link to={PATHS.home}>
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

export default memo(AuthForm);
