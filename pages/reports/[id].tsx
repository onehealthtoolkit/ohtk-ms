import { NextPage } from "next";
import FormData from "components/report/formData";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const FormDataPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Reports", href: "/reports" }, { text: "Detail" }]}
        />
        <FormData />
      </Layout>
    </Protect>
  );
};

export default FormDataPage;
