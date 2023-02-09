import clsx from 'clsx';
import { WithClassName } from '../types';
import classes from './styles.module.css';

type Props = WithClassName;

export default function Footer({ className }: Props) {
  return (
    <footer className={clsx(classes.footer, className)}>
      Terms&Conditions | Privacy policy
    </footer>
  );
}
