import { useEffect } from 'react';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContextType, useAuth } from 'auth/Auth';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  gap: 15px;
`;

const StyledText = styled.span`
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
`;

export function OAuthSuccessRedirect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { checkAuthenticated } = useAuth() as AuthContextType;

  useEffect(() => {
    (async () => {
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: params.get('accessToken'),
          refreshToken: params.get('refreshToken'),
        })
      );
      await checkAuthenticated();
      navigate('/');
    })();
  }, [checkAuthenticated, navigate, params]);

  return (
    <Container>
      <Icon id={'authorized'} />
      <StyledText>{t('oauth_success_message')}</StyledText>
    </Container>
  );
}

export default OAuthSuccessRedirect;
