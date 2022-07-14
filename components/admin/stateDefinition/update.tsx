import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateDefinitionUpdateViewModel } from "./updateViewModel";
import {
  AddButton,
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
import Table from "components/widgets/table";
import Link from "next/link";

const StateDefinitionsUpdateForm = () => {
  const router = useRouter();
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
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                placeholder="Name"
                onChange={evt => (viewModel.name = evt.target.value)}
                disabled={isSubmitting}
                defaultValue={viewModel.name}
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
                label="Default"
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
              {viewModel.isSubmitting ? <Spinner /> : "Save"}
            </SaveButton>
            <CancelButton type="button" onClick={() => router.back()}>
              Cancel
            </CancelButton>
          </FormAction>
        </Form>
        <hr className="mb-5 mt-5" />
        <TabBar>
          <TabItem id="step" active={true} onTab={() => {}}>
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
                <span>Step</span>
              </>
            )}
          </TabItem>
          <TabItem id="transition" active={false} onTab={() => {}}>
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
                <span>Transition</span>
              </>
            )}
          </TabItem>
        </TabBar>

        <div className="flex items-center flex-wrap mb-4">
          <p></p>
          <div className="flex-grow"></div>
          <Link
            href={`/admin/state_definitions/${viewModel.id}/steps/create`}
            passHref
          >
            <AddButton />
          </Link>
        </div>

        <Table
          columns={[
            {
              label: "Id",
              get: record => record.id,
            },
            {
              label: "Name",
              get: record => record.name,
            },
          ]}
          data={viewModel?.stateSteps || []}
          onEdit={record =>
            router.push(`/admin/state_definitions/${record.id}/update`)
          }
          onView={record =>
            router.push(`/admin/state_definitions/${record.id}/view`)
          }
          onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
        />
      </>
    </MaskingLoader>
  );
};

export default observer(StateDefinitionsUpdateForm);
