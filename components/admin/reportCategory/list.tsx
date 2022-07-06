import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportCategoryListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { ReportCategory } from "lib/services/reportCategory";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "components/hooks/searchParam";

const ReportCategoryList = () => {
  const router = useRouter();
  const { reportCategoryService } = useServices();

  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });

  const [viewModel] = useState<AdminReportCategoryListViewModel>(() =>
    new AdminReportCategoryListViewModel(
      reportCategoryService,
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

  if (!viewModel) {
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
            <Link href={"/admin/report_categories/create"} passHref>
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
                label: "Ordering",
                get: record => record.ordering.toString(),
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/report_categories/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/report_categories/${record.id}/view`)
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
            onYes={(record: ReportCategory) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default ReportCategoryList;
