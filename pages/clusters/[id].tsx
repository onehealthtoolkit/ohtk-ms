import Protect from "components/auth/protect";
import ClusterDetail from "components/cluster/detail";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ClusterPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Spinner />;
  }

  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.clusters", "Clusters"), href: "/clusters" },
            { text: id as string },
          ]}
        />
        <ClusterDetail id={id as string} />
      </Layout>
    </Protect>
  );
};

export default ClusterPage;
