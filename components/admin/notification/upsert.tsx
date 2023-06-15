import { Field, MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { CSSProperties, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import NotificationEdit from "./notificationEdit";
import { NotificationViewModel } from "./notificationViewModel";
import AsyncSelect from "react-select/async";
import { ReportType } from "lib/services/reportType";
import { ReportCategory } from "lib/services/reportCategory";
import { styledReactSelect } from "components/widgets/styledReactSelect";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import ErrorDisplay from "components/widgets/errorDisplay";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 14,
  fontWeight: "bold",
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

interface GroupedOption {
  readonly label: string;
  readonly options: readonly ReportCategory[] | readonly ReportType[];
}

const NotificationUpsert = () => {
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new NotificationViewModel(
      services.notificationService,
      services.reportTypeService
    ).registerDialog("confirmDelete")
  );
  const [categories, setCategories] = useState<ReportCategory[]>();
  const [reportTypes, setReportTypes] = useState<ReportType[]>();

  const filterReportTypes = (
    categories: ReportCategory[],
    reportTypes: ReportType[],
    inputValue: string
  ) => {
    const groupedOptions: GroupedOption[] = categories.map(category => {
      return {
        label: category.name,
        options: reportTypes.filter(
          reportType =>
            reportType.categoryId == parseInt(category.id) &&
            reportType.name.toLowerCase().includes(inputValue.toLowerCase())
        ),
      };
    });

    return groupedOptions;
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: GroupedOption[]) => void
  ) => {
    if (categories && reportTypes) {
      callback(filterReportTypes(categories, reportTypes, inputValue));
    } else {
      services.reportCategoryService
        .fetchReportCategories(30, 0, "")
        .then(result => {
          const categories = result.items;
          services.reportTypeService.fetchMyReportTypes().then(reportTypes => {
            setCategories(categories);
            setReportTypes(reportTypes);
            callback(filterReportTypes(categories, reportTypes, inputValue));
          });
        });
    }
  };

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <div className="flex items-center flex-wrap mb-4 gap-2">
          <Field className="mb-0" $size="half">
            <AsyncSelect<ReportCategory | ReportType, false, GroupedOption>
              cacheOptions
              loadOptions={loadOptions}
              placeholder={t(
                "form.placeholder.selectReportType",
                "Select report type"
              )}
              getOptionValue={item => item.id}
              getOptionLabel={item => item.name}
              defaultOptions
              formatGroupLabel={formatGroupLabel}
              styles={{
                ...styledReactSelect,
                option: styles => {
                  return {
                    ...styles,
                    paddingLeft: "30px",
                  };
                },
              }}
              onChange={values => {
                if (values) {
                  viewModel.reportTypeId = values.id;
                  viewModel.reportTypeName = values.name;
                  viewModel.fetch();
                }
              }}
            />
          </Field>

          <div className="flex-grow"></div>
        </div>
        <ErrorDisplay message={viewModel?.submitError} />
        <div className="flex">
          <div className="flex-1">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <div className="w-full md:w-auto grid gap-6 mb-1 grid-cols-3  font-bold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <div className="py-3 px-6 ">{t("form.label.name", "Name")}</div>
                <div className="py-3 px-6 ">{t("form.label.to", "To")}</div>
                <div className="py-3 px-6 ">
                  {t("form.label.action", "Action")}
                </div>
              </div>
              {viewModel.isDataLoding && <Spinner />}

              {viewModel.data?.map(item => (
                <NotificationEdit
                  key={item.notificationTemplateId}
                  title={item.notificationTemplateName}
                  defaultValue={item.to}
                  deleteAble={!!item.notificationId}
                  onSave={async value => {
                    viewModel.setValue(item, value);
                    let result = await viewModel.save(item);
                    return {
                      success: result,
                      msg: item.submitError || item.fieldErrors?.to,
                    };
                  }}
                  onDelete={async callback => {
                    viewModel
                      .dialog("confirmDelete")
                      ?.open(async (result: string) => {
                        if (result == "yes") {
                          await viewModel.delete(item);
                          callback({
                            success: item.submitError ? false : true,
                            msg: item.submitError,
                          });
                        } else {
                          callback();
                        }
                      });
                  }}
                />
              ))}
              {viewModel.data && !viewModel.data.length && (
                <div className="text-center py-6">
                  <Trans i18nKey="table.notFound">
                    <span className="text-sm ">Not found</span>
                  </Trans>
                </div>
              )}
            </div>
            <ConfirmDialog
              store={viewModel.dialog("confirmDelete")}
              content={t("dialog.content.confirmDelete", "Are you sure?")}
              onYes={(callback: (result: string) => void) => {
                callback("yes");
              }}
              onNo={(callback: (result: string) => void) => {
                callback("cancel");
              }}
            />
          </div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(NotificationUpsert);
