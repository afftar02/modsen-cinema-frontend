import { useTranslation } from 'react-i18next';
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
        <Column>
          <ColumnTitle>First column</ColumnTitle>
          <ColumnList>
            <ListItemText>First page</ListItemText>
            <ListItemText>Second page</ListItemText>
            <ListItemText>Third</ListItemText>
            <ListItemText>Fourth</ListItemText>
          </ColumnList>
        </Column>
        <Column>
          <ColumnTitle>Second</ColumnTitle>
          <ColumnList>
            <ListItemText>Fifth page</ListItemText>
            <ListItemText>Sixth page</ListItemText>
            <ListItemText>Eighth</ListItemText>
          </ColumnList>
        </Column>
        <Column>
          <ColumnTitle>Third</ColumnTitle>
          <ColumnList>
            <ListItemText>Fifth page</ListItemText>
            <ListItemText>Sixth page</ListItemText>
            <ListItemText>Eighth</ListItemText>
          </ColumnList>
        </Column>
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

export default Footer;
