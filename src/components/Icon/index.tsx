import { MouseEventHandler } from 'react';
import sprite from './assets/sprite.svg';

type IconProps = {
  id: string;
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

function Icon({ id, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}

export default Icon;
