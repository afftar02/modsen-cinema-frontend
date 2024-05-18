import { ChangeEventHandler, MouseEventHandler } from "react";

export type PasswordInputProps = {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  color: string;
  isError?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  withIcon?: boolean;
};