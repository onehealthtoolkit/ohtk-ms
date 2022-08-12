import { NextPage } from "next";
import Layout from "components/layout";
import UserCreate from "components/admin/user/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminUserCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.users", "Users"), href: "/admin/users" },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <UserCreate />
      </Layout>
    </Protect>
  );
};

export default AdminUserCreatePage;
