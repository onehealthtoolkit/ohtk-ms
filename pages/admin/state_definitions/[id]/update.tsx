import { NextPage } from "next";
import StateDefinitionUpdate from "components/admin/stateDefinition/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminStateDefinitionUpdatePage: NextPage = () => {
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
            {
              text: "State Definition",
              href: "/admin/state_definitions",
            },
            { text: "Update" },
          ]}
        />
        <StateDefinitionUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminStateDefinitionUpdatePage;
