import FormBuilder from "components/admin/formBuilder";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const FormBuilderPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <FormBuilder />
      </Layout>
    </Protect>
  );
};
export default FormBuilderPage;
