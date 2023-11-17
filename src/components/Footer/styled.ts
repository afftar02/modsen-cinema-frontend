import { styled } from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 60px;

  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ColumnsContainer = styled.div`
  margin-left: 170px;
  display: flex;
  gap: 38px;

  @media (max-width: 1400px) {
    margin: 40px 0 0;
  }
  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  width: 175px;
`;

export const ColumnTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.1px;
`;

export const ColumnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const ListItemText = styled.span`
  color: ${(props) => props.theme.color};
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

export const FooterInputBlock = styled.div`
  margin-top: 24px;
`;

export const InputDescriptionText = styled.span`
  width: 386px;
  display: inline-block;
  margin-top: 20px;
  color: ${(props) => props.theme.color};
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  opacity: 0.4;

  @media (max-width: 430px) {
    width: 250px;
  }
`;

export const SubscribeBlock = styled.div`
  width: 395px;

  @media (max-width: 430px) {
    width: 100%;
  }
`;
