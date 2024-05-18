export type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  text: string;
  checkedColor: string;
  buttonBgColor: string;
  textColor: string;
  checked?: boolean;
  onClick?: () => void;
};