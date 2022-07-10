import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import AuthorityArea from "components/admin/authority/area";

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
            { text: "Define area" },
          ]}
        />
        <AuthorityArea />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityViewPage;
