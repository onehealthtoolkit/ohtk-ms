import Protect from "components/auth/protect";
import ClusterList from "components/cluster/list";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ClustersPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.clusters", "Clusters") }]} />
        <ClusterList />
      </Layout>
    </Protect>
  );
};

export default ClustersPage;
