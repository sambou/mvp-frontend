import useSWR from 'swr';

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// @ts-expect-error
const postFetcher = (url, { body, ...rest }) => {
  return fetch(url, {
    ...rest,
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  }).then((res) => res.json());
};

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api`;

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Project = {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
};

export type Gateway = {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
};

export type Report = {
  paymentId: number;
  amount: number;
  projectId: string;
  project?: Project;
  gatewayId: string;
  gateway?: Gateway;
  userIds: Array<string>;
  modified: string;
  created: string;
};

export function useUser() {
  const { data, error, isLoading } = useSWR(`${baseUrl}/users`, fetcher);

  return {
    user: data?.data?.[0] as User | null,
    isLoading,
    isError: error,
  };
}

export function useProjects() {
  const { data, error, isLoading } = useSWR(`${baseUrl}/projects`, fetcher);

  return {
    projects: data?.data as Project[] | null,
    isLoading,
    isError: error,
  };
}

export function useGateways() {
  const { data, error, isLoading } = useSWR(`${baseUrl}/gateways`, fetcher);

  return {
    gateways: data?.data as Gateway[] | null,
    isLoading,
    isError: error,
  };
}

export function useReports(opts: {
  from: string;
  to: string;
  projectId?: string;
  gatewayId?: string;
}) {
  let reports: Array<Report> | null = null;
  const body = JSON.stringify(opts);
  const { data, error, isLoading } = useSWR(
    [`${baseUrl}/report`, body],
    ([url, body]) => postFetcher(url, { body })
  );

  const { projects } = useProjects();
  const { gateways } = useGateways();

  if (data?.data != null && projects != null && gateways != null) {
    reports = data?.data.map((report: Report) => ({
      ...report,
      project: projects.find(
        (project) => project.projectId === report.projectId
      ),
      gateway: gateways.find(
        (gateway) => gateway.gatewayId === report.gatewayId
      ),
    }));
  }

  return {
    reports,
    isLoading,
    isError: error,
  };
}
