import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{ $isError?: boolean; $color: string }>`
  color: ${(props) => props.$color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: solid 2px #d9d9d9;
  width: 100%;
  transition: all 0.1s ease-in-out;

  &::placeholder {
    color: ${(props) => props.$color};
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 300;
    transition: color 0.1s ease-in-out;
  }

  ${(props) =>
    props.$isError &&
    `
    &::placeholder {
      color: red;
    }
    border-color: red;
    color: red;
  `};
`;

export const StyledIcon = styled(Icon)`
  margin-right: 30px;
`;
