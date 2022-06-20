import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InvitationCodeUpdateForm from "components/admin/invitationCode/updateForm";
import Layout from "components/layout";
import { MaskingLoader } from "components/widgets/forms";
import { InvitationCode } from "lib/services/invitationCode";
import useServices from "lib/services/provider";
import Protect from "components/auth/protect";

type FormValues = InvitationCode;

const AdminInvitationCodeUpdatePage: NextPage = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      const result = await services.invitationCodeService.getInvitationCode(id);
      setFormValues(result.data);
    }

    if (router.query.id) {
      loadData(router.query.id as string);
    }
  }, [router.query, services.invitationCodeService]);

  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Invitation Codes &raquo; update</div>
        <MaskingLoader loading={!formValues}>
          <InvitationCodeUpdateForm data={formValues} />
        </MaskingLoader>
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeUpdatePage;
