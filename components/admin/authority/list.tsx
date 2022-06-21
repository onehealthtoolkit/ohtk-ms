import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminAuthorityListViewModel } from "./listViewModel";
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
import { Authority } from "lib/services/authority";

const AuthorityList = () => {
  const router = useRouter();
  const { authorityService } = useServices();

  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });
  const [viewModel] = useState<AdminAuthorityListViewModel>(
    new AdminAuthorityListViewModel(
      authorityService,
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
    <div>
      <div className="mb-4">&gt;&gt; Authorities</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter
          nameSearch={viewModel.nameSearch}
          onChange={value => onSearchChange("q", value)}
        />
        <div className="flex-grow"></div>
        <Link href={"/admin/authorities/create"} passHref>
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
        ]}
        data={viewModel.data || []}
        onEdit={record => router.push(`/admin/authorities/${record.id}/update`)}
        onDelete={record => viewModel.dialog("confirmDelete")?.open(record)}
      />
      <ErrorDisplay message={viewModel.errorMessage} />

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
        onYes={(record: Authority) => viewModel.delete(record.id)}
        onNo={() => viewModel.dialog("confirmDelete")?.close()}
      />
    </div>
  );
};

export default observer(AuthorityList);
