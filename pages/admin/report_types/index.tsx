import ReportTypeList from "components/admin/reportType/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminReportTypesPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.reportTypes", "Report Type") }]}
        />
        <ReportTypeList />
      </Layout>
    </Protect>
  );
};
export default AdminReportTypesPage;
