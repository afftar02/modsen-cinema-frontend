import { MouseEventHandler } from "react";

export type IconProps = {
  id: string;
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};