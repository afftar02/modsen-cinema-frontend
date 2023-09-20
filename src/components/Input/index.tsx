import Icon from '../Icon';
import { styled } from 'styled-components';

type InputProps = {
  iconId: string;
  placeholder: string;
  type?: string;
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
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

  &::placeholder {
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 300;
  }
`;

function Input({ iconId, placeholder, type }: InputProps) {
  return (
    <InputContainer>
      <Icon id={iconId} width={64} height={64} viewBox="0 0 64 64" />
      <StyledInput placeholder={placeholder} type={type} />
    </InputContainer>
  );
}

export default Input;
