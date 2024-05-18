import { StyledButton } from './styled';
import { ButtonProps } from './types';

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
