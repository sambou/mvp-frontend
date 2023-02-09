import classes from './styles.module.css';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function CardSummary({ children }: Props) {
  return <div className={classes.cardSummary}>{children}</div>;
}
