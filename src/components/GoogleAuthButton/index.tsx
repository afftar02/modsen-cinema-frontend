import { useCallback } from 'react';
import { openOAuth } from 'helpers/openOAuth';

import { GoogleButton, GoogleIcon } from './styled';
import { GoogleAuthProps } from './types';

function GoogleAuthButton({ authUrl, text, borderColor }: GoogleAuthProps) {
  const handleClick = useCallback(() => openOAuth(authUrl), [authUrl]);

  return (
    <GoogleButton onClick={handleClick} $borderColor={borderColor ?? '#000'}>
      <GoogleIcon id="google" width={15} height={17} viewBox="0 0 15 17" />
      <span>{text}</span>
    </GoogleButton>
  );
}

export default GoogleAuthButton;
