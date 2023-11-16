import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const FallbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
`;

const FallbackText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
`;

function ErrorFallback() {
  const { t } = useTranslation();

  return (
    <FallbackContainer>
      <FallbackText>{t('fallback_text')}</FallbackText>
    </FallbackContainer>
  );
}

export default ErrorFallback;
