import clsx from 'clsx';
import { WithClassName } from '../types';
import classes from './styles.module.css';
import Bars from '/public/bars.svg';
import Grid from '/public/grid.svg';
import Screen from '/public/screen.svg';
import Reports from '/public/reports.svg';
import Power from '/public/power.svg';

type Props = WithClassName;

const items = [Bars, Grid, Screen, Reports, Power];

export default function Navigation({ className }: Props) {
  return (
    <nav className={clsx(className)}>
      <ul className={classes.navlist}>
        {items.map((Item, i) => (
          <Item width={24} height={24} key={i} />
        ))}
      </ul>
    </nav>
  );
}
