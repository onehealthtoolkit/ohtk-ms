import {
  ErrorText,
  FormMessage,
  MaskingLoader,
  TabBar,
  TabItem,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useReportCategories from "lib/hooks/reportCategories";
import useMyReportTypes from "lib/hooks/reportTypes/myReportTypes";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import NotificationEdit from "./notificationEdit";
import { NotificationViewModel } from "./notificationViewModel";

const Notification = () => {
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
                <div className="py-3 px-6 ">Name</div>
                <div className="py-3 px-6 ">To</div>
                <div className="py-3 px-6 ">Action</div>
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

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      to
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewModel.data?.map(item => (
                    <tr
                      key={item.notificationTemplateId}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.notificationTemplateName}
                      </th>
                      <td className="py-2 px-6">
                        <TextInput
                          type="text"
                          placeholder="To"
                          onChange={evt =>
                            viewModel.setValue(item, evt.target.value)
                          }
                          // disabled={item.isSubmitting}
                          defaultValue={item.to}
                        />
                        <ErrorText>{item.fieldErrors?.to}</ErrorText>
                      </td>
                      <td className="py-2 px-6">
                        <div className="flex">
                          <button
                            type="button"
                            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 inline-flex items-center"
                            onClick={() => {
                              viewModel.save(item);
                            }}
                          >
                            {/* {item.isSubmitting === true && <Spinner />} */}
                            {/* {item.success === true && (
                              <CheckIcon className="mr-2 -ml-1 w-6 h-6 text-green-600" />
                            )}
                            {item.success === false && (
                              <XIcon className="mr-2 -ml-1 w-6 h-6 text-red-600" />
                            )} */}
                            Save
                          </button>
                        </div>
                        {item.submitError && item.submitError.length > 0 && (
                          <FormMessage>{item.submitError}</FormMessage>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {viewModel.isDataLoding && <Spinner />}
            </div>
          </div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(Notification);
