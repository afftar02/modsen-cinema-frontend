import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';
import { Icon } from 'modsen-library';

import { Container, StyledText } from './styled';

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
