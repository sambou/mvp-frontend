import Layout from '../components/Layout/Layout';
import Reports from '../components/Reports/Reports';
import Head from 'next/head';

export default function ReportsPage() {
  return (
    <>
      <Head>
        <title>Reports</title>
        <meta name="description" content="Dashboard MVP Match" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Reports />
      </Layout>
    </>
  );
}
