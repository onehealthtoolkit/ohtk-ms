import ReportCategoryList from "components/admin/reportCategory/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminReportCategoriesPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.reportCategories", "Report Category") },
          ]}
        />
        <ReportCategoryList />
      </Layout>
    </Protect>
  );
};
export default AdminReportCategoriesPage;
