import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PATHS } from 'constants/paths';

import { StyledLink } from './styled';
import { NavigationProps } from './types';

function Navigation({ className }: NavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className={className}>
      <StyledLink to={PATHS.home}>{t('main_page_nav_text')}</StyledLink>
      <StyledLink to={PATHS.bookings}>{t('bookings_page_nav_text')}</StyledLink>
    </nav>
  );
}

export default memo(Navigation);
