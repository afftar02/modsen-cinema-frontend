import Icon from '../Icon';
import { styled } from 'styled-components';
import FooterInput from '../FooterInput';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const ColumnsContainer = styled.div`
  margin-left: 170px;
  display: flex;
  gap: 38px;
`;

const Column = styled.div`
  width: 175px;
`;

const ColumnTitle = styled.span`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.1px;
`;

const ColumnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const ListItemText = styled.span`
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const FooterInputBlock = styled.div`
  margin-top: 24px;
`;

const InputDescriptionText = styled.span`
  width: 386px;
  display: inline-block;
  margin-top: 20px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  opacity: 0.4;
`;

const SubscribeBlock = styled.div`
  width: 395px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <Icon id="footer-logo" width={123} height={30} viewBox="0 0 123 30" />
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
          <ColumnTitle>Subscribe</ColumnTitle>
          <FooterInputBlock>
            <FooterInput />
            <InputDescriptionText>
              Join our newsletter to stay up to date on features and releases
            </InputDescriptionText>
          </FooterInputBlock>
        </SubscribeBlock>
      </ColumnsContainer>
    </FooterWrapper>
  );
}

export default Footer;
