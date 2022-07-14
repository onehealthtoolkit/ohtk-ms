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
import {
  AdjustmentsIcon,
  CheckIcon,
  CollectionIcon,
} from "@heroicons/react/solid";

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
                <CollectionIcon className={`mr-2 w-5 h-5 ${activeCss}`} />
                <span>Step</span>
              </>
            )}
          </TabItem>
          <TabItem id="transition" active={false} onTab={() => {}}>
            {({ activeCss }) => (
              <>
                <AdjustmentsIcon className={`mr-2 w-5 h-5 ${activeCss}`} />
                <span>Transition</span>
              </>
            )}
          </TabItem>
        </TabBar>

        <div className="flex items-center flex-wrap mb-4">
          <p></p>
          <div className="flex-grow"></div>
          <Link
            href={{
              pathname: `/admin/state_definitions/${viewModel.id}/steps/create`,
              query: {
                definition_name: viewModel.name,
              },
            }}
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
            {
              label: "Is StartState",
              get: record => {
                return record.isStartState ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  ""
                );
              },
            },
            {
              label: "Is StopState",
              get: record => {
                return record.isStopState ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  ""
                );
              },
            },
          ]}
          data={viewModel?.stateSteps || []}
          onEdit={record =>
            router.push({
              pathname: `/admin/state_definitions/${viewModel.id}/steps/${record.id}/update`,
              query: {
                definition_name: viewModel.name,
              },
            })
          }
          onView={record =>
            router.push({
              pathname: `/admin/state_definitions/${viewModel.id}/steps/${record.id}/view`,
              query: {
                definition_name: viewModel.name,
              },
            })
          }
          onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
        />
      </>
    </MaskingLoader>
  );
};

export default observer(StateDefinitionsUpdateForm);
