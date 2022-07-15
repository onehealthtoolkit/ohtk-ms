import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateTransitionCreateViewModel } from "./createViewModel";
import {
  CancelButton,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  SaveButton,
  Select,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import Breadcrumb from "components/layout/breadcrumb";
import useStateSteps from "lib/hooks/stateSteps";

const StateTransitionCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateTransitionCreateViewModel(
        router.query.id as string,
        services.stateTransitionService
      )
  );
  const stateSteps = useStateSteps(router.query.id as string);

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
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
          { text: "Create Transition" },
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
              onChange={evt => {
                viewModel.fromStepId = evt.target.value;
              }}
              disabled={isSubmitting}
              defaultValue=""
            >
              <option disabled value={""}>
                Select item ...
              </option>
              {stateSteps?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{errors.fromStepId}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="toStepId">To Step</Label>
            <Select
              id="toStepId"
              onChange={evt => {
                viewModel.toStepId = evt.target.value;
              }}
              disabled={isSubmitting}
              defaultValue=""
            >
              <option disabled value={""}>
                Select item ...
              </option>
              {stateSteps?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{errors.toStepId}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="formDefinition">Form Definition</Label>
            <TextArea
              id="formDefinition"
              placeholder="Form Definition"
              rows={5}
              onChange={evt => (viewModel.formDefinition = evt.target.value)}
              disabled={viewModel.isSubmitting}
            />
            <ErrorText>{errors.formDefinition}</ErrorText>
          </Field>
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "บันทึก"}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            Cancel
          </CancelButton>
        </FormAction>
      </Form>
    </>
  );
};

export default observer(StateTransitionCreate);
