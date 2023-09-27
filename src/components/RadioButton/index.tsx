import { styled } from 'styled-components';

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  text: string;
  checked?: boolean;
  onClick?: () => void;
};

const SettingsItemValue = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SettingsRadioInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 99px;
  background-color: #fff;
  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 13px;
    height: 13px;
    border-radius: 99px;
    transform: scale(0);
    transition: 0.1s transform ease-in-out;
    background-color: #d98639;
  }

  &:checked::before {
    transform: scale(1);
  }
`;

const SettingsItemLabel = styled.label`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  text-transform: capitalize;
`;

function RadioButton({
  id,
  name,
  value,
  text,
  onClick,
  checked = false,
}: RadioButtonProps) {
  return (
    <SettingsItemValue>
      <SettingsRadioInput
        id={id}
        name={name}
        value={value}
        type={'radio'}
        checked={checked}
        onClick={onClick}
      />
      <SettingsItemLabel htmlFor={id} onClick={onClick}>
        {text}
      </SettingsItemLabel>
    </SettingsItemValue>
  );
}

export default RadioButton;
