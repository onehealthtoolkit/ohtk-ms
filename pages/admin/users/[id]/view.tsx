import { NextPage } from "next";
import UserView from "components/admin/user/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminUserViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Users", href: "/admin/users" }, { text: "View" }]}
        />
        <UserView />
      </Layout>
    </Protect>
  );
};

export default AdminUserViewPage;
