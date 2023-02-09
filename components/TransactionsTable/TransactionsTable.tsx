import classes from './styles.module.css';
import { Project, Report } from '../../api/api';
import FormattedCurrency from '../Intl/FormattedCurrency';
import FormattedDate from '../Intl/FormattedDate';
import { WithClassName } from '../types';
import clsx from 'clsx';
import Table from '../Table/Table';

type Props = {
  project: Project;
  reports: Array<Report>;
} & WithClassName;

export default function TransactionsTable({ className, reports }: Props) {
  return (
    <Table
      className={className}
      header={['Date', 'Gateway', 'Transaction ID', 'Amount']}
      body={reports?.map((projectReport, i) => [
        <FormattedDate key={0} date={projectReport.created} />,
        projectReport.gateway?.name,
        projectReport.paymentId,
        <FormattedCurrency key={3} amount={projectReport.amount} />,
      ])}
    />
  );
}
