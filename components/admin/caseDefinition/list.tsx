import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminCaseDefinitionListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "components/hooks/searchParam";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { CaseDefinition } from "lib/services/caseDefinition";

const CaseDefinitionList = () => {
  const router = useRouter();
  const { caseDefinitionService } = useServices();

  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });

  const [viewModel] = useState<AdminCaseDefinitionListViewModel>(() =>
    new AdminCaseDefinitionListViewModel(
      caseDefinitionService,
      searchValue.q as string,
      searchValue.offset as number
    ).registerDialog("confirmDelete")
  );

  useEffect(() => {
    viewModel.setSearchValue(
      searchValue.q as string,
      searchValue.offset as number
    );
  }, [searchValue, viewModel]);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <Observer>
      {() => (
        <div>
          <div className="flex items-center flex-wrap mb-4">
            <Filter
              nameSearch={viewModel.nameSearch}
              onChange={value => onSearchChange("q", value)}
            />
            <div className="flex-grow"></div>
            <Link href={"/admin/case_definitions/create"} passHref>
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
                label: "Report Type",
                get: record => record.reportTypeName,
              },
              {
                label: "description",
                get: record => record.description,
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/case_definitions/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/case_definitions/${record.id}/view`)
            }
            onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
          />
          <ErrorDisplay message={viewModel?.errorMessage} />
          <Paginate
            offset={viewModel.offset}
            limit={viewModel.limit}
            totalCount={viewModel.totalCount}
            onChange={value => onSearchChange("offset", value)}
          />

          <ConfirmDialog
            store={viewModel.dialog("confirmDelete")}
            title="Confirm delete"
            content="Are you sure?"
            onYes={(record: CaseDefinition) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default CaseDefinitionList;
