import { useProjects, useGateways } from '../../api/api';
import { prepend } from 'ramda';
import DateInput from '../DateInput/DateInput';
import Dropdown from '../Dropdown/Dropdown';
import classes from './styles.module.css';

type Props = {
  projectId: string;
  setProjectId: (projectId: string) => void;
  gatewayId: string;
  setGatewayId: (gatewayId: string) => void;
  to: string;
  setTo: (to: string) => void;
  from: string;
  setFrom: (from: string) => void;
};

export default function ReportFilters({
  projectId,
  setProjectId,
  gatewayId,
  setGatewayId,
  to,
  setTo,
  from,
  setFrom,
}: Props) {
  const { projects } = useProjects();
  const { gateways } = useGateways();

  const projectOptions = prepend(
    { value: 'all', label: 'All Projects' },
    projects?.map((project) => ({
      value: project.projectId,
      label: project.name,
    })) ?? []
  );

  const gatewayOptions = prepend(
    { value: 'all', label: 'All Gateways' },
    gateways?.map((gateway) => ({
      value: gateway.gatewayId,
      label: gateway.name,
    })) ?? []
  );

  return (
    <div className={classes.filters}>
      <Dropdown
        options={projectOptions}
        value={projectId}
        onChange={setProjectId}
      />
      <Dropdown
        options={gatewayOptions}
        value={gatewayId}
        onChange={setGatewayId}
      />
      <DateInput
        name="from"
        value={from}
        onChange={(e) => setFrom(e.currentTarget.value)}
      />
      <DateInput
        name="to"
        value={to}
        onChange={(e) => setTo(e.currentTarget.value)}
      />
    </div>
  );
}
