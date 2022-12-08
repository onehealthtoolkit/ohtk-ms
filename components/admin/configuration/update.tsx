import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ConfigurationUpdateViewModel } from "./updateViewModel";
import {
  CancelButton,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  MaskingLoader,
  SaveButton,
  TextInput,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";

const ConfigurationUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ConfigurationUpdateViewModel(
        router.query.id as string,
        services.configurationService,
        services.reportTypeService
      )
  );

  const keyField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="key">{t("form.label.key", "Key")}</Label>
            <TextInput
              id="key"
              type="text"
              placeholder={t("form.placeholder.key", "Key")}
              onChange={evt => (viewModel.key = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.key}
              required
            />
            <ErrorText>{viewModel.fieldErrors.key}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const valueField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="value">{t("form.label.value", "Value")}</Label>
            <TextArea
              id="value"
              rows={10}
              placeholder={t("form.placeholder.value", "Value")}
              onChange={evt => (viewModel.value = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.value}
              required
            />
            <ErrorText>{viewModel.fieldErrors.value}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form>
        <FieldGroup>
          <>
            {keyField}
            {valueField}
          </>
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton
            type="button"
            disabled={viewModel.isSubmitting}
            onClick={onSubmit}
          >
            {viewModel.isSubmitting ? (
              <Spinner />
            ) : (
              t("form.button.save", "Save")
            )}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            {t("form.button.cancel", "Cancel")}
          </CancelButton>
        </FormAction>
      </Form>
    </MaskingLoader>
  );
};

export default observer(ConfigurationUpdate);
