import UserList from "components/admin/user/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminUsersPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.users", "Users") }]} />
        <UserList />
      </Layout>
    </Protect>
  );
};
export default AdminUsersPage;
