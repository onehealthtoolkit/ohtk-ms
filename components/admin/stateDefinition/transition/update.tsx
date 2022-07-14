import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateTransitionUpdateViewModel } from "./updateViewModel";
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
  Select,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import Breadcrumb from "components/layout/breadcrumb";
import useStateSteps from "lib/hooks/stateSteps";

const StateTransitionsUpdateForm = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateTransitionUpdateViewModel(
        router.query.id as string,
        router.query.transition_id as string,
        services.stateTransitionService
      )
  );

  const stateSteps = useStateSteps(router.query.id as string);

  const errors = viewModel.fieldErrors;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <Breadcrumb
          crumbs={[
            {
              text: "State Definitions",
              href: "/admin/state_definitions",
            },
            {
              text: `${router.query.definition_name}`,
              href: `/admin/state_definitions/${router.query.id}/update/`,
            },
            { text: "Update Transition" },
          ]}
        />
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
              <Label htmlFor="fromStepId">From Step</Label>
              <Select
                id="fromStepId"
                placeholder="From Step"
                onChange={evt => (viewModel.fromStepId = evt.target.value)}
                disabled={viewModel.isSubmitting}
                value={viewModel.fromStepId}
              >
                <option value={""} disabled>
                  Select item ...
                </option>
                {stateSteps?.map(item => (
                  <option key={`option-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <ErrorText>{viewModel.fieldErrors.fromStepId}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="toStepId">To Step</Label>
              <Select
                id="toStepId"
                placeholder="To Step"
                onChange={evt => (viewModel.toStepId = evt.target.value)}
                disabled={viewModel.isSubmitting}
                value={viewModel.toStepId}
              >
                <option value={""} disabled>
                  Select item ...
                </option>
                {stateSteps?.map(item => (
                  <option key={`option-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <ErrorText>{viewModel.fieldErrors.fromStepId}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="formDefinition">Form Definition</Label>
              <TextArea
                id="formDefinition"
                placeholder="Form Definition"
                rows={5}
                onChange={evt => (viewModel.formDefinition = evt.target.value)}
                disabled={viewModel.isSubmitting}
                defaultValue={viewModel.formDefinition}
              />
              <ErrorText>{errors.formDefinition}</ErrorText>
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
              {viewModel.isSubmitting ? <Spinner /> : "Save"}
            </SaveButton>
            <CancelButton type="button" onClick={() => router.back()}>
              Cancel
            </CancelButton>
          </FormAction>
        </Form>
      </>
    </MaskingLoader>
  );
};

export default observer(StateTransitionsUpdateForm);
