import { ChangeEventHandler } from 'react';

export type GenderSelectProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
};
