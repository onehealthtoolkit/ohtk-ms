import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import ErrorDisplay from "components/widgets/errorDisplay";
import { InvitaionCodeViewModel } from "./listViewModel";

const InvitaionCodeList = () => {
  const router = useRouter();
  const [viewModel, setViewModel] = useState<InvitaionCodeViewModel>();
  useEffect(() => {
    const viewModel = new InvitaionCodeViewModel();
    setViewModel(viewModel);
  }, []);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Invitation code</div>

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
            label: "Code",
            get: record => record.code,
          },
        ]}
        data={viewModel?.data || []}
        onEdit={record =>
          router.push(`/admin/invitation_codes/edit/${record.id}`)
        }
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(InvitaionCodeList);
