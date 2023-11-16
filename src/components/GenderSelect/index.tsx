import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'modsen-library';
import { styled, useTheme } from 'styled-components';

type GenderSelectProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
};

const StyledSelect = styled.select<{
  $color: string;
  $optionBgColor: string;
  $selectHoverColor: string;
}>`
  appearance: none;
  /* safari */
  -webkit-appearance: none;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: ${(props) => props.$color};
  outline: none;
  padding: 5px 0 5px 15px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.$selectHoverColor};
  }

  & option {
    background-color: ${(props) => props.$optionBgColor};
  }
`;

const SelectContainer = styled.div`
  position: relative;
`;

const SelectArrow = styled(Icon)`
  transform: rotate(90deg);
  position: absolute;
  right: 15px;
  top: 10px;
`;

function GenderSelect({ onChange, value }: GenderSelectProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <SelectContainer>
      <SelectArrow
        id={'right-arrow-nested'}
        height={20}
        width={20}
        viewBox="0 0 24 24"
      />
      <StyledSelect
        onChange={onChange}
        value={value}
        name={'gender'}
        $color={theme.color}
        $optionBgColor={theme.bgColor}
        $selectHoverColor={theme.selectHoverColor}
      >
        <option defaultChecked hidden>
          {t('edit_gender_placeholder')}
        </option>
        <option value="MALE">{t('male')}</option>
        <option value="FEMALE">{t('female')}</option>
      </StyledSelect>
    </SelectContainer>
  );
}

export default GenderSelect;
