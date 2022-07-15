import { NextPage } from "next";
import Layout from "components/layout";
import StateStepCreate from "components/admin/stateDefinition/step/create";
import Protect from "components/auth/protect";

const AdminStateStepCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <StateStepCreate />
      </Layout>
    </Protect>
  );
};

export default AdminStateStepCreatePage;
