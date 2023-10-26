import { styled } from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const StyledButton = styled.button<{ $disabled: boolean }>`
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

function Button({
  children,
  type,
  onClick,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton type={type} onClick={onClick} $disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
