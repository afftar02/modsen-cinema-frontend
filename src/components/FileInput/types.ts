import { ChangeEvent } from "react";

export type FileInputProps = {
  uploadText: string;
  uploadedText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  borderColor: string;
  textColor: string;
  uploadedButtonBgColor: string;
  uploadedButtonColor: string;
  value?: string;
};