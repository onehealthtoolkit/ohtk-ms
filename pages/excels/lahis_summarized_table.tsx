import LahisSummarizedTable from "components/excel/lahisSummarizedTable";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const LahisSummarizedTablePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t(
                "breadcrumb.lahisSummarizedTable",
                "Summarized table"
              )}`,
            },
          ]}
        />
        <p className="mb-4 text-sm text-slate-600">
          {t(
            "excel.lahisSummarizedTable.help",
            "Animal Sick/Death summary for all authorities. Filter province/district/village in Excel if needed. Columns: village info, dates, suspected/test result, and species counts (population / sick / dead / recoverd / stamped out)."
          )}
        </p>
        <LahisSummarizedTable />
      </Layout>
    </Protect>
  );
};

export default LahisSummarizedTablePage;
