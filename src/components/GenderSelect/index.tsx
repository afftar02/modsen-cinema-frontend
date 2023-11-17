import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { SelectArrow, SelectContainer, StyledSelect } from './styled';
import { GenderSelectProps } from './types';

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

export default memo(GenderSelect);
