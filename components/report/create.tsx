import { Observer, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { ReportCreateViewModel } from "components/report/createViewModel";
import FormRuntime from "components/report/formRuntime";
import {
  DownloadButton,
  Field,
  FieldGroup,
  Label,
  Select,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import tw from "tailwind-styled-components";

const Card = tw.div`bg-white shadow rounded-md p-6 max-w-3xl`;

const ReportCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const { reportService, reportTypeService, villageService } = useServices();

  const [viewModel] = useState(() => {
    return new ReportCreateViewModel(
      reportService,
      reportTypeService,
      villageService,
      {
        villageFeatureEnabled: store.isFeatureEnable("village"),
        authorityId: store.authorityId
          ? parseInt(String(store.authorityId), 10)
          : undefined,
      }
    );
  });

  useEffect(() => {
    viewModel.init();
  }, [viewModel]);

  return (
    <Observer>
      {() => (
        <div className="flex flex-col gap-4">
          {viewModel.step === "setup" && (
            <Card>
              <h2 className="text-lg font-semibold mb-4">
                {t("report.create.title", "New report")}
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                {t(
                  "report.create.help",
                  "Officer entry for any published report type. When villages are enabled, select a village under your authority first."
                )}
              </p>
              <FieldGroup>
                <Field $size="full">
                  <Label htmlFor="reportType">
                    {t("form.label.reportType", "Report Type")}
                  </Label>
                  <Select
                    id="reportType"
                    value={viewModel.selectedReportTypeId}
                    onChange={e => viewModel.selectReportType(e.target.value)}
                    required
                  >
                    <option value="">
                      {t("form.label.selectItem", "Select item ...")}
                    </option>
                    {viewModel.reportTypes.map(rt => (
                      <option key={rt.id} value={rt.id}>
                        {rt.name}
                      </option>
                    ))}
                  </Select>
                </Field>

                {viewModel.villageRequired ? (
                  <Field $size="full">
                    <Label htmlFor="village">
                      {t("form.label.village", "Village")} *
                    </Label>
                    {viewModel.villagesLoading ? (
                      <Spinner />
                    ) : (
                      <Select
                        id="village"
                        value={viewModel.selectedVillageId}
                        onChange={e => viewModel.selectVillage(e.target.value)}
                        required
                      >
                        <option value="">
                          {t("form.label.selectItem", "Select item ...")}
                        </option>
                        {viewModel.villages.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.code ? `${v.code} — ${v.name}` : v.name}
                            {v.authorityName ? ` (${v.authorityName})` : ""}
                          </option>
                        ))}
                      </Select>
                    )}
                    {!viewModel.villagesLoading &&
                    viewModel.villages.length === 0 ? (
                      <p className="text-sm text-amber-700 mt-1">
                        {t(
                          "report.create.noVillages",
                          "No villages under your authority. Add villages or contact an admin."
                        )}
                      </p>
                    ) : (
                      <></>
                    )}
                  </Field>
                ) : (
                  <></>
                )}

                <Field $size="full">
                  <Label htmlFor="testFlag" className="flex items-center gap-2">
                    <input
                      id="testFlag"
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={viewModel.testFlag}
                      onChange={e => {
                        viewModel.testFlag = e.target.checked;
                      }}
                    />
                    {t("form.label.testReport", "Test report")}
                  </Label>
                </Field>
              </FieldGroup>

              {viewModel.loadError && (
                <p className="text-red-600 text-sm mt-2">
                  {viewModel.loadError}
                </p>
              )}

              <div className="mt-6 flex gap-3">
                <DownloadButton
                  type="button"
                  disabled={
                    !viewModel.canContinueToForm || viewModel.loadingDefinition
                  }
                  onClick={() => viewModel.continueToForm()}
                >
                  {viewModel.loadingDefinition ? (
                    <Spinner />
                  ) : (
                    t("report.create.continue", "Continue to form")
                  )}
                </DownloadButton>
                <button
                  type="button"
                  className="text-sm text-slate-600 underline"
                  onClick={() => router.push("/reports/")}
                >
                  {t("form.button.cancel", "Cancel")}
                </button>
              </div>
            </Card>
          )}

          {viewModel.step === "form" && viewModel.formRuntime && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {viewModel.selectedReportType?.name ||
                      t("report.create.formTitle", "Report form")}
                  </h2>
                  {viewModel.selectedVillageId ? (
                    <p className="text-sm text-slate-500">
                      {t("form.label.village", "Village")}:{" "}
                      {viewModel.villages.find(
                        v => String(v.id) === viewModel.selectedVillageId
                      )?.name || viewModel.selectedVillageId}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => viewModel.backToSetup()}
                >
                  {t("report.create.changeSetup", "Change setup")}
                </button>
              </div>
              <FormRuntime
                viewModel={viewModel.formRuntime}
                onSubmit={async () => {
                  const created = await viewModel.submit();
                  if (created?.id) {
                    await router.push(`/reports/${created.id}`);
                  }
                }}
              />
            </Card>
          )}
        </div>
      )}
    </Observer>
  );
};

export default observer(ReportCreate);
