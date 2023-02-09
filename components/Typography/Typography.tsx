import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import classes from './styles.module.css';
import { WithClassName } from '../types';

type Props = {
  variant: 'h2' | 'p';
} & WithClassName &
  PropsWithChildren;

export default function Typography({
  variant: Variant,
  className,
  children,
}: Props) {
  return (
    <Variant className={clsx(classes.wrapper, className)}>{children}</Variant>
  );
}
