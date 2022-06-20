import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReportTypeUpdateForm from "components/admin/reportType/updateForm";
import Layout from "components/layout";
import { MaskingLoader } from "components/widgets/forms";
import { ReportType } from "lib/services/reportType";
import useServices from "lib/services/provider";
import Protect from "components/auth/protect";

type FormValues = ReportType;

const AdminReportTypeUpdatePage: NextPage = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      const result = await services.reportTypeService.getReportType(id);
      setFormValues(result.data);
    }

    if (router.query.id) {
      loadData(router.query.id as string);
    }
  }, [router.query, services.reportTypeService]);

  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Type &raquo; update</div>
        <MaskingLoader loading={!formValues}>
          <ReportTypeUpdateForm data={formValues} />
        </MaskingLoader>
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeUpdatePage;
