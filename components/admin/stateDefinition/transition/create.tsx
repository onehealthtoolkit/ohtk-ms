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
  TabBar,
  TabItem,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import Breadcrumb from "components/layout/breadcrumb";
import useStateSteps from "lib/hooks/stateSteps";
import FormBuilder from "components/admin/formBuilder";

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
      <TabBar>
        <TabItem
          id="detail"
          active={!viewModel.isFormBuilderMode}
          onTab={() => {
            viewModel.formDefinition = viewModel.formViewModel.jsonString;
            viewModel.isFormBuilderMode = false;
          }}
        >
          {({ activeCss }) => (
            <>
              <svg
                className={`mr-2 w-5 h-5 ${activeCss}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Detail</span>
            </>
          )}
        </TabItem>
        <TabItem
          id="formBuilder"
          active={viewModel.isFormBuilderMode}
          onTab={() => {
            const valid = viewModel.parseFormDefinition(
              viewModel.formDefinition
            );
            if (valid) {
              viewModel.isFormBuilderMode = true;
            }
          }}
        >
          {({ activeCss }) => (
            <>
              <svg
                className={`mr-2 w-5 h-5 ${activeCss}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Form Builder</span>
            </>
          )}
        </TabItem>
      </TabBar>
      <Form
        onSubmit={async evt => {
          evt.preventDefault();
          if (await viewModel.save()) {
            router.back();
          }
        }}
      >
        <FieldGroup>
          {viewModel.isFormBuilderMode ? (
            <FormBuilder viewModel={viewModel.formViewModel} />
          ) : (
            <>
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
                  rows={30}
                  onChange={evt =>
                    (viewModel.formDefinition = evt.target.value)
                  }
                  disabled={viewModel.isSubmitting}
                  defaultValue={viewModel.formDefinition}
                />
                <ErrorText>{errors.formDefinition}</ErrorText>
              </Field>
            </>
          )}
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
