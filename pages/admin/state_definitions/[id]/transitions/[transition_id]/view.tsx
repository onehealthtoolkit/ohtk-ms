import { NextPage } from "next";
import StateTransitionView from "components/admin/stateDefinition/transition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminStateTransitionViewPage: NextPage = () => {
  const router = useRouter();
  const { transition_id } = router.query;
  if (!transition_id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <StateTransitionView />
      </Layout>
    </Protect>
  );
};

export default AdminStateTransitionViewPage;
