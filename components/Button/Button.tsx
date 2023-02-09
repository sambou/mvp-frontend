import clsx from 'clsx';
import { HTMLProps, ReactNode } from 'react';
import classes from './styles.module.css';

type Props = HTMLProps<HTMLButtonElement>;

export default function Button({ children, className, ...rest }: Props) {
  return (
    // @ts-expect-error
    <button
      {...rest}
      className={clsx(classes.buttonReset, classes.button, className)}
    >
      {children}
    </button>
  );
}
