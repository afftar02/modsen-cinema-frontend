import { styled } from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BookingsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding: 98px 0 170px 178px;

  @media (max-width: 1000px) {
    padding: 60px 0 100px 0;
  }
  @media (max-width: 650px) {
    padding: 60px 10px;
  }
`;

export const BookingsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 100px;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 650px) {
    gap: 60px;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (max-width: 1000px) {
    align-items: center;
  }
`;
