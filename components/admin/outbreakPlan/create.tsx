import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { OutbreakPlanCreateViewModel } from "./createViewModel";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useMyReportTypes from "lib/hooks/reportTypes/myReportTypes";
import { useTranslation } from "react-i18next";
import useStateStepsByReportType from "lib/hooks/stateSteps/loadByReportType";
import DataTemplateField from "../reportType/dataTemplateField";

const OutbreakPlanCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new OutbreakPlanCreateViewModel(
        services.outbreakPlanService,
        services.reportTypeService
      )
  );

  const reportTypes = useMyReportTypes();
  const { stateStepLoading, stateSteps } = useStateStepsByReportType(
    viewModel.reportTypeId
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form>
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
          <TextInput
            id="name"
            type="text"
            placeholder={t("form.placeholder.name", "Name")}
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="description">
            {t("form.label.description", "Description")}
          </Label>
          <TextInput
            id="description"
            type="text"
            placeholder={t("form.placeholder.description", "Description")}
            onChange={evt => (viewModel.description = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.description}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="reportType">
            {t("form.label.reportType", "Report Type")}
          </Label>
          <Select
            id="reportType"
            onChange={evt => {
              viewModel.reportTypeId = evt.target.value;
              viewModel.stateStepId = 0;
            }}
            disabled={isSubmitting}
            value={viewModel.reportTypeId}
            required
          >
            <option disabled value={""}>
              {t("form.label.selectItem", "Select item ...")}
            </option>
            {reportTypes?.map(item => (
              <option key={`option-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <ErrorText>{errors.reportTypeId}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="stateStep">
            {t("form.label.stateStep", "State Step")}
          </Label>
          <div className="relative">
            {stateStepLoading && (
              <div className="flex absolute inset-y-0 right-5 items-center pl-3 pointer-events-none">
                <Spinner />
              </div>
            )}
            <Select
              id="stateStep"
              onChange={evt => {
                viewModel.stateStepId = +evt.target.value;
              }}
              disabled={isSubmitting || stateStepLoading}
              value={viewModel.stateStepId}
              required
            >
              <option disabled value={0}>
                {t("form.label.selectItem", "Select item ...")}
              </option>
              {stateSteps?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          <ErrorText>{errors.stateStepId}</ErrorText>
        </Field>
        <fieldset className="px-4 border rounded">
          <Field $size="half">
            <label className="text-xl block border-b border-gray-400 text-gray-500 font-bold my-1 py-2">
              {t("form.label.zone1", "Zone 1")}
            </label>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone1Radius">
              {t("form.label.zoneRadius", "Radius")}
            </Label>
            <TextInput
              id="zone1Radius"
              type="number"
              placeholder={t("form.placeholder.zoneRadius", "radius (m)")}
              onChange={evt => (viewModel.zone1Radius = +evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone1Radius}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone1Color">
              {t("form.label.zoneColor", "Color")}
            </Label>
            <TextInput
              id="zone1Color"
              type="color"
              style={{ padding: 0, width: "inherit" }}
              placeholder={t("form.placeholder.zoneColor", "color picker")}
              onChange={evt => (viewModel.zone1Color = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone1Color}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone1MessageTitle">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <TextInput
              id="zone1MessageTitle"
              type="text"
              placeholder={t(
                "form.placeholder.titleTemplate",
                "Title Template"
              )}
              onChange={evt => (viewModel.zone1MessageTitle = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone1MessageTitle}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone1MessageBody">
              {t("form.label.bodyTemplate", "Body Template")}
            </Label>
            <DataTemplateField
              placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
              value={null}
              onChange={value => (viewModel.zone1MessageBody = value)}
              variableList={viewModel.formViewModel.variableList}
            />
            <ErrorText>{errors.zone1MessageBody}</ErrorText>
          </Field>
        </fieldset>
        <fieldset className="px-4 border rounded">
          <Field $size="half">
            <label className="text-xl block border-b border-gray-400 text-gray-500 font-bold my-1 py-2">
              {t("form.label.zone2", "Zone 2")}
            </label>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone2Radius">
              {t("form.label.zoneRadius", "Radius")}
            </Label>
            <TextInput
              id="zone2Radius"
              type="number"
              placeholder={t("form.placeholder.zoneRadius", "radius (m)")}
              onChange={evt => (viewModel.zone2Radius = +evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone2Radius}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone2Color">
              {t("form.label.zoneColor", "Color")}
            </Label>
            <TextInput
              id="zone2Color"
              type="color"
              style={{ padding: 0, width: "inherit" }}
              placeholder={t("form.placeholder.zoneColor", "color picker")}
              onChange={evt => (viewModel.zone2Color = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone2Color}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone2MessageTitle">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <TextInput
              id="zone2MessageTitle"
              type="text"
              placeholder={t(
                "form.placeholder.titleTemplate",
                "Title Template"
              )}
              onChange={evt => (viewModel.zone2MessageTitle = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone2MessageTitle}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone2MessageBody">
              {t("form.label.bodyTemplate", "Body Template")}
            </Label>
            <DataTemplateField
              placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
              value={null}
              onChange={value => (viewModel.zone2MessageBody = value)}
              variableList={viewModel.formViewModel.variableList}
            />
            <ErrorText>{errors.zone2MessageBody}</ErrorText>
          </Field>
        </fieldset>
        <fieldset className="px-4 border rounded">
          <Field $size="half">
            <label className="text-xl block border-b border-gray-400 text-gray-500 font-bold my-1 py-2">
              {t("form.label.zone3", "Zone 3")}
            </label>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone3Radius">
              {t("form.label.zoneRadius", "Radius")}
            </Label>
            <TextInput
              id="zone3Radius"
              type="number"
              placeholder={t("form.placeholder.zoneRadius", "radius (m)")}
              onChange={evt => (viewModel.zone3Radius = +evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone3Radius}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone3Color">
              {t("form.label.zoneColor", "Color")}
            </Label>
            <TextInput
              id="zone3Color"
              type="color"
              style={{ padding: 0, width: "inherit" }}
              placeholder={t("form.placeholder.zoneColor", "color picker")}
              onChange={evt => (viewModel.zone3Color = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone3Color}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone3MessageTitle">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <TextInput
              id="zone3MessageTitle"
              type="text"
              placeholder={t(
                "form.placeholder.titleTemplate",
                "Title Template"
              )}
              onChange={evt => (viewModel.zone3MessageTitle = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.zone3MessageTitle}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="zone3MessageBody">
              {t("form.label.bodyTemplate", "Body Template")}
            </Label>
            <DataTemplateField
              placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
              value={null}
              onChange={value => (viewModel.zone3MessageBody = value)}
              variableList={viewModel.formViewModel.variableList}
            />
            <ErrorText>{errors.zone3MessageBody}</ErrorText>
          </Field>
        </fieldset>
      </FieldGroup>

      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(OutbreakPlanCreate);
