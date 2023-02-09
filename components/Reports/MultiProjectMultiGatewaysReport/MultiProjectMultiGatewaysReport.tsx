import { Project, useProjects, useReports } from '../../../api/api';
import { sum, pluck } from 'ramda';
import Card from '../../Card/Card';
import ExpandableRow from '../../ExpandableRow/ExpandableRow';
import FormattedCurrency from '../../Intl/FormattedCurrency';
import FormattedDate from '../../Intl/FormattedDate';
import Table from '../../Table/Table';
import classes from './styles.module.css';
import CardSummary from '../../Card/CardSummary';

type Props = { from: string; to: string };

export default function MultiProjectMultiGatewaysReport({ from, to }: Props) {
  const { projects } = useProjects();
  const { reports } = useReports({ from, to });
  const total = sum(pluck('amount', reports ?? []));

  return (
    <div className={classes.report}>
      <Card className={classes.projects}>
        <CardSummary>All projects | all gateways</CardSummary>
        {projects?.map((project, i) => (
          <Row key={i} project={project} from={from} to={to} />
        ))}
      </Card>
      <Card className={classes.total}>
        Total | <FormattedCurrency amount={total} />
      </Card>
    </div>
  );
}

type RowProps = { project: Project; from: string; to: string };

function Row({ project, from, to }: RowProps) {
  const { reports } = useReports({ from, to, projectId: project.projectId });
  const total = sum(pluck('amount', reports ?? []));
  return (
    <ExpandableRow
      content={
        <Table
          className={classes.transactions}
          header={['Date', 'Gateway', 'Transaction ID', 'Amount']}
          body={
            reports?.map((projectReport) => [
              <FormattedDate key={0} date={projectReport.created} />,
              projectReport.gateway?.name ?? '',
              projectReport.paymentId,
              <FormattedCurrency key={3} amount={projectReport.amount} />,
            ]) ?? []
          }
        />
      }
    >
      <div>{project.name}</div>
      <div className={classes.total}>
        Total: <FormattedCurrency amount={total} />
      </div>
    </ExpandableRow>
  );
}
