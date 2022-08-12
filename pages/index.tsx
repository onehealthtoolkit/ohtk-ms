import Protect from "components/auth/protect";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.dashboard", "Dashboard") }]}
        />
        <Dashboard />
      </Layout>
    </Protect>
  );
};

export default Home;
