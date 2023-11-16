import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FOOTER_COLUMNS } from 'constants/FooterColumns';
import { Icon } from 'modsen-library';
import { useTheme } from 'styled-components';

import FooterInput from 'components/FooterInput';

import {
  Column,
  ColumnList,
  ColumnsContainer,
  ColumnTitle,
  FooterInputBlock,
  FooterWrapper,
  InputDescriptionText,
  ListItemText,
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
      <ColumnsContainer>
        {FOOTER_COLUMNS.map(({ title, rows }, index) => (
          <Column key={index}>
            <ColumnTitle>{title}</ColumnTitle>
            <ColumnList>
              {rows.map((value, index) => (
                <ListItemText key={index}>{value}</ListItemText>
              ))}
            </ColumnList>
          </Column>
        ))}
        <SubscribeBlock>
          <ColumnTitle>{t('subscribe_text')}</ColumnTitle>
          <FooterInputBlock>
            <FooterInput />
            <InputDescriptionText>
              {t('subscribe_description_text')}
            </InputDescriptionText>
          </FooterInputBlock>
        </SubscribeBlock>
      </ColumnsContainer>
    </FooterWrapper>
  );
}

export default memo(Footer);
