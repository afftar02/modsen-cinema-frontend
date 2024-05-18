import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};