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
  const [viewModel] = useState(
    () =>
      new AuthorityViewViewModel(
        router.query.id as string,
        services.authorityService
      )
  );

  useEffect(() => {
    viewModel.id = router.query.id as string;
    viewModel.fetch();
  }, [router, viewModel]);

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
        {viewModel.data.inherits?.length == 0 && (
          <Tree
            lineWidth={"2px"}
            lineColor={"green"}
            lineBorderRadius={"10px"}
            label={<StyledCurrentNode>{viewModel.data.name}</StyledCurrentNode>}
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
                    `/admin/authorities/${viewModel.data.inherits![0].id}/view`
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
              </TreeNode>
            ))}
          </Tree>
        )}

        <ViewActionButtons
          editUrl={`/admin/authorities/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(AuthorityView);
