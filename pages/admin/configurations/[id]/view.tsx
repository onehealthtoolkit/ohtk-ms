import { NextPage } from "next";
import ConfigurationView from "components/admin/configuration/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminConfigurationViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.configurations", "Configurations"),
              href: "/admin/configurations",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <ConfigurationView />
      </Layout>
    </Protect>
  );
};

export default AdminConfigurationViewPage;
