import { NextPage } from "next";
import StateStepUpdate from "components/admin/stateDefinition/step/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminStateStepUpdatePage: NextPage = () => {
  const router = useRouter();
  const { step_id } = router.query;
  if (!step_id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <StateStepUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminStateStepUpdatePage;
