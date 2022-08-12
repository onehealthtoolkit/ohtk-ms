import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateDefinitionUpdateViewModel } from "./updateViewModel";
import {
  CancelButton,
  Checkbox,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  MaskingLoader,
  SaveButton,
  TabBar,
  TabItem,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { AdjustmentsIcon, CollectionIcon } from "@heroicons/react/solid";
import { StateStepList } from "./step/list";
import { StateTransitionList } from "./transition/list";
import { useTranslation } from "react-i18next";

const StateDefinitionsUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateDefinitionUpdateViewModel(
        router.query.id as string,
        services.stateDefinitionService
      )
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;
  if (router.query.activeTabIndex) {
    viewModel.activeTabIndex = +router.query.activeTabIndex;
  }
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <Form
          onSubmit={async evt => {
            evt.preventDefault();
            if (await viewModel.save()) {
              router.back();
            }
          }}
        >
          <FieldGroup>
            <Field $size="half">
              <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
              <TextInput
                id="name"
                type="text"
                placeholder={t("form.placeholder.name", "Name")}
                onChange={evt => (viewModel.name = evt.target.value)}
                disabled={isSubmitting}
                defaultValue={viewModel.name}
                required
              />
              <ErrorText>{errors.name}</ErrorText>
            </Field>
            <Field $size="half">
              <Checkbox
                id="isDefault"
                value="True"
                defaultChecked={viewModel.isDefault}
                onChange={evt => (viewModel.isDefault = evt.target.checked)}
                disabled={isSubmitting}
                label={t("form.label.default", "Default")}
              />
            </Field>
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton type="submit" disabled={viewModel.isSubmitting}>
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

        <hr className="mb-5 mt-5" />
        <TabBar>
          <TabItem
            id="step"
            active={viewModel.activeTabIndex == 0}
            onTab={() => {
              viewModel.activeTabIndex = 0;
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, activeTabIndex: 0 },
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            {({ activeCss }) => (
              <>
                <CollectionIcon className={`mr-2 w-5 h-5 ${activeCss}`} />
                <span>Step</span>
              </>
            )}
          </TabItem>
          <TabItem
            id="transition"
            active={viewModel.activeTabIndex == 1}
            onTab={() => {
              viewModel.activeTabIndex = 1;
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, activeTabIndex: 1 },
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            {({ activeCss }) => (
              <>
                <AdjustmentsIcon className={`mr-2 w-5 h-5 ${activeCss}`} />
                <span>Transition</span>
              </>
            )}
          </TabItem>
        </TabBar>
        {viewModel.activeTabIndex == 0 && (
          <StateStepList viewModel={viewModel} />
        )}
        {viewModel.activeTabIndex == 1 && (
          <StateTransitionList viewModel={viewModel} />
        )}
      </>
    </MaskingLoader>
  );
};

export default observer(StateDefinitionsUpdateForm);
