import { RequestToDeleteViewModel } from "components/auth/requestToDelete/viewModel";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { FormAction, SaveButton } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const RequestToDeleteMyAccount = () => {
  const { t } = useTranslation();
  const { profileService } = useServices();
  const store = useStore();
  const router = useRouter();

  const [viewModel, setViewModel] = useState<RequestToDeleteViewModel>();

  useEffect(() => {
    const model = new RequestToDeleteViewModel(store.me!, profileService);
    model.registerDialog("confirmDelete");
    setViewModel(model);
  }, [profileService, store]);

  if (viewModel === undefined) {
    return null;
  }

  const onDelete = async () => {
    viewModel.dialog("confirmDelete")?.close();
    const success = await viewModel.delete();
    if (success) {
      await store.signOut();
      router.push("/");
    }
  };

  const isSubmitting = viewModel.isSubmitting;

  const content = t("message.requestToDelete", {
    user: store.me?.username,
    supportEmail: "support@onehealth.com",
    returnObjects: true,
  });

  return (
    <>
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
    </>
  );
};

export default observer(RequestToDeleteMyAccount);
