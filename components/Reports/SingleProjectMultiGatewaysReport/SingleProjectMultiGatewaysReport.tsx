import { Report, useReports } from '../../../api/api';
import PieChart from '../../PieChart/PieChart';
import { sum, pluck, groupBy } from 'ramda';
import Card from '../../Card/Card';
import ExpandableRow from '../../ExpandableRow/ExpandableRow';
import FormattedCurrency from '../../Intl/FormattedCurrency';
import FormattedDate from '../../Intl/FormattedDate';
import Table from '../../Table/Table';
import classes from './styles.module.css';
import CardSummary from '../../Card/CardSummary';

type Filters = { projectId: string; from: string; to: string };

type Props = {} & Filters;

export default function SingleProjectMultiGatewaysReport({
  projectId,
  from,
  to,
}: Props) {
  const { reports } = useReports({ from, to, projectId });
  const gateways = groupBy((report) => report.gatewayId, reports ?? []);
  const pieData = Object.values(gateways).map((reports) => ({
    label: reports[0]?.gateway?.name ?? '',
    value: sum(pluck('amount', reports ?? [])),
  }));
  const total = sum(pluck('amount', reports ?? []));

  return (
    <div className={classes.reports}>
      <Card className={classes.row}>
        <CardSummary>{reports?.[0]?.project?.name} | all gateways</CardSummary>
        {Object.entries(gateways).map(([gatewayId, reports], i) => (
          <Row key={i} reports={reports} />
        ))}
      </Card>

      <div className={classes.pieChart}>
        <PieChart data={pieData} />
        <Card className={classes.total}>
          Project total | <FormattedCurrency amount={total} />
        </Card>
      </div>
    </div>
  );
}

type RowProps = { reports: Array<Report> };

function Row({ reports }: RowProps) {
  const total = sum(pluck('amount', reports ?? []));
  return (
    <ExpandableRow
      content={
        <Table
          className={classes.transactions}
          header={['Date', 'Transaction ID', 'Amount']}
          body={
            reports?.map((report) => [
              <FormattedDate key={0} date={report.created} />,
              report.paymentId,
              <FormattedCurrency key={3} amount={report.amount} />,
            ]) ?? []
          }
        />
      }
    >
      <div>{reports[0]?.gateway?.name}</div>
      <div>
        Total: <FormattedCurrency amount={total} />
      </div>
    </ExpandableRow>
  );
}
