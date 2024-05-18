import { InputContainer, StyledIcon, StyledInput } from './styled';
import { InputProps } from './types';

function Input({
  iconId,
  placeholder,
  onChange,
  value,
  type,
  name,
  isError,
  onClick,
  color,
}: InputProps) {
  return (
    <InputContainer>
      {iconId && (
        <StyledIcon id={iconId} width={64} height={64} viewBox="0 0 64 64" />
      )}
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        onClick={onClick}
        $isError={isError}
        $color={color}
      />
    </InputContainer>
  );
}

export default Input;
