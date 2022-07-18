import Protect from "components/auth/protect";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Dashboard" }]} />
        <Dashboard />
      </Layout>
    </Protect>
  );
};

export default Home;
