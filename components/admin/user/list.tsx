import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminUserListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";
import useServices from "lib/services/provider";

const UserList = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<AdminUserListViewModel>();
  useEffect(() => {
    const viewModel = new AdminUserListViewModel(services.userService);
    setViewModel(viewModel);
    viewModel.fetch();
  }, [services.userService]);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Users</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter viewModel={viewModel} />
        <div className="flex-grow"></div>
        <Link href={"/admin/users/create"} passHref>
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
            label: "First Name",
            get: record => record.firstName,
          },
          {
            label: "Last Name",
            get: record => record.lastName,
          },
          {
            label: "Email",
            get: record => record.email,
          },
        ]}
        data={viewModel?.data || []}
        onEdit={record => router.push(`/admin/users/${record.id}/update`)}
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(UserList);
