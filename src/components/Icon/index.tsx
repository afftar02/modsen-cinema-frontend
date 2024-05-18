import sprite from 'assets/sprite.svg';

import { IconProps } from './types';

function Icon({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}

export default Icon;
