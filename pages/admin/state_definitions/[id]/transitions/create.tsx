import { NextPage } from "next";
import Layout from "components/layout";
import StateTransitionCreate from "components/admin/stateDefinition/transition/create";
import Protect from "components/auth/protect";

const AdminStateTransitionCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <StateTransitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminStateTransitionCreatePage;
