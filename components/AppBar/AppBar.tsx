import classes from './styles.module.css';
import Logo from '/public/logo.svg';
import LogoSecondary from '/public/logo-secondary.svg';
import Avatar from '../Avatar/Avatar';
import clsx from 'clsx';
import { WithClassName } from '../types';
import { useUser } from '../../api/api';

type Props = WithClassName;

export default function AppBar({ className }: Props) {
  const { user } = useUser();

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Logo height={40} />
      <LogoSecondary height={27} />

      {user != null && <Avatar name={user?.firstName + ' ' + user?.lastName} />}
    </div>
  );
}
