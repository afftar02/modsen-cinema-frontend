import { styled } from "styled-components";

export const StyledButton = styled.button<{ $disabled: boolean }>`
  width: 200px;
  height: 55px;
  border: none;
  border-radius: 10px;
  background: ${(props) => (props.$disabled ? '#4f4f4f' : '#d98639')};
  transition: opacity 0.1s ease-in-out;

  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;

  cursor: ${(props) => (props.$disabled ? 'auto' : 'pointer')};

  &:hover {
    opacity: 0.8;
  }
`;