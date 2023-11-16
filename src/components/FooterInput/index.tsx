import { KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { init, send } from '@emailjs/browser';
import * as process from 'process';
import { useTheme } from 'styled-components';

import { InputWrapper, StyledIcon, StyledInput } from './styled';

function FooterInput() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const theme = useTheme();

  const handleSubmit = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      alert(t('invalid_email'));
      return;
    }

    try {
      await send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
        {
          email: value,
        }
      );
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
    init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? '');
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

export default FooterInput;
