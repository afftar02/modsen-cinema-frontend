import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const InputWrapper = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 50px 12px 24px;
  border-radius: 40px;
  background: ${(props) => props.theme.footerInputBgColor};
  border: none;
  outline: none;
  color: ${(props) => props.theme.color};
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.1px;

  &::placeholder {
    color: ${(props) => props.theme.color};
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.1px;
    opacity: 0.5;
  }
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 12px;
  right: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.4);
  }
`;
