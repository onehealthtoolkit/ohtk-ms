import { NextPage } from "next";
import CaseDefinitionView from "components/admin/caseDefinition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminCaseDefinitionViewPage: NextPage = () => {
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
            { text: "Case Definitions", href: "/admin/case_definitions" },
            { text: "View" },
          ]}
        />
        <CaseDefinitionView />
      </Layout>
    </Protect>
  );
};

export default AdminCaseDefinitionViewPage;
