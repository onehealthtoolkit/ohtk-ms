import Protect from "components/auth/protect";
import RequestToDeleteMyAccount from "components/auth/requestToDelete";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const RequestToDeleteAccountPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.requestToDelete", "View") }]}
        />
        <RequestToDeleteMyAccount />
      </Layout>
    </Protect>
  );
};

export default RequestToDeleteAccountPage;
