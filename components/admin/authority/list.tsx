import Protect from "components/auth/protect";
import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminAuthoorityListViewModel } from "./listViewModel";

const AuthorityList = () => {
  const router = useRouter();
  const [viewModel, setViewModel] = useState<AdminAuthoorityListViewModel>();
  useEffect(() => {
    const viewModel = new AdminAuthoorityListViewModel();
    setViewModel(viewModel);
  }, []);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <Protect>
      <div className="mb-4">&gt;&gt; Authorities</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter viewModel={viewModel} />
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
        onEdit={record =>
          router.push(`/settings/authorities/edit/${record.id}`)
        }
      />
    </Protect>
  );
};

export default observer(AuthorityList);
