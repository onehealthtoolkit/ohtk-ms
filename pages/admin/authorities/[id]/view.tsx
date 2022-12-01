import { NextPage } from "next";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

const DynamicAuthorityView = dynamic(
  () => import("components/admin/authority/view"),
  { ssr: false }
);

const AdminAuthorityViewPage: NextPage = () => {
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
              text: t("breadcrumb.authorities", "Authorities"),
              href: "/admin/authorities",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <DynamicAuthorityView />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityViewPage;
