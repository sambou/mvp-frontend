import { useProjects } from '../../api/api';
import { useState } from 'react';
import { NoReports } from '../NoReports/NoReports';
import ReportFilters from '../ReportFilters/ReportFilters';
import Typography from '../Typography/Typography';
import MultiProjectMultiGatewaysReport from './MultiProjectMultiGatewaysReport/MultiProjectMultiGatewaysReport';
import MultiProjectsSingleGatewayReport from './MultiProjectsSingleGatewayReport/MultiProjectsSingleGatewayReport';
import SingleProjectMultiGatewaysReport from './SingleProjectMultiGatewaysReport/SingleProjectMultiGatewaysReport';
import SingleProjectSingleGatewayReport from './SingleProjectSingleGatewayReport/SingleProjectSingleGatewayReport';
import classes from './styles.module.css';

export default function Reports() {
  const { projects, isLoading } = useProjects();
  const [projectId, setProjectId] = useState('all');
  const [gatewayId, setGatewayId] = useState('all');
  const [from, setFrom] = useState('2021-01-01');
  const [to, setTo] = useState('2023-01-01');

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <Typography variant="h2">Reports</Typography>
          <Typography variant="p" className={classes.subheadline}>
            Easily generate a report of your transactions
          </Typography>
        </div>
        <ReportFilters
          projectId={projectId}
          setProjectId={setProjectId}
          gatewayId={gatewayId}
          setGatewayId={setGatewayId}
          to={to}
          setTo={setTo}
          from={from}
          setFrom={setFrom}
        />
      </div>

      {!isLoading && projectId === 'all' && gatewayId === 'all' && (
        <MultiProjectMultiGatewaysReport from={from} to={to} />
      )}

      {!isLoading && projectId === 'all' && gatewayId !== 'all' && (
        <MultiProjectsSingleGatewayReport
          gatewayId={gatewayId}
          from={from}
          to={to}
        />
      )}

      {!isLoading && projectId !== 'all' && gatewayId === 'all' && (
        <SingleProjectMultiGatewaysReport
          projectId={projectId}
          from={from}
          to={to}
        />
      )}

      {!isLoading && projectId !== 'all' && gatewayId !== 'all' && (
        <SingleProjectSingleGatewayReport
          projectId={projectId}
          gatewayId={gatewayId}
          from={from}
          to={to}
        />
      )}

      {!isLoading && (projects == null || projects?.length === 0) && (
        <NoReports className={classes.empty} />
      )}
    </>
  );
}
