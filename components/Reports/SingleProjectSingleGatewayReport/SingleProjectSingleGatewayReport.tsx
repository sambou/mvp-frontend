import { useReports } from '../../../api/api';
import { pluck, sum } from 'ramda';
import Card from '../../Card/Card';
import FormattedCurrency from '../../Intl/FormattedCurrency';
import FormattedDate from '../../Intl/FormattedDate';
import Table from '../../Table/Table';
import classes from './styles.module.css';
import CardSummary from '../../Card/CardSummary';

type Props = { projectId: string; gatewayId: string; from: string; to: string };

export default function SingleProjectSingleGatewayReport({
  from,
  to,
  gatewayId,
  projectId,
}: Props) {
  const { reports } = useReports({ from, to, gatewayId, projectId });

  const total = sum(pluck('amount', reports ?? []));
  return (
    <div className={classes?.report}>
      <Card>
        <CardSummary>
          {reports?.[0]?.project?.name} | {reports?.[0]?.gateway?.name}
        </CardSummary>
        <Table
          header={['Date', 'Transaction ID', 'Amount']}
          body={
            reports?.map((report) => [
              <FormattedDate key={0} date={report.created} />,
              report.paymentId,
              <FormattedCurrency key={2} amount={report.amount} />,
            ]) ?? []
          }
        />
      </Card>
      <Card className={classes.total}>
        Total | <FormattedCurrency amount={total} />
      </Card>
    </div>
  );
}
