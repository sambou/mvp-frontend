import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { WithClassName } from '../types';
import classes from './styles.module.css';

type Props = {} & PropsWithChildren & WithClassName;

export default function Card(props: Props) {
  return (
    <div className={clsx(classes.card, props?.className)}>{props.children}</div>
  );
}
