import { useTranslation } from 'react-i18next';

import { FallbackContainer, FallbackText } from './styled';

function ErrorFallback() {
  const { t } = useTranslation();

  return (
    <FallbackContainer>
      <FallbackText>{t('fallback_text')}</FallbackText>
    </FallbackContainer>
  );
}

export default ErrorFallback;
