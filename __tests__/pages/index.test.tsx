import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { gateway, project, report, user } from '../../__mocks__/api';
import Reports from '../../pages/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { SWRConfig } from 'swr';
import { PropsWithChildren } from 'react';

function TestProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
}

const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/users`,
    (req, res, ctx) => {
      return res(ctx.json({ data: [user] }));
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/projects`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            project,
            { ...project, name: 'Other project', projectId: 'other-project' },
          ],
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/gateways`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            gateway,
            { ...gateway, name: 'Other gateway', gatewayId: 'other-gateway' },
          ],
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/report`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [report, report, { ...report, projectId: 'other-project' }],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("shows the users' avatar", async () => {
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  await waitFor(() => {
    screen.getByText('Foo Bar');
  });
});

test('handles filtering dates', async () => {
  const handler = jest.fn((req, res, ctx) => {
    return res(ctx.json({ data: [report, report] }));
  });
  server.use(
    rest.post(`${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/report`, handler)
  );
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  fireEvent.change(screen.getByDisplayValue('2021-01-01'), {
    target: { value: '2021-01-05' },
  });

  await waitFor(() => {
    expect(handler.mock.lastCall?.[0].body).toMatchObject({
      from: '2021-01-05',
      to: '2023-01-01',
    });
  });

  fireEvent.change(screen.getByDisplayValue('2023-01-01'), {
    target: { value: '2022-01-01' },
  });

  await waitFor(() => {
    expect(handler.mock.lastCall?.[0].body).toMatchObject({
      from: '2021-01-05',
      to: '2022-01-01',
    });
  });
});

test('handles filtering for all gateways and all projects', async () => {
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  fireEvent.click(screen.getByText('All Projects'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-all'));
  });

  fireEvent.click(screen.getByText('All Gateways'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-all'));
  });

  await waitFor(() => {
    expect(screen.getByText('Total | $7.65')).toBeDefined();
  });
});

test('handles filtering for all projects and a single gateway', async () => {
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  fireEvent.click(screen.getByText('All Projects'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-all'));
  });

  fireEvent.click(screen.getByText('All Gateways'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-gateway'));
  });

  await waitFor(() => {
    expect(screen.getByText('Gateway total | $7.65'));
  });
});

test('handles filtering for a single project and all gateways', async () => {
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  fireEvent.click(screen.getByText('All Projects'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-other-project'));
  });

  fireEvent.click(screen.getByText('All Gateways'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-all'));
  });

  await waitFor(() => {
    expect(screen.getByText('Project total | $7.65'));
  });
});

test('handles filtering for a single project and single gateway', async () => {
  const handler = jest.fn((req, res, ctx) => {
    return res(
      ctx.json({
        data: [report, report],
      })
    );
  });
  server.use(
    rest.post(`${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/report`, handler)
  );
  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  fireEvent.click(screen.getByText('All Projects'));

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-project'));
  });

  fireEvent.click(screen.getByText('All Gateways'));
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('dropdown-gateway'));
  });

  await waitFor(() => {
    expect(screen.getByText('Fake project | fake gateway')).toBeDefined();
    expect(screen.getByText('Total | $5.10')).toBeDefined();
  });
});

test('shows a message if projects are empty', async () => {
  server.use(
    rest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/users`,
      (req, res, ctx) => res(ctx.json({ data: [] }))
    ),
    rest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/projects`,
      (req, res, ctx) => res(ctx.json({ data: [] }))
    ),
    rest.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/gateways`,
      (req, res, ctx) => res(ctx.json({ data: [] }))
    ),
    rest.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mock-api/api/report`,
      (req, res, ctx) => res(ctx.json({ data: [] }))
    )
  );

  await act(() =>
    render(
      <TestProviders>
        <Reports />
      </TestProviders>
    )
  );

  await waitFor(() => {
    screen.getAllByText('No reports');
  });
});
