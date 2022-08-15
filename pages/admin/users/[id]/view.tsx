import { NextPage } from "next";
import UserView from "components/admin/user/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminUserViewPage: NextPage = () => {
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
            { text: t("breadcrumb.users", "Users"), href: "/admin/users" },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <UserView />
      </Layout>
    </Protect>
  );
};

export default AdminUserViewPage;
