import { styled } from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 85px 60px 85px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;  
    gap: 20px;
    padding: 40px 30px 60px 30px;
  }
`;

export const ColumnTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.1px;
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
