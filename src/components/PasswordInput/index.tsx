import { useEffect, useState } from 'react';
import { checkPasswordComplexity } from 'helpers/checkPasswordComplexity';

import Input from 'components/Input';

import {
  ComplexityLabel,
  ComplexityLabelContainer,
  StrengthBar,
} from './styled';
import { PasswordInputProps } from './types';

function PasswordInput({
  placeholder,
  onChange,
  value,
  isError,
  onClick,
  color,
  withIcon = true,
}: PasswordInputProps) {
  const [complexity, setComplexity] = useState('None');

  useEffect(() => {
    setComplexity(checkPasswordComplexity(value));
  }, [value, complexity]);

  return (
    <div>
      <Input
        iconId={withIcon ? 'password' : ''}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={'password'}
        name={'password'}
        isError={isError}
        onClick={onClick}
        color={color}
      />
      <StrengthBar data-complexity={complexity} />
      <ComplexityLabelContainer>
        <ComplexityLabel data-complexity={complexity}>
          {complexity}
        </ComplexityLabel>
      </ComplexityLabelContainer>
    </div>
  );
}

export default PasswordInput;
