import { NextPage } from "next";
import UserUpdate from "components/admin/user/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminUserUpdatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Users", href: "/admin/users" }, { text: "Update" }]}
        />
        <UserUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminUserUpdatePage;
