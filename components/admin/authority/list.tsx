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

const AuthorityList = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<AdminAuthorityListViewModel>();
  useEffect(() => {
    const viewModel = new AdminAuthorityListViewModel(
      services.authorityService
    );
    setViewModel(viewModel);
  }, [services.authorityService]);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Authorities</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter viewModel={viewModel} />
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
        data={viewModel?.data || []}
        onEdit={record => router.push(`/admin/authorities/${record.id}/update`)}
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(AuthorityList);
