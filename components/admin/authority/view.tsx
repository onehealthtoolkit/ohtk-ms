import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { AuthorityViewViewModel } from "./viewViewModel";
import { useTranslation } from "react-i18next";
import ViewActionButtons from "components/widgets/viewActionButtons";
import { Tree, TreeNode } from "react-organizational-chart";
import tw from "tailwind-styled-components";
import useStore from "lib/store";
import Link from "next/link";

const StyledCurrentNode = tw.div`
p-2
rounded-2xl
border-2
inline-block
bg-blue-200
`;

const StyledNode = tw.button`
p-2
rounded-2xl
border-2
inline-block
hover:bg-gray-200
`;

const AuthorityView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const store = useStore();
  const villageEnabled = store.isFeatureEnable("village");
  const [viewModel] = useState(
    () =>
      new AuthorityViewViewModel(
        router.query.id as string,
        services.authorityService,
        services.villageService
      )
  );

  useEffect(() => {
    viewModel.id = router.query.id as string;
    viewModel.fetch(villageEnabled);
  }, [router.query.id, viewModel, villageEnabled]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.id", "Id")}
                </th>
                <td className="px-6 py-4">{viewModel.data.id}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.code", "Code")}
                </th>
                <td className="px-6 py-4">{viewModel.data.code}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.name", "Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {villageEnabled && (
          <div className="mb-4">
            <div className="mb-3 font-semibold text-gray-800">
              {t("breadcrumb.villages", "Villages")}
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.code", "Code")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.name", "Name")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.active", "Active")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewModel.villages.length ? (
                    viewModel.villages.map(village => (
                      <tr
                        key={village.id}
                        className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                      >
                        <td className="px-6 py-4 text-blue-700 underline">
                          <Link href={`/admin/villages/${village.id}/view`}>
                            {village.code}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-blue-700 underline">
                          <Link href={`/admin/villages/${village.id}/view`}>
                            {village.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          {village.active ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                      <td className="px-6 py-4" colSpan={3}>
                        {t("table.notFound", "Data not found.")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="overflow-x-scroll py-8">
          {viewModel.data.inherits?.length == 0 && (
            <Tree
              lineWidth={"2px"}
              lineColor={"green"}
              lineBorderRadius={"10px"}
              label={
                <StyledCurrentNode>{viewModel.data.name}</StyledCurrentNode>
              }
            >
              {viewModel.inheritsDown?.map(item => (
                <TreeNode
                  key={item.id}
                  label={
                    <StyledNode
                      onClick={() =>
                        router.push(`/admin/authorities/${item.id}/view`)
                      }
                    >
                      {item.name}
                    </StyledNode>
                  }
                ></TreeNode>
              ))}
            </Tree>
          )}

          {viewModel.data.inherits?.length == 1 && (
            <Tree
              lineWidth={"2px"}
              lineColor={"green"}
              lineBorderRadius={"10px"}
              label={
                <StyledNode
                  onClick={() =>
                    router.push(
                      `/admin/authorities/${
                        viewModel.data.inherits![0].id
                      }/view`
                    )
                  }
                >
                  {viewModel.data.inherits[0].name}
                </StyledNode>
              }
            >
              <TreeNode
                key={viewModel.data.id}
                label={
                  <StyledCurrentNode>{viewModel.data.name}</StyledCurrentNode>
                }
              >
                {viewModel.inheritsDown?.map(item => (
                  <TreeNode
                    key={item.id}
                    label={
                      <StyledNode
                        onClick={() =>
                          router.push(`/admin/authorities/${item.id}/view`)
                        }
                      >
                        {item.name}
                      </StyledNode>
                    }
                  ></TreeNode>
                ))}
              </TreeNode>
            </Tree>
          )}

          {viewModel.data.inherits && viewModel.data.inherits?.length > 1 && (
            <Tree
              lineWidth={"2px"}
              lineColor={"green"}
              lineBorderRadius={"10px"}
              label={""}
            >
              {viewModel.data.inherits?.map(item => (
                <TreeNode
                  key={item.id}
                  label={
                    <StyledNode
                      onClick={() =>
                        router.push(`/admin/authorities/${item.id}/view`)
                      }
                    >
                      {item.name}
                    </StyledNode>
                  }
                >
                  <TreeNode
                    key={viewModel.data.id}
                    label={
                      <StyledCurrentNode>
                        {viewModel.data.name}
                      </StyledCurrentNode>
                    }
                  >
                    {viewModel.inheritsDown?.map(item => (
                      <TreeNode
                        key={item.id}
                        label={
                          <StyledNode
                            onClick={() =>
                              router.push(`/admin/authorities/${item.id}/view`)
                            }
                          >
                            {item.name}
                          </StyledNode>
                        }
                      ></TreeNode>
                    ))}
                  </TreeNode>
                </TreeNode>
              ))}
            </Tree>
          )}
          <div className="text-center pt-8 text-xs italic">
            click on the diagram and use left arrow or right arrow to scoll left
            or right
          </div>
        </div>

        <ViewActionButtons
          editUrl={`/admin/authorities/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(AuthorityView);
