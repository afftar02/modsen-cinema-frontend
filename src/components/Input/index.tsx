import Icon from '../Icon';
import { styled } from 'styled-components';
import { ChangeEventHandler } from 'react';

type InputProps = {
  iconId: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: string;
  name?: string;
  isError?: boolean;
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  margin-left: 30px;
  color: #fff;
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
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 300;
    transition: color 0.1s ease-in-out;
  }

  ${(props) =>
    props.isError &&
    `
    &::placeholder {
      color: red;
    }
    border-color: red;
    color: red;
  `};
`;

function Input({
  iconId,
  placeholder,
  onChange,
  value,
  type,
  name,
  isError,
}: InputProps) {
  return (
    <InputContainer>
      <Icon id={iconId} width={64} height={64} viewBox="0 0 64 64" />
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        isError={isError}
      />
    </InputContainer>
  );
}

export default Input;
