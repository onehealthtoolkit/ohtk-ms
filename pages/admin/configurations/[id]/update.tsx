import { NextPage } from "next";
import ConfigurationUpdate from "components/admin/configuration/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminConfigurationUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
    return <Spinner />;
  }

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.configurations", "Configurations"),
              href: "/admin/configurations",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <ConfigurationUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminConfigurationUpdatePage;
