import VillageView from "components/admin/village/view";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import Spinner from "components/widgets/spinner";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const AdminVillageViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
    return <Spinner />;
  }

  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.villages", "Villages"),
              href: "/admin/villages",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <VillageView />
      </Layout>
    </Protect>
  );
};

export default AdminVillageViewPage;
