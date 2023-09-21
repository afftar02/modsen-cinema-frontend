import { styled } from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const StyledButton = styled.button`
  width: 200px;
  height: 55px;
  border: none;
  border-radius: 10px;
  background: #d98639;
  transition: opacity 0.1s ease-in-out;

  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function Button({ children, type, onClick, ...props }: ButtonProps) {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
