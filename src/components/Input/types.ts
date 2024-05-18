import { ChangeEventHandler, MouseEventHandler } from "react";

export type InputProps = {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  color: string;
  iconId?: string;
  type?: string;
  name?: string;
  isError?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
};