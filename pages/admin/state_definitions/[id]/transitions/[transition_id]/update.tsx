import { NextPage } from "next";
import StateTransitionUpdate from "components/admin/stateDefinition/transition/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminStateTransitionUpdatePage: NextPage = () => {
  const router = useRouter();
  const { transition_id } = router.query;
  if (!transition_id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <StateTransitionUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminStateTransitionUpdatePage;
