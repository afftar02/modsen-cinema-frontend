import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import FooterInput from 'components/FooterInput';
import Icon from 'components/Icon';

import {
  ColumnTitle,
  FooterInputBlock,
  FooterWrapper,
  InputDescriptionText,
  SubscribeBlock,
} from './styled';

function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <FooterWrapper>
      <Icon
        id="footer-logo"
        width={123}
        height={30}
        viewBox="0 0 123 30"
        fill={theme.logoColor}
      />
      <SubscribeBlock>
        <ColumnTitle>{t('subscribe_text')}</ColumnTitle>
        <FooterInputBlock>
          <FooterInput />
          <InputDescriptionText>
            {t('subscribe_description_text')}
          </InputDescriptionText>
        </FooterInputBlock>
      </SubscribeBlock>
    </FooterWrapper>
  );
}

export default memo(Footer);
