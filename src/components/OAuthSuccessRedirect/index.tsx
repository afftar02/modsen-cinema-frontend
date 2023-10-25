import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useNavigate } from 'react-router-dom';
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
  const [cookies] = useCookies(['tokens']);

  const { checkAuthenticated } = useAuth() as AuthContextType;

  useEffect(() => {
    (async () => {
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: cookies.tokens.access_token,
          refreshToken: cookies.tokens.refresh_token,
        })
      );
      await checkAuthenticated();
      navigate('/');
    })();
  }, [checkAuthenticated, cookies, navigate]);

  return (
    <Container>
      <Icon id={'authorized'} />
      <StyledText>{t('oauth_success_message')}</StyledText>
    </Container>
  );
}

export default OAuthSuccessRedirect;
