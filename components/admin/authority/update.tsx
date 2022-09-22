import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import {
  AreaFieldNoSSR,
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
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { AuthorityUpdateViewModel } from "./updateViewModel";
import AuthorityInherits from "components/admin/authority/authorityInherits";
import { toJS } from "mobx";
import { useTranslation } from "react-i18next";

const AuthorityUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new AuthorityUpdateViewModel(
        router.query.id as string,
        services.authorityService
      )
  );

  const codeField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
            <TextInput
              id="code"
              type="text"
              placeholder={t("form.placeholder.code", "Code")}
              onChange={evt => (viewModel.code = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.code}
              required
            />
            <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const nameField = useMemo(() => {
    return (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
            <TextInput
              id="name"
              type="text"
              placeholder={t("form.placeholder.name", "Name")}
              onChange={evt => (viewModel.name = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.name}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
          </Field>
        )}
      </Observer>
    );
  }, [t, viewModel]);

  const inhertitsField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="inherits">
              {t("form.label.inherits", "Inherits")}
            </Label>
            <AuthorityInherits
              values={viewModel.authorityInherits.slice()}
              onAdd={authorityId => viewModel.addAuthorityInherits(authorityId)}
              onDelete={authorityId =>
                viewModel.removeAuthorityInherits(authorityId)
              }
            />
            <ErrorText>{viewModel.fieldErrors.inherits}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const areaField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="full">
            <Label htmlFor="area">{t("form.label.area", "Area")}</Label>
            <AreaFieldNoSSR
              value={toJS(viewModel.area)}
              onChange={data => (viewModel.area = data)}
            />
            <ErrorText>{viewModel.fieldErrors.area}</ErrorText>
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
          {codeField}
          {nameField}
          {inhertitsField}
          {areaField}
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

export default observer(AuthorityUpdate);
