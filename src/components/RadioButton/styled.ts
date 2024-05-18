import { styled } from "styled-components";

export const ItemValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RadioInput = styled.input<{ $bgColor: string; $checkedColor: string }>`
  width: 18px;
  height: 18px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 99px;
  background-color: ${(props) => props.$bgColor};
  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 13px;
    height: 13px;
    border-radius: 99px;
    transform: scale(0);
    transition: 0.1s transform ease-in-out;
    background-color: ${(props) => props.$checkedColor};
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export const ItemLabel = styled.label<{ $color: string }>`
  color: ${(props) => props.$color};
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  text-transform: capitalize;
`;