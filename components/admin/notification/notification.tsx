import { MaskingLoader, TabBar, TabItem } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useReportCategories from "lib/hooks/reportCategories";
import useMyReportTypes from "lib/hooks/reportTypes/myReportTypes";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationEdit from "./notificationEdit";
import { NotificationViewModel } from "./notificationViewModel";

const Notification = () => {
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new NotificationViewModel(services.notificationService)
  );
  const categories = useReportCategories();
  const reportTypes = useMyReportTypes();

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        {categories && (
          <TabBar>
            {categories.map((item, index) => (
              <TabItem
                key={item.id}
                id={item.id}
                active={viewModel.activeTabIndex == index}
                onTab={() => {
                  viewModel.activeTabIndex = index;
                }}
              >
                {({ activeCss }) => (
                  <span className={activeCss}>{item.name}</span>
                )}
              </TabItem>
            ))}
          </TabBar>
        )}
        <div className="flex">
          {categories &&
            categories.map((category, index) => (
              <aside
                key={category.id}
                className={`w-64 ${
                  viewModel.activeTabIndex == index ? "block" : "hidden"
                } `}
                aria-label="Sidebar"
              >
                <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                  <ul className="space-y-2">
                    {reportTypes
                      ?.filter(
                        reportType => reportType.categoryId == +category.id
                      )
                      .map(item => (
                        <li
                          key={item.id}
                          className={`${
                            viewModel.reportTypeId == item.id
                              ? "border-l-2 border-l-blue-700"
                              : ""
                          }`}
                        >
                          <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              viewModel.fetch(item.id);
                            }}
                          >
                            <span className="ml-3">{item.name}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </aside>
            ))}
          <div className="flex-1">
            <div className="ml-2 overflow-x-auto relative shadow-md sm:rounded-lg">
              <div className="w-full md:w-auto grid gap-6 mb-1 grid-cols-3  font-bold text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <div className="py-3 px-6 ">{t("form.label.name", "Name")}</div>
                <div className="py-3 px-6 ">{t("form.label.to", "To")}</div>
                <div className="py-3 px-6 ">
                  {t("form.label.action", "Action")}
                </div>
              </div>
              {viewModel.data?.map(item => (
                <NotificationEdit
                  key={item.notificationTemplateId}
                  title={item.notificationTemplateName}
                  defaultValue={item.to}
                  onSave={async value => {
                    viewModel.setValue(item, value);
                    let result = await viewModel.save(item);
                    return {
                      success: result,
                      msg: item.submitError || item.fieldErrors?.to,
                    };
                  }}
                />
              ))}
              {viewModel.isDataLoding && <Spinner />}
            </div>
          </div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(Notification);
