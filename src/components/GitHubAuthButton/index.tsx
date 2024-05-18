import { useCallback } from 'react';
import { openOAuth } from 'helpers/openOAuth';

import { GitHubButton, GitHubIcon } from './styled';
import { GitHubAuthProps } from './types';

function GitHubAuthButton({ authUrl, text }: GitHubAuthProps) {
  const handleClick = useCallback(() => openOAuth(authUrl), [authUrl]);

  return (
    <GitHubButton onClick={handleClick}>
      <GitHubIcon id="github" width={22} height={24} viewBox="0 0 22 24" />
      <span>{text}</span>
    </GitHubButton>
  );
}

export default GitHubAuthButton;
