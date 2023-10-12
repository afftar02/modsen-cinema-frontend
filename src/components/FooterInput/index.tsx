import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { KeyboardEvent, useEffect, useState } from 'react';
import { init, send } from '@emailjs/browser';
import * as process from 'process';

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

  const handleSubmit = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      alert('Invalid email address!');
      return;
    }

    try {
      await send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
        {
          email: value,
        }
      );
      setValue('');
      alert('Subscription successfully completed!');
    } catch (err) {
      alert('Subscription error!');
    }
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? '');
  }, []);

  return (
    <InputWrapper>
      <StyledInput
        placeholder="Enter email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
      />
      <StyledIcon
        id={'send'}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        onClick={handleSubmit}
      />
    </InputWrapper>
  );
}

export default FooterInput;
