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
import Paginate from "components/paginate";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "components/hooks/searchParam";

const AuthorityList = () => {
  const router = useRouter();
  const { authorityService } = useServices();

  const [viewModel, setViewModel] = useState<AdminAuthorityListViewModel>();
  const [searchValues] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });

  useEffect(() => {
    const viewModel = new AdminAuthorityListViewModel(authorityService);
    setViewModel(viewModel);
  }, [authorityService]);

  useEffect(() => {
    console.log("searchValues", searchValues);
    if (viewModel) {
      if (searchValues?.limit) viewModel.limit = searchValues?.limit as number;
      if (searchValues?.offset)
        viewModel.offset = searchValues?.offset as number;
      viewModel.setSearchText((searchValues?.q as string) || "");
      viewModel.fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValues]);

  const updateQuery = (name: string, value: string | null | undefined) => {
    if (!viewModel) return;

    const query = {
      ...router.query,
      [name]: value,
    };
    if (name === "q") {
      query.offset = undefined;
      viewModel.offset = 0;
    }
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Authorities</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter
          viewModel={viewModel}
          queryName="q"
          onQueryChange={updateQuery}
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
      />
      <ErrorDisplay message={viewModel.errorMessage} />

      <Paginate viewModel={viewModel} onQueryChange={updateQuery} />
    </div>
  );
};

export default observer(AuthorityList);
