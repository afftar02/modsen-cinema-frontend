import { styled } from "styled-components";

export const SessionContainer = styled.div<{ $selected: boolean }>`
  padding: 16px 20px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 4.039px solid transparent;
  ${(props) => props.$selected && 'border: 4.039px solid #d98639;'};
  background: rgba(90, 90, 92, 0.8);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
`;

export const SessionTime = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 600;
`;

export const CinemaFormat = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

export const SeatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SeatsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 300;
`;