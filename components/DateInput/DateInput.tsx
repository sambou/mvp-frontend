import clsx from 'clsx';
import { ChangeEventHandler, HTMLProps } from 'react';
import classes from './styles.module.css';

// type Props = {
//   value: string;
//   onChange: ChangeEventHandler<HTMLInputElement>;
// };

interface Props extends HTMLProps<HTMLInputElement> {}

export default function DateInput({ value, onChange }: Props) {
  return (
    <input
      className={clsx(classes.inputReset, classes.input)}
      type="date"
      value={value}
      onChange={onChange}
    />
  );
}
