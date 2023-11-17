import { KeyboardEvent, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { init, send } from '@emailjs/browser';
import { EMAIL_REG_EXP } from 'constants/EmailRegExp';
import {
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
} from 'constants/EmailService';
import { useTheme } from 'styled-components';

import { InputWrapper, StyledIcon, StyledInput } from './styled';

function FooterInput() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const theme = useTheme();

  const handleSubmit = async () => {
    if (!EMAIL_REG_EXP.test(value)) {
      alert(t('invalid_email'));
      return;
    }

    try {
      await send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, {
        email: value,
      });
      setValue('');
      alert(t('subscribed_text'));
    } catch (err) {
      alert(t('subscription_error'));
    }
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    init(EMAIL_PUBLIC_KEY);
  }, []);

  return (
    <InputWrapper>
      <StyledInput
        placeholder={t('email_subscription_placeholder')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
      />
      <StyledIcon
        id={'send'}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill={theme.color}
        onClick={handleSubmit}
        data-cy={'subscribe'}
      />
    </InputWrapper>
  );
}

export default memo(FooterInput);
