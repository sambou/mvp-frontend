import Empty from '/public/empty.svg';
import classes from './styles.module.css';
import { WithClassName } from '../types';
import clsx from 'clsx';
import Typography from '../Typography/Typography';

type Props = WithClassName;

export function NoReports({ className }: Props) {
  return (
    <div className={clsx(classes.wrapper, className)}>
      <Typography variant="h2">No reports</Typography>
      <Typography variant="p">
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </Typography>

      <Empty width={400} />
    </div>
  );
}
