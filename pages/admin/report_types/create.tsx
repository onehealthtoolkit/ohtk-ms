import { NextPage } from "next";
import Layout from "components/layout";
import ReportTypeCreate from "components/admin/reportType/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminReportTypeCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.reportTypes", "Report Type"),
              href: "/admin/report_types",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <ReportTypeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeCreatePage;
