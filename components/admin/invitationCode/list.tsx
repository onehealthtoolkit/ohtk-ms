import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import { InvitaionCodeListViewModel } from "./listViewModel";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import Paginate from "components/widgets/table/paginate";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "lib/hooks/searchParam";
import ConfirmDialog from "components/widgets/dialogs/confirmDialog";
import { InvitationCode } from "lib/services/invitationCode";
import { formatDate } from "lib/datetime";
import TotalItem from "components/widgets/table/totalItem";

const InvitaionCodeList = () => {
  const router = useRouter();
  const { invitationCodeService } = useServices();
  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });

  const [viewModel] = useState<InvitaionCodeListViewModel>(() =>
    new InvitaionCodeListViewModel(
      invitationCodeService,
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
            <TotalItem totalCount={viewModel.totalCount} />
            <Filter
              codeSearch={viewModel.codeSearch}
              onChange={value => onSearchChange("q", value)}
            />

            <div className="flex-grow"></div>
            <Link href={"/admin/invitation_codes/create"} passHref>
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
                label: "Code",
                get: record => record.code,
              },
              {
                label: "From Date",
                get: record => formatDate(record.fromDate, router.locale),
              },
              {
                label: "Through Date",
                get: record => formatDate(record.throughDate, router.locale),
              },
            ]}
            data={viewModel?.data || []}
            onEdit={record =>
              router.push(`/admin/invitation_codes/${record.id}/update`)
            }
            onView={record =>
              router.push(`/admin/invitation_codes/${record.id}/view`)
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
            onYes={(record: InvitationCode) => viewModel.delete(record.id)}
            onNo={() => viewModel.dialog("confirmDelete")?.close()}
          />
        </div>
      )}
    </Observer>
  );
};

export default InvitaionCodeList;
