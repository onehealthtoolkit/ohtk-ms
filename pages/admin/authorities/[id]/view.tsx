import { NextPage } from "next";
import AuthorityView from "components/admin/authority/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminAuthorityViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Authorities", href: "/admin/authorities" },
            { text: "View" },
          ]}
        />
        <AuthorityView />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityViewPage;
