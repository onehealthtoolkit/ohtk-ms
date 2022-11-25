import { NextPage } from "next";
import OutbreakPlanUpdate from "components/admin/outbreakPlan/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminOutbreakPlanUpdatePage: NextPage = () => {
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
              text: t("breadcrumb.outbreakPlans", "Outbreak Plans"),
              href: "/admin/outbreak_plans",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <OutbreakPlanUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminOutbreakPlanUpdatePage;
