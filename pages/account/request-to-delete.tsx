import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { FormAction, SaveButton } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RequestToDeleteViewModel } from "pages/account/requestToDeleteViewModel";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const RequestToDelete: NextPage = () => {
  const { t } = useTranslation();
  const { profileService } = useServices();
  const store = useStore();
  const router = useRouter();

  const [viewModel] = useState<RequestToDeleteViewModel>(() => {
    const model = new RequestToDeleteViewModel(store.me!, profileService);
    model.registerDialog("confirmDelete");
    return model;
  });

  const onDelete = useCallback(async () => {
    viewModel.dialog("confirmDelete")?.close();
    const success = await viewModel.delete();
    if (success) {
      await store.signOut();
      router.push("/");
    }
  }, [viewModel, router, store]);

  const isSubmitting = viewModel.isSubmitting;

  const content = t("message.requestToDelete", {
    user: store.me?.username,
    supportEmail: "support@onehealth.com",
    returnObjects: true,
  });

  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.requestToDelete", "View") }]}
        />
        <div className="p-4">
          <h6 className="mb-4">{content[0]}</h6>
          <p className="mb-4">{content[1]}</p>
          <ol>
            <li>
              {content[2]}
              <p>{content[3]}</p>
            </li>
            <li>
              {content[4]}
              <p>{content[5]}</p>
            </li>
          </ol>
          <p className="my-4">{content[6]}</p>
          <p className="mb-4">{content[7]}</p>
          <p className="mb-4">{content[8]}</p>
          <p className="mb-4">{content[9]}</p>
        </div>
        <FormAction>
          <SaveButton
            type="button"
            disabled={isSubmitting}
            onClick={() => viewModel.dialog("confirmDelete")?.open(null)}
          >
            {isSubmitting ? <Spinner /> : t("form.button.submit", "Submit")}
          </SaveButton>
        </FormAction>
        <ConfirmDialog
          store={viewModel.dialog("confirmDelete")}
          content={t("dialog.content.confirmDelete", "Are you sure?")}
          onYes={() => onDelete()}
          onNo={() => viewModel.dialog("confirmDelete")?.close()}
        />
      </Layout>
    </Protect>
  );
};

export default observer(RequestToDelete);
