import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useState } from 'react';

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 50px 12px 24px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.1px;

  &::placeholder {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.1px;
    opacity: 0.5;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 12px;
  right: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.4);
  }
`;

function FooterInput() {
  const [value, setValue] = useState('');

  return (
    <InputWrapper>
      <StyledInput
        type="email"
        placeholder="Enter email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <StyledIcon
        id={'send'}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        onClick={() => alert(value)}
      />
    </InputWrapper>
  );
}

export default FooterInput;
