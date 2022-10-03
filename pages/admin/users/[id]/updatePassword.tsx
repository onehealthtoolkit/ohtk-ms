import { NextPage } from "next";
import UserUpdatePassword from "components/admin/user/updatePassword";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminUserUpdatePage: NextPage = () => {
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
            { text: t("breadcrumb.users", "Users"), href: "/admin/users" },
            { text: t("breadcrumb.updatePassword", "Update password") },
          ]}
        />
        <UserUpdatePassword />
      </Layout>
    </Protect>
  );
};

export default AdminUserUpdatePage;
