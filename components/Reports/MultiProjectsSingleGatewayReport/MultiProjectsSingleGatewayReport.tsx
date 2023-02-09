import {
  Project,
  useGateways,
  useProjects,
  useReports,
} from '../../../api/api';
import PieChart from '../../PieChart/PieChart';
import { sum, pluck, groupBy } from 'ramda';
import Card from '../../Card/Card';
import ExpandableRow from '../../ExpandableRow/ExpandableRow';
import FormattedCurrency from '../../Intl/FormattedCurrency';
import FormattedDate from '../../Intl/FormattedDate';
import Table from '../../Table/Table';
import classes from './styles.module.css';
import CardSummary from '../../Card/CardSummary';

type Filters = { gatewayId: string; from: string; to: string };

type Props = {} & Filters;

export default function MultiProjectSingleGatewayReport({
  from,
  gatewayId,
  to,
}: Props) {
  const { projects } = useProjects();
  const { gateways } = useGateways();
  const { reports } = useReports({ from, to, gatewayId });

  const pieData = Object.values(
    groupBy((report) => report.projectId, reports ?? [])
  ).map((reports) => ({
    label: reports[0]?.project?.name ?? '',
    value: sum(pluck('amount', reports ?? [])),
  }));
  const total = sum(pluck('amount', reports ?? []));
  const gateway = gateways?.find((gateway) => gateway.gatewayId === gatewayId);
  return (
    <div className={classes.reports}>
      <Card className={classes.projects}>
        <CardSummary>All projects | {gateway?.name}</CardSummary>
        {projects?.map((project, i) => (
          <Row
            key={i}
            project={project}
            from={from}
            to={to}
            gatewayId={gatewayId}
          />
        ))}
      </Card>

      <div className={classes.pieChart}>
        <PieChart data={pieData} />
        <Card className={classes.total}>
          Gateway total | <FormattedCurrency amount={total} />
        </Card>
      </div>
    </div>
  );
}

type RowProps = { project: Project } & Filters;

function Row({ project, gatewayId, from, to }: RowProps) {
  const { reports } = useReports({
    from,
    to,
    projectId: project.projectId,
    gatewayId,
  });
  const total = sum(pluck('amount', reports ?? []));
  return (
    <ExpandableRow
      content={
        <Table
          className={classes.transactions}
          header={['Date', 'Transaction ID', 'Amount']}
          body={
            reports?.map((projectReport) => [
              <FormattedDate key={0} date={projectReport.created} />,
              projectReport.paymentId,
              <FormattedCurrency key={3} amount={projectReport.amount} />,
            ]) ?? []
          }
        />
      }
    >
      <div>{project.name}</div>
      <div>
        Total: <FormattedCurrency amount={total} />
      </div>
    </ExpandableRow>
  );
}
